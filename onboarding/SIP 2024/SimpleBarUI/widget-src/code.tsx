const { widget } = figma // Import necessary modules from Figma widget API
const { useSyncedState, usePropertyMenu, AutoLayout, Text, SVG, Rectangle, Frame, Input } = widget // Destructure components from the widget module

const SampleData = [10, 50, 23, 48, 38, 14]; // Sample data for the bar heights
const colors = ["8dd3c7", "ffffb3", "bebada", "fb8072", "80b1d3", "fdb462"]; // Colors for each bar
const labels = ["Bar 1", "Bar 2", "Bar 3", "Bar 4", "Bar 5", "Bar 6"]; // Labels for each bar

function BarGraphWidget() {
  const [data, setData] = useSyncedState("data", SampleData); // Use synced state to manage the bar data (in case we decide to change it)

  // Define key variables
  const frameWidth = 400;
  const frameHeight = 400;
  const barWidth = 40;
  const barSpacing = 60;
  const barBaseY = frameHeight - 60; // Position from the bottom of the frame for each bar
  const labelY = barBaseY + 10; // Y-coordinate for the labels
  const buttonY = labelY + 20 // Y-coordinate for the buttons
  const title = "Some title for the graph"

  // Function to handle button click
  const handleIncrement = (index: number) => {
    const newData = [...data];
    newData[index] += 10; // Increment the value by 10
    setData(newData); // Update the state with the new data
  };

  return (
    <Frame width={frameWidth} height={frameHeight}>
      <Text
        x={frameWidth / 2 - 110} // Centering the title (approximation)
        y={20} // Positioning the title near the top
        fontSize={16}
        fontWeight="bold"
      >
        {title} {/* Display the title text */}
      </Text>
      {data.map((value, index) => ( // Iterate over the data to create bars and labels
        <>
          <Text
            key={`value-${index}`} // Unique key for each value label
            x={barSpacing * index + 30} // X-coordinate for each value label
            y={barBaseY - value - 20} // Y-coordinate for each value label above the bar
            fontSize={12}
          >
            {value}
          </Text>
          <Rectangle
            key={`bar-${index}`} // Unique key for each bar
            x={barSpacing * index + 20} // X-coordinate for each bar with some padding on the left
            y={barBaseY - value} // Y-coordinate for each bar based on its value
            width={barWidth}
            height={value} // Height of the bar based on its value
            fill={`#${colors[index]}`} // Fill color for the bar
          />
          <Text
            key={`label-${index}`} // Unique key for each label
            x={barSpacing * index + 25} // X-coordinate for each label
            y={labelY} // Y-coordinate for each label
            fontSize={12}
          >
            {labels[index]}
          </Text>
          <SVG
            key={`button-${index}`} // Unique key for each button
            src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="30" rx="15" fill="white"/>
                    <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="black" fill-opacity="0.8"/>
                    <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
                  </svg>`}
            x={barSpacing * index + 30} // X-coordinate for each button
            y={buttonY} // Y-coordinate for each button
            width={20}
            height={20}
            onClick={() => handleIncrement(index)} // Increment the bar value on click
          />
        </>
      ))}
    </Frame>
  );
}

widget.register(BarGraphWidget) // Register the widget with Figma
