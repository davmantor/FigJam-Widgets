const { widget } = figma;
<<<<<<< HEAD
const { AutoLayout, Text, Input, Image, SVG } = widget;

function Widget() {
  const [userInput, setUserInput] = widget.useSyncedState("userInput", "");
  const [errorMessage, setErrorMessage] = widget.useSyncedState("errorMessage", "None");
  const [polls, setPolls] = widget.useSyncedState("polls", []);
  const [chartImage, setChartImage] = widget.useSyncedState("chartImage", null);
  const [groupSet, setGroupSet] = widget.useSyncedState("groupSet", false);
  const [chartSettings, setChartSettings] = widget.useSyncedState("chartSettings", {
    title: "Poll Results",
    width: 400,
    height: 400,
    titleFontSize: 16,
    bodyFontSize: 12,
    chartColor: "#32CD32",
    pointLabels: "",
  });
=======
const { AutoLayout, Text, Input, Rectangle, Line } = widget;

function Widget() {
  const [userInput, setUserInput] = widget.useSyncedState("userInput", "None");
  const [errorMessage, setErrorMessage] = widget.useSyncedState("errorMessage", "None");
  const [polls, setPolls] = widget.useSyncedState("polls", []);
>>>>>>> main

  const handleButtonClick = async () => {
    if (!userInput.trim()) {
      setErrorMessage("Please enter a group name.");
      return;
    }

<<<<<<< HEAD
    setErrorMessage("None");
    setGroupSet(true);
=======
    setErrorMessage("None"); // Clear any previous error messages
>>>>>>> main

    try {
      const response = await fetch(`http://localhost:4000/polls/group/${userInput}`);
      if (!response.ok) throw new Error("Failed to fetch polls.");

      const data = await response.json();

<<<<<<< HEAD
=======
      console.log("Raw Poll Data:", data);

>>>>>>> main
      function sanitizePolls(polls) {
        return polls.map(poll => ({
          title: poll.title,
          options: poll.options.map(option => ({
            text: option.text,
            votes: option.votes
          }))
        }));
      }

<<<<<<< HEAD
      const sanitizedPolls = sanitizePolls(data);
      setPolls(sanitizedPolls);

      if (sanitizedPolls.length === 0) {
        setErrorMessage("No polls available to render.");
        return;
      }

      return new Promise((resolve) => {
        figma.showUI(__uiFiles__.main, { width: 500, height: 500 });

        figma.ui.postMessage({
          type: 'render-polar-plot',
          payload: sanitizedPolls,
          settings: chartSettings
        });

        figma.ui.onmessage = (message) => {
          if (message.type === 'chart-image') {
            setChartImage(message.payload);
            figma.closePlugin();
            resolve();
          }
        };
      });

    } catch (error) {
      setErrorMessage(error.message || "An error occurred.");
      setPolls([]);
    }
  };

  return (
    <AutoLayout direction="vertical" spacing={16} padding={16} width={300}>
      <Text fontSize={14} fontWeight="bold">Radar Chart Generator</Text>
=======
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
>>>>>>> main
      <Input
        placeholder="Enter Group Name"
        value={userInput}
        onTextEditEnd={(event) => setUserInput(event.characters?.trim() || "")}
        width="fill-parent"
      />
<<<<<<< HEAD
      <AutoLayout fill="#007AFF" padding={8} cornerRadius={8} onClick={handleButtonClick}>
        <Text fill="white">Generate Chart</Text>
      </AutoLayout>

      {chartImage && <Image src={chartImage} width={300} height={300} cornerRadius={8} />}
      {errorMessage !== "None" && <Text fill="#FF0000">{errorMessage}</Text>}
=======
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
>>>>>>> main
    </AutoLayout>
  );
}

widget.register(Widget);
