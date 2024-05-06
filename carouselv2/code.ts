figma.showUI(__html__, { width: 400, height: 400 });

// Define constants for the carousel
const slideWidth = 200;
const slideHeight = 100;
let slidesPerPage = 3;
const slideSpacing = 20;
const buttonSize = 32;
const padding = 20;
let currentIndex = 0;


const buttonSrc = `
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="16" r="15.5" stroke="black" stroke-opacity="0.1" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17 8H15V15H8V17H15V24H17V17H24V15H17V8Z" fill="black" fill-opacity="0.8"/>
  </svg>
`;


async function createCarousel(data: string[], x: number, y: number, numCards: number) {
    await figma.loadFontAsync({ family: "Inter", style: "Medium" });

    const padding = 0;  // Define padding around the cards

    // Create a container for the carousel
    const carouselFrame = figma.createFrame();
    carouselFrame.name = "Carousel Frame";
    carouselFrame.resize(((slideWidth + slideSpacing) * numCards - slideSpacing) + padding * 2, slideHeight + padding * 2);
    carouselFrame.x = x;
    carouselFrame.y = y;
    carouselFrame.clipsContent = true;
    carouselFrame.layoutMode = 'HORIZONTAL';
    carouselFrame.itemSpacing = slideSpacing;
    carouselFrame.cornerRadius = 10;
    carouselFrame.strokeWeight = 2;
    carouselFrame.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];

    // Container for slides, centered vertically and with horizontal padding
    const slideContainer = figma.createFrame();
    slideContainer.name = "Slide Container";
    slideContainer.layoutMode = 'HORIZONTAL';
    slideContainer.itemSpacing = slideSpacing;
    slideContainer.fills = [];
    slideContainer.resize((numCards * (slideWidth + slideSpacing) - slideSpacing), slideHeight);
    slideContainer.layoutAlign = 'STRETCH';
    slideContainer.counterAxisSizingMode = 'AUTO';
    slideContainer.x = padding;
    slideContainer.y = padding;
    carouselFrame.appendChild(slideContainer);

    // Add slides to the container
    for (const text of data) {
        const slide = await createSlide(text, slideWidth, slideHeight);
        slideContainer.appendChild(slide);
    }

    // Set initial visibility and positioning
    updateSlideVisibility(slideContainer, currentIndex, numCards);
    slideContainer.x = -(slideWidth + slideSpacing) * currentIndex + padding;
}





function updateSlideVisibility(container: FrameNode, index: number, numCards: number) {
    container.children.forEach((child, idx) => {
        child.visible = idx >= index && idx < index + numCards;
    });
}

function shiftSlides(container: FrameNode, direction: 'prev' | 'next', numCards: number) {
    console.log("shifting slides")
    let newIndex = currentIndex;
    if (direction === 'prev') {
        newIndex = Math.max(0, currentIndex - numCards);
    } else if (direction === 'next') {
        newIndex = (currentIndex + numCards) % container.children.length;
    }

    if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        container.x = -(slideWidth + slideSpacing) * currentIndex;
        updateSlideVisibility(container, currentIndex, numCards);
    }
}

async function createSlide(text: string, width: number, initialHeight: number): Promise<FrameNode> {
    const slide = figma.createFrame();
    slide.resize(width, initialHeight);
    slide.cornerRadius = 8;
    slide.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    slide.strokes = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}, opacity: 0.2}];
    slide.strokeWeight = 1;

    // Padding settings
    const paddingHorizontal = 20; // Horizontal padding
    const paddingVertical = 20; // Vertical padding

    const textBox = figma.createText();
    textBox.resize(width - 2 * paddingHorizontal, initialHeight - 2 * paddingVertical);
    textBox.layoutAlign = 'STRETCH';
    textBox.textAlignHorizontal = 'CENTER';
    textBox.textAlignVertical = 'CENTER';
    textBox.textAutoResize = 'HEIGHT'; // Adjust height based on content
    textBox.characters = text;
    textBox.fontSize = 14;
    textBox.x = paddingHorizontal;
    textBox.y = paddingVertical;

    await figma.loadFontAsync(textBox.fontName as FontName);
    textBox.textAutoResize = 'HEIGHT';
    slide.appendChild(textBox);

    // Ensure we update the slide height to fit the text if necessary
    const textHeight = textBox.height + 2 * paddingVertical;
    if (textHeight > initialHeight) {
        slide.resize(width, textHeight);
    } else {
        slide.resize(width, initialHeight);
    }

    return slide;
}


  
  

function createButton(direction: 'prev' | 'next', svgContent: string): FrameNode {
  const button = figma.createFrame();  // Changed from createComponent to createFrame
  button.resize(buttonSize, buttonSize);
  button.backgrounds = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.9}}];

  const icon = figma.createNodeFromSvg(svgContent);
  button.appendChild(icon);

  return button;
}


figma.ui.onmessage = async msg => {
  if (msg.type === 'populate-carousel') {
    const { columnIndex, numCards } = msg;  // Extract both columnIndex and numCards from the message
    const selection = figma.currentPage.selection;

    if (selection.length > 0 && selection[0].type === 'TABLE') {
        const tableNode = selection[0] as TableNode;
        const numericColumnIndex = parseInt(columnIndex, 10);
        const data = getTableData(tableNode, numericColumnIndex);
        slidesPerPage = numCards;
        await createCarousel(data, 100, 100, numCards);  // Pass numCards as an argument
        figma.notify('Carousel created successfully.');
    } else {
        figma.notify('Please select a table.');
    }
    
  } 
  else if (msg.type === 'navigate') {
    // Logic to handle navigation
    const slideContainer = figma.currentPage.findOne(node => node.name === "Slide Container");
    if (slideContainer && slideContainer.type === 'FRAME') {
        shiftSlides(slideContainer, msg.direction, slidesPerPage);
    }
    else{
        console.log("no slide container");
    }
} else if (msg.type === 'request-columns') {
    handleColumnRequest();
}
};



function handleColumnRequest() {
    const selection = figma.currentPage.selection;
    if (selection.length > 0 && selection[0].type === 'TABLE') {
        const tableNode = selection[0] as TableNode;
        requestColumnNames(tableNode);
    } else {
        figma.notify('Please select a table.');
    }
}

function requestColumnNames(tableNode: TableNode) {
    let columnNames: string[] = [];
    for (let i = 0; i < tableNode.numColumns; i++) {
        const cell = tableNode.cellAt(0, i); // Assuming first row contains headers
        columnNames.push(cell.text.characters);
    }
    figma.ui.postMessage({ type: 'columns-data', columns: columnNames });
}

function getTableData(tableNode: TableNode, columnIndex: number): string[] {
    let data: string[] = [];
    for (let i = 1; i < tableNode.numRows; i++) {
        const cell = tableNode.cellAt(i, columnIndex);
        data.push(cell.text.characters);
    }
    return data;
}
