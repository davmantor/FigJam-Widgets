import { widgetVersion } from "./version";

const { widget } = figma;
const { AutoLayout, Text, Input, Image, SVG } = widget;

function Widget() {
  const [chartTitle, setChartTitle] = widget.useSyncedState(
    "chartTitle",
    "Poll Results"
  );
  const [dataPointLabels, setDataPointLabels] = widget.useSyncedState(
    "dataPointLabels",
    {}
  );
  const [widgetWidth, setWidgetWidth] = widget.useSyncedState(
    "widgetWidth",
    300
  );
  const [widgetHeight, setWidgetHeight] = widget.useSyncedState(
    "widgetHeight",
    300
  );

  const [style, setStyle] = widget.useSyncedState("style", {
    titleFontSize: 16,
    labelFontSize: 14,
    chartColor: "#007AFF",
    refreshColor: "#FFA500",
    cornerRadius: 8,
  });

  const [chartImage, setChartImage] = widget.useSyncedState("chartImage", null);
  const [groupSet, setGroupSet] = widget.useSyncedState("groupSet", false);
  const [errorMessage, setErrorMessage] = widget.useSyncedState(
    "errorMessage",
    "None"
  );
  const [polls, setPolls] = widget.useSyncedState("polls", []);
  const [userInput, setUserInput] = widget.useSyncedState("userInput", "");
  const [pollOrder, setPollOrder] = widget.useSyncedState<string[]>(
    "pollOrder",
    []
  );

  // Open Admin Panel
  const openAdminMenu = () => {
    return new Promise<void>((resolve) => {
      figma.showUI(__uiFiles__.optionsChat, { width: 400, height: 300 });
      console.log(pollOrder);

      figma.ui.postMessage({
        type: "load-admin-settings",
        payload: {
          chartTitle,
          dataPointLabels,
          widgetWidth,
          widgetHeight,
          style,
          pollOrder,
          widgetVersion,
        },
      });

      figma.ui.onmessage = (msg) => {
        if (msg.type === "update-poll-order") {
          setPollOrder(msg.payload); // Store updated order
          console.log("widget side", pollOrder);
        } else if (msg.type === "update-admin-settings") {
          console.log(msg.payload);
          setChartTitle(msg.payload.chartTitle);
          setDataPointLabels(msg.payload.dataPointLabels);
          setWidgetWidth(msg.payload.widgetWidth);
          setWidgetHeight(msg.payload.widgetHeight);
          setStyle(msg.payload.style);
        } else if (msg.type === "close-plugin") {
          figma.closePlugin();
          resolve();
        }
      };
    });
  };

  const fetchPollData = async () => {
    if (!userInput.trim()) {
      setErrorMessage("Please enter a group name.");
      return;
    }
    setErrorMessage("None");
    setGroupSet(true);

    try {
      const response = await fetch(
        `https://figjam-widgets-myhz.onrender.com/polls/group/${userInput}`
      );
      if (!response.ok) throw new Error("Failed to fetch polls.");

      const data = await response.json();
      console.log("Fetched DATA:", data, "Type:", typeof data);

      // Ensure data is an array
      if (!Array.isArray(data)) {
        console.error(
          "Invalid data format. Expected an array, got:",
          typeof data
        );
        throw new Error("Invalid data format: Expected an array.");
      }

      const sanitizedPolls = data.map((poll) => ({
        title: poll.subheading,
        options: poll.options.map((option) => ({
          text: option.text,
          votes: option.voters.length, // votes is unreliable and doesn't always update
        })),
      }));

      console.log("Sanitized Polls:", sanitizedPolls);

      console.log(pollOrder);
      console.log(pollOrder.length);
      console.log(pollOrder.length == 0);

      let orderedPolls = sanitizedPolls;
      console.log("Ordered Polls:", orderedPolls);

      if (pollOrder.length == 0) {
        console.log(sanitizedPolls.map((poll) => poll.title));
        setPollOrder(sanitizedPolls.map((poll) => poll.title) as string[]);
        console.log(pollOrder);
        console.log(orderedPolls);
      } else {
        console.log("in else");
        orderedPolls = pollOrder
          .map((subheading) =>
            sanitizedPolls.find((poll) => poll.title === subheading)
          )
          .filter(Boolean); // Remove any undefined entries
      }
      console.log(pollOrder);
      console.log("Ordered Polls:", orderedPolls);

      // Update state
      setPolls(orderedPolls);

      if (orderedPolls.length === 0) {
        setErrorMessage("No polls available to render.");
        return;
      }

      return new Promise<void>((resolve) => {
        figma.showUI(__uiFiles__.main, {
          visible: false,
        });
        figma.ui.postMessage({
          type: "render-polar-plot",
          payload: {
            orderedPolls,
            chartTitle,
            dataPointLabels,
            style,
            widgetWidth,
            widgetHeight,
          },
        });

        figma.ui.onmessage = (message) => {
          console.log("Received message from UI:", message);

          if (message.type === "chart-image") {
            setChartImage(message.payload);
            figma.closePlugin();
            figma.notify("Rendered new responses successfully.");
            resolve();
          } else {
            console.warn("Unexpected message type:", message.type);
          }
        };
      });
    } catch (error) {
      console.error("Error fetching polls:", error);
      setErrorMessage(error.message || "An error occurred.");
      setPolls([]); // Ensure polls is always an empty array in case of an error
    }
  };

  return (
    <AutoLayout
      direction="vertical"
      width={widgetWidth}
      fill="#FFFFFF"
      cornerRadius={style.cornerRadius}
      stroke="#E6E6E6"
      strokeWidth={1}
    >
      {/* Row with Admin Button and Search/Refresh Button */}
      <AutoLayout
        direction="horizontal"
        verticalAlignItems="center"
        spacing={8}
        padding={16}
        fill="#F0F0F0"
        width="fill-parent"
      >
        {/* Admin Crown Icon Button */}
        <AutoLayout onClick={openAdminMenu}>
          <SVG
            src={`<svg width="${style.titleFontSize - 2}px" height="${
              style.titleFontSize - 2
            }px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M3 8L4.44293 16.6576C4.76439 18.5863 6.43315 20 8.38851 20H15.6115C17.5668 20 19.2356 18.5863 19.5571 16.6576L21 8M3 8L6.75598 11.0731C7.68373 11.8321 9.06623 11.6102 9.70978 10.5989L12 7M3 8C3.82843 8 4.5 7.32843 4.5 6.5C4.5 5.67157 3.82843 5 3 5C2.17157 5 1.5 5.67157 1.5 6.5C1.5 7.32843 2.17157 8 3 8ZM21 8L17.244 11.0731C16.3163 11.8321 14.9338 11.6102 14.2902 10.5989L12 7M21 8C21.8284 8 22.5 7.32843 22.5 6.5C22.5 5.67157 21.8284 5 21 5C20.1716 5 19.5 5.67157 19.5 6.5C19.5 7.32843 20.1716 8 21 8ZM12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7Z" stroke="#000000" stroke-width="${3}" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
    </svg>`}
            width={20}
            height={20}
          />
        </AutoLayout>

        {/* Search Bar or Refresh Button */}
        {groupSet ? (
          <AutoLayout
            direction="horizontal"
            spacing={8}
            width="fill-parent"
            verticalAlignItems="center"
          >
            {/* Refresh Button */}
            <AutoLayout
              padding={6}
              cornerRadius={4}
              fill={style.refreshColor}
              onClick={() => fetchPollData()}
              verticalAlignItems="center"
            >
              <Text fill="#FFFFFF" fontSize={12}>
                Refresh Responses
              </Text>
            </AutoLayout>
          </AutoLayout>
        ) : (
          // Existing Search Bar Layout
          <AutoLayout
            direction="horizontal"
            spacing={8}
            padding={6}
            fill="#F0F0F0"
            cornerRadius={8}
            width="fill-parent"
            verticalAlignItems="center"
          >
            <Input
              placeholder="Search Group Name..."
              value={userInput}
              onTextEditEnd={(event) =>
                setUserInput(event.characters?.trim() || "")
              }
              width="fill-parent"
            />
            <AutoLayout
              padding={5}
              cornerRadius={50}
              fill={style.chartColor}
              onClick={() => fetchPollData()}
              verticalAlignItems="center"
            >
              <SVG
                src={`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>`}
                width={18}
                height={18}
              />
            </AutoLayout>
          </AutoLayout>
        )}
      </AutoLayout>

      {/* Chart Image on a New Line */}
      {chartImage && (
        <AutoLayout
          direction="vertical"
          verticalAlignItems="center"
          horizontalAlignItems="center"
          width="fill-parent"
          padding={{ top: 8 }}
        >
          <Text fontSize={style.titleFontSize}>{chartTitle}</Text>
          <Image
            src={chartImage}
            width={widgetWidth}
            height={widgetHeight}
            cornerRadius={8}
          />
        </AutoLayout>
      )}

      {/* Error Message */}
      {errorMessage && errorMessage !== "None" && (
        <Text fill="#FF0000" fontSize={12}>
          {errorMessage}
        </Text>
      )}
    </AutoLayout>
  );
}

widget.register(Widget);
