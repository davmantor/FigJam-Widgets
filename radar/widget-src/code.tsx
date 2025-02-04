const { widget } = figma;
const { AutoLayout, Text, Input, Image, SVG } = widget;

function Widget() {
  const [userInput, setUserInput] = widget.useSyncedState("userInput", "");
  const [errorMessage, setErrorMessage] = widget.useSyncedState("errorMessage", "None");
  const [polls, setPolls] = widget.useSyncedState("polls", []);
  const [chartImage, setChartImage] = widget.useSyncedState("chartImage", null);
  const [groupSet, setGroupSet] = widget.useSyncedState("groupSet", false);

  const handleButtonClick = async () => {
    if (!userInput.trim()) {
      setErrorMessage("Please enter a group name.");
      return;
    }

    setErrorMessage("None"); // Clear any previous error messages
    setGroupSet(true); // Lock the group name after the first search

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

      const sanitizedPolls = sanitizePolls(data);
      console.log(sanitizedPolls);

      setPolls(sanitizedPolls); // Set sanitized polls

      if (sanitizedPolls.length === 0) {
        setErrorMessage("No polls available to render.");
        return;
      }

      return new Promise((resolve) => {
        // Show the UI
        figma.showUI(__uiFiles__.main, { width: 400, height: 400 });

        // Send the poll data to the UI
        figma.ui.postMessage({
          type: 'render-polar-plot',
          payload: sanitizedPolls,
        });

        // Listen for messages from the UI
        figma.ui.onmessage = (message) => {
          if (message.type === 'chart-image') {
            // Save the received chart image
            setChartImage(message.payload);
            figma.closePlugin();
            resolve();
          }
        };
      });

    } catch (error) {
      console.error("Error fetching polls:", error);
      setErrorMessage(error.message || "An error occurred.");
      setPolls([]); // Clear polls on error
    }
  };

  return (
    <AutoLayout direction="vertical" spacing={16} padding={16} width={300}>
      {!groupSet ? (
        // Initial Search Bar with Clickable Search Icon
        <AutoLayout
          direction="horizontal"
          spacing={8}
          padding={8}
          fill="#F0F0F0"
          cornerRadius={8}
          width={250}
          verticalAlignItems="center"
        >
          <Input
            placeholder="Search Group Name..."
            value={userInput}
            onTextEditEnd={(event) => setUserInput(event.characters?.trim() || "")}
            width="fill-parent"
          />
          <AutoLayout
            padding={4}
            cornerRadius={50}
            fill="#007AFF"
            onClick={handleButtonClick}
            verticalAlignItems="center"
            horizontalAlignItems="center"
          >
            <SVG
              src={`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>`}
              width={20}
              height={20}
            />
          </AutoLayout>
        </AutoLayout>
      ) : (
        // Refresh Button Once Group Name is Set
        <AutoLayout
          direction="horizontal"
          spacing={8}
          padding={8}
          cornerRadius={4}
          fill="#FFA500"
          verticalAlignItems="center"
          horizontalAlignItems="center"
          onClick={handleButtonClick}
        >
          <SVG
            src={`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.36-5.36l3.13 3.13M20.49 15a9 9 0 0 1-14.36 5.36l-3.13-3.13"></path>
            </svg>`}
            width={20}
            height={20}
          />
          <Text fill="#FFFFFF">Refresh Chart</Text>
        </AutoLayout>
      )}

      {chartImage && (
        <Image
          src={chartImage}
          width={300}
          height={300}
          cornerRadius={8}
        />
      )}

      {errorMessage && errorMessage !== "None" && (
        <Text fill="#FF0000" fontSize={12}>
          {errorMessage}
        </Text>
      )}
    </AutoLayout>
  );
}

widget.register(Widget);
