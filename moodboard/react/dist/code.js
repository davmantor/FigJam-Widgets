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
  var {
    AutoLayout,
    Text,
    useWidgetNodeId,
    useSyncedState,
    useStickable,
    usePropertyMenu
  } = widget;
  var REACTIONS = ["\u{1F604}", "\u{1F602}", "\u2639\uFE0F", "\u{1F62D}", "\u{1F621}", "\u{1F914}", "\u{1F631}", "\u{1F480}", "\u{1F440}", "\u2757", "\u2699\uFE0F"];
  function Widget() {
    const widgetId = useWidgetNodeId();
    const [stamp, setStamp] = useSyncedState("stamp", null);
    const [rotation, setRotation] = useSyncedState("rotation", 0);
    const [author, setAuthor] = useSyncedState("author", null);
    const [message, setMessage] = useSyncedState("message", null);
    const [revealName, setRevealName] = useSyncedState("revealName", false);
    const [isNew, setIsNew] = useSyncedState("isNew", true);
    const [hiddenAuthor, setHiddenAuthor] = useSyncedState("hiddenAuthor", "");
    const [emojiSize, setEmojiSize] = useSyncedState("emojiSize", 48);
    const [textSize, setTextSize] = useSyncedState("textSize", 16);
    const propertyMenuItems = [
      {
        itemType: "action",
        tooltip: "Enter Stamp Text",
        propertyName: "editText"
      }
    ];
    usePropertyMenu(propertyMenuItems, (_0) => __async(this, [_0], function* ({ propertyName }) {
      if (propertyName === "editText") {
        return new Promise((resolve) => {
          var _a;
          figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
          figma.ui.postMessage({
            currentUser: ((_a = figma.currentUser) == null ? void 0 : _a.name) || "Unknown User",
            author: hiddenAuthor || "Unknown Author"
          });
          figma.ui.onmessage = (data) => {
            if (data.type === "textSubmit" && data.value) {
              setMessage(data.value.trim());
              setRevealName(data.reveal);
            }
            figma.closePlugin();
            resolve();
          };
        });
      }
      if (propertyName === "configureSettings") {
        openSettingsPopup();
      }
    }));
    const openSettingsPopup = () => {
      return new Promise((resolve) => {
        figma.showUI(__uiFiles__.optionsChat, { width: 400, height: 165 });
        figma.ui.postMessage({
          emojiSize,
          textSize
        });
        figma.ui.onmessage = (data) => {
          if (data.type === "updateSettings") {
            setEmojiSize(data.emojiSize);
            setTextSize(data.textSize);
          }
          figma.closePlugin();
          resolve();
        };
      });
    };
    const cloneStamp = (reaction) => __async(this, null, function* () {
      var _a;
      try {
        const currentUser = ((_a = figma.currentUser) == null ? void 0 : _a.name) || "Unknown User";
        const node = yield figma.getNodeByIdAsync(widgetId);
        if (node && node.type === "WIDGET") {
          const clone = node.cloneWidget({
            stamp: reaction,
            rotation: Math.random() * 16 - 8,
            // Random rotation
            author: "",
            hiddenAuthor: currentUser || "Unknown User",
            message: message || "",
            revealName,
            isNew: true
          });
          if (clone && node.width) {
            const index = REACTIONS.indexOf(reaction);
            const randomXOffset = (Math.random() - 0.5) * 200;
            const randomYOffset = (Math.random() - 0.5) * 200;
            clone.x = node.x + node.width / REACTIONS.length * index - 2 + randomXOffset;
            clone.y = node.y - node.height + randomYOffset;
          }
        }
      } catch (error) {
        console.error("Error cloning stamp:", error);
      }
    });
    const handleClick = () => {
      setIsNew(false);
    };
    if (stamp) {
      useStickable();
      return /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          rotation,
          effect: [
            {
              type: "drop-shadow",
              color: { r: 0, g: 0, b: 0, a: 0.1 },
              offset: { x: 0, y: 3 },
              blur: 5
            }
          ],
          spacing: 8,
          verticalAlignItems: "center",
          padding: { left: 12, right: 12, top: 8, bottom: 8 },
          fill: "#f0f0f0",
          cornerRadius: 10,
          stroke: isNew ? { type: "solid", color: "#FF0000" } : null,
          strokeWidth: isNew ? 3 : 0,
          onClick: handleClick
        },
        /* @__PURE__ */ figma.widget.h(Text, { tooltip: revealName ? hiddenAuthor || "No author" : author || "No author", fontSize: emojiSize }, stamp),
        (message == null ? void 0 : message.trim()) ? /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 4 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: textSize, fill: "#555555", tooltip: "Message" }, message.trim()), revealName && hiddenAuthor ? /* @__PURE__ */ figma.widget.h(Text, { fontSize: textSize * 0.75, fill: "#777777", tooltip: hiddenAuthor }, "- ", hiddenAuthor) : null) : null
      );
    }
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout,
      {
        stroke: { type: "solid", color: "#85E0A3" },
        strokeWidth: 2,
        cornerRadius: 10,
        minHeight: 100,
        fill: "#ffffff",
        padding: { left: 16, right: 16, top: 8, bottom: 8 },
        spacing: 8,
        verticalAlignItems: "center",
        direction: "vertical"
      },
      /* @__PURE__ */ figma.widget.h(AutoLayout, { spacing: 8 }, REACTIONS.map((reaction, index) => /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          key: reaction,
          effect: [
            {
              type: "drop-shadow",
              color: { r: 0, g: 0, b: 0, a: 0.1 },
              offset: { x: 0, y: 3 },
              blur: 5
            }
          ],
          onClick: () => {
            if (index === REACTIONS.length - 1) {
              return openSettingsPopup();
            } else {
              cloneStamp(reaction);
            }
          },
          cornerRadius: 1e3,
          width: "hug-contents",
          verticalAlignItems: "center"
        },
        /* @__PURE__ */ figma.widget.h(Text, { fontSize: emojiSize }, reaction)
      )))
    );
  }
  widget.register(Widget);
})();
