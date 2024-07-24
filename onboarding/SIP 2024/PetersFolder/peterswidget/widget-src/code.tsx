// This is a counter widget with buttons to increment and decrement the number.
const { widget } = figma;
const { useSyncedState, AutoLayout, Text, SVG, Rectangle } = widget;

interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

const colors: Color[] = [
  { r: 0.5, g: .6, b: 0, a: 1 },    
  { r: 0, g: .5, b: .6, a: 1 },      
  { r: 0.5, g: 0, b: .6, a: 1 },    
  { r: 0.5, g: 0, b: 0, a: 1 },    
  { r: 0, g: .6, b: .6, a: 1 },      
  { r: .6, g: .6, b: .6, a: 1 },    
];

function increaseColorAtIndex(array: Color[], index: number, change: number): Color {
  const proposedColor = array[index % array.length];
  const modifiedColor = {
    r: Math.min(proposedColor.r + change / 2, 1),
    g: Math.min(proposedColor.g + change / 2, 1),
    b: Math.min(proposedColor.b + change / 2, 1),
    a: proposedColor.a
  };
  console.log(modifiedColor)
  return modifiedColor;}

function decreaseColorAtIndex(array: Color[], index: number, change: number): Color {
  const proposedColor = array[index % array.length];
  const modifiedColor = {
    r: Math.max(proposedColor.r - change / 2, 0),
    g: Math.max(proposedColor.g - change / 2, 0),
    b: Math.max(proposedColor.b - change / 2, 0),
    a: proposedColor.a
  };
  console.log(modifiedColor)
  return modifiedColor;}

function BarGraphWidget() {
  const [data, setData] = useSyncedState('data', [10, 20, 30, 40, 50, 60]);

  const frame_h = 300;
  const frame_w = 200;
  const barWidth = 40;
  const barSpacing = 60;
  const barBaseY = frame_h - 30;
  const labelY = barBaseY + 10;
  const title = "Bar Graph";

  const incrementValue = (index: number) => {
    const newData = [...data];
    if (newData[index] > 90) {
      const updatedColor = increaseColorAtIndex(colors, index, 0.2); 
      colors[index % colors.length] = updatedColor;
    }
  
    if (newData[index] > 190) {
      const updatedColor = increaseColorAtIndex(colors, index, 0.2); 
      colors[index % colors.length] = updatedColor;
    }
    newData[index] += 10;
    setData(newData);
  }

  const decrementValue = (index: number) => {
    const nData = [...data];
    if (nData[index] <= 110 && nData[index] >= 100) { 
      const updatedColor = decreaseColorAtIndex(colors, index, 0.2); 
      colors[index % colors.length] = updatedColor;
    }
    if (nData[index] <= 210 && nData[index] >= 200) {
      const updatedColor = decreaseColorAtIndex(colors, index, 0.2); 
      colors[index % colors.length] = updatedColor;
    }
    if (nData[index] < 0) {
      nData[index] = 0;
    }
    nData[index] -= 10;
    setData(nData);
  }

  const addBar = () => {
    const newData = [...data, 100];
    setData(newData);
  };

  return (
    <AutoLayout direction="vertical" verticalAlignItems="end" horizontalAlignItems="center">
      <AutoLayout direction="horizontal" verticalAlignItems="end" spacing={10}>
        <Text x={frame_w / 2 - 110} y={50} fontSize={18} fontWeight="bold">
          {title}
        </Text>
        {data.map((value, index) => (
          <AutoLayout key={`bar-${index}`} direction="vertical" spacing={10}>
            <Text fontSize={22} width={42} x={barSpacing * index + 20} horizontalAlignText="center" y={barBaseY - value - 50}>
              {value}
            </Text>
            <Rectangle
              x={barSpacing * index + 20}
              y={barBaseY - value - 20}
              width={barWidth}
              height={value + 0.01}
              fill={colors[index % colors.length]}
            />
            <SVG
              src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="30" height="30" rx="15" fill="white"/>
                      <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="black" fillOpacity="0.8"/>
                      <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" strokeOpacity="0.1"/>
                    </svg>`}
              key={`plus-${index}`}
              x={barSpacing * index + 26}
              y={barBaseY + 2}
              onClick={() => incrementValue(index)}
            />
            <SVG
              src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="30" height="30" rx="15" fill="white"/>
                      <rect x="7.5" y="14.0625" width="15" height="1.875" fill="black" fillOpacity="0.8"/>
                      <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" strokeOpacity="0.1"/>
                    </svg>`}
              key={`minus-${index}`}
              x={barSpacing * index + 26}
              y={barBaseY + 2}
              onClick={() => decrementValue(index)}
            />
            <Text
              key={`label-${index}`}
              x={barSpacing * index + 25}
              y={labelY - 20}
              fontSize={12}
            >
              Input {index + 1}
            </Text>
          </AutoLayout>
        ))}
        <SVG
          src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="30" height="30" rx="15" fill="white"/>
                  <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="black" fillOpacity="0.8"/>
                  <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" strokeOpacity="0.1"/>
                </svg>`}
          onClick={addBar}
        />
        <AutoLayout direction="vertical">
                <Text fontSize={5}>
        A simple adjustable bar graph widget
        </Text>
        <Text fontSize={5}>
        Bar color changes when value is over 100 or 200
        </Text>
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(BarGraphWidget);
