const { widget } = figma;
const { Frame, AutoLayout, Text, useSyncedState, SVG } = widget;

function ScrollableFrame() {
  const [scrollY, setScrollY] = useSyncedState("scrollY", 0);
  const visibleHeight = 500;
  const itemHeight = 30;
  const totalItems = 30;
  const contentHeight = totalItems * itemHeight;
  const maxScrollY = contentHeight - visibleHeight;

  const handleScrollUp = () => {
    setScrollY((prev) => Math.max(prev - 100, 0));
  };

  const handleScrollDown = () => {
    setScrollY((prev) => Math.min(prev + 100, maxScrollY));
  };

  const upArrow = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="M12 2l-10 10h6v10h8v-10h6z"/>
    </svg>
  `;

  const downArrow = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="M12 22l10-10h-6v-10h-8v10h-6z"/>
    </svg>
  `;

  return (
    <Frame
      name="Container"
      width={340}
      height={visibleHeight}
      overflow="hidden"
    >
      <Frame
        name="Scrollable Frame"
        width={300}
        height={visibleHeight}
        overflow="hidden"
      >
        <Frame
          name="Content"
          x={0}
          y={-scrollY}
          width={300}
          height={contentHeight}
        >
          {Array.from({ length: totalItems }).map((_, index) => (
            <Text key={index} y={index * itemHeight}>
              {`Item ${index + 1}`}
            </Text>
          ))}
        </Frame>
      </Frame>
      <AutoLayout
        name="Scroll Bar"
        direction="vertical"
        width={40}
        height="fill-parent"
        x={300}
        y={0}
      >
        <AutoLayout
          width={40}
          height={visibleHeight / 2}
          fill="#ddd"
          onClick={handleScrollUp}
          horizontalAlignItems="center"
          verticalAlignItems="center"
        >
          <SVG src={upArrow} />
        </AutoLayout>
        <AutoLayout
          width={40}
          height={visibleHeight / 2}
          fill="#ddd"
          onClick={handleScrollDown}
          horizontalAlignItems="center"
          verticalAlignItems="center"
        >
          <SVG src={downArrow} />
        </AutoLayout>
      </AutoLayout>
    </Frame>
  );
}

widget.register(ScrollableFrame);
