const { widget } = figma;
const {
  AutoLayout,
  Text,
  Input,
  useWidgetNodeId,
  usePropertyMenu,
  useSyncedState,
} = widget;

const PENCIL_ICON = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="var(--figma-color-icon-onbrand-secondary, rgba(255, 255, 255, .8))"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>`;

function Widget() {
  const widgetId = useWidgetNodeId();
  const [quote, setQuote] = useSyncedState<string | null>("quote", null);
  const [citation, setCitation] = useSyncedState<string | null>(
    "citation",
    null
  );
  const [spawnSide, setSpawnSide] = useSyncedState<
    "left" | "right" | "top" | "bottom"
  >("spawnSide", "top");
  const [style, setStyle] = useSyncedState<any>("style", {
    backgroundColor: "#ffd966",
    textColor: "#000000",
    fontSize: 24,
    fontFamily: "Lora",
  });

  const createQuote = async (quote: string) => {
    if (quote === "") return;
    const node = (await figma.getNodeByIdAsync(widgetId)) as WidgetNode;
    const clone = node.cloneWidget({ quote });
    // estimate width (not perfect, but close enough)
    const width = Math.min(quote.length * 16 + 80, clone.width + 80);
    if (spawnSide === "left") {
      clone.x = node.absoluteTransform[0][2] - width - 16;
      clone.y =
        node.absoluteTransform[1][2] + node.height / 2 - clone.height / 2;
    } else if (spawnSide === "right") {
      clone.x = node.absoluteTransform[0][2] + node.width + 16;
      clone.y =
        node.absoluteTransform[1][2] + node.height / 2 - clone.height / 2;
    } else if (spawnSide === "top") {
      clone.x = node.absoluteTransform[0][2] + node.width / 2 - width / 2;
      clone.y = node.absoluteTransform[1][2] - clone.height - 16;
    } else {
      clone.x = node.absoluteTransform[0][2] + node.width / 2 - width / 2;
      clone.y = node.absoluteTransform[1][2] + node.height + 16;
    }
  };

  if (quote) {
    usePropertyMenu(
      [
        {
          itemType: "action",
          tooltip: "Edit Quote",
          propertyName: "editText",
          icon: PENCIL_ICON,
        },
      ],
      async ({ propertyName }) => {
        if (propertyName === "editText") {
          return new Promise((resolve) => {
            figma.showUI(__html__, { width: 500, height: 250 });

            figma.ui.postMessage({
              quote,
              citation,
              style
            });

            figma.ui.onmessage = (data) => {
              if (data.type === "textSubmit") {
                setQuote(data.quote.trim());
                setCitation(data.citation.trim());
                setStyle(data.style);
              }
              figma.closePlugin();
              resolve();
            };
          });
        }
      }
    );
    return (
      <AutoLayout
        effect={[
          {
            type: "drop-shadow",
            color: { r: 0, g: 0, b: 0, a: 0.1 },
            offset: { x: 0, y: 3 },
            blur: 5,
          },
        ]}
        minHeight={80}
        fill={style.backgroundColor}
        padding={{ left: 16, right: 16, top: 8, bottom: 8 }}
        spacing={8}
        verticalAlignItems="center"
      >
        <AutoLayout height="fill-parent" verticalAlignItems="start">
          <Text fill={style.textColor} fontSize={style.fontSize * (8/3)} lineHeight={style.fontSize * (8/3)} fontFamily="Lora">
            “
          </Text>
        </AutoLayout>
        <AutoLayout direction="vertical" width="hug-contents" maxWidth={600}>
          <Text width="fill-parent" fontSize={style.fontSize} fontFamily={style.fontFamily} fill={style.textColor}>
            {quote}
          </Text>
          {!!citation && (
            <Text
              width="fill-parent"
              horizontalAlignText="right"
              fontFamily={style.fontFamily}
              fill={style.textColor}
              fontSize={style.fontSize * (3/4)}
              italic={true}
            >
              {citation}
            </Text>
          )}
        </AutoLayout>
        <AutoLayout height="fill-parent" verticalAlignItems="end">
          <Text fill={style.textColor} fontSize={style.fontSize * (8/3)} lineHeight={0} fontFamily="Lora">
            ”
          </Text>
        </AutoLayout>
      </AutoLayout>
    );
  }

  usePropertyMenu(
    [
      {
        itemType: "dropdown",
        tooltip: "Create quotes on",
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
    (msg) => {
      if (msg.propertyName === "spawnSide") {
        setSpawnSide(msg.propertyValue as "left" | "right" | "top" | "bottom");
      }
    }
  );

  return (
    <AutoLayout
      stroke={{ type: "solid", color: "#FFD966" }}
      strokeWidth={2}
      cornerRadius={10}
      minHeight={80}
      fill="#ffffff"
      padding={{ left: 16, right: 16, top: 8, bottom: 8 }}
      spacing={16}
      verticalAlignItems="center"
    >
      <AutoLayout
        height="fill-parent"
        padding={{ top: 48 }}
        verticalAlignItems="start"
      >
        <Text fontSize={64} lineHeight={0} fontFamily="Lora">
          “
        </Text>
      </AutoLayout>
      <AutoLayout
        fill="#eee"
        cornerRadius={20}
        padding={{ left: 10, right: 10, top: 5, bottom: 5 }}
        width="hug-contents"
        verticalAlignItems="center"
      >
        <Input
          width={400}
          fontSize={24}
          verticalAlignText="center"
          value=""
          truncate={3}
          placeholder="Type your quote here"
          onTextEditEnd={(e) => createQuote(e.characters)}
        />
      </AutoLayout>
      <AutoLayout
        height="fill-parent"
        verticalAlignItems="end"
        padding={{ bottom: 14 }}
      >
        <Text fontSize={64} lineHeight={0} fontFamily="Lora">
          ”
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(Widget);
