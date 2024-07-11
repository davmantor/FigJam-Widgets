const { widget } = figma; // Import necessary modules from Figma widget API
const { useSyncedState, AutoLayout, Text, SVG, Rectangle } = widget; // Get the specific components we need from the widget API

const SampleData = [10, 50, 23, 48, 38, 14]; // Sample data for the bar heights
const colors = ['8dd3c7', 'ffffb3', 'bebada', 'fb8072', '80b1d3', 'fdb462']; // Colors for each bar

// This function creates the Bar Graph widget
function BarGraphWidget() {
  const [data, setData] = useSyncedState('data', SampleData); // Create a state for the bar data that can be updated

  const barWidth = 40;
  const title = 'Some title for the graph';

  // Function to increase the value of a specific bar
  const handleIncrement = (index: number) => {
    console.log('Log--Increment button clicked for bar index:', index); // Log the index of the bar being incremented
    const newData = [...data]; // Copy the current bar data
    newData[index] += 10; // Increase the value of the selected bar by 10
    console.log('Log--New data after increment:', newData); // Log the updated bar data
    setData(newData); // Update the state with the new bar data
  };

  // Function to add a new bar to the graph
  const handleAddBar = () => {
    console.log('Log--Add bar button clicked'); // Log when the add bar button is clicked
    const newData = [...data, 10]; // Add a new bar with default value of 10
    console.log('Log--New data after adding a bar:', newData); // Log the new data array
    setData(newData); // Update the state with the new data
  };

  console.log('Log--Rendering BarGraphWidget with data:', data); // Log the data being used to render the widget
  console.log('\nLog--');

  return (
    // Create a vertical layout to arrange items in a column
    <AutoLayout
      direction="vertical"
      horizontalAlignItems="center"
      padding={10} // Add space around items
      spacing={10} // Add space between items
      width="hug-contents" // Make the width fit the content
      height="hug-contents" // Make the height fit the content
    >
      <Text fontSize={16} fontWeight="bold">
        {title}
      </Text>
      <AutoLayout
        direction="horizontal"
        spacing={20}
        verticalAlignItems="end"
        width="hug-contents"
      >
        {data.map((value, index) => (
          // Create a vertical layout for each bar and its label/button
          <AutoLayout
            key={index} // Give each bar a unique key
            direction="vertical"
            horizontalAlignItems="center"
            spacing={10} // Add space between items
            verticalAlignItems="end" // Align items to the bottom
          >
            <Text fontSize={12}>{value}</Text>
            <Rectangle
              width={barWidth}
              height={value}
              fill={`#${colors[index % colors.length]}`} // Cycle through colors
            />
            <Text fontSize={12}>{`Bar ${index + 1}`}</Text>
            <SVG
              src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="30" rx="15" fill="white"/>
                    <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="black" fill-opacity="0.8"/>
                    <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
                  </svg>`} // SVG graphic for the increment button
              width={30} // Set the width of the button
              height={30} // Set the height of the button
              onClick={() => handleIncrement(index)} // Call handleIncrement when the button is clicked
            />
          </AutoLayout>
        ))}
        <SVG
          src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="30" height="30" rx="15" fill="white"/>
                <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="black" fill-opacity="0.8"/>
                <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
              </svg>`} // SVG graphic for the add bar button
          width={30} // Set the width of the button
          height={30} // Set the height of the button
          onClick={handleAddBar} // Call handleAddBar when the button is clicked
        />
      </AutoLayout>
    </AutoLayout>
  );
}

// Register the BarGraphWidget to be used in Figma
widget.register(BarGraphWidget);
