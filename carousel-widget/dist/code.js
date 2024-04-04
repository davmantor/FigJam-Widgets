"use strict";
(() => {
  // widget-src/code.tsx
  var { widget } = figma;
  var { AutoLayout, Input, Text, useSyncedMap, SVG, useSyncedState, usePropertyMenu } = widget;
  var buttonSrc = `
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="16" r="15.5" stroke="black" stroke-opacity="0.1" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17 8H15V15H8V17H15V24H17V17H24V15H17V8Z" fill="black" fill-opacity="0.8"/>
  </svg>
`;
  var downIconSrc = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.08 0.079998H9.08L9.08 12.08L14.58 6.58L16 8L8.08 15.92L0.160004 8L1.58 6.58L7.08 12.08L7.08 0.079998Z" fill="white"/>
  </svg>
`;
  var upIconSrc = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.08001 15.92L7.08001 15.92L7.08001 3.92002L1.58001 9.42002L0.160007 8.00002L8.08001 0.0800171L16 8.00002L14.58 9.42002L9.08001 3.92002L9.08001 15.92Z" fill="white"/>
  </svg>
`;
  function numToIndices(num) {
    return new Array(num).fill(0).map((_, i) => i);
  }
  function Table() {
    var numCols = 1;
    const cells = useSyncedMap("cells");
    const [numRows, setRows] = useSyncedState("rows", 1);
    const [index, setIndex] = useSyncedState("index", 1);
    const propertyMenu = [
      {
        tooltip: "Increment",
        propertyName: "increment",
        itemType: "action",
        icon: upIconSrc
      },
      {
        tooltip: "Card Count: " + numRows,
        propertyName: "count",
        itemType: "action"
      },
      {
        tooltip: "Card #: " + index,
        propertyName: "index",
        itemType: "action"
      }
    ];
    if (numRows > 0) {
      propertyMenu.push({
        tooltip: "Decrement",
        propertyName: "decrement",
        itemType: "action",
        icon: downIconSrc
      });
    }
    usePropertyMenu(propertyMenu, ({ propertyName }) => {
      if (propertyName === "decrement") {
        setRows(numRows - 1);
      } else if (propertyName === "increment") {
        setRows(numRows + 1);
      }
    });
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout,
      {
        cornerRadius: 3,
        direction: "horizontal",
        fill: "#FFFFFF",
        height: "hug-contents",
        horizontalAlignItems: "center",
        padding: 8,
        spacing: 12,
        stroke: "#000",
        verticalAlignItems: "center"
      },
      /* @__PURE__ */ figma.widget.h(
        SVG,
        {
          src: buttonSrc,
          onClick: () => {
            if (index > 1) {
              setIndex(index - 1);
            } else {
              setIndex(numRows);
            }
          }
        }
      ),
      /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          key: index,
          direction: "horizontal",
          horizontalAlignItems: "start",
          spacing: 12,
          verticalAlignItems: "start"
        },
        numToIndices(numCols).map((colIdx) => {
          const cellKey = `${index}-${colIdx}`;
          const cellContents = cells.get(cellKey) || "";
          return /* @__PURE__ */ figma.widget.h(
            AutoLayout,
            {
              key: colIdx,
              cornerRadius: 3,
              direction: "vertical",
              fill: "#fff",
              stroke: "#000"
            },
            /* @__PURE__ */ figma.widget.h(
              Input,
              {
                inputFrameProps: {
                  padding: 10
                },
                onTextEditEnd: (e) => cells.set(cellKey, e.characters),
                placeholder: "Edit me...",
                value: cellContents,
                fontSize: 14
              }
            ),
            /* @__PURE__ */ figma.widget.h(
              AutoLayout,
              {
                direction: "horizontal",
                padding: { bottom: 5, left: 5, right: 5 }
              }
            )
          );
        })
      ),
      /* @__PURE__ */ figma.widget.h(
        SVG,
        {
          src: buttonSrc,
          onClick: () => {
            if (index < numRows) {
              setIndex(index + 1);
            } else {
              setIndex(1);
            }
          }
        }
      )
    );
  }
  widget.register(Table);
})();
