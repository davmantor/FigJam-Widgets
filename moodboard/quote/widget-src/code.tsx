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

  const createQuote = async (quote: string) => {
    if (quote === "") return;
    const node = (await figma.getNodeByIdAsync(widgetId)) as WidgetNode;
    const clone = node.cloneWidget({ quote });
    clone.x = node.absoluteTransform[0][2] + node.width / 2 - clone.width / 2;
    clone.y = node.absoluteTransform[1][2] - clone.height - 16;
  };

  if (quote) {
    let propertyMenuItems = [
      {
        itemType: "action",
        tooltip: "Edit Quote",
        propertyName: "editText",
        icon: PENCIL_ICON,
      },
    ];

    usePropertyMenu(propertyMenuItems, async ({ propertyName }) => {
      if (propertyName === "editText") {
        return new Promise((resolve) => {
          figma.showUI(__html__, { width: 500, height: 250 });

          figma.ui.postMessage({
            quote,
            citation,
          });

          figma.ui.onmessage = (data) => {
            if (data.type === "textSubmit") {
              setQuote(data.quote.trim());
              setCitation(data.citation.trim());
            }
            figma.closePlugin();
            resolve();
          };
        });
      }
    });
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
        fill="#FFD966"
        padding={{ left: 16, right: 16, top: 8, bottom: 8 }}
        spacing={8}
        verticalAlignItems="center"
      >
        <AutoLayout height="fill-parent" verticalAlignItems="start">
          <Text fontSize={64} lineHeight={64} fontFamily="Lora">
            “
          </Text>
        </AutoLayout>
        <AutoLayout direction="vertical" width="hug-contents" maxWidth={600}>
          <Text width="fill-parent" fontSize={24} fontFamily="Lora">
            {quote}
          </Text>
          {(!!citation) && (
            <Text
              width="fill-parent"
              horizontalAlignText="right"
              fontFamily="Lora"
              fontSize={18}
              italic={true}
            >
              {citation}
            </Text>
          )}
        </AutoLayout>
        <AutoLayout height="fill-parent" verticalAlignItems="end">
          <Text fontSize={64} lineHeight={0} fontFamily="Lora">
            ”
          </Text>
        </AutoLayout>
      </AutoLayout>
    );
  }

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
