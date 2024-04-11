"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__);
figma.ui.resize(300, 100);
figma.ui.onmessage = msg => {
    if (msg.type === 'read-table') {
        readTable();
    }
};
function readTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const currentPage = figma.currentPage;
        const selection = currentPage.selection;
        if (selection.length > 0 && selection[0].type === 'TABLE') {
            const tableNode = selection[0];
            try {
                // Load the required font before proceeding
                yield figma.loadFontAsync({ family: "Inter", style: "Medium" });
                const textString = getTableAsString(tableNode);
                createTextObject(textString, countOccurrences(textString));
            }
            catch (error) {
                console.error('Error reading table:', error);
            }
        }
        else {
            console.error('No table selected.');
        }
    });
}
function getTableAsString(tableNode) {
    const numRows = tableNode.numRows;
    const numColumns = tableNode.numColumns;
    let tableString = '';
    for (let i = 1; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
            const cellText = tableNode.cellAt(i, j).text.characters;
            tableString += cellText + ','; // Use tab as a delimiter
        }
        tableString += '\n';
    }
    console.log("string: ", tableString);
    //countOccurrences(tableString);
    return tableString;
}
function countOccurrences(tableString) {
    const occurrences = {};
    const rows = tableString.split('\n');
    for (const row of rows) {
        const cells = row.split(',');
        for (const cell of cells) {
            const trimmedCell = cell.trim();
            if (trimmedCell != "") {
                occurrences[trimmedCell] = (occurrences[trimmedCell] || 0) + 1;
            }
        }
    }
    // Log the occurrences
    console.log('Occurrences:', occurrences);
    // You can also use the occurrences data as needed, for example, send it to the UI
    //figma.ui.postMessage({ type: 'occurrences', data: occurrences });
    return occurrences;
}
function createTextObject(text, occurrences) {
    // Concatenate occurrences information with textString
    let resultText = 'Occurrences:\n----------------\n';
    for (const key in occurrences) {
        if (occurrences.hasOwnProperty(key)) {
            resultText += `${key}: ${occurrences[key]}\n`;
        }
    }
    resultText = resultText + '\nValues:\n----------------\n' + text;
    const textNode = figma.createText();
    textNode.characters = resultText;
    // Set position and other properties as needed
    textNode.x = 100;
    textNode.y = 100;
    figma.currentPage.appendChild(textNode);
}
