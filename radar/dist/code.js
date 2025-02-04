"use strict";
(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // widget-src/code.tsx
  var { widget } = figma;
  var { AutoLayout, Text, Input, Image, SVG } = widget;
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
            chartColor
          }
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
            resolve();
          }
        };
      });
    };
    const fetchPollData = () => __async(this, null, function* () {
      if (!userInput.trim()) {
        setErrorMessage("Please enter a group name.");
        return;
      }
      setErrorMessage("None");
      setGroupSet(true);
      try {
        const response = yield fetch(`http://localhost:4000/polls/group/${userInput}`);
        if (!response.ok)
          throw new Error("Failed to fetch polls.");
        const data = yield response.json();
        console.log("Fetched DATA:", data, "Type:", typeof data);
        if (!Array.isArray(data)) {
          console.error("Invalid data format. Expected an array, got:", typeof data);
          throw new Error("Invalid data format: Expected an array.");
        }
        const sanitizedPolls = data.map((poll) => ({
          title: poll.title,
          options: poll.options.map((option) => ({
            text: option.text,
            votes: option.votes
          }))
        }));
        console.log("Sanitized Polls:", sanitizedPolls);
        setPolls(Array.isArray(sanitizedPolls) ? sanitizedPolls : []);
        if (sanitizedPolls.length === 0) {
          setErrorMessage("No polls available to render.");
          return;
        }
        return new Promise((resolve) => {
          figma.showUI(__uiFiles__.main, { width: 400, height: 400 });
          figma.ui.postMessage({
            type: "render-polar-plot",
            payload: { sanitizedPolls, chartTitle, dataPointLabels, chartColor, titleFontSize }
          });
          figma.ui.onmessage = (message) => {
            console.log("Received message from UI:", message);
            if (message.type === "chart-image") {
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
        setPolls([]);
      }
    });
    return /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 16, padding: 16, width: widgetWidth }, /* @__PURE__ */ figma.widget.h(
      AutoLayout,
      {
        padding: 6,
        cornerRadius: 4,
        fill: "#333",
        onClick: openAdminMenu
      },
      /* @__PURE__ */ figma.widget.h(Text, { fill: "#FFFFFF", fontSize: 12 }, "\u2699\uFE0F Admin Settings")
    ), !groupSet ? /* @__PURE__ */ figma.widget.h(
      AutoLayout,
      {
        direction: "horizontal",
        spacing: 8,
        padding: 8,
        fill: "#F0F0F0",
        cornerRadius: 8,
        width: "fill-parent"
      },
      /* @__PURE__ */ figma.widget.h(
        Input,
        {
          placeholder: "Search Group Name...",
          value: userInput,
          onTextEditEnd: (event) => {
            var _a;
            return setUserInput(((_a = event.characters) == null ? void 0 : _a.trim()) || "");
          },
          width: "fill-parent"
        }
      ),
      /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          padding: 4,
          cornerRadius: 50,
          fill: chartColor,
          onClick: fetchPollData
        },
        /* @__PURE__ */ figma.widget.h(
          SVG,
          {
            src: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>`,
            width: 20,
            height: 20
          }
        )
      )
    ) : /* @__PURE__ */ figma.widget.h(
      AutoLayout,
      {
        padding: 8,
        cornerRadius: 4,
        fill: "#FFA500",
        onClick: fetchPollData
      },
      /* @__PURE__ */ figma.widget.h(Text, { fill: "#FFFFFF" }, "Refresh Chart")
    ), chartImage && /* @__PURE__ */ figma.widget.h(Image, { src: chartImage, width: widgetWidth, height: widgetHeight, cornerRadius: 8 }), errorMessage && errorMessage !== "None" && /* @__PURE__ */ figma.widget.h(Text, { fill: "#FF0000", fontSize: 12 }, errorMessage));
  }
  widget.register(Widget);
})();
