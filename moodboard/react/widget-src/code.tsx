const { widget } = figma;
const {
  AutoLayout,
  Text,
  useWidgetNodeId,
  useSyncedState,
  useStickable,
  usePropertyMenu,
} = widget;

const REACTIONS = ["😄", "😂", "☹️", "😭", "😡", "🤔", "😱", "💀", "👀", "❗"];

const PENCIL_ICON = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="var(--figma-color-icon-onbrand-secondary, rgba(255, 255, 255, .8))"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>`;

function Widget() {
  const widgetId = useWidgetNodeId();
  const [stamp, setStamp] = useSyncedState("stamp", null);
  const [rotation, setRotation] = useSyncedState("rotation", 0);
  const [author, setAuthor] = useSyncedState<string|null>("author", null);
  const [showAuthor, setShowAuthor] = useSyncedState("showAuthor", true);
  const [message, setMessage] = useSyncedState<string|null>("message", null);

  const cloneStamp = async (reaction: string) => {
    try {
      const currentUser = figma.currentUser?.name || "Unknown User";

      // Fetch the widget node asynchronously
      const node = await figma.getNodeByIdAsync(widgetId);
      if (node && node.type === "WIDGET") {
        const clone = node.cloneWidget({
          stamp: reaction,
          rotation: Math.random() * 16 - 8,
          author: currentUser,
          message: message || "",
        });

        if (clone && node.width) {
          const index = REACTIONS.indexOf(reaction);
          // transform absolutely (x and y will use relative transforms to parent, which produces incorrect results)
          clone.x = node.absoluteTransform[0][2] + (node.width / REACTIONS.length) * index - 2;
          clone.y = node.absoluteTransform[1][2] - node.height;
        }
      }
    } catch (error) {
      console.error("Error cloning stamp:", error);
    }
  };

  if (stamp) {
    let propertyMenuItems = [
      {
        itemType: "toggle",
        tooltip: author,
        propertyName: "showAuthor",
        isToggled: message ? showAuthor : false,
      },
      {
        itemType: "separator",
      },
      {
        itemType: "action",
        tooltip: "Edit Stamp Text",
        propertyName: "editText",
        icon: PENCIL_ICON,
      },
    ];
  
    usePropertyMenu(propertyMenuItems, async ({ propertyName }) => {
      if (propertyName === "editText") {
        return new Promise((resolve) => {
          figma.showUI(__html__, { width: 400, height: 100 });

          if (author && figma.currentUser?.name !== author) {
            figma.notify("You can't edit someone else's stamp text.");
            return resolve();
          }
          
          figma.ui.postMessage({
            currentUser: figma.currentUser?.name || "Unknown User",
            author: author || "Unknown Author",
            stamp: stamp,
            message: message || "",
          });
    
          figma.ui.onmessage = (data) => {
            if (data.type === "textSubmit") {
              setMessage(data.value.trim());
            }
            figma.closePlugin();
            resolve();
          };
        });
      } else if (propertyName === "showAuthor") {
        if (message) setShowAuthor(!showAuthor);
      }
    });

    useStickable();
    return (
      <AutoLayout
        rotation={message ? rotation / ((Math.min(message.length, 50) + 20) / 25) : rotation}
        effect={[
          {
            type: "drop-shadow",
            color: { r: 0, g: 0, b: 0, a: 0.1 },
            offset: { x: 0, y: 3 },
            blur: 5,
          },
        ]}
        verticalAlignItems="center"
        fill={!!message ? "#f0f0f0" : ""}
        cornerRadius={{ topLeft: 48, topRight: 32, bottomLeft: 48, bottomRight: 32 }}
      >
        <Text tooltip={author || "No author"} fontSize={48}>
          {stamp}
        </Text>
        {!!message && (
          <AutoLayout direction="vertical" maxWidth={300} width="hug-contents" padding={{top: 4, bottom: 4, left: 4, right: 12}}>
            <Text fill="#444" width="fill-parent">{message}</Text>
            {(!!author && showAuthor) && <Text fill="#999" fontSize={8} width="fill-parent">{author}</Text>}
          </AutoLayout>
        )}
      </AutoLayout>
    );
  }


  return (
    <AutoLayout
      stroke={{ type: "solid", color: "#85E0A3" }}
      strokeWidth={2}
      cornerRadius={10}
      minHeight={80}
      fill="#ffffff"
      padding={{ left: 16, right: 16, top: 8, bottom: 8 }}
      spacing={8}
      verticalAlignItems="center"
    >
      {REACTIONS.map((reaction) => (
        <AutoLayout
          key={reaction}
          effect={[
            {
              type: "drop-shadow",
              color: { r: 0, g: 0, b: 0, a: 0.1 },
              offset: { x: 0, y: 3 },
              blur: 5,
            },
          ]}
          onClick={() => cloneStamp(reaction)}
          cornerRadius={1000}
          width="hug-contents"
          verticalAlignItems="center"
        >
          <Text fontSize={36}>{reaction}</Text>
        </AutoLayout>
      ))}
    </AutoLayout>
  );
}

widget.register(Widget);
