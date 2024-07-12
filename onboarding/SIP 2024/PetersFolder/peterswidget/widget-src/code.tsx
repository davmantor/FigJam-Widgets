// This is a counter widget with buttons to increment and decrement the number.
const { widget } = figma
const { useSyncedState, usePropertyMenu, AutoLayout, Text, SVG, Rectangle, Frame, Input } = widget
const colors = ['FF0000', '00FF00', '00FFFF', 'FFA500', '80b1d3', '00FFFF']
const sampleData = [10, 20, 30, 40, 50, 60];
function BarGraphWidget() {
  const [data, setData] = useSyncedState('data', sampleData);
  const frame_h = 300
  const frame_w = 200
  const barWidth = 40
  const barSpacing = 60
  const barBaseY = frame_h - 30;
  const labelY = barBaseY + 10;
  const title = "Bar Graph"
  const incrementValue = (index: number) => {
    const newData = [...data];
    newData[index] += 10;
    setData(newData);
  };
  const addBar = () => {
    const newData = [...data, 100];
    setData(newData);
    console.log(data);
    console.log(newData);

  }
  return (
    <AutoLayout
    direction="vertical"
    verticalAlignItems="end"
    horizontalAlignItems={"center"}


    //horizontalAlignItems
    //direction=""
    
    >
    <Frame width={frame_w} height={frame_h}>



    </Frame>
    <AutoLayout
    verticalAlignItems="end"
    direction="horizontal"
    spacing={30}>
    
      

    <Text
        x={frame_w / 2 - 110}
        y={50}
        fontSize={16}
        fontWeight="bold"
        fill={`#00FF00`}
        >
        {title}
        </Text>
          {data.map((value, index) => (
        <>
        <AutoLayout
        horizontalAlignItems={"end"}
        direction="vertical"
        spacing={10}
        >
         <Text fontSize={22} width={42} x={barSpacing * index + 20} horizontalAlignText={'center'} y={barBaseY - value - 50}>
        {value}
      </Text>
      <Rectangle
      key={`bar-${index}`}
      x={barSpacing * index + 20}
      y={barBaseY - value - 20}
      width={barWidth}
      height={value}
      fill={`#${colors[index % colors.length]}`}
      />
      <SVG
      src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="15" fill="white"/>
      <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="black" fill-opacity="0.8"/>
      <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
      </svg>`}
      key={`plus-${index}`}
      x={barSpacing * index + 26}
      y={barBaseY + 2}
      onClick={() => {
        incrementValue(index)
      }}
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