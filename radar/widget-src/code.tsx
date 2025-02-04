const { widget } = figma;
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

  const handleButtonClick = async () => {
    if (!userInput.trim()) {
      setErrorMessage("Please enter a group name.");
      return;
    }

    setErrorMessage("None");
    setGroupSet(true);

    try {
      const response = await fetch(`http://localhost:4000/polls/group/${userInput}`);
      if (!response.ok) throw new Error("Failed to fetch polls.");

      const data = await response.json();

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
      <Input
        placeholder="Enter Group Name"
        value={userInput}
        onTextEditEnd={(event) => setUserInput(event.characters?.trim() || "")}
        width="fill-parent"
      />
      <AutoLayout fill="#007AFF" padding={8} cornerRadius={8} onClick={handleButtonClick}>
        <Text fill="white">Generate Chart</Text>
      </AutoLayout>

      {chartImage && <Image src={chartImage} width={300} height={300} cornerRadius={8} />}
      {errorMessage !== "None" && <Text fill="#FF0000">{errorMessage}</Text>}
    </AutoLayout>
  );
}

widget.register(Widget);
