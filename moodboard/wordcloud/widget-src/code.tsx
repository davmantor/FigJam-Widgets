const { widget, group } = figma;
const {
  useSyncedState,
  useSyncedMap,
  waitForTask,
  useEffect,
  usePropertyMenu,
  useWidgetNodeId,
  AutoLayout,
  Text,
  Image,
  Frame,
} = widget;

const TIMER_SECONDS = 60;
const MIN_RESPONSES = 3;
const MIN_WORDS = 10;

// Wordcloud settings
const PADDING = 16;
const MAX_WORDS_IN_WORDCLOUD = 100;

const RESET_ICON = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="var(--figma-color-icon-onbrand-secondary, rgba(255, 255, 255, .8))" stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-refresh"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" /></svg>`

interface WordcloudWord {
  x: number;
  y: number;
  rotation: number;
  size: number;
  text: string;
  color: number[];
}

function Widget() {
  const [wordcloudImg, setWordcloudImg] = useSyncedState<
    null | WordcloudWord[]
  >("wordcloudImg", null);
  const [responsesNeeded, setResponsesNeeded] = useSyncedState<number>("responsesNeeded", MIN_RESPONSES);
  const [wordsNeeded, setWordsNeeded] = useSyncedState<number>("wordsNeeded", MIN_WORDS);
  const [timerSeconds, setTimerSeconds] = useSyncedState<number>("timerSeconds", TIMER_SECONDS);
  const [responses, setResponses] = useSyncedState<number>("responses", 0);
  const [spawnSide, setSpawnSide] = useSyncedState<"left" | "right" | "top" | "bottom">("spawnSide", "top");
  const votes = useSyncedMap<number>("votes");
  const widgetId = useWidgetNodeId();

  const openInputMenu = () => {
    const params = {
      seconds: timerSeconds,
      maxWordsInWordcloud: MAX_WORDS_IN_WORDCLOUD,
      currentUser: figma.currentUser,
    };

    figma.showUI(__html__, { width: 400, height: 300 });
    figma.ui.postMessage({ type: "initialize", params });
    return new Promise(() => {});
  };

  const createWordcloud = async () => {
    /*
      Looking for the wordcloud generation code?
      It's in ui.html, since we can only generate the
      wordcloud when we have access to a <canvas> element.
      We then generate an image from the canvas and send
      it to the widget.
    */

    if (wordcloudImg === null) {
      figma.notify(
        "Wordcloud couldn't be generated - have you been closing the popup with X instead of giving up?"
      );
      return;
    }

    // load font first
    await figma.loadFontAsync({ family: "Inter", style: "Medium" });

    // recreate wordcloud image
    const node = (await figma.getNodeByIdAsync(widgetId)) as WidgetNode;
    const section = figma.createSection();
    section.name = "Wordcloud";
    section.resizeWithoutConstraints(300 + 2 * PADDING, 300 + 2 * PADDING);

    for (const word of wordcloudImg) {
      const text = figma.createText();
      text.characters = word.text;
      text.fontSize = word.size;
      text.fills = [
        {
          type: "SOLID",
          color: { r: word.color[0] / 255, g: word.color[1] / 255, b: word.color[2] / 255 },
        },
      ];
      text.lineHeight = { value: text.fontSize * 0.9, unit: "PIXELS" };
      text.x = word.x + PADDING;
      text.y = word.y + PADDING;
      text.rotation = word.rotation;
      section.appendChild(text);
    }

    group([section, ...section.children], figma.currentPage);

    if (spawnSide === "left") {
      section.x = node.absoluteTransform[0][2] - section.width - 16;
      section.y =
        node.absoluteTransform[1][2] + node.height / 2 - section.height / 2;
    } else if (spawnSide === "right") {
      section.x = node.absoluteTransform[0][2] + node.width + 16;
      section.y =
        node.absoluteTransform[1][2] + node.height / 2 - section.height / 2;
    } else if (spawnSide === "top") {
      section.x = node.absoluteTransform[0][2] + node.width / 2 - section.width / 2;
      section.y = node.absoluteTransform[1][2] - section.height - 16;
    } else {
      section.x = node.absoluteTransform[0][2] + node.width / 2 - section.width / 2;
      section.y = node.absoluteTransform[1][2] + node.height + 16;
    }
  };

  const responsesLeft = () => {
    return Math.max(0, responsesNeeded - responses);
  };
  const wordsLeft = () => {
    return Math.max(0, wordsNeeded - votes.size);
  };

  useEffect(() => {
    figma.ui.onmessage = (msg) => {
      console.log("Received message:", msg);
      if (msg.type === "addWord") {
        if (msg.word !== "") {
          for (let word of msg.word.split(" ")) {
            const newVotes = (votes.get(word) || 0) + 1;
            votes.set(word, newVotes);
            figma.ui.postMessage({ type: "addWord", word, votes: newVotes });
          }
        }
      }
      if (msg.type === "words") {
        console.log(votes.entries());
        figma.ui.postMessage({ type: "words", words: votes.entries() });
      }
      if (msg.type === "wordcloudImage") {
        // also acts as a response verifier
        setResponses(responses + 1);
        setWordcloudImg(msg.result);
        //figma.closePlugin();
      }
      if (msg.type === "closeWindow") {
        figma.closePlugin();
      }
    };
  });

  usePropertyMenu([
    {
      itemType: 'dropdown',
      tooltip: 'Responses needed',
      propertyName: 'responsesNeeded',
      options: [
        { option: '1', label: '1 response' },
        { option: '2', label: '2 responses' },
        { option: '3', label: '3 responses' },
        { option: '4', label: '4 responses' },
        { option: '5', label: '5 responses' },
        { option: '10', label: '10 responses' },
      ],
      selectedOption: responsesNeeded.toString(),
    },
    {
      itemType: 'dropdown',
      tooltip: 'Words needed',
      propertyName: 'wordsNeeded',
      options: [
        { option: '5', label: '5 words' },
        { option: '10', label: '10 words' },
        { option: '15', label: '15 words' },
        { option: '20', label: '20 words' },
        { option: '30', label: '30 words' },
        { option: '50', label: '50 words' },
      ],
      selectedOption: wordsNeeded.toString(),
    },
    {
      itemType: 'dropdown',
      tooltip: 'Timer',
      propertyName: 'timer',
      options: [
        { option: '10', label: '10 seconds' },
        { option: '20', label: '20 seconds' },
        { option: '30', label: '30 seconds' },
        { option: '45', label: '45 seconds' },
        { option: '60', label: '60 seconds' },
        { option: '90', label: '90 seconds' },
        { option: '120', label: '120 seconds' },
      ],
      selectedOption: timerSeconds.toString(),
    },
      {
        itemType: "dropdown",
        tooltip: "Create wordcloud on",
        propertyName: "spawnSide",
        selectedOption: spawnSide,
        options: [
          { option: "top", label: "Top" },
          { option: "bottom", label: "Bottom" },
          { option: "left", label: "Left" },
          { option: "right", label: "Right" },
        ],
      },
    {
      itemType: 'separator'
    },
    {
      itemType: 'action',
      tooltip: 'Reset',
      icon: RESET_ICON,
      propertyName: 'reset',
    }
  ], async ({ propertyName, propertyValue }) => {
    if (propertyName === 'reset') {
      setResponses(0);
      // No clear method for maps?
      for (const key of votes.keys()) {
        votes.delete(key);
      }
    }
    if (!propertyValue) return;
    if (propertyName === 'responsesNeeded') {
      setResponsesNeeded(parseInt(propertyValue));
    }
    if (propertyName === 'wordsNeeded') {
      setWordsNeeded(parseInt(propertyValue));
    }
    if (propertyName === 'timer') {
      setTimerSeconds(parseInt(propertyValue));
    }
    if (propertyName === "spawnSide") {
      setSpawnSide(propertyValue as "left" | "right" | "top" | "bottom");
    }
  });

  const responsesToGo = responsesLeft();
  const wordsToGo = wordsLeft();
  const thresholdMet = responsesToGo <= 0 && wordsToGo <= 0;

  return (
    <AutoLayout
      stroke={{ type: "solid", color: "#80CAFF" }}
      strokeWidth={2}
      cornerRadius={10}
      padding={16}
      spacing={8}
      verticalAlignItems="center"
      horizontalAlignItems="center"
      height={80}
      fill="#FFFFFF"
      direction="vertical"
    >
      <AutoLayout
        direction="horizontal"
        spacing={10}
        verticalAlignItems="center"
      >
        <Text fontSize={36}>☁️</Text>
        <AutoLayout
          hoverStyle={{ opacity: 0.5 }}
          fill="#cccccc"
          padding={{ left: 16, right: 16, top: 5, bottom: 5 }}
          cornerRadius={100}
          maxHeight={38}
          onClick={openInputMenu}
        >
          <Text fontSize={24}>Add words</Text>
        </AutoLayout>
        <AutoLayout
          direction="vertical"
          opacity={thresholdMet ? 1 : 0.5}
          hoverStyle={thresholdMet ? { opacity: 0.5 } : {}}
          fill="#cccccc"
          padding={{ left: 16, right: 16, top: 5, bottom: 5 }}
          cornerRadius={100}
          maxHeight={38}
          onClick={thresholdMet ? createWordcloud : undefined}
        >
          <Text lineHeight={thresholdMet ? 24 : 18} fontSize={thresholdMet ? 24 : 18}>{thresholdMet ? "" : "🔒 "}Generate</Text>
          {(!thresholdMet && responsesToGo > 0) && (
            <Text fontSize={8} paragraphIndent={29}>
              Need {responsesToGo} more{" "}
              {responsesToGo === 1 ? "response" : "responses"}
            </Text>
          )}
          {(!thresholdMet && responsesToGo <= 0 && wordsToGo > 0) && (
            <Text fontSize={8} paragraphIndent={29}>
              Need {wordsLeft()} more {wordsToGo === 1 ? "word" : "words"}
            </Text>
          )}
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(Widget);
