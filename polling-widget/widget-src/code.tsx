const { widget } = figma;
const { useSyncedState, AutoLayout, Input, Text, SVG, Image, useEffect } = widget;

interface CustomUser {
  name: string;
  photoUrl: string;
  anonymous: boolean;
}

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
  voters: CustomUser[];
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
  voters,
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

  // Limit the number of user icons to display
  const displayedVoters = voters.slice(0, 4);
  const additionalVotes = voters.length - displayedVoters.length;

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
        <AutoLayout direction="horizontal" spacing={4} verticalAlignItems="center">
          <Text fontSize={16} fill={userVote ? "#24CE16" : "#000000"}>
            {votes}
          </Text>
          {displayedVoters.map((voter, i) => (
            voter.anonymous ? (
              <AutoLayout key={i} fill="#000000" width={16} height={16} cornerRadius={8} />
            ) : (
              <Image key={i} src={voter.photoUrl} width={16} height={16} cornerRadius={8} />
            )
          ))}
          {additionalVotes > 0 && (
            <Text fontSize={16} fill="#000000">
              +{additionalVotes}
            </Text>
          )}
        </AutoLayout>
      )}
    </AutoLayout>
  );
}

async function getCurrentUser() {
  const currentUser = figma.currentUser;
  if (currentUser) {
    const { name, photoUrl } = currentUser;
    await figma.clientStorage.setAsync('currentUser', { name, photoUrl });
  }
}

function PollingWidget() {
  const [title, setTitle] = useSyncedState<string>('title', "");
  const [entries, setEntries] = useSyncedState<string[]>('entries', [""]);
  const [editingIndex, setEditingIndex] = useSyncedState<number | null>('editingIndex', -1);
  const [submitted, setSubmitted] = useSyncedState<boolean>('submitted', false);
  const [votes, setVotes] = useSyncedState<number[]>('votes', new Array(entries.length).fill(0));
  const [userVoteIndex, setUserVoteIndex] = useSyncedState<number | null>('userVoteIndex', null);
  const [voters, setVoters] = useSyncedState<CustomUser[][]>('voters', new Array(entries.length).fill([]));
  const [currentUser, setCurrentUser] = useSyncedState<CustomUser | null>('currentUser', null);
  const [isAnonymous, setIsAnonymous] = useSyncedState<boolean>('isAnonymous', false); // Global anonymous state for the current session

  // Load current user from clientStorage
  useEffect(() => {
    async function loadUser() {
      const storedUser = await figma.clientStorage.getAsync('currentUser');
      if (storedUser) {
        setCurrentUser(storedUser);
      }
    }
    loadUser();
  }, []);

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
    setVoters([...voters, []]); // Add an empty array for the new entry's voters
    setEditingIndex(updatedEntries.length - 1); // Set the new text box to be in edit mode
  };

  const handleVote = (index: number) => {
    if (!currentUser) return;

    const newVotes = [...votes];
    const newVoters = [...voters];

    // Check if the user has already voted on this option
    const userHasVotedOnThisOption = newVoters[index].some(voter => voter.name === currentUser.name);

    if (userVoteIndex !== null) {
      if (userVoteIndex === index) {
        newVotes[index]--;
        newVoters[index] = newVoters[index].filter(voter => voter.name !== currentUser.name);
        setUserVoteIndex(null);
      } else {
        newVotes[userVoteIndex]--;
        newVoters[userVoteIndex] = newVoters[userVoteIndex].filter(voter => voter.name !== currentUser.name);

        newVotes[index]++;
        newVoters[index] = [...newVoters[index], { ...currentUser, anonymous: isAnonymous }];
        setUserVoteIndex(index);
      }
    } else {
      newVotes[index]++;
      newVoters[index] = [...newVoters[index], { ...currentUser, anonymous: isAnonymous }];
      setUserVoteIndex(index);
    }

    setVotes(newVotes);
    setVoters(newVoters);
  };

  const toggleAnonymousVote = () => {
    setIsAnonymous(!isAnonymous);
  };

  const handleSubmit = () => {
    // Force a state change to ensure all edits are saved
    setEntries(entries.map(entry => entry));
    setTitle(title); // Force a state update to ensure the title is also saved
    setEditingIndex(null);
    setSubmitted(true); // Set submitted state to true
  };

  const totalVotes = votes.reduce((acc, voteCount) => acc + voteCount, 0);

  return (
    <AutoLayout
      direction="vertical"
      verticalAlignItems="start"
      spacing={8}
      padding={8}
      cornerRadius={8}
      fill={'#FFFFFF'}
      stroke={'#E6E6E6'}
      width={400}  // Set a fixed width for the widget
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
        voters={[]}
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
          voters={voters[index]}
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
      {submitted && (
        <>
          <AutoLayout
            direction="horizontal"
            spacing={8}
            verticalAlignItems="center"
            onClick={toggleAnonymousVote}
          >
            <SVG
              src={`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="16" height="16" rx="2" fill="${isAnonymous ? '#24CE16' : 'white'}" stroke="black" stroke-width="1.5"/>
                    ${isAnonymous ? `<path d="M4 8L7 11L12 4" stroke="white" stroke-width="2"/>` : ''}
                  </svg>`}
            />
            <Text fontSize={14} fill="#000000">
              Vote Anonymously
            </Text>
          </AutoLayout>
          <AutoLayout width="fill-parent" padding={{ top: 10 }}>
            <Text fontSize={12} fill="#808080" width="fill-parent">
              Total votes: {totalVotes}
            </Text>
          </AutoLayout>
        </>
      )}
    </AutoLayout>
  );
}

widget.register(PollingWidget);

// Ensure to call getCurrentUser when the plugin starts
getCurrentUser();
