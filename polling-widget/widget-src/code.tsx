const { widget, showUI, ui } = figma;
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

let alreadyLoggedIn = false;

interface TextBoxProps {
  index: number;
  value: string;
  onValueChange: (index: number, newValue: string) => void;
  onRemove?: (index: number) => void;
  isQuestion?: boolean;
  isEditing: boolean;
  setEditingIndex: (index: number | null) => void;
  submitted: boolean;
  votes: number[];
  onVote: () => void;
<<<<<<< HEAD
=======
  handleVote: () => void;
>>>>>>> main
  updateUserName: () => void;
  userVote: boolean;
  voters: CustomUser[];
  isAnonymous: boolean;
  totalVoters: number;
  entries: string[];    // Add entries prop
  pollId: string; // Add pollId prop
  widgetWidth: number;
  barColor: string;
  accentColor: string;
  promptColor: string;
}


function ProgressBar({ votes, totalVotes, widgetWidth, barColor }: { votes: number; totalVotes: number; widgetWidth: number; barColor: string }) {
  function getWidgetValue(input: number): number {
    const currentWidgetWidth = widgetWidth; // Get the current widget width
    const scalingRatio = currentWidgetWidth / 800; // Calculate the scaling ratio
    return Math.floor(input * scalingRatio); // Scale the input value by the ratio
  }
  const parentWidth = getWidgetValue(500);
  const percentage = totalVotes === 0 ? 0 : (votes / totalVotes) * 100;
  console.log("votes: " + votes);
  console.log("totalVotes: " + totalVotes);
  const width = percentage === 0 ? 1 : (percentage / 100) * parentWidth;
  console.log("width: " + percentage);
  return (
    <AutoLayout
      width={parentWidth}
      height={getWidgetValue(10)}
      cornerRadius={getWidgetValue(5)}
      fill="#E6E6E6"
      strokeWidth={0}
    >
      <AutoLayout
        width={width}
        height="fill-parent"
        cornerRadius={4}
        fill={barColor}
      />
    </AutoLayout>
  );
}

function ProgressBar({ votes, totalVotes }: { votes: number; totalVotes: number }) {
  const parentWidth = 250;
  const percentage = totalVotes === 0 ? 0 : (votes / totalVotes) * 100;
  console.log("votes: " + votes);
  console.log("totalVotes: " + totalVotes);
  const width = percentage === 0 ? 1 : (percentage / 100) * parentWidth;
  console.log("width: " + percentage);
  return (
    <AutoLayout
      width={parentWidth}
      height={8}
      cornerRadius={4}
      fill="#E6E6E6"
      strokeWidth={0}
    >
      <AutoLayout
        width={width}
        height="fill-parent"
        cornerRadius={4}
        fill="#A259FF"
      />
    </AutoLayout>
  );
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
  handleVote,
  userVote,
  voters,
  isAnonymous,
  totalVoters,
<<<<<<< HEAD
  updateUserName  // Accept totalVoters as a prop
}: TextBoxProps & { totalVoters: number }) {
=======
  updateUserName,  // Accept totalVoters and updateUserName
  pollId,          // Add pollId for context if needed
  entries,          // Add entries for additional context
  widgetWidth,
  barColor,
  accentColor,
  promptColor
}: TextBoxProps & { totalVoters: number; pollId?: string; entries?: string[] }) {

  function getWidgetValue(input: number): number {
    const currentWidgetWidth = widgetWidth; // Get the current widget width
    const scalingRatio = currentWidgetWidth / 800; // Calculate the scaling ratio
    return Math.floor(input * scalingRatio); // Scale the input value by the ratio
  }
>>>>>>> main

  const handleEditEnd = (e: { characters: string }) => {
    onValueChange(index, e.characters);
    setEditingIndex(null);
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(index);
    }
  };
  

<<<<<<< HEAD
  const handleClick = () => {
    updateUserName();
=======
  const handleClick = async () => {
    updateUserName();  // Ensure the user name is up-to-date
>>>>>>> main
    if (submitted) {
      console.log("previous voters:" + voters);
      await onVote();  // This will update local states like votes and voters
      console.log("after voters:" + voters);
      // const newVotes = [...votes];
      // const newVoters = [...voters];
      // const totalVotes = newVotes.reduce((acc, vote) => acc + vote, 0);
  
      // const newMessageObject = {
      //   title: "pollTitle",
      //   options: entries.map((entry, index) => ({
      //     text: entry,           // Option text
      //     votes: newVotes[index], // Number of votes for this option
      //     // Ensure voters[index] is an array before calling .map()
      //     voters: (Array.isArray(voters[index]) ? voters[index] : []).map((voter: CustomUser) => ({
      //       name: voter.name || 'Unknown User',  // Ensure 'name' exists in each voter
      //     })),
      //   })),
      //   totalVotes,  // Sum of all votes
      //   isAnonymous: isAnonymous,  // This should come from your state or logic
      //   updatedAt: new Date(),  // Current date/time for the last update
      // };
      
      
  
      // console.log('Sending message object to server:', newMessageObject);  // Log the request data
  
      // try {
      //   const response = await fetch(`https://figjam-widgets-myhz.onrender.com/polls/${pollId}`, {
      //     method: 'PUT',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(newMessageObject),
      //   });
  
      //   console.log('Server response status:', response.status);  // Log the response status
      //   const responseData = await response.json();
      //   console.log('Server response data:', responseData);  // Log the response data
      // } catch (error) {
      //   console.error('Error updating poll:', error);  // Log any error
      // }
    } else {
      setEditingIndex(index);  // If not submitted, continue with editing
    }
  };
<<<<<<< HEAD
=======
  
  
  
>>>>>>> main
// Now the voters array contains both the original and fake voters

  const displayedVoters = voters.slice(0, 4);
  console.log("Voters:");
  displayedVoters.forEach((voter, i) => {
    console.log(`Voter ${i + 1}: Name = ${voter.name}, Photo URL = ${voter.photoUrl}`);
  });
  console.log(displayedVoters.length);
  const additionalVotes = voters.length - displayedVoters.length;
  console.log(additionalVotes);

  return (
<<<<<<< HEAD
    <AutoLayout direction="vertical" spacing={4} width="fill-parent">
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
          width={250}
=======
    <AutoLayout direction="vertical" spacing={getWidgetValue(4)} width="fill-parent">
      <AutoLayout direction="horizontal" spacing={getWidgetValue(8)} verticalAlignItems="center" width="fill-parent" onClick={handleClick}>
        <AutoLayout
          direction="horizontal"
          spacing={getWidgetValue(8)}
          padding={getWidgetValue(8)}
          cornerRadius={getWidgetValue(4)}
          stroke={isEditing ? accentColor : '#E6E6E6'}
          strokeWidth={getWidgetValue(4)}
          verticalAlignItems="center"
          fill={'#FFFFFF'}
          width={getWidgetValue(500)}
          height={getWidgetValue(60)}
>>>>>>> main
        >
          {isEditing ? (
            <Input
              value={value}
              onTextEditEnd={handleEditEnd}
              placeholder={isQuestion ? "Enter poll question" : "Enter option"}
              width="fill-parent"
<<<<<<< HEAD
              fontSize={isQuestion ? 18 : 16}
            />
          ) : (
            <Text fontSize={isQuestion ? 18 : 16} fontWeight={isQuestion ? 'bold' : 'normal'} width="fill-parent">
=======
              fontSize={isQuestion ? getWidgetValue(28) : getWidgetValue(24)}
            />
          ) : (
            <Text fontSize={isQuestion ? getWidgetValue(28) : getWidgetValue(24)} fontWeight={isQuestion ? 'bold' : 'normal'} width="fill-parent" fill={promptColor}>
>>>>>>> main
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
<<<<<<< HEAD
          <AutoLayout direction="horizontal" spacing={4} verticalAlignItems="center">
            <Text fontSize={16} fill={userVote ? "#24CE16" : "#000000"}>
              {displayedVoters.length + additionalVotes}
            </Text>
            {displayedVoters.map((voter, i) => (
              <AutoLayout key={i} width={16} height={16} cornerRadius={8}>
                {isAnonymous ? (
                <AutoLayout width={16} height={16} cornerRadius={4}>
                  <SVG src={AnonSVG} width={16} height={16} />
                </AutoLayout>
                ) : (
                  <Image src={voter.photoUrl} width={16} height={16} cornerRadius={8} />
=======
          <AutoLayout direction="horizontal" spacing={getWidgetValue(4)} verticalAlignItems="center">
            <Text fontSize={getWidgetValue(28)} fill={userVote ? accentColor : "#000000"}>
              {displayedVoters.length + additionalVotes}
            </Text>
            {displayedVoters.map((voter, i) => (
              <AutoLayout key={i} width={getWidgetValue(28)} height={getWidgetValue(28)} cornerRadius={getWidgetValue(8)}>
                {isAnonymous ? (
                <AutoLayout width={getWidgetValue(28)} height={getWidgetValue(28)} cornerRadius={getWidgetValue(4)}>
                  <SVG src={AnonSVG} width={getWidgetValue(28)} height={getWidgetValue(28)} />
                </AutoLayout>
                ) : (
                  <Image src={voter.photoUrl} width={getWidgetValue(28)} height={getWidgetValue(28)} cornerRadius={getWidgetValue(14)} />
>>>>>>> main
                )}
              </AutoLayout>
            ))}
            {additionalVotes > 0 && (
<<<<<<< HEAD
              <Text fontSize={16} fill="#000000">
=======
              <Text fontSize={getWidgetValue(28)} fill="#000000">
>>>>>>> main
                +{additionalVotes}
              </Text>
            )}
          </AutoLayout>
        )}
      </AutoLayout>
      {!isQuestion && submitted && (
<<<<<<< HEAD
        <ProgressBar votes={displayedVoters.length + additionalVotes} totalVotes={totalVoters} />
=======
        <ProgressBar votes={displayedVoters.length + additionalVotes} totalVotes={totalVoters} widgetWidth={widgetWidth} barColor={barColor}/>
>>>>>>> main
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
  const [userName, setUserName] = useSyncedState('userName', 'Unknown User');
<<<<<<< HEAD
  const [currentUser, setCurrentUser] = useSyncedState<CustomUser | null>('currentUser', null);
=======
>>>>>>> main
  const [isAnonymous, setIsAnonymous] = useSyncedState<boolean>('isAnonymous', false);
  const [pollId, setPollId] = useSyncedState<string>('pollId', "");
  const [logId, setLogId] = useSyncedState<string>('logId', "");

<<<<<<< HEAD
=======
  const [inPrompt, setPrompt] = useSyncedState('Prompt not set', '');
  const [isCrownButtonPressed, setIsCrownButtonPressed] = useSyncedState('isCrownButtonPressed', false);


  const [widgetWidth, setWidgetWidth] = useSyncedState<number>('widgetWidth', 400);
  const [borderWidth, setBorderWidth] = useSyncedState<number>('borderWidth', 2);
  const [borderColor, setBorderColor] = useSyncedState<string>('borderColor', '#E6E6E6');
  const [promptColor, setPromptColor] = useSyncedState<string>('promptColor', '#000000');
  const [barColor, setBarColor] = useSyncedState<string>('barColor', '#A259FF');
  const [accentColor, setAccentColor] = useSyncedState<string>('accentColor', '#24CE16');

  const [widgetCornerRadius, setWidgetCornerRadius] = useSyncedState<number>('widgetCornerRadius', 10);

  // Track logId changes
  useEffect(() => {
    console.log("LogId updated:", logId);
  }, [logId]);

  function getWidgetValue(input: number): number {
    const currentWidgetWidth = widgetWidth; // Get the current widget width
    const scalingRatio = currentWidgetWidth / 400; // Calculate the scaling ratio
    return Math.floor(input * scalingRatio); // Scale the input value by the ratio
  }

>>>>>>> main
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
    setVotes([...votes, 0]);
    setVoters([...voters, []]);
    setEditingIndex(updatedEntries.length - 1);
  };

<<<<<<< HEAD
  const handleVote = (index: number) => {
    // Update the user's name before proceeding
    updateUserName();
=======
  

  const handleVote = async (index: number) => {
    // Update the user's name before proceeding
    updateUserName();
    console.log(entries);
    console.log(votes);
    console.log(voters);
>>>>>>> main
  
    // Assuming userName is the state variable holding the updated user name
    const userName = figma.currentUser ? figma.currentUser.name : 'Unknown User';
  
    const newVotes = [...votes];
    const newVoters = [...voters];
  
    // Ensure the user is removed from all other voters arrays
    newVoters.forEach((voterArray, i) => {
      newVoters[i] = voterArray.filter(voter => voter.name !== userName);
      if (userVoteIndex === i) {
        newVotes[i]--;  // Decrease vote count for the previous option
      }
    });
  
    if (userVoteIndex !== index) {
      // Add the vote to the new option if it's a different one
      newVotes[index]++;
      newVoters[index] = [...newVoters[index], { name: userName, photoUrl: figma.currentUser?.photoUrl || '' }];
      setUserVoteIndex(index);
    } else {
      // If the user is unvoting the same option, reset userVoteIndex
      setUserVoteIndex(null);
<<<<<<< HEAD
    }
  
    // Update the state with the new votes and voters arrays
    setVotes(newVotes);
    setVoters(newVoters);
  };

  const toggleAnonymousVote = () => {
    setIsAnonymous(!isAnonymous);
  };
  console.log(userName);
  const handleSubmit = () => {
=======
    }
  
    // Update the state with the new votes and voters arrays
    await setVotes(newVotes);
    await setVoters(newVoters);
    
  

    // Calculate total votes after voting and unvoting is handled
    let totalVotes = 0;
    for (let i = 0; i < newVotes.length; i++) {
      totalVotes += newVotes[i];
    }
    // Prepare the updated poll data to send to the database
    const updatedPoll = {
      options: entries.map((entry, i) => ({
        text: entry,
        votes: newVotes[i],
        voters: newVoters[i],
      })),
      totalVotes: totalVotes,
      updatedAt: new Date(),
    };

    console.log(totalVotes);
  
    console.log("UPDATED POLL");
    console.log(updatedPoll);
    console.log(pollId);
  
    // Wait for the database to update before proceeding
    try {
      console.log("I AM ENTERING THE TRY CATCH")
      const response = await fetch(`https://figjam-widgets-myhz.onrender.com/polls/${pollId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPoll),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      console.log('Database updated successfully');
    } catch (error) {
      console.error('Error updating poll:', error);
    }
  };

  const toggleAnonymousVote = () => {
    setIsAnonymous(prevState => !prevState);  // Toggle the value
  };
  
  console.log(userName);
  const handleSubmit = async () => {
    console.log(`isAnonymous before submit: ${isAnonymous}`);
    // Prepare the data to be sent to the server
    const pollData = {
      title,
      options: entries.map(entry => ({
        text: entry,        
        votes: 0, 
        voters: []
      })),
      totalVotes: 0,
      isAnonymous: isAnonymous,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  
    try {
      console.log(JSON.stringify(pollData));
      // Send the data to the server to create a new poll
      const response = await fetch('https://figjam-widgets-myhz.onrender.com/polls/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pollData),  // Convert poll data to JSON string
      });
      console.log("POLL DATA");
      console.log(JSON.stringify(pollData));
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Optionally, handle the server response if needed
      const data = await response.json();
      console.log("THIS IS THE DATA" + JSON.stringify(data))
      setPollId(data.pollId);
      setLogId(data.logId);

      console.log('Poll created successfully:', data);
    } catch (error) {
      console.error('Error creating poll:', error);
    }

    // Set UI states
>>>>>>> main
    setEntries(entries.map(entry => entry));
    setTitle(title);
    setEditingIndex(null);
    setSubmitted(true);
  };
  
  
  // Create a combined voters array using a Set to ensure uniqueness
  const combinedVoters = new Set<CustomUser>();
  voters.forEach(voterArray => {
    voterArray.forEach(voter => {
      combinedVoters.add(voter);
    });
  });

  // Create a combined voters array using a Set to ensure uniqueness
  const combinedVoters = new Set<CustomUser>();
  voters.forEach(voterArray => {
    voterArray.forEach(voter => {
      combinedVoters.add(voter);
    });
  });

  const totalVotes = votes.reduce((acc, voteCount) => acc + voteCount, 0);

  const updateUserName = () => {
    const currentUserName = figma.currentUser ? figma.currentUser.name : 'Unknown User';
    setUserName(currentUserName);
    console.log(userName);
  };

<<<<<<< HEAD
=======
  const adminI = `<svg width="${getWidgetValue(20)}px" height="${getWidgetValue(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M3 8L4.44293 16.6576C4.76439 18.5863 6.43315 20 8.38851 20H15.6115C17.5668 20 19.2356 18.5863 19.5571 16.6576L21 8M3 8L6.75598 11.0731C7.68373 11.8321 9.06623 11.6102 9.70978 10.5989L12 7M3 8C3.82843 8 4.5 7.32843 4.5 6.5C4.5 5.67157 3.82843 5 3 5C2.17157 5 1.5 5.67157 1.5 6.5C1.5 7.32843 2.17157 8 3 8ZM21 8L17.244 11.0731C16.3163 11.8321 14.9338 11.6102 14.2902 10.5989L12 7M21 8C21.8284 8 22.5 7.32843 22.5 6.5C22.5 5.67157 21.8284 5 21 5C20.1716 5 19.5 5.67157 19.5 6.5C19.5 7.32843 20.1716 8 21 8ZM12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7Z" stroke="#000000" stroke-width="${3}" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
    </svg>`;


  useEffect(()=>{
    if (isCrownButtonPressed) {
      setIsCrownButtonPressed(false);
      console.log('crown123', isCrownButtonPressed);
    figma.showUI(__uiFiles__.optionsChat, { width: 400, height: 165 });
    figma.ui.postMessage({ type: 'alreadyLoggedIn',            payload: alreadyLoggedIn });
    figma.ui.postMessage({ type: 'current-widthValue',         payload: widgetWidth });
    figma.ui.postMessage({ type: 'current-borderWidthValue',   payload: borderWidth });
    figma.ui.postMessage({ type: 'current-borderColor',        payload: borderColor });
    figma.ui.postMessage({ type: 'current-promptColor',        payload: promptColor });
    figma.ui.postMessage({ type: 'current-barColor',           payload: barColor });
    figma.ui.postMessage({ type: 'current-accentColor',        payload: accentColor });
    figma.ui.postMessage({ type: 'current-widgetId',           payload: logId });
    figma.ui.postMessage({ type: 'current-widgetCornerRadius', payload: widgetCornerRadius });
    figma.ui.postMessage({ type: 'current-pollId',           payload: pollId });

    figma.ui.onmessage = async (msg) => {
      if (msg.type === 'update-prompt') {
        console.log("calling prompt from options");
        figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
        figma.ui.postMessage({ type: 'edit-prompt', payload: inPrompt });
        figma.ui.onmessage = msg => {
          if (msg.type === 'update-message') {
            const updatedText = msg.payload.message;
            setPrompt(updatedText);
            setTitle(updatedText);
            alreadyLoggedIn = true;
            setIsCrownButtonPressed(true);
          } else if (msg.type === 'close-plugin') {
            console.log("closed");
            setIsCrownButtonPressed(false);
            figma.closePlugin();
          } else if (msg.type === 'back-action') {
            console.log("back");
            alreadyLoggedIn = true;
            handleOptionsClickChat();
          }
        };
      } else if (msg.type === 'update-width') {
        console.log("calling width from options");
        figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
        figma.ui.postMessage({ type: 'edit-width', payload: widgetWidth });
        figma.ui.onmessage = msg => {
          if (msg.type === 'update-message') {
            console.log("WIDGETWIDTGSET");
            const updatedWidth = msg.payload.message;
            setWidgetWidth(parseInt(updatedWidth, 10));
            alreadyLoggedIn = true;
            setIsCrownButtonPressed(true);
          } else if (msg.type === 'close-plugin') {
            console.log("closed");
            setIsCrownButtonPressed(false);
            figma.closePlugin();
          } else if (msg.type === 'back-action') {
            console.log("back");
            alreadyLoggedIn = true;
            handleOptionsClickChat();
          }
        };
      } else if (msg.type === 'update-borderWidth') {
        console.log("calling width from options");
        figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
        figma.ui.postMessage({ type: 'edit-borderWidth', payload: borderWidth });
        console.log("opened");
        figma.ui.onmessage = msg => {
          if (msg.type === 'update-message') {
            const updatedBorderWidth = msg.payload.message;
            setBorderWidth(parseInt(updatedBorderWidth, 10));
            alreadyLoggedIn = true;
            setIsCrownButtonPressed(true);
          } else if (msg.type === 'close-plugin') {
            console.log("closed");
            setIsCrownButtonPressed(false);
            figma.closePlugin();
          } else if (msg.type === 'back-action') {
            console.log("back");
            alreadyLoggedIn = true;
            handleOptionsClickChat();
          }
        };
        } else if (msg.type === 'update-borderColor') {
        console.log("calling prompt from options");
        figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
        figma.ui.postMessage({ type: 'edit-borderColor', payload: borderColor });
        figma.ui.onmessage = msg => {
          if (msg.type === 'update-message') {
            const updatedText = msg.payload.message;
            setBorderColor(updatedText);
            alreadyLoggedIn = true;
            setIsCrownButtonPressed(true);
          } else if (msg.type === 'close-plugin') {
            console.log("closed");
            setIsCrownButtonPressed(false);
            figma.closePlugin();
          } else if (msg.type === 'back-action') {
            console.log("back");
            alreadyLoggedIn = true;
            handleOptionsClickChat();
          }
        };
      } else if (msg.type === 'update-promptColor') {
        console.log("calling prompt from options");
        figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
        figma.ui.postMessage({ type: 'edit-promptColor', payload: promptColor });
        console.log("opened");
        figma.ui.onmessage = msg => {
          if (msg.type === 'update-message') {
            const updatedText = msg.payload.message;
            setPromptColor(updatedText);
            alreadyLoggedIn = true;
            setIsCrownButtonPressed(true);
          } else if (msg.type === 'close-plugin') {
            console.log("closed");
            setIsCrownButtonPressed(false);
            figma.closePlugin();
          } else if (msg.type === 'back-action') {
            console.log("back");
            alreadyLoggedIn = true;
            handleOptionsClickChat();
          }
        };
      } else if (msg.type === 'update-barColor') {
        console.log("calling prompt from options");
        figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
        figma.ui.postMessage({ type: 'edit-barColor', payload: barColor });
        console.log("opened");
        figma.ui.onmessage = msg => {
          if (msg.type === 'update-message') {
            const updatedText = msg.payload.message;
            setBarColor(updatedText);
            alreadyLoggedIn = true;
            setIsCrownButtonPressed(true);
          } else if (msg.type === 'close-plugin') {
            console.log("closed");
            setIsCrownButtonPressed(false);
            figma.closePlugin();
          } else if (msg.type === 'back-action') {
            console.log("back");
            alreadyLoggedIn = true;
            handleOptionsClickChat();
          }
        };
      } else if (msg.type === 'update-widgetId') {
        console.log("calling prompt from options");
        figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
        figma.ui.postMessage({ type: 'edit-widgetId', payload: logId });
        console.log("opened");
        figma.ui.onmessage = msg => {
          if (msg.type === 'update-message') {
            console.log(logId);
            const updatedText = msg.payload.message;
            setWidgetId(updatedText);
            alreadyLoggedIn = true;
            setIsCrownButtonPressed(true);
          } else if (msg.type === 'close-plugin') {
            console.log("closed");
            setIsCrownButtonPressed(false);
            figma.closePlugin();
          } else if (msg.type === 'back-action') {
            console.log("back");
            alreadyLoggedIn = true;
            handleOptionsClickChat();
          }
        };
      } else if (msg.type === 'update-accentColor') {
        console.log("calling prompt from options");
        figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
        figma.ui.postMessage({ type: 'edit-accentColor', payload: accentColor });
        console.log("opened");
        figma.ui.onmessage = msg => {
          if (msg.type === 'update-message') {
            const updatedText = msg.payload.message;
            setAccentColor(updatedText);
            alreadyLoggedIn = true;
            setIsCrownButtonPressed(true);
          } else if (msg.type === 'close-plugin') {
            console.log("closed");
            setIsCrownButtonPressed(false);
            figma.closePlugin();
          } else if (msg.type === 'back-action') {
            console.log("back");
            alreadyLoggedIn = true;
            handleOptionsClickChat();
          }
        };
      } else if (msg.type === 'update-widgetCornerRadius') {
        console.log("calling prompt from options");
        figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
        figma.ui.postMessage({ type: 'edit-widgetCornerRadius', payload: widgetCornerRadius });
        figma.ui.onmessage = msg => {
          if (msg.type === 'update-message') {
            const updatedText = msg.payload.message;
            setWidgetCornerRadius(Number(updatedText));
            alreadyLoggedIn = true;
            setIsCrownButtonPressed(true);
          } else if (msg.type === 'close-plugin') {
            console.log("closed");
            setIsCrownButtonPressed(false);
            figma.closePlugin();
          } else if (msg.type === 'back-action') {
            console.log("back");
            alreadyLoggedIn = true;
            handleOptionsClickChat();
          }
        };
      }};
  }})

  const setWidgetId = async (widgetId: string) => {
    if (!widgetId) return
  
    // Prepare the request payload
    const newMessageObject = {
      newPollId: widgetId
    };
    
    console.log("newMessageObject", newMessageObject);
    console.log(pollId)
    setLogId(widgetId); // Update the logId state with the new widgetId
    console.log("THIS IS THE WIDGET ID" + logId);
    try {
      // Make the PUT request to the server to check if the poll exists or update the ID
      const response = await fetch(`https://figjam-widgets-myhz.onrender.com/polls/update-id/${pollId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessageObject),
      });
      console.log("pollId being used for update:", pollId);  // Log the pollId being used for findById
  
      // Parse the response from the server
      const responseData = await response.json();
      console.log(responseData);
      // Check if the response is successful
      if (response.status === 200) {
        if (responseData.status === 'exists') {
          // If the poll already exists, populate the widget with existing poll data
          console.log('Poll already exists:', responseData.poll);
          populateWidgetData(responseData.poll); // Call the function to update widget with poll data
          console.log('LogId after update:', logId);

        } else {
          // If the poll was successfully updated with the new ID
          console.log('Poll ID updated successfully');
          console.log('LogId after update:', logId);
        }
      }
    } catch (error) {
      console.error('Error updating or retrieving poll ID');
    }
  };
  
  // Helper function to populate widget with poll data
  const populateWidgetData = (pollData) => {
    setTitle(pollData.title); // Set the poll title
    setEntries(pollData.options.map(option => option.text)); // Set the options text
    setVotes(pollData.options.map(option => option.votes)); // Set the votes for each option
    setVoters(pollData.options.map(option => option.voters)); // Set the voters for each option
    setUserVoteIndex(null); // Reset the user vote index or adjust based on your logic
    console.log(pollData);
  };
  
  

  const handleOptionsClickChat = () => {
    updateUserName();
    setIsCrownButtonPressed(true);
    
    // return new Promise<void>(() => {
    return new Promise<void>((resolve, reject) => {
      figma.showUI(__uiFiles__.optionsChat, { width: 400, height: 205 });
      figma.ui.postMessage({ type: 'current-widgetId', payload: logId }); // Pass widgetId to the UI
      figma.ui.postMessage({ type: 'alreadyLoggedIn', payload: alreadyLoggedIn });
      figma.ui.postMessage({ type: 'current-widthValue', payload: widgetWidth });
      figma.ui.postMessage({ type: 'current-borderWidthValue', payload: borderWidth });
      figma.ui.postMessage({ type: 'current-borderColor', payload: borderColor });
      figma.ui.postMessage({ type: 'current-promptColor', payload: promptColor });
      figma.ui.postMessage({ type: 'current-barColor', payload: barColor });
      figma.ui.postMessage({ type: 'current-accentColor', payload: accentColor });
      figma.ui.postMessage({ type: 'current-widgetCornerRadius', payload: widgetCornerRadius });
      console.log("This is the widget corner eradius`", widgetCornerRadius);
      figma.ui.onmessage = msg => {
        if (msg.type === 'close-plugin') {
          console.log("closed");
          setIsCrownButtonPressed(false);
          resolve();
        } else if (msg.type === 'back-action') {
          console.log("back");
          alreadyLoggedIn = true;
          handleOptionsClickChat().then(resolve).catch(reject);
        }
      };
      figma.on('close', () => {
        console.log("closed");
        setIsCrownButtonPressed(false);
        resolve();
      });
    });
  };


>>>>>>> main
  return (
    
    <AutoLayout
      direction="vertical"
      verticalAlignItems="start"
      spacing={getWidgetValue(8)}
      padding={getWidgetValue(8)}
      cornerRadius={getWidgetValue(widgetCornerRadius)}
      fill={'#FFFFFF'}
      stroke={borderColor}
      strokeWidth={getWidgetValue(borderWidth)}
      width={widgetWidth}
    >
    {/* Crown button in the top right, outside the white background */}
    <AutoLayout
      direction="horizontal"
      verticalAlignItems="start"
      width="fill-parent"
      horizontalAlignItems="end"
      height={getWidgetValue(20)}  // Adjust the height as needed
      padding={{ right: getWidgetValue(2), top: getWidgetValue(2) }}  // Adjust the padding as needed
    >
      <SVG src={adminI} onClick={handleOptionsClickChat} />
    </AutoLayout>
    <AutoLayout
    width="fill-parent"
    verticalAlignItems="center"
    onClick={() => setEditingIndex(-1)}  // Set the index to -1 to trigger title editing
  >
    {editingIndex === -1 ? (
      <Input
        value={title}
<<<<<<< HEAD
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
        totalVoters={combinedVoters.size}  // Pass combinedVoters.size here
        updateUserName={updateUserName}  // Pass updateUserName here
=======
        onTextEditEnd={(e) => handleValueChange(-1, e.characters)}  // Update the title on edit end
        placeholder="Enter poll title"
        width="fill-parent"
        fontSize={getWidgetValue(30)}   // Scale title size
        fontWeight="bold"
>>>>>>> main
      />
    ) : (
      <Text
        fontSize={getWidgetValue(30)}
        fontWeight="bold"
        width="fill-parent"
        horizontalAlignText="left"
      >
        {title || "Enter poll title"}
      </Text>
    )}
  </AutoLayout>
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
          votes={votes}            // Pass votes
          onVote={() => handleVote(index)}
          userVote={userVoteIndex === index}
          voters={voters[index]}          // Pass voters
          isAnonymous={isAnonymous}
<<<<<<< HEAD
          totalVoters={combinedVoters.size}  // Pass combinedVoters.size here
          updateUserName={updateUserName}  // Pass updateUserName here
=======
          totalVoters={combinedVoters.size}  
          updateUserName={updateUserName}  
          entries={entries}               // Pass entries
          pollId={pollId}                 // Pass pollId
          widgetWidth={widgetWidth}
          barColor={barColor}
          accentColor={accentColor}
          promptColor={promptColor}
>>>>>>> main
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
          <AutoLayout direction="horizontal" spacing={getWidgetValue(8)} verticalAlignItems="center">
            <AutoLayout
              direction="horizontal"
              spacing={getWidgetValue(8)}
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
            fill={accentColor}
            padding={{ left: getWidgetValue(10), right: getWidgetValue(10), top: getWidgetValue(5), bottom: getWidgetValue(5) }}
            cornerRadius={getWidgetValue(4)}
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
<<<<<<< HEAD
        <AutoLayout width="fill-parent" padding={{ top: 10 }}>
          <Text fontSize={12} fill="#808080" width="fill-parent">
=======
        <AutoLayout width="fill-parent" padding={{ top: getWidgetValue(10) }}>
          <Text fontSize={getWidgetValue(12)} fill="#808080" width="fill-parent">
>>>>>>> main
            Total votes: {combinedVoters.size}
          </Text>
        </AutoLayout>
      )}
    </AutoLayout>
  );
}

widget.register(PollingWidget);
getCurrentUser();
