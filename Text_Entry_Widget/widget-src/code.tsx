const { widget } = figma;
const { useEffect, Text, useSyncedState, Input, AutoLayout } = widget;

function Widget() {
  const [response, setResponse] = useSyncedState<string>("response", "");
  const [displayText, setDisplayText] = useSyncedState<string>("displayText", "");
  const [submitted, setSubmitted] = useSyncedState<boolean>("submitted", false);
  const [showPrevious, setShowPrevious] = useSyncedState<boolean>("showPrevious", false);
  const [previousResponses, setPreviousResponses] = useSyncedState<string[]>("previousResponses", []);
  const [widgetId, setWidgetId] = useSyncedState<string>("widgetId", "");

  useEffect(() => {
    figma.ui.onmessage = (msg) => {
      if (msg.type === 'updateText') {
        setDisplayText(msg.text);
      }
      if (msg.type === 'close') {
        figma.closePlugin();
      }
    };
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
      setShowPrevious(result.widget.showPrevious);
      if (result.widget.showPrevious && result.widget.previous.length > 0) {
        setPreviousResponses(result.widget.previous);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = () => {
    if (response.trim() === "") {
      console.error('Cannot submit an empty response.');
      return;
    }
    setSubmitted(true);
    setShowPrevious(true);
    setPreviousResponses(prev => [...prev, response]);

    const data = { widgetId, response };
    fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).catch(error => {
      console.error('Error:', error);
    });
  };

  const handleRevealAll = async () => {
    try {
      await fetch('http://localhost:3000/reveal-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <AutoLayout
      direction="vertical"
      padding={20}
      spacing={10}
      width={400}
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
      <AutoLayout
        fill="#007BFF"
        padding={{ left: 10, right: 10, top: 5, bottom: 5 }}
        cornerRadius={5}
        width="fill-parent"
        horizontalAlignItems="center"
        verticalAlignItems="center"
        onClick={handleRefresh}
        effect={{
          type: 'drop-shadow',
          color: '#000000',
          offset: { x: 0, y: 2 },
          blur: 5,
          spread: 0,
        }}
      >
        <Text fontSize={16} fill="#FFFFFF" fontWeight="bold">
          Refresh
        </Text>
      </AutoLayout>
      <AutoLayout
        fill="#FF5733"
        padding={{ left: 10, right: 10, top: 5, bottom: 5 }}
        cornerRadius={5}
        width="fill-parent"
        horizontalAlignItems="center"
        verticalAlignItems="center"
        onClick={handleRevealAll}
        effect={{
          type: 'drop-shadow',
          color: '#000000',
          offset: { x: 0, y: 2 },
          blur: 5,
          spread: 0,
        }}
      >
        <Text fontSize={16} fill="#FFFFFF" fontWeight="bold">
          Reveal All
        </Text>
      </AutoLayout>
      {showPrevious && previousResponses.length > 0 && (
        <AutoLayout direction="vertical" spacing={5} width="fill-parent">
          {previousResponses.map((prevResponse, index) => (
            <Text key={index} fontSize={16} fill="#333" width="fill-parent" stroke="#ccc">
              {prevResponse}
            </Text>
          ))}
        </AutoLayout>
      )}
      <Text fontSize={16} fill="#333" width="fill-parent" stroke="#ccc">
        {displayText ? displayText : ""}
      </Text>
    </AutoLayout>
  );
}

widget.register(Widget);
