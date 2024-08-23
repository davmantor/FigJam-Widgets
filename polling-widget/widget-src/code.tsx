const { widget } = figma;
const { useSyncedState, AutoLayout, Input, Text, SVG, Image, useEffect } = widget;

const AnonSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
<defs>
</defs>
<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
	<path d="M 45 88 c -11.049 0 -21.18 -2.003 -29.021 -8.634 C 6.212 71.105 0 58.764 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 c 0 13.765 -6.212 26.105 -15.979 34.366 C 66.181 85.998 56.049 88 45 88 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(214,214,214); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 45 60.71 c -11.479 0 -20.818 -9.339 -20.818 -20.817 c 0 -11.479 9.339 -20.818 20.818 -20.818 c 11.479 0 20.817 9.339 20.817 20.818 C 65.817 51.371 56.479 60.71 45 60.71 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(165,164,164); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 45 90 c -10.613 0 -20.922 -3.773 -29.028 -10.625 c -0.648 -0.548 -0.88 -1.444 -0.579 -2.237 C 20.034 64.919 31.933 56.71 45 56.71 s 24.966 8.209 29.607 20.428 c 0.301 0.793 0.069 1.689 -0.579 2.237 C 65.922 86.227 55.613 90 45 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(165,164,164); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
</g>
</svg>`;

interface CustomUser {
  name: string;
  photoUrl: string;
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
  isAnonymous: boolean;
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
  isAnonymous,
}: TextBoxProps) {
  const handleEditEnd = async (e: { characters: string }) => {
    await getCurrentUser();
    onValueChange(index, e.characters);
    setEditingIndex(null);
  };

  const handleRemove = async () => {
    await getCurrentUser();
    if (onRemove) {
      onRemove(index);
    }
  };

  const handleClick = async () => {
    await getCurrentUser();
    if (submitted) {
      onVote();
    } else {
      setEditingIndex(index);
    }
  };

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
            <AutoLayout key={i} width={16} height={16} cornerRadius={8}>
              {isAnonymous ? (
              <AutoLayout width={16} height={16} cornerRadius={4}>
                <SVG src={AnonSVG} width={16} height={16} />
              </AutoLayout>
              ) : (
                <Image src={voter.photoUrl} width={16} height={16} cornerRadius={8} />
              )}
            </AutoLayout>
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

const getCurrentUser = () => {
  const currentUserName = figma.currentUser ? figma.currentUser.name : 'Unknown User';
  setUserName(currentUserName);
  console.log(userName);
};

function PollingWidget() {
  const [title, setTitle] = useSyncedState<string>('title', "");
  const [entries, setEntries] = useSyncedState<string[]>('entries', [""]);
  const [editingIndex, setEditingIndex] = useSyncedState<number | null>('editingIndex', -1);
  const [submitted, setSubmitted] = useSyncedState<boolean>('submitted', false);
  const [votes, setVotes] = useSyncedState<number[]>('votes', new Array(entries.length).fill(0));
  const [userVoteIndex, setUserVoteIndex] = useSyncedState<number | null>('userVoteIndex', null);
  const [voters, setVoters] = useSyncedState<CustomUser[][]>('voters', new Array(entries.length).fill([]));
  const [currentUser, setCurrentUser] = useSyncedState<CustomUser | null>('currentUser', null);
  const [isAnonymous, setIsAnonymous] = useSyncedState<boolean>('isAnonymous', false);

  useEffect(() => {
    async function loadUser() {
      const storedUser = await figma.clientStorage.getAsync('currentUser');
      if (storedUser) {
        setCurrentUser(storedUser);
      }
    }
    loadUser();
  }, []);

  const handleValueChange = async (index: number, newValue: string) => {
    await getCurrentUser();
    if (index === -1) {
      setTitle(newValue);
    } else {
      const updatedEntries = entries.map((item, i) => (i === index ? newValue : item));
      setEntries(updatedEntries);
    }
  };

  const handleRemove = async (index: number) => {
    await getCurrentUser();
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    setEditingIndex(null);
  };

  const handleAddTextBox = async () => {
    await getCurrentUser();
    const updatedEntries = [...entries, ""];
    setEntries(updatedEntries);
    setVotes([...votes, 0]);
    setVoters([...voters, []]);
    setEditingIndex(updatedEntries.length - 1);
  };

  const handleVote = async (index: number) => {
    await getCurrentUser();
    if (!currentUser) return;

    const newVotes = [...votes];
    const newVoters = [...voters];

    if (userVoteIndex !== null) {
      if (userVoteIndex === index) {
        newVotes[index]--;
        newVoters[index] = newVoters[index].filter(voter => voter.name !== currentUser.name);
        setUserVoteIndex(null);
      } else {
        newVotes[userVoteIndex]--;
        newVoters[userVoteIndex] = newVoters[userVoteIndex].filter(voter => voter.name !== currentUser.name);

        newVotes[index]++;
        newVoters[index] = [...newVoters[index], currentUser];
        setUserVoteIndex(index);
      }
    } else {
      newVotes[index]++;
      newVoters[index] = [...newVoters[index], currentUser];
      setUserVoteIndex(index);
    }

    setVotes(newVotes);
    setVoters(newVoters);
  };

  const toggleAnonymousVote = async () => {
    await getCurrentUser();
    setIsAnonymous(!isAnonymous);
  };

  const handleSubmit = async () => {
    await getCurrentUser();
    setEntries(entries.map(entry => entry));
    setTitle(title);
    setEditingIndex(null);
    setSubmitted(true);
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
      width={400}
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
        isAnonymous={isAnonymous}
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
          isAnonymous={isAnonymous}
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
          <AutoLayout direction="horizontal" spacing={8} verticalAlignItems="center">
            <AutoLayout
              direction="horizontal"
              spacing={8}
              verticalAlignItems="center"
              onClick={toggleAnonymousVote}
            >
              <SVG
                src={`<svg width="16" height="16" viewBox="0 0 16 16" fill="${isAnonymous ? 'black' : 'none'}" stroke="black" stroke-width="2">
                        <rect width="16" height="16" rx="2" />
                      </svg>`}
              />
              <Text fontSize={16} fill="#000000">Vote Anonymously</Text>
            </AutoLayout>
          </AutoLayout>
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
        <AutoLayout width="fill-parent" padding={{ top: 10 }}>
          <Text fontSize={12} fill="#808080" width="fill-parent">
            Total votes: {totalVotes}
          </Text>
        </AutoLayout>
      )}
    </AutoLayout>
  );
}

widget.register(PollingWidget);
