"use strict";
(() => {
  // widget-src/code.tsx
  var { widget, showUI, ui } = figma;
  var { AutoLayout, Text, useEffect, useSyncedState } = widget;
  function Button({ onClick, direction, children }) {
    const arrow = direction ? direction === "next" ? "\u27F6" : "\u27F5" : null;
    return /* @__PURE__ */ figma.widget.h(AutoLayout, { fill: "#007AFF", cornerRadius: 8, onClick, horizontalAlignItems: "center", verticalAlignItems: "center", padding: 10 }, children && /* @__PURE__ */ figma.widget.h(Text, { fill: "#FFFFFF", fontSize: 24, verticalAlignText: "center", horizontalAlignText: "center" }, children), arrow && /* @__PURE__ */ figma.widget.h(Text, { fill: "#FFFFFF", fontSize: 24, verticalAlignText: "center", horizontalAlignText: "center" }, arrow));
  }
  function CarouselWidget() {
    const [selectedData, setSelectedData] = useSyncedState("selectedData", []);
    const [cardColor, setCardColor] = useSyncedState("cardColor", "#F0F0F0");
    const [cardCount, setCardCount] = useSyncedState("cardCount", 3);
    const [currentIndex, setCurrentIndex] = useSyncedState("currentIndex", 0);
    const [isDataLoaded, setIsDataLoaded] = useSyncedState("isDataLoaded", false);
    useEffect(() => {
      ui.on("message", (message) => {
        if (message.type === "select-column") {
          setSelectedData(message.data.columnData);
          setCardCount(message.data.cardCount);
          setIsDataLoaded(true);
        } else if (message.type === "update-color") {
          setCardColor(message.data.newColor);
        }
      });
    });
    const handleButtonClick = () => {
      return new Promise((resolve) => {
        showUI(__uiFiles__.main, { width: 300, height: 300 });
        ui.on("message", (message) => {
          if (message.type === "select-column") {
            setSelectedData(message.data.columnData);
            setCardCount(message.data.cardCount);
            setIsDataLoaded(true);
            figma.ui.close();
            resolve();
          }
        });
      });
    };
    const navigateCarousel = (direction) => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, selectedData.length - cardCount);
        return direction === "next" ? Math.min(prevIndex + cardCount, maxIndex) : Math.max(prevIndex - cardCount, 0);
      });
    };
    const currentPage = Math.floor(currentIndex / cardCount) + 1;
    const totalPages = Math.ceil(selectedData.length / cardCount);
    return /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 12, padding: 10 }, !isDataLoaded && /* @__PURE__ */ figma.widget.h(Button, { onClick: handleButtonClick, children: "Load xlsx and Select Column" }), /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "horizontal", spacing: 12 }, /* @__PURE__ */ figma.widget.h(Button, { onClick: () => navigateCarousel("prev"), direction: "prev" }), selectedData.slice(currentIndex, currentIndex + cardCount).map((data, index) => /* @__PURE__ */ figma.widget.h(AutoLayout, { fill: cardColor, cornerRadius: 12, padding: 12, width: 460, height: 460, direction: "vertical", spacing: 10, horizontalAlignItems: "center" }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 18, horizontalAlignText: "center" }, currentIndex + index + 1), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 18, width: 450, verticalAlignText: "center", horizontalAlignText: "left" }, data || "No data"))), /* @__PURE__ */ figma.widget.h(Button, { onClick: () => navigateCarousel("next"), direction: "next" })), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 25, verticalAlignText: "center", horizontalAlignText: "center" }, "Page ", currentPage, " of ", totalPages));
  }
  widget.register(CarouselWidget);
})();
