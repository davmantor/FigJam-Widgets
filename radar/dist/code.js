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
    const [userInput, setUserInput] = widget.useSyncedState("userInput", "");
    const [errorMessage, setErrorMessage] = widget.useSyncedState("errorMessage", "None");
    const [polls, setPolls] = widget.useSyncedState("polls", []);
    const [chartImage, setChartImage] = widget.useSyncedState("chartImage", null);
    const [groupSet, setGroupSet] = widget.useSyncedState("groupSet", false);
    const handleButtonClick = () => __async(this, null, function* () {
      if (!userInput.trim()) {
        setErrorMessage("Please enter a group name.");
        return;
      }
      setErrorMessage("None");
      setGroupSet(true);
      try {
        let sanitizePolls2 = function(polls2) {
          return polls2.map((poll) => ({
            title: poll.title,
            options: poll.options.map((option) => ({
              text: option.text,
              votes: option.votes
            }))
          }));
        };
        var sanitizePolls = sanitizePolls2;
        const response = yield fetch(`http://localhost:4000/polls/group/${userInput}`);
        if (!response.ok) throw new Error("Failed to fetch polls.");
        const data = yield response.json();
        console.log("Raw Poll Data:", data);
        const sanitizedPolls = sanitizePolls2(data);
        console.log(sanitizedPolls);
        setPolls(sanitizedPolls);
        if (sanitizedPolls.length === 0) {
          setErrorMessage("No polls available to render.");
          return;
        }
        return new Promise((resolve) => {
          figma.showUI(__uiFiles__.main, { width: 400, height: 400 });
          figma.ui.postMessage({
            type: "render-polar-plot",
            payload: sanitizedPolls
          });
          figma.ui.onmessage = (message) => {
            if (message.type === "chart-image") {
              setChartImage(message.payload);
              figma.closePlugin();
              resolve();
            }
          };
        });
      } catch (error) {
        console.error("Error fetching polls:", error);
        setErrorMessage(error.message || "An error occurred.");
        setPolls([]);
      }
    });
    return /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 16, padding: 16, width: 300 }, !groupSet ? (
      // Initial Search Bar with Clickable Search Icon
      /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          direction: "horizontal",
          spacing: 8,
          padding: 8,
          fill: "#F0F0F0",
          cornerRadius: 8,
          width: 250,
          verticalAlignItems: "center"
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
            fill: "#007AFF",
            onClick: handleButtonClick,
            verticalAlignItems: "center",
            horizontalAlignItems: "center"
          },
          /* @__PURE__ */ figma.widget.h(
            SVG,
            {
              src: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>`,
              width: 20,
              height: 20
            }
          )
        )
      )
    ) : (
      // Refresh Button Once Group Name is Set
      /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          direction: "horizontal",
          spacing: 8,
          padding: 8,
          cornerRadius: 4,
          fill: "#FFA500",
          verticalAlignItems: "center",
          horizontalAlignItems: "center",
          onClick: handleButtonClick
        },
        /* @__PURE__ */ figma.widget.h(
          SVG,
          {
            src: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.36-5.36l3.13 3.13M20.49 15a9 9 0 0 1-14.36 5.36l-3.13-3.13"></path>
            </svg>`,
            width: 20,
            height: 20
          }
        ),
        /* @__PURE__ */ figma.widget.h(Text, { fill: "#FFFFFF" }, "Refresh Chart")
      )
    ), chartImage && /* @__PURE__ */ figma.widget.h(
      Image,
      {
        src: chartImage,
        width: 300,
        height: 300,
        cornerRadius: 8
      }
    ), errorMessage && errorMessage !== "None" && /* @__PURE__ */ figma.widget.h(Text, { fill: "#FF0000", fontSize: 12 }, errorMessage));
  }
  widget.register(Widget);
})();
