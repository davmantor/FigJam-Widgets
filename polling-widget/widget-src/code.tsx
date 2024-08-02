const { widget } = figma;
const { useSyncedState, AutoLayout, Input, Text, SVG, Frame } = widget;

interface EditableTextProps {
  index: number;
  value: { text: string; voters: string[] };
  onValueChange: (index: number, newValue: string) => void;
  isEditable: boolean;
  placeholder?: string;
  onRemove?: (index: number) => void;
}

interface Entry {
  text: string;
  voters: string[];
  isEditable: boolean;
}

function EditableText({ index, value, onValueChange, isEditable, placeholder, onRemove }: EditableTextProps) {
  const [isEditing, setIsEditing] = useSyncedState(`isEditing-${index}`, false);
  const [inputValue, setInputValue] = useSyncedState(`inputValue-${index}`, value.text);

  return (
    <AutoLayout
      direction="vertical"
      spacing={8}
      padding={8}
      cornerRadius={4}
      stroke={isEditing ? '#24CE16' : '#E6E6E6'}
      strokeWidth={2}
    >
      {isEditing && isEditable ? (
        <Input
          value={inputValue}
          placeholder={placeholder || "Enter option"}
          onTextEditEnd={(e) => {
            setInputValue(e.characters);
            setIsEditing(false);
            onValueChange(index, e.characters);
          }}
          width={200}
        />
      ) : (
        <AutoLayout spacing={8} verticalAlignItems={'center'}>
          <Text
            fontSize={16}
            fill={inputValue ? '#000000' : (index === -1 ? '#808080' : '#000000')}
            fontWeight={inputValue ? 'normal' : (index === -1 ? 'bold' : 'normal')}
          >
            {inputValue || placeholder || "Enter option"}
          </Text>
          {!isEditable && (
            <Text fontSize={14}>
              {index === -1 ? '' : value.voters.length}
            </Text>
          )}
          {isEditable && (
            <SVG
              src={`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 13.5V10L10 1L14 5L5 14H1.5H1.5ZM10 1L14 5L5 14H1V10L10 1ZM3 11V12H4L12 4L11 3L3 11ZM11 3L12 4L10 6L9 5L11 3ZM9 5L4 10H3V9L9 5Z" fill="black"/>
                    </svg>`}
              onClick={() => setIsEditing(true)}
            />
          )}
          {index !== -1 && onRemove && isEditable && (
            <SVG
              src={`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2L14 14M2 14L14 2" stroke="black" stroke-width="2"/>
              </svg>`}
              onClick={() => onRemove(index)}
            />
          )}
        </AutoLayout>
      )}
    </AutoLayout>
  );
}

function PollingWidget() {
  const [isSubmitted, setIsSubmitted] = useSyncedState('isSubmitted', false);
  const [entries, setEntries] = useSyncedState<Entry[]>('entries', [{ text: "", voters: [], isEditable: true }]);
  const [userVotes, setUserVotes] = useSyncedState<Record<string, number | null>>('userVotes', {});
  const [totalVotes, setTotalVotes] = useSyncedState('totalVotes', 0);

  const handleValueChange = (index: number, newValue: string) => {
    const updatedEntries = entries.map((item, i) => {
      if (i === index) {
        return { ...item, text: newValue };
      }
      return item;
    });
    setEntries(updatedEntries);
    console.log("Entries after value change:", updatedEntries);
  };  

  const handleSubmit = () => {
    setIsSubmitted(true);
    const updatedEntries = entries.map(item => ({ ...item, isEditable: false }));
    setEntries(updatedEntries);
    console.log("Entries after submission:", updatedEntries);
  };  

  const handleVote = (index: number) => {
    const currentUser = figma.currentUser?.name || "User";
    const previousVote = userVotes[currentUser] ?? undefined;
  
    if (isSubmitted) {
      const updatedEntries = [...entries];
  
      if (previousVote !== undefined && previousVote !== index) {
        updatedEntries[previousVote].voters = updatedEntries[previousVote].voters.filter((voter: string) => voter !== currentUser);
        updatedEntries[index].voters.push(currentUser);
      } else if (previousVote === undefined) {
        updatedEntries[index].voters.push(currentUser);
      }
  
      setEntries(updatedEntries);
      setUserVotes({ ...userVotes, [currentUser]: index });
  
      const sum = updatedEntries.reduce((accumulation, entry) => accumulation + entry.voters.length, 0);
      setTotalVotes(sum);
      console.log("Entries after vote:", updatedEntries);
    }
  };

  const handleAddTextField = () => {
    const newEntries = [...entries, { text: "", voters: [], isEditable: true }];
    setEntries(newEntries);
    console.log("Entries after adding text field:", newEntries);
  };  

  const removeTextField = (index: number) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    console.log("Entries after removing text field:", updatedEntries);
  };  

  return (
    <AutoLayout
      direction="vertical"
      verticalAlignItems="start"
      spacing={16}
      padding={16}
      cornerRadius={8}
      fill={'#FFFFFF'}
      stroke={'#E6E6E6'}
    >
      <AutoLayout
        stroke={'#878584'}
        direction="vertical"
        padding={4}
        cornerRadius={8}
      >
        <EditableText
          key={-1}
          index={-1}
          value={{ text: '', voters: [] }}
          onValueChange={handleValueChange}
          isEditable={!isSubmitted}
          placeholder="Enter poll question here"
        />
      </AutoLayout>
      {entries.map((item, index) => (
        <AutoLayout
          key={index}
          onClick={() => isSubmitted ? handleVote(index) : undefined}
        >
          <EditableText
            index={index}
            value={item}
            onValueChange={handleValueChange}
            isEditable={!isSubmitted}
            placeholder="Enter option"
            onRemove={removeTextField}
          />
        </AutoLayout>
      ))}
      {!isSubmitted && (
        <SVG
          src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="30" height="30" rx="15" fill="white"/>
                <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="black" fill-opacity="0.8"/>
                <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
              </svg>`}
          onClick={handleAddTextField}
        />
      )}
      {!isSubmitted && (
        <AutoLayout
          width={100}
          height={32}
          cornerRadius={6}
          fill="#24CE16"
          onClick={handleSubmit}
          verticalAlignItems="center"
          horizontalAlignItems="center"
        >
          <Text fontSize={14} fill="#FFFFFF">
            Submit
          </Text>
        </AutoLayout>
      )}
      {isSubmitted && (
        <Text fontSize={10} fill="#808080">
          {'Total votes: ' + totalVotes}
        </Text>
      )}
    </AutoLayout>
  );
}

widget.register(PollingWidget);
