const { widget } = figma;
const {
  useSyncedState,
  usePropertyMenu,
  useEffect,
  AutoLayout,
  Text
} = widget;

function MyTooltipWidget() {
  // Synced states
  const [icon, setIcon]       = useSyncedState("icon", "⭐");
  const [color, setColor]     = useSyncedState("color", "#EAEAEA");
  const [size,  setSize]      = useSyncedState("size", "medium");
  const [shortLabel, setShortLabel] = useSyncedState(
    "shortLabel",
    "Click me for details!"
  );
  const [detailedInfo, setDetailedInfo] = useSyncedState(
    "detailedInfo",
    "This is the detailed text. Enter password '312cmpm15' to edit me."
  );

  function handleClick() {
    return new Promise<void>((resolve) => {
      figma.showUI(__html__, { width: 340, height: 250 });
      figma.ui.postMessage({
        type: "init",
        payload: { shortLabel, detailedInfo },
      });
    });
  }

  useEffect(() => {
    figma.ui.onmessage = (msg) => {
      if (msg.type === "closeUI") {
        figma.ui.hide();
      } else if (msg.type === "updateDetailedInfo") {
        setDetailedInfo(msg.payload.newInfo);
      } else if (msg.type === "updateShortLabel") {
        setShortLabel(msg.payload.newLabel);
      }
    };
  }, []);

  usePropertyMenu(
    [
      {
        itemType: "dropdown",
        tooltip: "Icon",
        propertyName: "icon",
        options: [
          { option: "⭐", label: "Star" },
          { option: "❤️", label: "Heart" },
          { option: "✔️", label: "Check" },
          { option: "❌", label: "Cross" },
          { option: "ℹ️", label: "Info" }
        ],
        selectedOption: icon
      },
      {
        itemType: "color-selector",
        tooltip: "Background Color",
        propertyName: "color",
        options: [
          { option: "#EAEAEA", tooltip: "Gray" },
          { option: "#FFD700", tooltip: "Gold" },
          { option: "#FFB6C1", tooltip: "Pink" },
          { option: "#ADD8E6", tooltip: "Light Blue" },
          { option: "#98FB98", tooltip: "Pale Green" },
          { option: "#FFA500", tooltip: "Orange" },
          { option: "#A020F0", tooltip: "Purple" },
          { option: "#FFFACD", tooltip: "LemonChiffon" }
        ],
        selectedOption: color
      },
      {
        itemType: "dropdown",
        tooltip: "Text Size",
        propertyName: "size",
        options: [
          { option: "small",  label: "Small" },
          { option: "medium", label: "Medium" },
          { option: "large",  label: "Large" }
        ],
        selectedOption: size
      },
      {
        itemType: "action",
        tooltip: "Edit Label",
        propertyName: "edit-label"
      }
    ],
    (e) => {
      if (e.propertyName === "icon") {
        setIcon(e.propertyValue as string);
      } else if (e.propertyName === "color") {
        setColor(e.propertyValue as string);
      } else if (e.propertyName === "size") {
        setSize(e.propertyValue as string);
      } else if (e.propertyName === "edit-label") {
        // Show ephemeral UI for editing the short label
        figma.showUI(__html__, { width: 300, height: 140 });
        figma.ui.postMessage({
          type: "editLabel",
          payload: { currentLabel: shortLabel },
        });
        return new Promise(() => {});
      }
    }
  );

  // Convert size string to a number
  let fontSize = 16;
  if (size === "small")  fontSize = 12;
  if (size === "medium") fontSize = 16;
  if (size === "large")  fontSize = 20;

  // A simple trick to add left padding if icon == "ℹ️"
  return (
    <AutoLayout
      fill={color}
      cornerRadius={8}
      padding={12}
      spacing={8}
      onClick={handleClick}
    >
      {icon === "ℹ️" ? (
        // If "ℹ️" icon, wrap in a small AutoLayout that has extra left padding
        <AutoLayout padding={{ left: 8 }}>
          <Text fontSize={fontSize}>{icon}</Text>
        </AutoLayout>
      ) : (
        <Text fontSize={fontSize}>{icon}</Text>
      )}
      <Text fontSize={fontSize}>{shortLabel}</Text>
    </AutoLayout>
  );
}

widget.register(MyTooltipWidget);
