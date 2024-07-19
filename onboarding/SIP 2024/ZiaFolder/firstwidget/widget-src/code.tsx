// This is a counter widget with buttons to increment and decrement the number.
const { widget } = figma

const { useSyncedState, usePropertyMenu, AutoLayout, Text, SVG, Rectangle, Frame, Input } = widget
const colors = ['FF0000', '00FF00', '00FFFF', 'FFA500', '80b1d3', '00FFFF']
function BarGraphWidget() {
  const [sampleData, setSampleData] = useSyncedState('sampleData', [10, 20, 30, 40, 50, 60]);
  const frame_h = 300
  const frame_w = 600
  const barWidth = 40
  const barSpacing = 60
  const barBaseY = frame_h - 30;
  const labelY = barBaseY + 10;
  const title = "Bar Graph Widget"
  const incrementValue = (index: number) => {
    const newData = [...sampleData];
    newData[index] += 10;
    setSampleData(newData);
  };
  const addBar = () => {
    const newData = [...sampleData, 10];
    setSampleData(newData);
    console.log(sampleData);
    console.log(newData);
  }
  
  return (
    <AutoLayout
      direction="vertical"
      verticalAlignItems="end"
      horizontalAlignItems={"center"}
      padding={10}
      spacing={10} 
      width="hug-contents" 
      height="hug-contents"
    >
      <Text
        x={frame_w / 2 - 110}
        y={10}
        fontSize={16}
        fontWeight="bold"
        fill={`#00FF00`}
        >
        {title}
      </Text>
    <AutoLayout
        verticalAlignItems="end"
        direction="horizontal"
        spacing={30}
        width="hug-contents"
        >
        {sampleData.map((value, index) => (
        <>
        <AutoLayout
        horizontalAlignItems="end"
        direction="vertical"
        spacing={10}
        >
        <Text fontSize={32} width={42} x={barSpacing * index + 20} horizontalAlignText={'center'}>
        {value}
        </Text>
        <Rectangle
        key={`bar-${index}`}
        x={barSpacing * index + 20}
        y={barBaseY - value - 20}
        width={barWidth}
        height={value}
        fill={`#${colors[index]}`}
        />
        <SVG
        width={20}
        height={20}
        onClick={() => incrementValue(index)}
        src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="30" rx="15" fill="white"/>
        <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="black" fill-opacity="0.8"/>
        <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
        </svg>`}
      key={`plus-${index}`}
      x={barSpacing * index + 26}
      y={barBaseY + 2}
      ></SVG>
      <Text
        key={`label-${index}`}
        x={barSpacing * index + 25}
        y={labelY - 20}
        fontSize={12}
        >
        input {index + 1}
      </Text>
      </AutoLayout>
      </>
        ))}
              <SVG
    src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="30" height="30" rx="15" fill="white"/>
    <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="black" fill-opacity="0.8"/>
    <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
    </svg>`}
    onClick={addBar}
    ></SVG>
  </AutoLayout>
  </AutoLayout>
  )
}
widget.register(BarGraphWidget)