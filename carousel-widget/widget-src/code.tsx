const { widget } = figma;
const {
  AutoLayout,
  Input,
  SVG,
  useSyncedMap,
  useSyncedState,
  usePropertyMenu
} = widget;

const buttonSrc = `
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="16" r="15.5" stroke="black" stroke-opacity="0.1" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17 8H15V15H8V17H15V24H17V17H24V15H17V8Z" fill="black" fill-opacity="0.8"/>
  </svg>
`;

const downIconSrc = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.08 0.079998H9.08L9.08 12.08L14.58 6.58L16 8L8.08 15.92L0.160004 8L1.58 6.58L7.08 12.08L7.08 0.079998Z" fill="white"/>
  </svg>
`;

const upIconSrc = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.08001 15.92L7.08001 15.92L7.08001 3.92002L1.58001 9.42002L0.160007 8.00002L8.08001 0.0800171L16 8.00002L14.58 9.42002L9.08001 3.92002L9.08001 15.92Z" fill="white"/>
  </svg>
`;

function numToIndices(num: number): number[] {
  return new Array(num).fill(0).map((_, i) => i);
}

function Table() {
  const cells = useSyncedMap<string>("cells");
  const [numRows, setRows] = useSyncedState('rows', 0);
  const [index, setIndex] = useSyncedState('index', 0);
  const [boxesPerSlide, setBoxesPerSlide] = useSyncedState('boxesPerSlide', 3);

  const propertyMenu: WidgetPropertyMenuItem[] = [
    {
      tooltip: 'Increment',
      propertyName: 'increment',
      itemType: 'action',
      icon: upIconSrc,
    },
    {
      tooltip: 'Card Count: ' + numRows,
      propertyName: 'count',
      itemType: 'action',
    },
    {
      tooltip: 'Card #: ' + (index + 1),
      propertyName: 'index',
      itemType: 'action',
    },
    {
      tooltip: 'Decrement',
      propertyName: 'decrement',
      itemType: 'action',
      icon: downIconSrc,
    }
  ];

  usePropertyMenu(propertyMenu, ({ propertyName }) => {
    if (propertyName === 'decrement' && numRows > 1) {
      setRows(numRows - boxesPerSlide);
    } else if (propertyName === 'increment') {
      setRows(numRows + boxesPerSlide);
    }
  });

  return (
    <AutoLayout
      cornerRadius={3}
      direction="horizontal"
      fill="#FFFFFF"
      height="hug-contents"
      horizontalAlignItems="center"
      padding={8}
      spacing={12}
      stroke="#000"
      verticalAlignItems="center"
    >
      <SVG
        src={buttonSrc}
        onClick={() => {
          setIndex(Math.max(index - 1, 0));
        }}
      />
      {numToIndices(numRows)
  .slice(index * boxesPerSlide, (index + 1) * boxesPerSlide)
  .map((_, idx) => {
    const cellKey = `cell-${index * boxesPerSlide + idx}`;
    const cellContents = cells.get(cellKey) || "";
    return (
      <AutoLayout
        key={cellKey}
        cornerRadius={3}
        direction="vertical"
        fill="#fff"
        stroke="#000"
        padding={8}
        height="hug-contents"
      >
        <AutoLayout
          padding={{ top: 10, bottom: 10, left: 0, right: 0 }}
          height="hug-contents"
        >
          <Input
            onTextEditEnd={(e) => cells.set(cellKey, e.characters)}
            placeholder="Edit me..."
            value={cellContents}
            fontSize={14}
          />
        </AutoLayout>
      </AutoLayout>
    );
})}

      <SVG
        src={buttonSrc}
        onClick={() => {
          setIndex(Math.min(index + 1, Math.ceil(numRows / boxesPerSlide) - 1));
        }}
      />
    </AutoLayout>
  );
}

widget.register(Table);
