const { widget } = figma;
const { useEffect, Text, useSyncedState, Input, AutoLayout } = widget;

function Widget() {
  const [response, setResponse] = useSyncedState<string>("response", "");
  const [displayText, setDisplayText] = useSyncedState<string>("displayText", "");
  const [submitted, setSubmitted] = useSyncedState<boolean>("submitted", false);
  const [showPrevious, setShowPrevious] = useSyncedState<boolean>("showPrevious", false);
  const [previousResponses, setPreviousResponses] = useSyncedState<string[]>("previousResponses", []);
  const [widgetId, setWidgetId] = useSyncedState<string>("widgetId", "");
  const [width, setWidth] = useSyncedState<number>("width", 400);
  const [height, setHeight] = useSyncedState<number>("height", 400);

  useEffect(() => {
    figma.ui.onmessage = (msg) => {
      if (msg.type === 'updateText') {
        setDisplayText(msg.text);
      }
      if (msg.type === 'close') {
        figma.closePlugin();
      }
      if (msg.type === 'refresh') {
        handleRefresh();
      }
      if (msg.type === 'revealAll') {
        handleRevealAll();
      }
      if (msg.type === 'resize') {
        setWidth(msg.width);
        setHeight(msg.height);
      }
    };

    // Initial refresh to get the latest data from the database
    handleRefresh();
  });

  const handleRefresh = async () => {
    const data = { widgetId };

    try {
      const res = await fetch('http://localhost:3000/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if (result.status === 'new') {
        setWidgetId(result.widget.widgetId);
      }
      if (result.widget.previous.length > 0) {
        setPreviousResponses(result.widget.previous);
      }
      setShowPrevious(result.widget.showPrevious);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async () => {
    if (response.trim() === "") {
      console.error('Cannot submit an empty response.');
      return;
    }
    setSubmitted(true);
    setPreviousResponses(prev => [response, ...prev]); // Add the response to the first index

    const newWidgetId = widgetId ? widgetId : new Date().toISOString();
    const data = { widgetId: newWidgetId, response };

    try {
      const res = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (res.status === 200) {
        // Update the widgetId state if a new widget is created
        if (result.status === 'new') {
          setWidgetId(newWidgetId);
        }
        // Refresh the data after submission to get the latest from the database
        handleRefresh();
      } else {
        console.error('Failed to submit data.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRevealAll = async () => {
    const data = { widgetId };
    try {
      const res = await fetch('http://localhost:3000/reveal-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const result = await res.json();
        setShowPrevious(true);
        setPreviousResponses(result.widget.previous);
      } else {
        console.error('Failed to reveal all data.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openAdminMenu = () => {
    figma.showUI(__html__, { width: 300, height: 400 });
    return new Promise(() => {});
  };

  return (
    <AutoLayout
      direction="vertical"
      padding={20}
      spacing={10}
      width={width}
      height={height}
      fill="#FFFFFF"
      cornerRadius={10}
      effect={{
        type: 'drop-shadow',
        color: '#000000',
        offset: { x: 0, y: 2 },
        blur: 10,
        spread: 0,
      }}
    >
      {!submitted && (
        <>
          <Input
            placeholder="Type here"
            value={response}
            onTextEditEnd={(event) => setResponse(event.characters)}
            width="fill-parent"
            fontSize={16}
            fill="#333"
            stroke="#ccc"
          />
          <AutoLayout
            fill="#007BFF"
            padding={{ left: 10, right: 10, top: 5, bottom: 5 }}
            cornerRadius={5}
            width="fill-parent"
            horizontalAlignItems="center"
            verticalAlignItems="center"
            onClick={handleSubmit}
            effect={{
              type: 'drop-shadow',
              color: '#000000',
              offset: { x: 0, y: 2 },
              blur: 5,
              spread: 0,
            }}
          >
            <Text fontSize={16} fill="#FFFFFF" fontWeight="bold">
              Submit
            </Text>
          </AutoLayout>
        </>
      )}
      {submitted && (
        <Text fontSize={16} fill="#333" width="fill-parent" stroke="#ccc">
          {response}
        </Text>
      )}
      {showPrevious && previousResponses.length > 0 && (
        <AutoLayout direction="vertical" spacing={5} width="fill-parent">
          {previousResponses.map((prevResponse, index) => (
            <AutoLayout
              key={index}
              padding={10}
              fill="#E0E0E0"
              cornerRadius={5}
              width="fill-parent"
              effect={{
                type: 'drop-shadow',
                color: '#000000',
                offset: { x: 0, y: 2 },
                blur: 5,
                spread: 0,
              }}
            >
              <Text fontSize={16} fill="#333" width="fill-parent" stroke="#ccc">
                {prevResponse}
              </Text>
            </AutoLayout>
          ))}
        </AutoLayout>
      )}
      <Text fontSize={16} fill="#333" width="fill-parent" stroke="#ccc">
        {displayText ? displayText : ""}
      </Text>
      <AutoLayout
        fill="#6c757d"
        padding={{ left: 10, right: 10, top: 5, bottom: 5 }}
        cornerRadius={5}
        width="fill-parent"
        horizontalAlignItems="center"
        verticalAlignItems="center"
        onClick={openAdminMenu}
        effect={{
          type: 'drop-shadow',
          color: '#000000',
          offset: { x: 0, y: 2 },
          blur: 5,
          spread: 0,
        }}
      >
        <Text fontSize={16} fill="#FFFFFF" fontWeight="bold">
          Admin Menu
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(Widget);
