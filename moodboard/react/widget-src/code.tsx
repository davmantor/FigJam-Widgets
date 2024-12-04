const { widget } = figma
const { AutoLayout, Text, Input, useWidgetNodeId, useSyncedState, useStickable } = widget

const REACTIONS = [
  "😄",
  "😂",
  "☹️",
  "😭",
  "😡",
  "🤔",
  "😱",
  "💀",
  "👀",
  "❗",
]

function Widget() {
  const widgetId = useWidgetNodeId();
  const [stamp, setStamp] = useSyncedState<string|null>("stamp", null);
  const [rotation, setRotation] = useSyncedState<number>("rotation", 0);
  const [author, setAuthor] = useSyncedState<string>("author", "");

  const createStamp = async (stamp: string) => {
    if (stamp === "") return;
    const node = await figma.getNodeByIdAsync(widgetId) as WidgetNode;
    const clone = node.cloneWidget({
      stamp,
      rotation: Math.random() * 16 - 8,
      author: figma.currentUser?.name || "Anonymous",
    });
    const index = REACTIONS.indexOf(stamp);
    if (index !== -1) clone.x = node.x + (node.width / REACTIONS.length * index) - 2
    clone.y = node.y - node.height;
  };

  if (stamp) {
    useStickable();
    return (
      <AutoLayout rotation={rotation} effect={[{type: "drop-shadow", color: {r: 0, g: 0, b: 0, a: 0.1}, offset: {x: 0, y: 3}, blur: 5}]} spacing={8} verticalAlignItems="center">
        <Text tooltip={author} fontSize={48}>{stamp}</Text>
      </AutoLayout>
    )
  }

  return (
  <AutoLayout stroke={{type: "solid", color: "#85E0A3"}} strokeWidth={2} cornerRadius={10} minHeight={80} fill="#ffffff" padding={{left: 16, right: 16, top: 8, bottom: 8}} spacing={8} verticalAlignItems="center">
    {
      REACTIONS.map((reaction, i) => (
        <AutoLayout key={i} effect={[{type: "drop-shadow", color: {r: 0, g: 0, b: 0, a: 0.1}, offset: {x: 0, y: 3}, blur: 5}]} onClick={() => createStamp(reaction)} cornerRadius={1000} width="hug-contents" verticalAlignItems="center">
          <Text fontSize={36}>{reaction}</Text>
        </AutoLayout>
      ))
    }
  </AutoLayout>
  );
}

widget.register(Widget)
