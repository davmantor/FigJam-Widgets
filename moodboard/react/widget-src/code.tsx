const { widget } = figma;
const {
  AutoLayout,
  Text,
  useWidgetNodeId,
  useSyncedState,
  useStickable,
<<<<<<< HEAD
=======
  useEffect,
>>>>>>> main
  usePropertyMenu,
} = widget;

const REACTIONS = ["😄", "😂", "☹️", "😭", "😡", "🤔", "😱", "💀", "👀", "❗"];
<<<<<<< HEAD

const adminIcon = `
  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M3 8L4.44293 16.6576C4.76439 18.5863 6.43315 20 8.38851 20H15.6115C17.5668 20 19.2356 18.5863 19.5571 16.6576L21 8M3 8L6.75598 11.0731C7.68373 11.8321 9.06623 11.6102 9.70978 10.5989L12 7M3 8C3.82843 8 4.5 7.32843 4.5 6.5C4.5 5.67157 3.82843 5 3 5C2.17157 5 1.5 5.67157 1.5 6.5C1.5 7.32843 2.17157 8 3 8ZM21 8L17.244 11.0731C16.3163 11.8321 14.9338 11.6102 14.2902 10.5989L12 7M21 8C21.8284 8 22.5 7.32843 22.5 6.5C22.5 5.67157 21.8284 5 21 5C20.1716 5 19.5 5.67157 19.5 6.5C19.5 7.32843 20.1716 8 21 8ZM12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7Z" stroke="#000000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
  </svg>
`;
=======
const RANDOM_OFFSET = 32;

const PENCIL_ICON = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="var(--figma-color-icon-onbrand-secondary, rgba(255, 255, 255, .8))"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>`;
>>>>>>> main

function Widget() {
  const widgetId = useWidgetNodeId();
  const [stamp, setStamp] = useSyncedState("stamp", null);
  const [rotation, setRotation] = useSyncedState("rotation", 0);
<<<<<<< HEAD
  const [author, setAuthor] = useSyncedState("author", null);
  const [message, setMessage] = useSyncedState("message", null);
  const [revealName, setRevealName] = useSyncedState("revealName", false);
  const [isNew, setIsNew] = useSyncedState("isNew", true);
  const [hiddenAuthor, setHiddenAuthor] = useSyncedState("hiddenAuthor", "");

  // Configurable emoji and text sizes
  const [emojiSize, setEmojiSize] = useSyncedState("emojiSize", 48);
  const [textSize, setTextSize] = useSyncedState("textSize", 16);

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
          author: hiddenAuthor || "Unknown Author",
        });

        figma.ui.onmessage = (data) => {
          if (data.type === "textSubmit" && data.value) {
            setMessage(data.value.trim());
            setRevealName(data.reveal);
          }
          figma.closePlugin();
          resolve();
        };
      });
    }

    if (propertyName === "configureSettings") {
      openSettingsPopup();
    }
  });

  const openSettingsPopup = () => {
    return new Promise((resolve) => {
        figma.showUI(__uiFiles__.optionsChat, { width: 400, height: 165 });

        // Send the current emoji size and text size to the UI
        figma.ui.postMessage({
            emojiSize,
            textSize,
        });

        figma.ui.onmessage = (data) => {
            if (data.type === "updateSettings") {
                setEmojiSize(data.emojiSize);
                setTextSize(data.textSize);
            }
            figma.closePlugin();
            resolve(); // Ensure the promise is resolved to keep the widget running
        };
    });
};

  

const cloneStamp = async (reaction) => {
  try {
    const currentUser = figma.currentUser?.name || "Unknown User";

    const node = await figma.getNodeByIdAsync(widgetId);
    if (node && node.type === "WIDGET") {
      const clone = node.cloneWidget({
        stamp: reaction,
        rotation: Math.random() * 16 - 8, // Random rotation
        author: "",
        hiddenAuthor: currentUser || "Unknown User",
        message: message || "",
        revealName: revealName,
        isNew: true,
      });

      if (clone && node.width) {
        const index = REACTIONS.indexOf(reaction);

        // Introduce a random offset to prevent stacking
        const randomXOffset = (Math.random() - 0.5) * 200; // Random X offset between -20 and 20
        const randomYOffset = (Math.random() - 0.5) * 200; // Random Y offset between -20 and 20

        clone.x = node.x + (node.width / REACTIONS.length) * index - 2 + randomXOffset;
        clone.y = node.y - node.height + randomYOffset;
      }
    }
  } catch (error) {
    console.error("Error cloning stamp:", error);
  }
};

  const handleClick = () => {
    setIsNew(false);
  };

  if (stamp) {
    useStickable();
    return (
      <AutoLayout
        rotation={rotation}
=======
  const [author, setAuthor] = useSyncedState<string | null>("author", null);
  const [showAuthor, setShowAuthor] = useSyncedState("showAuthor", false);
  const [message, setMessage] = useSyncedState<string | null>("message", null);

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
          showAuthor: false,
          message: message || "",
        });

        if (clone && node.width) {
          const index = REACTIONS.indexOf(reaction);
          // transform absolutely (x and y will use relative transforms to parent, which produces incorrect results)
          clone.x =
            node.absoluteTransform[0][2] +
            (node.width / REACTIONS.length) * index -
            2 +
            (Math.random() * RANDOM_OFFSET - RANDOM_OFFSET / 2);
          clone.y =
            node.absoluteTransform[1][2] -
            node.height +
            (Math.random() * RANDOM_OFFSET - RANDOM_OFFSET / 2);
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
        tooltip: "Show Author",
        propertyName: "showAuthor",
        isToggled: showAuthor,
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

    useEffect(() => {
      console.log("Stamp mounted");
      try {
        figma.showUI(__html__, { width: 400, height: 100 });
        console.log("Stamp mounted 2");

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
        };
      } catch (e) {
        console.error("Error mounting stamp:", e);
      }
    });

    usePropertyMenu(propertyMenuItems, async ({ propertyName }) => {
      if (author && figma.currentUser?.name !== author) {
        figma.notify("You can't edit someone else's reaction.");
        return;
      }
      if (propertyName === "editText") {
        return new Promise((resolve) => {
          figma.showUI(__html__, { width: 400, height: 100 });

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
        setShowAuthor(!showAuthor);
      }
    });

    useStickable();
    return (
      <AutoLayout
        rotation={
          message
            ? rotation / ((Math.min(message.length, 50) + 20) / 25)
            : rotation
        }
>>>>>>> main
        effect={[
          {
            type: "drop-shadow",
            color: { r: 0, g: 0, b: 0, a: 0.1 },
            offset: { x: 0, y: 3 },
            blur: 5,
          },
        ]}
<<<<<<< HEAD
        spacing={8}
        verticalAlignItems="center"
        padding={{ left: 12, right: 12, top: 8, bottom: 8 }}
        fill="#f0f0f0"
        cornerRadius={10}
        stroke={isNew ? { type: "solid", color: "#FF0000" } : null}
        strokeWidth={isNew ? 3 : 0}
        onClick={handleClick}
      >
        <Text tooltip={revealName ? hiddenAuthor || "No author" : author || "No author"} fontSize={emojiSize}>
          {stamp}
        </Text>
        {message?.trim() ? (
          <AutoLayout direction="vertical" spacing={4}>
            <Text fontSize={textSize} fill="#555555" tooltip="Message">
              {message.trim()}
            </Text>
            {revealName && hiddenAuthor ? (
              <Text fontSize={textSize * 0.75} fill="#777777" tooltip={hiddenAuthor}>
                - {hiddenAuthor}
              </Text>
            ) : null}
          </AutoLayout>
        ) : null}
=======
        verticalAlignItems="center"
        fill={!!message ? "#f0f0f0" : ""}
        cornerRadius={{
          topLeft: 48,
          topRight: 32,
          bottomLeft: 48,
          bottomRight: 32,
        }}
      >
        <Text
          tooltip={showAuthor ? author || "No author" : undefined}
          fontSize={48}
        >
          {stamp}
        </Text>
        {!!message && (
          <AutoLayout
            direction="vertical"
            maxWidth={300}
            width="hug-contents"
            padding={{ top: 4, bottom: 4, left: 4, right: 12 }}
          >
            <Text fill="#444" width="fill-parent">
              {message}
            </Text>
            {!!author && showAuthor && (
              <Text fill="#999" fontSize={8} width="fill-parent">
                {author}
              </Text>
            )}
          </AutoLayout>
        )}
>>>>>>> main
      </AutoLayout>
    );
  }

  return (
    <AutoLayout
      stroke={{ type: "solid", color: "#85E0A3" }}
      strokeWidth={2}
      cornerRadius={10}
<<<<<<< HEAD
      minHeight={100}
=======
      minHeight={80}
>>>>>>> main
      fill="#ffffff"
      padding={{ left: 16, right: 16, top: 8, bottom: 8 }}
      spacing={8}
      verticalAlignItems="center"
<<<<<<< HEAD
      direction="vertical"
    >
      <AutoLayout spacing={8}>
      {REACTIONS.map((reaction, index) => (
=======
    >
      {REACTIONS.map((reaction) => (
>>>>>>> main
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
<<<<<<< HEAD
          onClick={() => {
            if (index === REACTIONS.length - 1) {
              return openSettingsPopup(); // Return promise for settings ⚙️
            } else {
              cloneStamp(reaction);
            }
          }}
=======
          onClick={() => cloneStamp(reaction)}
>>>>>>> main
          cornerRadius={1000}
          width="hug-contents"
          verticalAlignItems="center"
        >
<<<<<<< HEAD
          <Text fontSize={emojiSize}>{reaction}</Text>
        </AutoLayout>
      ))}
    </AutoLayout>



      
    </AutoLayout>
=======
          <Text fontSize={36}>{reaction}</Text>
        </AutoLayout>
      ))}
    </AutoLayout>
>>>>>>> main
  );
}

widget.register(Widget);
