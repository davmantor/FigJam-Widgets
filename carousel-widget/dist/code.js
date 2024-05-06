"use strict";
(() => {
  // widget-src/code.tsx
  var { widget, showUI, ui } = figma;
  var { AutoLayout, Text, useEffect, useSyncedState } = widget;
  function Button({ onClick, children }) {
    return /* @__PURE__ */ figma.widget.h(AutoLayout, { fill: "#007AFF", padding: 8, cornerRadius: 4, onClick, horizontalAlignItems: "center", verticalAlignItems: "center" }, /* @__PURE__ */ figma.widget.h(Text, { fill: "#FFFFFF", fontSize: 16, verticalAlignText: "center", horizontalAlignText: "center" }, children));
  }
  function CarouselWidget() {
    const [selectedData, setSelectedData] = useSyncedState("selectedData", []);
    const [cardCount, setCardCount] = useSyncedState("cardCount", 3);
    const [currentIndex, setCurrentIndex] = useSyncedState("currentIndex", 0);
    const [isDataLoaded, setIsDataLoaded] = useSyncedState("isDataLoaded", false);
    useEffect(() => {
      ui.on("message", (message) => {
        if (message.type === "select-column") {
          setSelectedData(message.data.columnData);
          setCardCount(message.data.cardCount);
          setIsDataLoaded(true);
        }
      });
    });
    const handleButtonClick = () => {
      return new Promise((resolve) => {
        showUI(__uiFiles__.main, { width: 300, height: 200 });
        ui.on("message", (message) => {
          if (message.type === "select-column") {
            if (Array.isArray(message.data.columnData)) {
              setSelectedData(message.data.columnData);
              setCardCount(message.data.cardCount);
              setIsDataLoaded(true);
              figma.ui.close();
              resolve();
            } else {
              console.error("Expected an array for column data, received:", message.data.columnData);
              setIsDataLoaded(false);
              setSelectedData([]);
              resolve();
            }
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
    return /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 10, padding: 8 }, !isDataLoaded && /* @__PURE__ */ figma.widget.h(Button, { onClick: handleButtonClick }, "Load xlsx and Select Column"), /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "horizontal", spacing: 10 }, /* @__PURE__ */ figma.widget.h(Button, { onClick: () => navigateCarousel("prev") }, "Prev"), selectedData.slice(currentIndex, currentIndex + cardCount).map((data, index) => /* @__PURE__ */ figma.widget.h(AutoLayout, { key: index, fill: "#E1E1E1", padding: 10, cornerRadius: 4, width: 400, minHeight: 600, direction: "vertical", verticalAlignItems: "center", horizontalAlignItems: "center" }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14 }, "Card #", currentIndex + index + 1), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14, width: 230, verticalAlignText: "center", horizontalAlignText: "center" }, data || "No data"))), /* @__PURE__ */ figma.widget.h(Button, { onClick: () => navigateCarousel("next") }, "Next")), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 16, verticalAlignText: "center", horizontalAlignText: "center" }, "Page ", currentPage, " of ", totalPages));
  }
  widget.register(CarouselWidget);
})();
