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
  var { useEffect, useSyncedState, Text, Input, AutoLayout, SVG, Image } = widget;
  var AdminMenuIcon = `<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8L4.44293 16.6576C4.76439 18.5863 6.43315 20 8.38851 20H15.6115C17.5668 20 19.2356 18.5863 19.5571 16.6576L21 8M3 8L6.75598 11.0731C7.68373 11.8321 9.06623 11.6102 9.70978 10.5989L12 7M3 8C3.82843 8 4.5 7.32843 4.5 6.5C4.5 5.67157 3.82843 5 3 5C2.17157 5 1.5 5.67157 1.5 6.5C1.5 7.32843 2.17157 8 3 8ZM21 8L17.244 11.0731C16.3163 11.8321 14.9338 11.6102 14.2902 10.5989L12 7M21 8C21.8284 8 22.5 7.32843 22.5 6.5C22.5 5.67157 21.8284 5 21 5C20.1716 5 19.5 5.67157 19.5 6.5C19.5 7.32843 20.1716 8 21 8ZM12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`;
  var AnonSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
<defs>
</defs>
<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
	<path d="M 45 88 c -11.049 0 -21.18 -2.003 -29.021 -8.634 C 6.212 71.105 0 58.764 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 c 0 13.765 -6.212 26.105 -15.979 34.366 C 66.181 85.998 56.049 88 45 88 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(214,214,214); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 45 60.71 c -11.479 0 -20.818 -9.339 -20.818 -20.817 c 0 -11.479 9.339 -20.818 20.818 -20.818 c 11.479 0 20.817 9.339 20.817 20.818 C 65.817 51.371 56.479 60.71 45 60.71 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(165,164,164); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
	<path d="M 45 90 c -10.613 0 -20.922 -3.773 -29.028 -10.625 c -0.648 -0.548 -0.88 -1.444 -0.579 -2.237 C 20.034 64.919 31.933 56.71 45 56.71 s 24.966 8.209 29.607 20.428 c 0.301 0.793 0.069 1.689 -0.579 2.237 C 65.922 86.227 55.613 90 45 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(165,164,164); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
</g>
</svg>`;
  function Widget() {
    const [response, setResponse] = useSyncedState("response", "");
    const [submitted, setSubmitted] = useSyncedState("submitted", false);
    const [showPrevious, setShowPrevious] = useSyncedState("showPrevious", false);
    const [previousResponses, setPreviousResponses] = useSyncedState("previousResponses", []);
    const [widgetId, setWidgetId] = useSyncedState("widgetId", null);
    const [creationDate, setCreationDate] = useSyncedState("creationDate", null);
    const [isSubmitting, setIsSubmitting] = useSyncedState("isSubmitting", false);
    const [widgetGroup, setWidgetGroup] = useSyncedState("widgetGroup", "None");
    const [width, setWidth] = useSyncedState("width", 1020);
    const [height, setHeight] = useSyncedState("height", 235);
    const [borderColor, setBorderColor] = useSyncedState("borderColor", "#000000");
    const [borderWidth, setBorderWidth] = useSyncedState("borderWidth", 1);
    const [fontSize, setFontSize] = useSyncedState("fontSize", 16);
    const [userName, setUserName] = useSyncedState("userName", "");
    const [userPhotoUrl, setUserPhotoUrl] = useSyncedState("userPhotoUrl", null);
    const [shadowColor, setShadowColor] = useSyncedState("shadowColor", "#000000");
    const [shadowOffsetX, setShadowOffsetX] = useSyncedState("shadowOffsetX", 0);
    const [shadowOffsetY, setShadowOffsetY] = useSyncedState("shadowOffsetY", 2);
    const [shadowBlur, setShadowBlur] = useSyncedState("shadowBlur", 10);
    const [shadowSpread, setShadowSpread] = useSyncedState("shadowSpread", 0);
    const [scrollIndex, setScrollIndex] = useSyncedState("scrollIndex", 0);
    const calculateItemHeight = (response2) => Math.max(50, response2.length / 2);
    const itemsPerPage = Math.floor(height / 50);
    const handleScrollUp = () => {
      setScrollIndex((prev) => Math.max(0, prev - 1));
    };
    const handleScrollDown = () => {
      setScrollIndex((prev) => Math.min(previousResponses.length - 1, prev + 1));
    };
    useEffect(() => {
      console.log("use effect called");
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
      if (widgetId != null) {
        handleRefresh(widgetId);
      }
      if (!creationDate) {
        const currentDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        setCreationDate(currentDate);
      }
      figma.ui.onmessage = (msg) => {
        console.log("Received message:", msg);
        if (msg.type === "setWidgetGroup") {
          setWidgetGroup(msg.widgetGroup);
          console.log(widgetGroup);
        }
        if (msg.type === "close") {
          figma.closePlugin();
        }
        if (msg.type === "refresh") {
          handleRefresh(widgetId != null ? widgetId : "");
          setWidgetGroup(msg.params.Group || "None");
        }
        if (msg.type === "revealAll") {
          handleRevealAll();
        }
        if (msg.type === "resize") {
          setWidth(msg.width);
          setHeight(msg.height);
        }
        if (msg.type === "updateBorderColor") {
          setBorderColor(msg.color);
        }
        if (msg.type === "updateBorderWidth") {
          setBorderWidth(msg.width);
        }
        if (msg.type === "updateFontSize") {
          setFontSize(msg.size);
        }
        if (msg.type === "updateShadowColor") {
          setShadowColor(msg.color);
        }
        if (msg.type === "updateShadowOffsetX") {
          setShadowOffsetX(msg.offset);
        }
        if (msg.type === "updateShadowOffsetY") {
          setShadowOffsetY(msg.offset);
        }
        if (msg.type === "updateShadowBlur") {
          setShadowBlur(msg.blur);
        }
        if (msg.type === "updateShadowSpread") {
          setShadowSpread(msg.spread);
        }
        if (msg.type === "resetResponse") {
          resetResponse();
        }
        if (msg.type === "setWidgetId") {
          setWidgetId(msg.widgetId);
          handleRefresh(msg.widgetId);
        }
      };
    });
    const resetResponse = () => __async(this, null, function* () {
      var _a, _b;
      if (response.trim() !== "") {
        const name = ((_a = figma.currentUser) == null ? void 0 : _a.name) || "User";
        const photoUrl = ((_b = figma.currentUser) == null ? void 0 : _b.photoUrl) || null;
        const timestamp = (/* @__PURE__ */ new Date()).toISOString();
        const data = { widgetId: widgetId != null ? widgetId : "", response, userName: name, photoUrl, timestamp };
        try {
          const res = yield fetch("http://figjam-widgets.onrender.com/textentrywidget/add-response", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
          const result = yield res.json();
          if (res.status === 200) {
            console.log("Response saved successfully");
          } else {
            console.error("Failed to submit data.");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
      setResponse("");
      setSubmitted(false);
      setShowPrevious(false);
      try {
        const res = yield fetch("https://figjam-widgets-myhz.onrender.com/textentrywidget/reset-widget", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ widgetId: widgetId != null ? widgetId : "" })
        });
        const result = yield res.json();
        if (res.status === 200) {
          console.log("Widget reset successfully");
        } else {
          console.error("Failed to reset widget.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
    const handleSubmit = () => __async(this, null, function* () {
      var _a, _b;
      if (response.trim() === "" || isSubmitting) {
        console.error("Cannot submit an empty response or submission already in progress.");
        return;
      }
      setIsSubmitting(true);
      const name = ((_a = figma.currentUser) == null ? void 0 : _a.name) || "User";
      const photoUrl = ((_b = figma.currentUser) == null ? void 0 : _b.photoUrl) || null;
      const timestamp = (/* @__PURE__ */ new Date()).toISOString();
      setUserName(name);
      setUserPhotoUrl(photoUrl);
      setSubmitted(true);
      setPreviousResponses((prev) => [{ response, userName: name, photoUrl, timestamp }, ...prev]);
      const data = { widgetId: widgetId != null ? widgetId : "", response, userName: name, photoUrl, timestamp };
      try {
        const res = yield fetch("https://figjam-widgets-myhz.onrender.com/textentrywidget/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        const result = yield res.json();
        if (res.status === 200) {
          handleRefresh(widgetId != null ? widgetId : "");
        } else {
          console.error("Failed to submit data.");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsSubmitting(false);
      }
    });
    const handleRefresh = (currentWidgetId) => __async(this, null, function* () {
      if (!currentWidgetId) return;
      const data = { widgetId: currentWidgetId };
      try {
        const res = yield fetch("https://figjam-widgets-myhz.onrender.com/textentrywidget/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        const result = yield res.json();
        if (res.status === 200 && result.widget.previous.length > 0) {
          setPreviousResponses(result.widget.previous);
          setShowPrevious(result.widget.showPrevious);
        } else {
          setPreviousResponses([]);
          setShowPrevious(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
    const handleRevealAll = () => __async(this, null, function* () {
      const data = { widgetId: widgetId != null ? widgetId : "" };
      try {
        const res = yield fetch("https://figjam-widgets-myhz.onrender.com/textentrywidget/reveal-all", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          const result = yield res.json();
          setShowPrevious(true);
          setPreviousResponses(result.widget.previous);
        } else {
          console.error("Failed to reveal all data.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
    const openAdminMenu = () => {
      const params = {
        width,
        height,
        borderColor,
        borderWidth,
        fontSize,
        shadowColor,
        shadowOffsetX,
        shadowOffsetY,
        shadowBlur,
        shadowSpread,
        creationDate,
        widgetGroup
      };
      console.log("Opening admin menu with params:", params);
      figma.showUI(__html__, { width: 1e3, height: 400 });
      figma.ui.postMessage({ type: "initialize", widgetId: widgetId != null ? widgetId : "", widgetGroup: widgetGroup != null ? widgetGroup : "", params });
      return new Promise(() => {
      });
    };
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout,
      {
        direction: "vertical",
        padding: 5,
        spacing: 10,
        width,
        height,
        fill: "#FFFFFF",
        cornerRadius: 10,
        stroke: borderColor,
        strokeWidth: borderWidth,
        effect: {
          type: "drop-shadow",
          color: shadowColor,
          offset: { x: shadowOffsetX, y: shadowOffsetY },
          blur: shadowBlur,
          spread: shadowSpread
        }
      },
      /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          direction: "horizontal",
          width: "fill-parent",
          horizontalAlignItems: "end",
          onClick: openAdminMenu
        },
        /* @__PURE__ */ figma.widget.h(
          SVG,
          {
            src: AdminMenuIcon,
            width: fontSize,
            height: fontSize
          }
        )
      ),
      !submitted && /* @__PURE__ */ figma.widget.h(figma.widget.Fragment, null, /* @__PURE__ */ figma.widget.h(
        Input,
        {
          placeholder: "Your response: ",
          value: response,
          onTextEditEnd: (event) => setResponse(event.characters),
          width: "fill-parent",
          fontSize,
          fill: "#333",
          stroke: "#ccc"
        }
      ), /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          fill: "#007BFF",
          padding: { left: 10, right: 10, top: 5, bottom: 5 },
          cornerRadius: 50,
          width: "fill-parent",
          horizontalAlignItems: "center",
          verticalAlignItems: "center",
          onClick: handleSubmit,
          effect: {
            type: "drop-shadow",
            color: "#000000",
            offset: { x: 0, y: 2 },
            blur: 5,
            spread: 0
          },
          opacity: isSubmitting ? 0.5 : 1
        },
        /* @__PURE__ */ figma.widget.h(Text, { fontSize, fill: "#FFFFFF", fontWeight: "bold" }, "Submit")
      )),
      submitted && /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          padding: { left: 10, right: 10, top: 5, bottom: 5 },
          cornerRadius: 10,
          stroke: "#000",
          strokeWidth: 1,
          width: "fill-parent",
          direction: "horizontal",
          spacing: 5
        },
        userPhotoUrl ? /* @__PURE__ */ figma.widget.h(Image, { src: userPhotoUrl, width: fontSize + 5, height: fontSize + 5, cornerRadius: fontSize / 1.5 }) : /* @__PURE__ */ figma.widget.h(SVG, { src: AnonSVG, width: fontSize + 5, height: fontSize + 5 }),
        /* @__PURE__ */ figma.widget.h(Text, { fontSize, fill: "#333", width: "fill-parent" }, userName, ": ", response)
      ),
      showPrevious && previousResponses.length > 0 && /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "horizontal", width: "fill-parent", height: "fill-parent", padding: 0, spacing: 0 }, /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          direction: "vertical",
          spacing: 0,
          width: "fill-parent",
          height: "fill-parent",
          overflow: "hidden",
          fill: "#F0F0F0",
          cornerRadius: 10,
          stroke: "#000000",
          strokeWidth: 1
        },
        previousResponses.slice(scrollIndex, scrollIndex + itemsPerPage).map((prev, index) => /* @__PURE__ */ figma.widget.h(
          AutoLayout,
          {
            key: index,
            padding: { left: 10, right: 10, top: 5 },
            cornerRadius: 5,
            stroke: "#ccc",
            strokeWidth: 1,
            width: "fill-parent",
            direction: "horizontal",
            spacing: 5,
            height: calculateItemHeight(prev.response)
          },
          prev.photoUrl ? /* @__PURE__ */ figma.widget.h(Image, { src: prev.photoUrl, width: 20, height: 20, cornerRadius: 10 }) : /* @__PURE__ */ figma.widget.h(SVG, { src: AnonSVG, width: 20, height: 20 }),
          /* @__PURE__ */ figma.widget.h(Text, { fontSize: 16, fill: "#333", width: "fill-parent" }, prev.userName, ": ", prev.response)
        ))
      ), /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          direction: "vertical",
          spacing: 10,
          width: 40,
          height: "fill-parent",
          verticalAlignItems: "center",
          horizontalAlignItems: "center"
        },
        /* @__PURE__ */ figma.widget.h(
          AutoLayout,
          {
            padding: 10,
            cornerRadius: 5,
            fill: "#007BFF",
            onClick: handleScrollUp
          },
          /* @__PURE__ */ figma.widget.h(Text, { fontSize: 8, fill: "#FFFFFF" }, "\u2191")
        ),
        /* @__PURE__ */ figma.widget.h(
          AutoLayout,
          {
            padding: 10,
            cornerRadius: 5,
            fill: "#007BFF",
            onClick: handleScrollDown
          },
          /* @__PURE__ */ figma.widget.h(Text, { fontSize: 8, fill: "#FFFFFF" }, "\u2193")
        )
      ))
    );
  }
  widget.register(Widget);
})();
