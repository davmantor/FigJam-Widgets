const { widget } = figma;
const { useSyncedState, AutoLayout, Input, Text, SVG } = widget;

interface TextBoxProps {
  index: number;
  value: string;
  onValueChange: (index: number, newValue: string) => void;
  onRemove?: (index: number) => void;
  isQuestion?: boolean;
}

function TextBox({ index, value, onValueChange, onRemove, isQuestion = false }: TextBoxProps) {
  const [isEditing, setIsEditing] = useSyncedState(`isEditing-${index}`, false);

  const handleEditEnd = (e: { characters: string }) => {
    onValueChange(index, e.characters);
    setIsEditing(false);
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(index);
    }
  };

  return (
    <AutoLayout direction="horizontal" spacing={8} verticalAlignItems="center" width="fill-parent">
      <AutoLayout
        direction="horizontal"
        spacing={8}
        padding={8}
        cornerRadius={4}
        stroke={isEditing ? '#24CE16' : '#E6E6E6'}
        strokeWidth={2}
        verticalAlignItems="center"
        fill={'#FFFFFF'}
        width={250}
        onClick={() => setIsEditing(true)}
      >
        {isEditing ? (
          <Input
            value={value}
            onTextEditEnd={handleEditEnd}
            placeholder={isQuestion ? "Enter poll question" : "Enter option"}
            width="fill-parent"
            fontSize={isQuestion ? 18 : 16}
          />
        ) : (
          <Text fontSize={isQuestion ? 18 : 16} fontWeight={isQuestion ? 'bold' : 'normal'} width="fill-parent" wrap="wrap">
            {value || (isQuestion ? "Enter poll question" : "Enter option")}
          </Text>
        )}
      </AutoLayout>
      {!isQuestion && onRemove && (
        <SVG
          src={`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2L14 14M2 14L14 2" stroke="black" stroke-width="2"/>
              </svg>`}
          onClick={handleRemove}
        />
      )}
    </AutoLayout>
  );
}

function PollingWidget() {
  const [title, setTitle] = useSyncedState<string>('title', "Poll Title");
  const [entries, setEntries] = useSyncedState<string[]>('entries', [""]);

  const handleValueChange = (index: number, newValue: string) => {
    if (index === -1) {
      setTitle(newValue);
    } else {
      const updatedEntries = entries.map((item, i) => (i === index ? newValue : item));
      setEntries(updatedEntries);
    }
  };

  const handleRemove = (index: number) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  const handleAddTextBox = () => {
    const updatedEntries = [...entries, ""];
    setEntries(updatedEntries);
  };

  return (
    <AutoLayout
      direction="vertical"
      verticalAlignItems="start"
      spacing={8}
      padding={8}
      cornerRadius={8}
      fill={'#FFFFFF'}
      stroke={'#E6E6E6'}
    >
      <TextBox
        index={-1}
        value={title}
        onValueChange={handleValueChange}
        isQuestion={true}
      />
      {entries.map((item, index) => (
        <TextBox
          key={index}
          index={index}
          value={item}
          onValueChange={handleValueChange}
          onRemove={handleRemove}
        />
      ))}
      <SVG
        src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="30" height="30" rx="15" fill="white"/>
              <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="black" fill-opacity="0.8"/>
              <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
            </svg>`}
        onClick={handleAddTextBox}
      />
    </AutoLayout>
  );
}

widget.register(PollingWidget);
