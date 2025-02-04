const { widget } = figma;
const { AutoLayout, Text, Input, Image, SVG } = widget;

function Widget() {
  const [chartTitle, setChartTitle] = widget.useSyncedState("chartTitle", "Poll Results");
  const [dataPointLabels, setDataPointLabels] = widget.useSyncedState("dataPointLabels", {});
  const [widgetWidth, setWidgetWidth] = widget.useSyncedState("widgetWidth", 300);
  const [widgetHeight, setWidgetHeight] = widget.useSyncedState("widgetHeight", 300);
  const [titleFontSize, setTitleFontSize] = widget.useSyncedState("titleFontSize", 16);
  const [messageFontSize, setMessageFontSize] = widget.useSyncedState("messageFontSize", 14);
  const [chartColor, setChartColor] = widget.useSyncedState("chartColor", "#007AFF");

  const [chartImage, setChartImage] = widget.useSyncedState("chartImage", null);
  const [groupSet, setGroupSet] = widget.useSyncedState("groupSet", false);
  const [errorMessage, setErrorMessage] = widget.useSyncedState("errorMessage", "None");
  const [polls, setPolls] = widget.useSyncedState("polls", []);
  const [userInput, setUserInput] = widget.useSyncedState("userInput", "");

  // Open Admin Panel
  const openAdminMenu = () => {
    return new Promise((resolve) => {
      figma.showUI(__uiFiles__.optionsChat, { width: 400, height: 300 });
  
      figma.ui.postMessage({
        type: "load-admin-settings",
        payload: {
          chartTitle,
          dataPointLabels,
          widgetWidth,
          widgetHeight,
          titleFontSize,
          chartColor,
        },
      });
  
      figma.ui.onmessage = (msg) => {
        if (msg.type === "update-admin-settings") {
          console.log(msg.payload);
          setChartTitle(msg.payload.chartTitle);
          setDataPointLabels(msg.payload.dataPointLabels);
          setWidgetWidth(msg.payload.widgetWidth);
          setWidgetHeight(msg.payload.widgetHeight);
          setTitleFontSize(msg.payload.titleFontSize);
          setChartColor(msg.payload.chartColor);
        } else if (msg.type === "close-plugin") {
          figma.closePlugin();
          resolve(); // Resolve the promise when the UI is closed
        }
      };
    });
  };
  

  // Fetch Poll Data
  const fetchPollData = async () => {
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
      console.log("Fetched DATA:", data, "Type:", typeof data);
  
      // Ensure `data` is an array
      if (!Array.isArray(data)) {
        console.error("Invalid data format. Expected an array, got:", typeof data);
        throw new Error("Invalid data format: Expected an array.");
      }
  
      const sanitizedPolls = data.map(poll => ({
        title: poll.title,
        options: poll.options.map(option => ({
          text: option.text,
          votes: option.votes
        }))
      }));
  
      console.log("Sanitized Polls:", sanitizedPolls);
      
      // Ensure `polls` is always an array
      setPolls(Array.isArray(sanitizedPolls) ? sanitizedPolls : []);
  
      if (sanitizedPolls.length === 0) {
        setErrorMessage("No polls available to render.");
        return;
      }
  
      return new Promise((resolve) => {
        figma.showUI(__uiFiles__.main, { width: 400, height: 400 });
  
        figma.ui.postMessage({
          type: 'render-polar-plot',
          payload: { sanitizedPolls, chartTitle, dataPointLabels, chartColor, titleFontSize },
        });
  
        figma.ui.onmessage = (message) => {
          console.log("Received message from UI:", message);
          
          if (message.type === 'chart-image') {
            setChartImage(message.payload);
            figma.closePlugin();
            resolve();
          } else {
            console.warn("Unexpected message type:", message.type);
          }
        };
      });
  
    } catch (error) {
      console.error("Error fetching polls:", error);
      setErrorMessage(error.message || "An error occurred.");
      setPolls([]); // Ensure `polls` is always an empty array in case of an error
    }
  };
  

  return (
    <AutoLayout direction="vertical" spacing={16} padding={16} width={widgetWidth}>
      {/* Admin Menu Button */}
      <AutoLayout
        padding={6}
        cornerRadius={4}
        fill="#333"
        onClick={openAdminMenu}
      >
        <Text fill="#FFFFFF" fontSize={12}>⚙️ Admin Settings</Text>
      </AutoLayout>

      {!groupSet ? (
        <AutoLayout
          direction="horizontal"
          spacing={8}
          padding={8}
          fill="#F0F0F0"
          cornerRadius={8}
          width="fill-parent"
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
            fill={chartColor}
            onClick={fetchPollData}
          >
            <SVG
              src={`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>`}
              width={20}
              height={20}
            />
          </AutoLayout>
        </AutoLayout>
      ) : (
        <AutoLayout
          padding={8}
          cornerRadius={4}
          fill="#FFA500"
          onClick={fetchPollData}
        >
          <Text fill="#FFFFFF">Refresh Chart</Text>
        </AutoLayout>
      )}

      {chartImage && (
        <Image src={chartImage} width={widgetWidth} height={widgetHeight} cornerRadius={8} />
      )}

      {errorMessage && errorMessage !== "None" && (
        <Text fill="#FF0000" fontSize={12}>{errorMessage}</Text>
      )}
    </AutoLayout>
  );
}

widget.register(Widget);
