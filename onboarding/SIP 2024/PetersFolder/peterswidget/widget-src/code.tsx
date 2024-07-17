// This is a counter widget with buttons to increment and decrement the number.
const { widget } = figma
const { useSyncedState, usePropertyMenu, AutoLayout, Text, SVG, Rectangle, Frame, Input } = widget
//const colors = ['FF0000', '00FF00', '00FFFF', 'FFA500', '80b1d3', '00FFFF']
const colors = ["rgba(0.2, 0.2, 0.2, 0.5)"];
const alternateColors = []
//rgb(x, y, z)
//make separate variables for x, y, z
//
interface Color {
  r: number
  g: number
  b: number
  a: number

}
const myColor: Color = { r: 0.5, g: 0.5, b: 0.5, a: 1.0 };

const sampleData = [10, 20, 30, 40, 50, 60];

/*
const rgbColors = colors.map(hex => {
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
});
*/
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
  const decrementValue = (index: number) => {
    const nData = [...data];
    nData[index] -= 10;
    if (nData[index] < 0){
      nData[index] = 0;
    }

    setData(nData);
  };
  const addBar = () => {
    const newData = [...data, 100];
    setData(newData);
    console.log(data);
    console.log(newData);

  }

  console.log(`${colors[0]}`)
  return (
    <AutoLayout
    direction="vertical"
    verticalAlignItems="end"
    horizontalAlignItems={"center"}>

    <AutoLayout
    verticalAlignItems="end"
    direction="horizontal"
    spacing={10}>
      <Text
        x={frame_w / 2 - 110}
        y={50}
        fontSize={18}
        fontWeight="bold"
      > 
        {title}
        </Text>
          {data.map((value, index) => (
        <>
        <AutoLayout

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
      height={value + 0.01}
      //fill={`#${colors[index % colors.length]}`}

      fill={myColor}
  
      
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
        //console.log(rgbColors[index])
      }}
    ></SVG>
    <SVG
    src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="30" rx="15" fill="white"/>
        <rect x="7.5" y="14.0625" width="15" height="1.875" fill="black" fill-opacity="0.8"/>
        <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
        </svg>`}
        key={`minus-${index}`}
        x={barSpacing * index + 26}
        y={barBaseY + 2}
        onClick={() => {
          decrementValue(index)
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