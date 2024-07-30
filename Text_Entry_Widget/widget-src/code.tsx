const { widget } = figma;
const { useEffect, useSyncedState, Text, Input, AutoLayout, SVG, Image } = widget;

const AdminMenuIcon = `<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8L4.44293 16.6576C4.76439 18.5863 6.43315 20 8.38851 20H15.6115C17.5668 20 19.2356 18.5863 19.5571 16.6576L21 8M3 8L6.75598 11.0731C7.68373 11.8321 9.06623 11.6102 9.70978 10.5989L12 7M3 8C3.82843 8 4.5 7.32843 4.5 6.5C4.5 5.67157 3.82843 5 3 5C2.17157 5 1.5 5.67157 1.5 6.5C1.5 7.32843 2.17157 8 3 8ZM21 8L17.244 11.0731C16.3163 11.8321 14.9338 11.6102 14.2902 10.5989L12 7M21 8C21.8284 8 22.5 7.32843 22.5 6.5C22.5 5.67157 21.8284 5 21 5C20.1716 5 19.5 5.67157 19.5 6.5C19.5 7.32843 20.1716 8 21 8ZM12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`;

const AnonSVG = `<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 318.293 318.293" xml:space="preserve">
<g>
	<path d="M159.148,0c-52.696,0-95.544,39.326-95.544,87.662h47.736c0-22.007,21.438-39.927,47.808-39.927
		c26.367,0,47.804,17.92,47.804,39.927v6.929c0,23.39-10.292,34.31-25.915,50.813c-20.371,21.531-45.744,48.365-45.744,105.899
		h47.745c0-38.524,15.144-54.568,32.692-73.12c17.368-18.347,38.96-41.192,38.96-83.592v-6.929C254.689,39.326,211.845,0,159.148,0z
		"/>
	<rect x="134.475" y="277.996" width="49.968" height="40.297"/>
</g>
</svg>`;

function Widget() {
  const [response, setResponse] = useSyncedState<string>("response", "");
  const [submitted, setSubmitted] = useSyncedState<boolean>("submitted", false);
  const [showPrevious, setShowPrevious] = useSyncedState<boolean>("showPrevious", false);
  const [previousResponses, setPreviousResponses] = useSyncedState<any[]>("previousResponses", []);
  const [widgetId, setWidgetId] = useSyncedState<string | null>("widgetId", null);

  const [width, setWidth] = useSyncedState<number>("width", 400);
  const [height, setHeight] = useSyncedState<number>("height", 400);
  const [borderColor, setBorderColor] = useSyncedState<string>("borderColor", "#000000");
  const [borderWidth, setBorderWidth] = useSyncedState<number>("borderWidth", 1);
  const [fontSize, setFontSize] = useSyncedState<number>("fontSize", 16);
  const [userName, setUserName] = useSyncedState<string>("userName", "");
  const [userPhotoUrl, setUserPhotoUrl] = useSyncedState<string | null>("userPhotoUrl", null);

  useEffect(() => {
    const initializeWidgetId = () => {
      if (!widgetId) {
        const newWidgetId = `${figma.widgetId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        setWidgetId(newWidgetId);
        handleRefresh(newWidgetId);
      }
    };

    if (widgetId === null) {
      initializeWidgetId();
    }

    figma.ui.onmessage = (msg) => {
      console.log("Received message:", msg);
      if (msg.type === 'close') {
        figma.closePlugin();
      }
      if (msg.type === 'refresh') {
        handleRefresh(widgetId ?? "");
      }
      if (msg.type === 'revealAll') {
        handleRevealAll();
      }
      if (msg.type === 'resize') {
        setWidth(msg.width);
        setHeight(msg.height);
      }
      if (msg.type === 'updateBorderColor') {
        setBorderColor(msg.color);
      }
      if (msg.type === 'updateBorderWidth') {
        setBorderWidth(msg.width);
      }
      if (msg.type === 'updateFontSize') {
        setFontSize(msg.size);
      }
      if (msg.type === 'resetResponse') { // New message type
        resetResponse();
      }
    };
  });

  const resetResponse = async () => {
    if (response.trim() !== "") {
      const name = figma.currentUser?.name || "User";
      const photoUrl = figma.currentUser?.photoUrl || null;
      const timestamp = new Date().toISOString(); // Get the current timestamp
  
      const data = { widgetId: widgetId ?? "", response, userName: name, photoUrl, timestamp };
  
      try {
        const res = await fetch('http://localhost:3001/add-response', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        const result = await res.json();
  
        if (res.status === 200) {
          console.log('Response saved successfully');
        } else {
          console.error('Failed to submit data.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    setResponse("");
    setSubmitted(false);
  
    // Update showPrevious to false
    try {
      const res = await fetch('http://localhost:3001/reset-widget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ widgetId: widgetId ?? "" })
      });
  
      const result = await res.json();
      if (res.status === 200) {
        setShowPrevious(false); // Update the state
        console.log('Widget reset successfully');
      } else {
        console.error('Failed to reset widget.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleSubmit = async () => {
    if (response.trim() === "") {
      console.error('Cannot submit an empty response.');
      return;
    }
  
    const name = figma.currentUser?.name || "User";
    const photoUrl = figma.currentUser?.photoUrl || null;
    const timestamp = new Date().toISOString(); // Get the current timestamp
    setUserName(name);
    setUserPhotoUrl(photoUrl);
    setSubmitted(true);
    setPreviousResponses(prev => [{ response, userName: name, photoUrl, timestamp }, ...prev]);
  
    const data = { widgetId: widgetId ?? "", response, userName: name, photoUrl, timestamp };
  
    try {
      const res = await fetch('http://localhost:3001/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const result = await res.json();
  
      if (res.status === 200) {
        handleRefresh(widgetId ?? "");
      } else {
        console.error('Failed to submit data.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleRefresh = async (currentWidgetId: string) => {
    if (!currentWidgetId) return;
    
    const data = { widgetId: currentWidgetId };

    try {
      const res = await fetch('http://localhost:3001/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.widget.previous.length > 0) {
        setPreviousResponses(result.widget.previous);
      }
      setShowPrevious(result.widget.showPrevious);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRevealAll = async () => {
    const data = { widgetId: widgetId ?? "" };
    try {
      const res = await fetch('http://localhost:3001/reveal-all', {
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
    figma.showUI(__html__, { width:1000, height: 400 });
    figma.ui.postMessage({ type: 'initialize', widgetId: widgetId ?? "" });
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
      stroke={borderColor}
      strokeWidth={borderWidth}
      effect={{
        type: 'drop-shadow',
        color: '#000000',
        offset: { x: 0, y: 2 },
        blur: 10,
        spread: 0,
      }}
    >
      <AutoLayout
        direction="horizontal"
        width="fill-parent"
        horizontalAlignItems="end"
        onClick={openAdminMenu}
      >
        <SVG src={AdminMenuIcon} />
      </AutoLayout>
      {!submitted && (
        <>
          <Input
            placeholder="Your response: "
            value={response}
            onTextEditEnd={(event) => setResponse(event.characters)}
            width="fill-parent"
            fontSize={fontSize}
            fill="#333"
            stroke="#ccc"
          />
          <AutoLayout
            fill="#007BFF"
            padding={{ left: 10, right: 10, top: 5, bottom: 5 }}
            cornerRadius={50}
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
            <Text fontSize={fontSize} fill="#FFFFFF" fontWeight="bold">
              Submit
            </Text>
          </AutoLayout>
        </>
      )}
      {submitted && (
        <AutoLayout
          padding={{ left: 10, right: 10, top: 5, bottom: 5 }}
          cornerRadius={10}
          stroke="#000"
          strokeWidth={1}
          width="fill-parent"
          direction="horizontal"
          spacing={5}
        >
          {userPhotoUrl ? (
            <Image src={userPhotoUrl} width={20} height={20} cornerRadius={15} />
          ) : (
            <SVG src={AnonSVG} width={20} height={20} />
          )}
          <Text fontSize={fontSize} fill="#333" width="fill-parent">
            {userName}: {response}
          </Text>
        </AutoLayout>
      )}
      {showPrevious && previousResponses.length > 0 && (
        <AutoLayout direction="vertical" spacing={5} width="fill-parent">
          <Text fontSize={fontSize} fill="#333" fontWeight="bold">
            Previous Responses
          </Text>
          {previousResponses.map((prevResponse, index) => (
            <AutoLayout
              key={index}
              padding={{ left: 10, right: 10, top: 5, bottom: 5 }}
              cornerRadius={10}
              stroke="#023e8a"
              strokeWidth={1}
              width="fill-parent"
              direction="horizontal"
              spacing={5}
            >
              {prevResponse.photoUrl ? (
                <Image src={prevResponse.photoUrl} width={20} height={20} cornerRadius={15} />
              ) : (
                <SVG src={AnonSVG} width={20} height={20} />
              )}
              <Text fontSize={fontSize} fill="#333" width="fill-parent">
                {prevResponse.userName}: {prevResponse.response}
              </Text>
            </AutoLayout>
          ))}
        </AutoLayout>
      )}
    </AutoLayout>
  );
}

widget.register(Widget);
