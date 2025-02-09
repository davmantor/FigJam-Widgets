const { widget } = figma;
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

    section.x =
      node.absoluteTransform[0][2] + node.width / 2 - section.width / 2;
    section.y = node.absoluteTransform[1][2] - section.height - 16;

    /*// create image node
    const image = await figma.createImageAsync(wordcloudImg);
    const frame = figma.createFrame();
    frame.fills = [{ type: "IMAGE", scaleMode: "FILL", imageHash: image.hash }];
    frame.resize(300, 300);
    figma.currentPage.appendChild(frame);
    frame.x = node.x + node.width / 2 - frame.width / 2;
    frame.y = node.y - frame.height - 16;*/
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
            votes.set(word, (votes.get(word) || 0) + 1);
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
        { option: '1', label: '1 responses' },
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
    }
  ], async ({ propertyName, propertyValue }) => {
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
          onClick={openInputMenu}
        >
          <Text>Add words</Text>
        </AutoLayout>
        <AutoLayout
          direction="vertical"
          opacity={thresholdMet ? 1 : 0.5}
          hoverStyle={thresholdMet ? { opacity: 0.5 } : {}}
          fill="#cccccc"
          padding={{ left: 16, right: 16, top: 5, bottom: 5 }}
          cornerRadius={100}
          onClick={thresholdMet ? createWordcloud : undefined}
        >
          <Text>{thresholdMet ? "" : "🔒 "}Generate</Text>
          {(!thresholdMet && responsesToGo > 0) && (
            <Text fontSize={8}>
              Need {responsesToGo} more{" "}
              {responsesToGo === 1 ? "response" : "responses"}
            </Text>
          )}
          {(!thresholdMet && responsesToGo <= 0 && wordsToGo > 0) && (
            <Text fontSize={8}>
              Need {wordsLeft()} more {wordsToGo === 1 ? "word" : "words"}
            </Text>
          )}
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(Widget);
