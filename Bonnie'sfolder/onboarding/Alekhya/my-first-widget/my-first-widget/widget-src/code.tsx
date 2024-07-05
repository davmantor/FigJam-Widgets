const { widget } = figma
const { useSyncedState, usePropertyMenu, AutoLayout, Text, SVG, Rectangle, Frame, Input } = widget

const sampleData = [10, 20, 30, 40, 50]
const colors = ['#FF5733', '#FFBD33', '#33FF57', '#337DFF', '#7D33FF']
const labels = ["Input1", "Input2", "Input3", "Input4", "Input5"]

const maxFrameWidth = 1000
const frame_h = 500

var bar_x = 140
const bar_y = 350
const label_x = 15
const label_y = 425
const frame_inc_y = 20
const add_button_x = 55
const add_button_y = 390

const SVGWidth = 30;
const inputYOffset = 40;

function BarGraphWidget() {
  const [count, setCount] = useSyncedState('count', 0);
  const [barWidth, setBarWidth] = useSyncedState('barWidth', 50);
  const [barData, setBarData] = useSyncedState('barData', sampleData);
  const [barLabels, setBarLabels] = useSyncedState('barLabels', labels);
  const [barFill, setBarFill] = useSyncedState('barFill', colors)
  const [scrollOffsetX, setScrollOffsetX] = useSyncedState('scrollOffsetX', 0)

  const setFrame = () => {
    setBarWidth(barWidth + 10)
  }

  const addBar = () => {
    const newData = [...barData, barData.length*10]; // Add a new bar with a default height of 10
    const newLabels = [...barLabels, `Input${barLabels.length + 1}`]; // Generate the new label
    const newColors = [...barFill, '#FF5733']
    setBarData(newData);
    setBarLabels(newLabels);
    setBarFill(newColors)
  };

  // Assuming barData is defined as a stateful array of numbers
  const increaseBarValue = (index: number) => {
    setBarData((currentBarData: number[]) => {
      // Ensure we're working with a fresh copy of the array to avoid direct mutation
      const newData = [...currentBarData];
      newData[index] += 10; // Safely increment the value at the specified index
      return newData; // Return the modified array to update the state
    });
  };

  const scrollLeft = () => setScrollOffsetX(prevOffset => Math.max(0, prevOffset - 50));
  const scrollRight = () => setScrollOffsetX(prevOffset => Math.min(prevOffset + 50, Math.max(0, (barData.length * bar_x) - maxFrameWidth)));

  const frameWidth = bar_x * (barData.length + 1);
  const requiredFrameWidth = bar_x * (barData.length + 100);

  return (
    <AutoLayout>
      <Frame width={Math.min(requiredFrameWidth, maxFrameWidth)} height={frame_h} overflow="hidden">
        {barData.map((value, index) => (
          <Rectangle
            key={index}
            width={barWidth}
            height={value}
            fill={barFill[index]} // Corrected from fill={colors[index]} 
            x={bar_x * index - scrollOffsetX} // Hypothetical application of scrollOffsetX
            y={bar_y - value} // Adjust the y position to place bars at the bottom
            hoverStyle={{
              
            }}
          />      
        ))}
        {barData.map((value, index) => (
          <SVG
            key={index}
            src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="30" rx="15" fill="white"/>
                    <rect x="7.5" y="13.0625" width="15" height="3.875" fill="black" fill-opacity="0.8"/>
                    <rect x="13.0625" y="7.5" width="3.875" height="15" fill="black" fill-opacity="0.8"/>
                    <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
                  </svg>`}
                  x={bar_x * index + (barWidth / 2) - (SVGWidth / 2) - scrollOffsetX}
            y = {add_button_y}
            onClick={() => increaseBarValue(index)}
          />
        ))}
        {barLabels.map((label, index) => (
            <Input
              key = {index}
              value={label}
              x={bar_x * index + (barWidth / 2) - (SVGWidth / 2) - scrollOffsetX}
              y = {add_button_y + inputYOffset}
              onTextEditEnd={(newValue) => {
                const newLabels = [...barLabels]
                newLabels[index] = newValue.characters
                setBarLabels(newLabels)
              }}
            />
        ))}
      </Frame>
      <SVG
        src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="30" height="30" fill="lightgrey"/>
              <path d="M15 7v16m-8-8h16" stroke="black" stroke-width="2"/>
            </svg>`}
        x={maxFrameWidth - 40} // Adjust this value to ensure the button's visible position
        y={10}
        onClick={addBar}
      />
      <SVG
        src={`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 19l-7-7 7-7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`}
        x={maxFrameWidth - 80} // Adjust this value as needed to position the button correctly
        y={50} // Adjust the y-position to place it right under the plus button
        onClick={scrollLeft}
      />
      <SVG
        src={`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 5l7 7-7 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`}
        x={maxFrameWidth - 40} // Adjust this value as needed to position the button correctly
        y={50} // Adjust the y-position to place it right under the plus button
        onClick={scrollRight}
      />
    </AutoLayout>           
  );
}

widget.register(BarGraphWidget)

