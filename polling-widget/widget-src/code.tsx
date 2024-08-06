const { widget } = figma;
const { useSyncedState, AutoLayout, Input, Text, SVG } = widget;

interface TextBoxProps {
  index: number;
  value: string;
  onValueChange: (index: number, newValue: string) => void;
  onRemove?: (index: number) => void;
  isQuestion?: boolean;
  isEditing: boolean;
  setEditingIndex: (index: number | null) => void;
  submitted: boolean;
  votes: number;
  onVote: () => void;
  userVote: boolean;
}

function TextBox({
  index,
  value,
  onValueChange,
  onRemove,
  isQuestion = false,
  isEditing,
  setEditingIndex,
  submitted,
  votes,
  onVote,
  userVote,
}: TextBoxProps) {
  const handleEditEnd = (e: { characters: string }) => {
    onValueChange(index, e.characters);
    setEditingIndex(null);
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(index);
    }
  };

  const handleClick = () => {
    if (submitted) {
      onVote();
    } else {
      setEditingIndex(index);
    }
  };

  return (
    <AutoLayout direction="horizontal" spacing={8} verticalAlignItems="center" width="fill-parent" onClick={handleClick}>
      <AutoLayout
        direction="horizontal"
        spacing={8}
        padding={8}
        cornerRadius={4}
        stroke={isEditing ? '#24CE16' : '#E6E6E6'}
        strokeWidth={2}
        verticalAlignItems="center"
        fill={'#FFFFFF'}
        width={300}
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
          <Text fontSize={isQuestion ? 18 : 16} fontWeight={isQuestion ? 'bold' : 'normal'} width="fill-parent">
            {value || (isQuestion ? "Enter poll question" : "Enter option")}
          </Text>
        )}
      </AutoLayout>
      {!isQuestion && !submitted && onRemove && (
        <SVG
          src={`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2L14 14M2 14L14 2" stroke="black" stroke-width="2"/>
              </svg>`}
          onClick={handleRemove}
        />
      )}
      {!isQuestion && submitted && (
        <Text fontSize={16} fill={userVote ? "#24CE16" : "#000000"}>
          {votes}
        </Text>
      )}
    </AutoLayout>
  );
}

function PollingWidget() {
  const [title, setTitle] = useSyncedState<string>('title', "");
  const [entries, setEntries] = useSyncedState<string[]>('entries', [""]);
  const [editingIndex, setEditingIndex] = useSyncedState<number | null>('editingIndex', -1);
  const [submitted, setSubmitted] = useSyncedState<boolean>('submitted', false);
  const [votes, setVotes] = useSyncedState<number[]>('votes', new Array(entries.length).fill(0));
  const [userVoteIndex, setUserVoteIndex] = useSyncedState<number | null>('userVoteIndex', null);

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
    setEditingIndex(null);
  };

  const handleAddTextBox = () => {
    const updatedEntries = [...entries, ""];
    setEntries(updatedEntries);
    setVotes([...votes, 0]); // Add a vote count for the new entry
    setEditingIndex(updatedEntries.length - 1); // Set the new text box to be in edit mode
  };

  const handleVote = (index: number) => {
    const newVotes = [...votes];
    if (userVoteIndex !== null && userVoteIndex !== index) {
      newVotes[userVoteIndex]--;
    }
    newVotes[index]++;
    setVotes(newVotes);
    setUserVoteIndex(index);
  };

  const handleSubmit = () => {
    // Force a state change to ensure all edits are saved
    setEntries(entries.map(entry => entry));
    setTitle(title); // Force a state update to ensure the title is also saved
    setEditingIndex(null);
    setSubmitted(true); // Set submitted state to true
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
        isEditing={editingIndex === -1}
        setEditingIndex={setEditingIndex}
        submitted={submitted}
        votes={0}
        onVote={() => {}}
        userVote={false}
      />
      {entries.map((item, index) => (
        <TextBox
          key={index}
          index={index}
          value={item}
          onValueChange={handleValueChange}
          onRemove={handleRemove}
          isEditing={editingIndex === index}
          setEditingIndex={setEditingIndex}
          submitted={submitted}
          votes={votes[index]}
          onVote={() => handleVote(index)}
          userVote={userVoteIndex === index}
        />
      ))}
      {!submitted && (
        <>
          <SVG
            src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="30" height="30" rx="15" fill="white"/>
                  <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="black" fill-opacity="0.8"/>
                  <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
                </svg>`}
            onClick={handleAddTextBox}
          />
          <AutoLayout
            fill="#24CE16"
            padding={{ left: 10, right: 10, top: 5, bottom: 5 }}
            cornerRadius={4}
            verticalAlignItems="center"
            horizontalAlignItems="center"
            onClick={handleSubmit}
          >
            <Text fontSize={16} fill="#FFFFFF">
              Submit
            </Text>
          </AutoLayout>
        </>
      )}
    </AutoLayout>
  );
}

widget.register(PollingWidget);
