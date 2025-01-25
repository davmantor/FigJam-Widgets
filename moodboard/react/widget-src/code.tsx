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

// Function to split text into chunks for line wrapping
function splitText(text, limit) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    if (currentLine.length + word.length + 1 <= limit) {
      currentLine += (currentLine ? " " : "") + word;
    } else {
      if (word.length > limit) {
        // Handle long words by hyphenating
        const hyphenated = word.match(new RegExp(`.{1,${limit - 1}}`, "g")) || [];
        lines.push(currentLine.trim());
        lines.push(...hyphenated.map((part, index) => (index < hyphenated.length - 1 ? `${part}-` : part)));
        currentLine = "";
      } else {
        lines.push(currentLine.trim());
        currentLine = word;
      }
    }
  });

  if (currentLine) {
    lines.push(currentLine.trim());
  }

  return lines.filter(Boolean);
}

function Widget() {
  const widgetId = useWidgetNodeId();
  const [stamp, setStamp] = useSyncedState("stamp", null);
  const [rotation, setRotation] = useSyncedState("rotation", 0);
  const [author, setAuthor] = useSyncedState("author", null);
  const [message, setMessage] = useSyncedState("message", null);

  const propertyMenuItems = [
    {
      itemType: "action",
      tooltip: "Enter Stamp Text",
      propertyName: "editText",
    },
  ];

  usePropertyMenu(propertyMenuItems, async ({ propertyName }) => {
    if (propertyName === "editText") {
      return new Promise((resolve) => {
        figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
        
        figma.ui.postMessage({
          currentUser: figma.currentUser?.name || "Unknown User",
          author: author || "Unknown Author",
        });
  
        figma.ui.onmessage = (data) => {
          if (data.type === "textSubmit" && data.value) {
            setMessage(data.value.trim());
          }
          figma.closePlugin();
          resolve();
        };
      });
    }
  });

  const cloneStamp = async (reaction) => {
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
          clone.x = node.x + (node.width / REACTIONS.length) * index - 2;
          clone.y = node.y - node.height;
        }
      }
    } catch (error) {
      console.error("Error cloning stamp:", error);
    }
  };

  if (stamp) {
    useStickable();
    return (
      <AutoLayout
        rotation={rotation}
        effect={[
          {
            type: "drop-shadow",
            color: { r: 0, g: 0, b: 0, a: 0.1 },
            offset: { x: 0, y: 3 },
            blur: 5,
          },
        ]}
        spacing={8}
        verticalAlignItems="center"
        padding={{ left: 12, right: 12, top: 8, bottom: 8 }}
        fill="#f0f0f0"
        cornerRadius={10}
      >
        <Text tooltip={author || "No author"} fontSize={48}>
          {stamp}
        </Text>
        {message?.trim() ? (
          <AutoLayout direction="vertical" spacing={4}>
            {splitText(message.trim(), 20).map((line, index) => (
              <Text key={index} fontSize={16} fill="#555555" tooltip="Message">
                {line}
              </Text>
            ))}
          </AutoLayout>
        ) : null}
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
