const { widget } = figma 
const { useSyncedState,  Text, SVG, Rectangle, Frame} = widget 

const SampleData = [10, 50, 23, 48, 38, 14]; 
const colors = ["8dd3c7", "ffffb3", "bebada", "fb8072", "80b1d3", "fdb462"]; 
const labels = ["Bar 1", "Bar 2", "Bar 3", "Bar 4", "Bar 5", "Bar 6"]; 
const X_BAR = 50
const Y_BAR = 100

const ADD_BUTTON_X = 150;
const ADD_BUTTON_Y = 20;

function BarGraphWidget() {
  const [data] = useSyncedState("data", SampleData); 
  const frameWidth = 400;
  const frameHeight = 200;
  const barWidth = 40;
  const barSpacing = 60;
  const barBaseY = frameHeight - 30; 
  const labelY = barBaseY + 10; 
  const title = "barchart"
  const [count, setCount] = useSyncedState('count', 0)
 
 

  return (
    <Frame width={frameWidth} height={frameHeight}>
      <Text
        x={frameWidth / 2 - 110} 
        y={20} 
        fontSize={16}
        fontWeight="bold"
      >
        {title} 
      </Text>
      {data.map((value, index) => ( 
        <>

     
      
    
      
      <Text fontSize={32} width={42} horizontalAlignText={'center'}>
        {count}
      </Text>
      <SVG
        src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="30" rx="15" fill="white"/>
        <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="black" fill-opacity="0.8"/>
        <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
        </svg>`}
        onClick={() => {
          setCount(count + 1)
        }}
      ></SVG>
   
  
    
          <Rectangle
            key={`bar-${index}`} 
            x={barSpacing * index + 20} 
            y={barBaseY - value} 
            width={barWidth}
            height={value}
            fill={`#${colors[index]}`} 
            rotation={180}
          />
          <Text
            key={`label-${index}`} 
            x={barSpacing * index + 25} 
            y={labelY}
            fontSize={12}
          >
            {labels[index]}
          </Text>
        </>
      ))}
    </Frame>
  );
}

widget.register(BarGraphWidget)





