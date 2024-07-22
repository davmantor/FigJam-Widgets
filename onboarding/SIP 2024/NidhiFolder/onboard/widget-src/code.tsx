// Simple widget to display some data as a vertical bar graph
// No interactivity or labels
 
const { widget } = figma // Import necessary modules from Figma widget API
const { useSyncedState, usePropertyMenu, AutoLayout, Text, SVG, Rectangle, Frame, Input} = widget // Destructure components from the widget module

const SampleData = [10, 20, 30, 40, 50, 60]; // Sample data for the bar heights
const colors = ["8dd3c7", "ffffb3", "bebada", "fb8072", "80b1d3", "fdb462"]; // Colors for each bar

function BarGraphWidget() {
  const [data, setData] = useSyncedState('data', SampleData); // Use synced state to manage the bar data (in case we decide to change it)

  // Define key variables
  const frameWidth = 1000;
  const frameHeight = 200;
  const barWidth = 40;
  const barSpacing = 60;
  const barBaseY = frameHeight - 30; // Position from the bottom of the frame for each bar
  const labelY = barBaseY + 8; // Y-coordinate for the labels
  const title = "Bar Graph"
  const incrementValue = (index: number) => {
    const newData = [...data];
    newData[index] += 10;
    setData(newData);

   

  };
  const addBar = () => { 
    const newData = [...data, 50];
    setData(newData);
    console.log(data); 
  }

  const decrementValue = (index: number) => {
    const nData = [...data];
    nData[index] -= 10;
    if (nData[index] < 0) {
      nData[index] = 0;
    }
    setData(nData);
  };

  
  return (
    <AutoLayout
    direction="vertical"
    verticalAlignItems="end"
    horizontalAlignItems={"center"}
    >
    <AutoLayout
        horizontalAlignItems={"end"}
        direction="vertical"
        spacing={1}
        >
      <Text>{title}</Text>
    </AutoLayout>

    <Frame width={frameWidth} height={frameHeight}>

    </Frame>
    <AutoLayout
    verticalAlignItems="end"
    direction="horizontal"
    spacing={30}>


 
      {/* <Text
        x={frameWidth / 2 - 110} // Centering the title (approximation)
        y={50} // Positioning the title near the top
        fontSize={16}
        fontWeight="bold"
        fill={`#00FF00`}
      >
      </Text> */}
        {data.map((value, index) => ( // Iterate over the data to create bars and labels
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
          key={`bar-${index}`} // Unique key for each bar
          x={barSpacing * index + 20} // X-coordinate for each bar with some padding on the left
          y={barBaseY  - value - 20} // Y-coordinate for each bar based on its value
          width={barWidth}
          height={value} // Height of the bar based on its value
          fill={`#${colors[index % colors.length]}`} // Fill color for the bar
      />
           <SVG
              src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="30" height="30" rx="15" fill="white"/>
              <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="black" fill-opacity="0.8"/>
              <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
              </svg>`}
              key={`plus-${index}`}
              x = {barSpacing * index + 10} 
              y = {barBaseY+30} 
             width= {30} 
              height= {30}  
              onClick={() => {
                incrementValue(index)
                  //setCount(count + 1)
              }}
            />
<SVG
      src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="30" height="30" rx="15" fill="white"/>
                        <rect x="7.5" y="14.0625" width="15" height="1.875" fill="black" fill-opacity="0.8"/>
                        <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
                      </svg>`}
                key={`minus-${index}`}
                x={barSpacing * index + 26}
                y={barBaseY + 2}
                onClick={() => decrementValue(index)}
              />

        <Text
            key={`label-${index}`} // Unique key for each label
            x={barSpacing * index + 25} // X-coordinate for each label
            y={labelY-20} // Y-coordinate for each label
            fontSize={12}
          >   

            Bar {index + 1} 
            
            
          </Text>
          </AutoLayout>
          </>
      ))}

{ <SVG
      src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="30" rx="15" fill="white"/>
      <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="black" fill-opacity="0.8"/>
      <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
      </svg>`}
      onClick={addBar}
    ></SVG> }
       </AutoLayout>
    </AutoLayout>
  )
}
widget.register(BarGraphWidget)
