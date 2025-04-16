const { widget, showUI, ui } = figma;

import { widgetVersion } from "./version";

const { useSyncedState, useSyncedMap, AutoLayout, Input, Text, SVG, Image, useEffect } = widget;

const AnonSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
<defs>
</defs>
<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
	<path d="M 45 88 c -11.049 0 -21.18 -2.003 -29.021 -8.634 C 6.212 71.105 0 58.764 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 c 0 13.765 -6.212 26.105 -15.979 34.366 C 66.181 85.998 56.049 88 45 88 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(214,214,214); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 45 60.71 c -11.479 0 -20.818 -9.339 -20.818 -20.817 c 0 -11.479 9.339 -20.818 20.818 -20.818 c 11.479 0 20.817 9.339 20.817 20.818 C 65.817 51.371 56.479 60.71 45 60.71 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(165,164,164); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 45 90 c -10.613 0 -20.922 -3.773 -29.028 -10.625 c -0.648 -0.548 -0.88 -1.444 -0.579 -2.237 C 20.034 64.919 31.933 56.71 45 56.71 s 24.966 8.209 29.607 20.428 c 0.301 0.793 0.069 1.689 -0.579 2.237 C 65.922 86.227 55.613 90 45 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(165,164,164); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
</g>
</svg>`;

const Dropdown: any = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useSyncedState("dropdownOpen", false);

  return (
    <AutoLayout direction="vertical" spacing={4}>
      <AutoLayout onClick={() => setIsOpen(!isOpen)} fill="#E6E6E6" padding={8} cornerRadius={4}>
        <Text fontSize={14}>{value || "Select a Likert Scale"}</Text>
      </AutoLayout>
      {isOpen && (
        <AutoLayout direction="vertical" spacing={4} padding={4} fill="#F9F9F9" cornerRadius={4}>
          {options.map((option, index) => (
            <AutoLayout key={index} onClick={() => { onChange(option); setIsOpen(false); }}>
              <Text fontSize={12}>{option}</Text>
            </AutoLayout>
          ))}
        </AutoLayout>
      )}
    </AutoLayout>
  );
};



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
  handleVote: () => void;
  updateUserName: () => void;
  userVote: boolean;
  voters: CustomUser[];
  isAnonymous: boolean;
  isMultiVoteEnabled: boolean;
  totalVoters: number;
  entries: string[];    // Add entries prop
  pollId: string; // Add pollId prop
  widgetWidth: number;
  barColor: string;
  accentColor: string;
  promptColor: string;
  fontSize: number;
}


function ProgressBar({ votes, totalVotes, widgetWidth, barColor, barWidth }: { votes: number; totalVotes: number; widgetWidth: number; barColor: string, barWidth: number }) {
  function getWidgetValue(input: number): number {
    const currentWidgetWidth = widgetWidth; // Get the current widget width
    const scalingRatio = currentWidgetWidth / 800; // Calculate the scaling ratio
    return Math.floor(input * scalingRatio); // Scale the input value by the ratio
  }
  const parentWidth = barWidth;
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
  isMultiVoteEnabled,
  totalVoters,
  updateUserName,  // Accept totalVoters and updateUserName
  pollId,          // Add pollId for context if needed
  entries,          // Add entries for additional context
  widgetWidth,
  barColor,
  accentColor,
  promptColor,
  fontSize
}: TextBoxProps & { totalVoters: number; pollId?: string; entries?: string[] }) {

  function getWidgetValue(input: number): number {
    const currentWidgetWidth = widgetWidth; // Get the current widget width
    const scalingRatio = currentWidgetWidth / 800; // Calculate the scaling ratio
    return Math.floor(input * scalingRatio); // Scale the input value by the ratio
  }

  const handleEditEnd = (e: { characters: string }) => {
    onValueChange(index, e.characters);
    setEditingIndex(null);
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(index);
    }
  };
  

  const handleClick = async () => {
    updateUserName();  // Ensure the user name is up-to-date
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
  
  
  
// Now the voters array contains both the original and fake voters



const displayedVoters = (voters || []).slice(0, 4);
  console.log("Voters:");
  displayedVoters.forEach((voter, i) => {
    console.log(`Voter ${i + 1}: Name = ${voter.name}, Photo URL = ${voter.photoUrl}`);
  });
  console.log(displayedVoters.length);
const additionalVotes = (voters?.length || 0) - displayedVoters.length;
  console.log(additionalVotes);

  return (
    <AutoLayout direction="vertical" spacing={getWidgetValue(4)} width="fill-parent">
      <AutoLayout direction="horizontal" spacing={getWidgetValue(4)}  verticalAlignItems="center" width="fill-parent" onClick={handleClick}>
        <AutoLayout
          direction="horizontal"
          spacing={getWidgetValue(8)}
          padding={getWidgetValue(8)}
          cornerRadius={getWidgetValue(12)}
          stroke={isEditing ? accentColor : '#E6E6E6'}
          strokeWidth={getWidgetValue(4)}
          verticalAlignItems="center"
          fill={'#FFFFFF'}
          width={submitted && !isQuestion ? "hug-contents" : "fill-parent"}
          height='hug-contents'
        >
          {isEditing ? (
            <Input
              value={value}
              onTextEditEnd={handleEditEnd}
              placeholder={isQuestion ? "Enter poll question" : "Enter option"}
              cornerRadius={getWidgetValue(12)}
              width="fill-parent"
              fontSize={isQuestion ? fontSize : fontSize - 4}
            />
          ) : (
            <Text 
              fontSize={isQuestion ? fontSize : fontSize - 4} 
              fontWeight={isQuestion ? 'bold' : 'normal'}
              width={submitted && !isQuestion ? "hug-contents" : "fill-parent"} 
              fill={promptColor}>
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
          <AutoLayout 
          direction="horizontal" 
          spacing={getWidgetValue(4)} 
          verticalAlignItems="center"
          horizontalAlignItems="end"
          cornerRadius={getWidgetValue(12)}
          width="hug-contents"  // Ensures it only takes necessary space
        >
          <Text fontSize={fontSize} fill={userVote ? barColor : "#000000"}>
            {displayedVoters.length + additionalVotes}
          </Text>
          {displayedVoters.map((voter, i) => (
            <AutoLayout
              tooltip= {voter.name}
            >
              
            <Image 
              key={i} 
              src={isAnonymous ? AnonSVG : voter.photoUrl} 
              width={fontSize} 
              height={fontSize} 
              cornerRadius={fontSize} 
            />
            </AutoLayout>
          ))}
           {displayedVoters.length >= 4 && (
            <AutoLayout
                   fill="#808080"
                  verticalAlignItems="center"
                  horizontalAlignItems="center"
                  tooltip= {voters.slice(4).map(voter => voter.name).join(', ')}
                  >
                    <Text fontSize={12} fill="#FFFFFF">
                    + {displayedVoters.length + additionalVotes - 4}
                    </Text>
                    </AutoLayout>
            )
            }

          {additionalVotes > 0 && (
            <Text fontSize={getWidgetValue(28)} fill="#000000">
              +{additionalVotes}
            </Text>
          )}
        </AutoLayout>
        
        )}

      </AutoLayout>
      {!isQuestion && submitted && (
        <ProgressBar barWidth={getWidgetValue(650)} votes={displayedVoters.length + additionalVotes} totalVotes={totalVoters} widgetWidth={widgetWidth} barColor={barColor}/>
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
  const [isAnonymous, setIsAnonymous] = useSyncedState<boolean>('isAnonymous', false);
  const [pollId, setPollId] = useSyncedState<string>('pollId', "");
  const [logId, setLogId] = useSyncedState<string>('logId', "");
  const [isMultiVoteEnabled, setIsMultiVoteEnabled] = useSyncedState<boolean>('isMultiVoteEnabled', false); 
  const userVotes = useSyncedMap<number[]>('userVotes');

  const [inPrompt, setPrompt] = useSyncedState('Prompt not set', '');
  const [isCrownButtonPressed, setIsCrownButtonPressed] = useSyncedState('isCrownButtonPressed', false);

  const [widgetWidth, setWidgetWidth] = useSyncedState<number>('widgetWidth', 300);
  const [borderWidth, setBorderWidth] = useSyncedState<number>('borderWidth', 2);
  const [borderColor, setBorderColor] = useSyncedState<string>('borderColor', '#E6E6E6');
  const [promptColor, setPromptColor] = useSyncedState<string>('promptColor', '#000000');
  const [barColor, setBarColor] = useSyncedState<string>('barColor', '#A259FF');
  const [accentColor, setAccentColor] = useSyncedState<string>('accentColor', '#24CE16');

  const [widgetCornerRadius, setWidgetCornerRadius] = useSyncedState<number>('widgetCornerRadius', 15);
  const [subheading, setSubheading] = useSyncedState<string>('subheading', "");

  const [headingFontSize, setHeadingFontSize] = useSyncedState<number>('headingFontSize', 20);
  const [subheadingFontSize, setSubheadingFontSize] = useSyncedState<number>('subheadingFontSize', 14);
  const [choiceFontSize, setChoiceFontSize] = useSyncedState<number>('choiceFontSize', 16);
  const [publishedAt, setPublishedAt] = useSyncedState<string>(
    'publishedAt',
    getPSTDateFromVersion(widgetVersion)
  );
  const [widgetGroup, setWidgetGroup] = useSyncedState<string>('widgetGroup',"");
  const [selectedScale, setSelectedScale] = useSyncedState("selectedScale", null);

const likertScales: Record<string, string[]> = {
  fourPointAgreeDisagree: ["Agree", "Somewhat Agree", "Somewhat Disagree", "Disagree"],
  fourPointIntensity: ["Not at all", "Slightly", "Moderately", "Extremely"],
  fivePointDiverging: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
  fivePointIntensity: ["Never", "Rarely", "Sometimes", "Often", "Always"]
};


function handleScaleSelection(scaleKey: string) {
  if (likertScales[scaleKey]) {
      setSelectedScale(scaleKey);
      setEntries([...likertScales[scaleKey]]);
  }
}
  
  function getPSTDateFromVersion(versionDate: string): string {
    const date = new Date(versionDate);
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const pstOffset = -8 * 60 * 60000; // PST is UTC-8
    const pstDate = new Date(utc + pstOffset);
    console.log("DATE", pstDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));

    return pstDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
  }
  
  // Track logId changes
  useEffect(() => {
    console.log("LogId updated:", logId);
  }, [logId]);

  function getWidgetValue(input: number): number {
    const currentWidgetWidth = widgetWidth; // Get the current widget width
    const scalingRatio = currentWidgetWidth / 400; // Calculate the scaling ratio
    return Math.floor(input * scalingRatio); // Scale the input value by the ratio
  }

  const handleValueChange = (index: number, newValue: string) => {
    if (index === -1) {
      setTitle(newValue);
    } else if (index === -2) {  // Use index -2 for subheading
      setSubheading(newValue);
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

  const handleVote = async (index: number) => {
    // Update the user's name before proceeding
    updateUserName();
    console.log(entries);
    console.log(votes);
    console.log(voters);
  
    // Assuming userName is the state variable holding the updated user name
    const userName = figma.currentUser ? figma.currentUser.name : 'Unknown User';
  
    const newVotes = [...votes];
    const newVoters = [...voters];
    console.log('MULTIVOTE TRUE');
    console.log(isMultiVoteEnabled);
    // Ensure the user is removed from all other voters arrays
    
if (isMultiVoteEnabled) {
  // Multi-vote ON: Check if user already voted for this option
  const alreadyVoted = newVoters[index].some(voter => voter.name === userName);

  if (alreadyVoted) {
      // Remove vote from this option
      newVoters[index] = newVoters[index].filter(voter => voter.name !== userName);
      newVotes[index]--;
  } else {
      // Add vote to this option
      newVoters[index] = [...newVoters[index], { name: userName, photoUrl: figma.currentUser?.photoUrl || '' }];
      newVotes[index]++;
  }
} else {
  // Multi-vote OFF: Ensure the user only votes for one option
  newVoters.forEach((voterArray, i) => {
      newVoters[i] = voterArray.filter(voter => voter.name !== userName);
      if (userVoteIndex === i) {
          newVotes[i]--;  // Decrease vote count for the previous option
      }
  });

  if (userVoteIndex !== index) {
      // If user is voting for a new option
      newVotes[index]++;
      newVoters[index] = [...newVoters[index], { name: userName, photoUrl: figma.currentUser?.photoUrl || '' }];
      setUserVoteIndex(index);
  } else {
      // If user is unvoting the same option, reset userVoteIndex
      setUserVoteIndex(null);
  }
}
      // Add the vote to the new option if it's a different one
 

      //check if user is already in option voting array and remove vote if true

  
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
  
    console.log("UPDATED POLL1");
    console.log(updatedPoll);
    console.log(pollId);
    console.log(votes);
  
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
  const toggleMultiSelect = () => {
    setIsMultiVoteEnabled(prevState => !prevState);
  };
  
  console.log(userName);
  const handleSubmit = async () => {
    console.log(`isAnonymous before submit: ${isAnonymous}`);
    // Prepare the data to be sent to the server
    const pollData = {
      title,
      subheading,
      options: entries.map(entry => ({
        text: entry,        
        votes: 0, 
        voters: []
      })),
      totalVotes: 0,
      isAnonymous: isAnonymous,
      isMultiVoteEnabled: isMultiVoteEnabled,
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
    setEntries(entries.map(entry => entry));
    setTitle(title);
    setEditingIndex(null);
    setSubmitted(true);
    setSubheading(subheading);
  };
  
  
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
      setPublishedAt(getPSTDateFromVersion(widgetVersion));
      console.log("Current publishedAt state:", publishedAt);
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
    figma.ui.postMessage({
      type: 'current-publishedAt',
      payload: getPSTDateFromVersion(widgetVersion),
    });
    figma.ui.postMessage({ type: 'current-headingFontSize', payload: headingFontSize });
    figma.ui.postMessage({ type: 'current-subheadingFontSize', payload: subheadingFontSize });
    figma.ui.postMessage({ type: 'current-choiceFontSize', payload: choiceFontSize });
    figma.ui.postMessage({ type: 'current-widgetGroup', payload: widgetGroup });
    

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
      } else if (msg.type === 'update-subheading') {
        console.log("Opening UI for subheading edit");
        figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
        figma.ui.postMessage({ type: 'edit-subheading', payload: subheading });
  
        figma.ui.onmessage = msg => {
            if (msg.type === 'update-message') {
                const updatedSubheading = msg.payload.message;
                console.log("Updated Subheading:", updatedSubheading);
                setSubheading(updatedSubheading);
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
        };}
        else if (msg.type === 'update-headingFontSize') {
          figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
          figma.ui.postMessage({ type: 'edit-headingFontSize', payload: headingFontSize.toString() });
      
          figma.ui.onmessage = msg => {
              if (msg.type === 'update-message') {
                  setHeadingFontSize(Number(msg.payload.message));
                  alreadyLoggedIn = true;

                  setIsCrownButtonPressed(true);

              }
              else if (msg.type === 'close-plugin') {
                console.log("closed");
                setIsCrownButtonPressed(false);
                figma.closePlugin();
            } else if (msg.type === 'back-action') {
                console.log("back");
                alreadyLoggedIn = true;
                handleOptionsClickChat();
            }
          };
      } else if (msg.type === 'update-subheadingFontSize') {
          figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
          figma.ui.postMessage({ type: 'edit-subheadingFontSize', payload: subheadingFontSize.toString() });
      
          figma.ui.onmessage = msg => {
              if (msg.type === 'update-message') {
                  setSubheadingFontSize(Number(msg.payload.message));
                  alreadyLoggedIn = true;

                  setIsCrownButtonPressed(true);

              }
              else if (msg.type === 'close-plugin') {
                console.log("closed");
                setIsCrownButtonPressed(false);
                figma.closePlugin();
            } else if (msg.type === 'back-action') {
                console.log("back");
                alreadyLoggedIn = true;
                handleOptionsClickChat();
                setIsCrownButtonPressed(true);

            }
          };
      } else if (msg.type === 'update-choiceFontSize') {
          figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
          figma.ui.postMessage({ type: 'edit-choiceFontSize', payload: choiceFontSize.toString() });
      
          figma.ui.onmessage = msg => {
              if (msg.type === 'update-message') {
                  setChoiceFontSize(Number(msg.payload.message));
                  alreadyLoggedIn = true;
                  setIsCrownButtonPressed(true);


              }
              else if (msg.type === 'close-plugin') {
                console.log("closed");
                setIsCrownButtonPressed(false);
                figma.closePlugin();
            } else if (msg.type === 'back-action') {
                console.log("back");
                alreadyLoggedIn = true;
                handleOptionsClickChat();
            }
          };
      }
      else if (msg.type === 'update-widgetGroup') {
        setWidgetGroup(msg.payload); // Store in state
      }
      
    };
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


  return (
    <AutoLayout
      direction="vertical"
      verticalAlignItems="start"
      spacing={getWidgetValue(8)}
      padding={getWidgetValue(24)}
      cornerRadius={getWidgetValue(widgetCornerRadius)}
      fill={'#FFFFFF'}
      stroke={borderColor}
      strokeWidth={getWidgetValue(borderWidth)}
      width={widgetWidth}
    >
      <AutoLayout direction="vertical" spacing={8} padding={8}>
      <Dropdown
        options={Object.keys(likertScales)}
        value={selectedScale}
        onChange={handleScaleSelection}
      />
    </AutoLayout>

<AutoLayout
  direction="horizontal"
  width="fill-parent"
  spacing={getWidgetValue(0)}
  verticalAlignItems="center"
>
  {/* Title Section */}
  <AutoLayout
  width="fill-parent"
  verticalAlignItems="center"
  onClick={() => !submitted && setEditingIndex(-1)} // Prevent editing if submitted
  padding={{ left: getWidgetValue(2) }}
>
  {editingIndex === -1 ? (
    <Input
      value={title}
      onTextEditEnd={(e) => handleValueChange(-1, e.characters)}
      placeholder="Enter poll title"
      width="fill-parent"
      fontSize={headingFontSize}
      fontWeight="bold"
      horizontalAlignText="left"
    />
  ) : (
    <Text
      fontSize={headingFontSize}
      fontWeight="bold"
      width="fill-parent"
      horizontalAlignText="left"
    >
      {title || "Enter poll title"}
    </Text>
  )}
</AutoLayout>

  {/* Crown button aligned to the end */}
  <AutoLayout
    direction="horizontal"
    verticalAlignItems="start"
    width="hug-contents" 
    height={getWidgetValue(20)}
    padding={{ right: getWidgetValue(2), top: getWidgetValue(2) }}
  >
    <SVG src={adminI} onClick={handleOptionsClickChat} />
  </AutoLayout>
</AutoLayout>

      {/* Subheading Section */}
      <AutoLayout
  width="fill-parent"
  verticalAlignItems="center"
  onClick={() => !submitted && setEditingIndex(-2)} // Prevent editing if submitted
>
  {editingIndex === -2 ? (
    <Input
      value={subheading}
      onTextEditEnd={(e) => handleValueChange(-2, e.characters)}
      placeholder="Enter subheading"
      width="fill-parent"
      fontSize={subheadingFontSize}
      fontWeight="normal"
      fill="#666666"
    />
  ) : (
    <Text
      fontSize={subheadingFontSize}
      fontWeight="normal"
      width="fill-parent"
      horizontalAlignText="left"
      fill="#666666"
    >
      {subheading || "Enter subheading"}
    </Text>
  )}
</AutoLayout>
  
      {/* Poll Options */}
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
          votes={votes}
          onVote={() => handleVote(index)}
          userVote={userVoteIndex === index}
          voters={voters[index]}
          isAnonymous={isAnonymous}
          totalVoters={combinedVoters.size}
          updateUserName={updateUserName}
          entries={entries}
          pollId={pollId}
          isMultiVoteEnabled = {isMultiVoteEnabled}
          widgetWidth={widgetWidth}
          barColor={barColor}
          accentColor={accentColor}
          promptColor={promptColor}
          fontSize = {choiceFontSize}
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
              <Text fontSize={12} fill="#000000">Vote Anonymously</Text>
            </AutoLayout>
            <AutoLayout
                    direction="horizontal"
                    spacing={getWidgetValue(8)}
                    verticalAlignItems="center"
                    onClick={toggleMultiSelect}
                  >
                    <SVG
                      src={`<svg width="16" height="16" viewBox="0 0 16 16" fill="${isMultiVoteEnabled ? 'black' : 'none'}" stroke="black" stroke-width="2">
                              <rect width="16" height="16" rx="2" />
                            </svg>`}
                    />
                    <Text fontSize={12} fill="#000000">Multi Select</Text>
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
        <>
        <AutoLayout width="fill-parent" padding={{ top: getWidgetValue(10) }}>
          <Text fontSize={choiceFontSize} fill="#808080" width="fill-parent">
            Total votes: {combinedVoters.size}
          </Text>
        </AutoLayout>
         </>
      )}

    </AutoLayout>
    
  );
}

widget.register(PollingWidget);
getCurrentUser();
