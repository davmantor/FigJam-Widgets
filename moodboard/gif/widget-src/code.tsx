const { widget } = figma
const { AutoLayout, Text, Input, useStickable, useWidgetNodeId, useSyncedState, waitForTask } = widget

const TENOR_API_KEY = "AIzaSyABOoQRf8M5Al8q_lMfoo3tEgYsUUiY-ik";

interface TenorGIF {
  url: string;
  duration: number;
  preview: string;
  dims: [number, number];
  size: number;
}

function Widget() {
  const widgetId = useWidgetNodeId();

  const createGIF = async (gif: TenorGIF) => {
    if (!gif) return;
    // create image node
    const node = await figma.getNodeByIdAsync(widgetId) as WidgetNode;
    const image = await figma.createImageAsync(gif.url);
    const frame = figma.createGif(image.hash);
    frame.resize(gif.dims[0], gif.dims[1]);
    figma.currentPage.appendChild(frame);
    frame.x = node.x + node.width / 2 - frame.width / 2;
    frame.y = node.y - frame.height - 16;
  };

  const searchGIF = async (query: string) => {
    const url = `https://tenor.googleapis.com/v2/search?q=${query}&media_filter=tinygif&key=${TENOR_API_KEY}&limit=1`;
    const response = await fetch(url);
    const json = await response.json();
    const gif = json.results[0].media_formats.tinygif;
    // Must use waitForTask to prevent GIF creation from being prematurely terminated by Figma
    waitForTask(createGIF(gif));
  }

  return (
  <AutoLayout stroke={{type: "solid", color: "#FFAFA3"}} strokeWidth={2} cornerRadius={10} minHeight={80} fill="#ffffff" padding={{left: 16, right: 16, top: 8, bottom: 8}} spacing={16} verticalAlignItems="center">
    <AutoLayout fill="#777" cornerRadius={5} padding={{left: 10, right: 10, top: 5, bottom: 5}} width="hug-contents" verticalAlignItems="center">
      <Text fontSize={24} fill="#fff">GIF</Text>      
    </AutoLayout>
    <AutoLayout fill="#eee" cornerRadius={20} padding={{left: 10, right: 10, top: 5, bottom: 5}} width="hug-contents" verticalAlignItems="center">
      <Input
        width={300}
        fontSize={24}
        verticalAlignText="center"
        value=""
        placeholder="Search Tenor"
        onTextEditEnd={(e) => searchGIF(e.characters)}
      />
    </AutoLayout>
  </AutoLayout>
  );
}

widget.register(Widget)
