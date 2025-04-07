const { widget } = figma;
const {
  AutoLayout,
  Text,
  Input,
  Image,
  useEffect,
  useStickable,
  useWidgetNodeId,
  useSyncedState,
  useSyncedMap,
  usePropertyMenu,
  waitForTask,
} = widget;

const TENOR_API_KEY = "AIzaSyABOoQRf8M5Al8q_lMfoo3tEgYsUUiY-ik";
const GIF_PROMPTS = [
  "yesss",
  "hmm",
  "laugh out loud",
  "woohoo",
  "awe",
  "say what",
  "dang it",
  "oh nooo",
  "cat dance",
];
const WIDGET_WIDTH = 500;
const PLACEMENT_OFFSET = 32;
const SHOW_TUTORIALS = 2;

interface TenorGIF {
  url: string;
  duration: number;
  preview: string;
  dims: [number, number];
  size: number;
}

function Widget() {
  const widgetId = useWidgetNodeId();
  const [gifs, setGIFs] = useSyncedState<TenorGIF[] | null>("gifs", null);
  const [loading, setLoading] = useSyncedState("loading", false);
  const [spawnSide, setSpawnSide] = useSyncedState<
    "left" | "right" | "top" | "bottom"
  >("spawnSide", "top");
  const tutorial = useSyncedMap<number>("tutorial");

  useEffect(() => {
    figma.ui.onmessage = (msg) => {
      if (msg.type === "select") {
        waitForTask(createGIF(msg.gif).then(() => figma.closePlugin()));
      }
      if (msg.type === "search") {
        searchGIF(msg.query, false, 20, msg.next).then((gifs) => {
          figma.ui.postMessage({
            type: "results",
            results: gifs.results,
            next: gifs.next,
          });
        });
      }
      if (msg.type === "close") {
        figma.closePlugin();
      }
    };
  });

  const openPluginWindow = () => {
    return new Promise<void>((resolve) => {
      figma.showUI(__html__, { width: 300, height: 300 });
    });
  };

  const createGIF = async (gif: TenorGIF) => {
    if (!gif) return;
    // create image node
    const node = (await figma.getNodeByIdAsync(widgetId)) as WidgetNode;
    const image = await figma.createImageAsync(gif.url);
    const frame = figma.createGif(image.hash);
    frame.resize(gif.dims[0], gif.dims[1]);
    figma.currentPage.appendChild(frame);
    const xOffset = Math.random() * PLACEMENT_OFFSET - PLACEMENT_OFFSET / 2;
    const yOffset = Math.random() * PLACEMENT_OFFSET * -1;
    if (spawnSide === "left") {
      frame.x = node.absoluteTransform[0][2] - frame.width - 16 + xOffset;
      frame.y =
        node.absoluteTransform[1][2] +
        node.height / 2 -
        frame.height / 2 +
        yOffset;
    } else if (spawnSide === "right") {
      frame.x = node.absoluteTransform[0][2] + node.width + 16 + xOffset;
      frame.y =
        node.absoluteTransform[1][2] +
        node.height / 2 -
        frame.height / 2 +
        yOffset;
    } else if (spawnSide === "top") {
      frame.x =
        node.absoluteTransform[0][2] +
        node.width / 2 -
        frame.width / 2 +
        xOffset;
      frame.y = node.absoluteTransform[1][2] - frame.height - 16 + yOffset;
    } else {
      frame.x =
        node.absoluteTransform[0][2] +
        node.width / 2 -
        frame.width / 2 +
        xOffset;
      frame.y = node.absoluteTransform[1][2] + node.height + 16 + yOffset;
    }

    // Show tutorials SHOW_TUTORIALS times before stopping
    const showTutorialAgain = figma.currentUser?.id
      ? (tutorial.get(figma.currentUser.id) || 0) < SHOW_TUTORIALS
      : true;
    if (showTutorialAgain) {
      figma.notify("Click and drag the new GIF to place it where you'd like.");
      if (figma.currentUser?.id) {
        tutorial.set(
          figma.currentUser.id,
          (tutorial.get(figma.currentUser.id) || 0) + 1
        );
      }
    }
  };

  const fetchGifUrls = async () => {
    const gifUrls: TenorGIF[] = [];
    setLoading(true);
    for (const prompt of GIF_PROMPTS) {
      const gifs: { results: TenorGIF[]; next: string } = await searchGIF(
        prompt,
        false,
        5
      );
      gifUrls.push(
        gifs.results[Math.floor(Math.random() * gifs.results.length)]
      );
      setGIFs(gifUrls);
      // Rate limit is 1 search per second
      if (gifUrls.length < GIF_PROMPTS.length)
        await new Promise((r) => setTimeout(r, 750));
    }
    setLoading(false);
    return gifUrls;
  };

  useEffect(() => {
    if (gifs) return;
    waitForTask(fetchGifUrls().then(setGIFs));
  });

  const searchGIF = async (
    query: string,
    makeGIF = true,
    results = 1,
    next = ""
  ) => {
    const url = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(
      query
    )}&media_filter=tinygif&contentfilter=medium&key=${TENOR_API_KEY}&limit=${results}${
      next ? `&pos=${next}` : ""
    }`;
    const response = await fetch(url);
    const json = await response.json();
    const gif = json.results[0].media_formats.tinygif;
    if (!makeGIF) {
      if (results !== 1) {
        return {
          results: json.results.map(
            (result: any) => result.media_formats.tinygif
          ),
          next: json.next,
        };
      } else {
        return gif;
      }
    }
    // Must use waitForTask to prevent GIF creation from being prematurely terminated by Figma
    waitForTask(createGIF(gif));
  };

  if (!!gifs) {
    usePropertyMenu(
      [
        {
          itemType: "action",
          tooltip: "Refresh GIFs",
          propertyName: "refresh",
        },
        {
          itemType: "separator",
        },
        {
          itemType: "dropdown",
          tooltip: "Create GIFs on",
          propertyName: "spawnSide",
          selectedOption: spawnSide,
          options: [
            { option: "top", label: "Top" },
            { option: "bottom", label: "Bottom" },
            { option: "left", label: "Left" },
            { option: "right", label: "Right" },
          ],
        },
      ],
      async (msg) => {
        if (msg.propertyName === "refresh") {
          setGIFs(null);
          waitForTask(fetchGifUrls().then(setGIFs));
        }
        if (msg.propertyName === "spawnSide") {
          setSpawnSide(
            msg.propertyValue as "left" | "right" | "top" | "bottom"
          );
        }
      }
    );
  }

  const gifWidth = (WIDGET_WIDTH - 32 - 16) / 3;

  return (
    <AutoLayout
      stroke={{ type: "solid", color: "#FFAFA3" }}
      minHeight={80}
      strokeWidth={2}
      cornerRadius={10}
      width={WIDGET_WIDTH}
      fill="#ffffff"
      padding={16}
      spacing={16}
      direction="vertical"
      verticalAlignItems="center"
    >
      <AutoLayout
        minHeight={48}
        verticalAlignItems="center"
        spacing={16}
        width="fill-parent"
      >
        <AutoLayout
          fill="#777"
          cornerRadius={5}
          padding={{ left: 10, right: 10, top: 5, bottom: 5 }}
          width="hug-contents"
          verticalAlignItems="center"
        >
          <Text fontSize={24} fill="#fff">
            GIF
          </Text>
        </AutoLayout>
        <AutoLayout
          onClick={openPluginWindow}
          fill="#eee"
          cornerRadius={20}
          padding={{ left: 10, right: 10, top: 5, bottom: 5 }}
          width="fill-parent"
          verticalAlignItems="center"
        >
          <Text
            width={300}
            fontSize={24}
            verticalAlignText="center"
            fill="#ccc"
          >
            Search Tenor
          </Text>
        </AutoLayout>
      </AutoLayout>
      {!!gifs && !loading && (
        <AutoLayout
          spacing={8}
          direction="horizontal"
          width="fill-parent"
          wrap={true}
          verticalAlignItems="center"
        >
          {gifs.map((gif, i) => (
            <AutoLayout
              key={i}
              effect={[
                {
                  type: "drop-shadow",
                  color: { r: 0, g: 0, b: 0, a: 0.1 },
                  offset: { x: 0, y: 3 },
                  blur: 5,
                },
              ]}
              hoverStyle={{ opacity: 0.6 }}
              onClick={() => waitForTask(createGIF(gif))}
              width="hug-contents"
              verticalAlignItems="center"
            >
              <Image
                cornerRadius={4}
                src={gif.url}
                width={gifWidth}
                height={gifWidth}
              />
            </AutoLayout>
          ))}
        </AutoLayout>
      )}
      {loading && <Text>Loading GIFs ({gifs ? gifs.length : 0}/9)...</Text>}
    </AutoLayout>
  );
}

widget.register(Widget);
