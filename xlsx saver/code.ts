figma.showUI(__html__);
figma.ui.resize(300, 200);

figma.ui.onmessage = msg => {
  if (msg.type === 'create-table') {
    handleTableCreation(msg.text);
  }
};

async function handleTableCreation(csvText: string) {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });

  const rows = parseCSV(csvText);
  createTable(rows);
}

function parseCSV(csvText: string): string[][] {
  const rows = csvText.split('\n');
  return rows.map(row => {
    // This regex splits the row by commas not enclosed in quotes
    return row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
  });
}


async function createTable(rows: string[][]): Promise<void> {
  const numRows = rows.length;
  // Calculate the max number of columns in all rows to ensure table is large enough
  const numColumns = Math.max(...rows.map(row => row.length));

  // Safely create a table with the maximum required dimensions
  const table = figma.createTable(numRows, numColumns);

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (i < numRows && j < numColumns) {
        table.cellAt(i, j).text.characters = rows[i][j];
      }
    }
  }
  figma.viewport.scrollAndZoomIntoView([table]);
  figma.viewport.zoom = 1;
}

