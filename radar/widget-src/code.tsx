const { widget } = figma;
const { AutoLayout, Text, Input, Rectangle, Line } = widget;

function Widget() {
  const [userInput, setUserInput] = widget.useSyncedState("userInput", "None");
  const [errorMessage, setErrorMessage] = widget.useSyncedState("errorMessage", "None");
  const [polls, setPolls] = widget.useSyncedState("polls", []);

  const handleButtonClick = async () => {
    if (!userInput.trim()) {
      setErrorMessage("Please enter a group name.");
      return;
    }

    setErrorMessage("None"); // Clear any previous error messages

    try {
      const response = await fetch(`http://localhost:4000/polls/group/${userInput}`);
      if (!response.ok) throw new Error("Failed to fetch polls.");

      const data = await response.json();

      console.log("Raw Poll Data:", data);

      function sanitizePolls(polls) {
        return polls.map(poll => ({
          title: poll.title,
          options: poll.options.map(option => ({
            text: option.text,
            votes: option.votes
          }))
        }));
      }

      const polls = sanitizePolls(data);
      console.log(polls);

      setPolls(polls); // Set sanitized polls
    } catch (error) {
      console.error("Error fetching polls:", error);
      setErrorMessage(error.message || "An error occurred.");
      setPolls([]); // Clear polls on error
    }
  };

  const renderShape = async () => {
    if (polls.length === 0) {
      return null;
    }
  
    try {
      // Prepare data for the API
      const formattedData = polls.map((poll, index) => ({
        title: poll.title,
        values: poll.options.map((option, i) => ({
          weight: 5 - i,
          votes: option.votes,
        })),
      }));
  
      // Call the external API to generate the polar plot image
      const response = await fetch("https://your-polar-plot-api.com/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ polls: formattedData }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to generate polar plot image.");
      }
  
      const { imageUrl } = await response.json();
  
      return (
        <AutoLayout direction="vertical" spacing={16} padding={16}>
          <Text>Polar Plot:</Text>
          <Image src={imageUrl} width="fill-parent" height={300} />
        </AutoLayout>
      );
    } catch (error) {
      console.error("Error generating polar plot image:", error);
      setErrorMessage("Error generating polar plot image.");
      return null;
    }
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  return (
    <AutoLayout direction="vertical" spacing={16} padding={16}>
      <Input
        placeholder="Enter Group Name"
        value={userInput}
        onTextEditEnd={(event) => setUserInput(event.characters?.trim() || "")}
        width="fill-parent"
      />
      <AutoLayout
        direction="horizontal"
        spacing={8}
        padding={8}
        cornerRadius={4}
        fill="#007AFF"
        verticalAlignItems="center"
        horizontalAlignItems="center"
        onClick={handleButtonClick}
      >
        <Text fill="#FFFFFF">Fetch Polls</Text>
      </AutoLayout>

      {errorMessage && (
        <Text fill="#FF0000" fontSize={12}>
          {errorMessage}
        </Text>
      )}

      {polls.length > 0 && renderShape()}
    </AutoLayout>
  );
}

widget.register(Widget);
