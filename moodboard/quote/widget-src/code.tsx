const { widget } = figma
const { AutoLayout, Text, Input, useWidgetNodeId, useSyncedState } = widget

function Widget() {
  const widgetId = useWidgetNodeId();
  const [quote, setQuote] = useSyncedState<string|null>("quote", null);

  const createQuote = async (quote: string) => {
    if (quote === "") return;
    const node = await figma.getNodeByIdAsync(widgetId) as WidgetNode;
    const clone = node.cloneWidget({ quote });
    clone.y = node.y - clone.height - 16;
  };

  if (quote) {
    return (
      <AutoLayout effect={[{type: "drop-shadow", color: {r: 0, g: 0, b: 0, a: 0.1}, offset: {x: 0, y: 3}, blur: 5}]} maxWidth={700} minHeight={80} fill="#FFD966" padding={{left: 16, right: 16, top: 8, bottom: 8}} spacing={8} verticalAlignItems="center">
        <AutoLayout height={48} verticalAlignItems="start">
          <Text fontSize={64} fontFamily="Lora">“</Text>      
        </AutoLayout>
        <Text width="fill-parent" fontSize={24} fontFamily="Lora">{quote}</Text>
        <AutoLayout height={48} verticalAlignItems="start">
          <Text fontSize={64} fontFamily="Lora">”</Text>      
        </AutoLayout>
      </AutoLayout>
    )
  }

  return (
  <AutoLayout stroke={{type: "solid", color: "#FFD966"}} strokeWidth={2} cornerRadius={10} minHeight={80} fill="#ffffff" padding={{left: 16, right: 16, top: 8, bottom: 8}} spacing={16} verticalAlignItems="center">
    <AutoLayout height={48} verticalAlignItems="start">
      <Text fontSize={64} fontFamily="Lora">“</Text>      
    </AutoLayout>
    <AutoLayout fill="#eee" cornerRadius={20} padding={{left: 10, right: 10, top: 5, bottom: 5}} width="hug-contents" verticalAlignItems="center">
      <Input
        width={400}
        fontSize={24}
        verticalAlignText="center"
        value=""
        placeholder="Type your quote here"
        onTextEditEnd={(e) => createQuote(e.characters)}
      />
    </AutoLayout>
    <AutoLayout height={48} verticalAlignItems="start">
      <Text fontSize={64} fontFamily="Lora">”</Text>      
    </AutoLayout>
  </AutoLayout>
  );
}

widget.register(Widget)
