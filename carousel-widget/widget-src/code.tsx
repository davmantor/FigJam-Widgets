const { widget, showUI, ui } = figma;
const { AutoLayout, Text, useEffect, useSyncedState } = widget;

interface ButtonProps {
  onClick: () => void;
  direction?: 'prev' | 'next';  // Make direction optional
  children?:  string;      // Add a children prop to accept any React node
}

function Button({ onClick, direction, children }: ButtonProps) {
  const arrow = direction ? (direction === 'next' ? '⟶' : '⟵') : null;  // Check for direction before using it
  return (
    <AutoLayout fill="#007AFF" cornerRadius={8} onClick={onClick} horizontalAlignItems="center" verticalAlignItems="center" padding={10}>
      {children && <Text fill="#FFFFFF" fontSize={24} verticalAlignText="center" horizontalAlignText="center">{children}</Text>}
      {arrow && <Text fill="#FFFFFF" fontSize={24} verticalAlignText="center" horizontalAlignText="center">{arrow}</Text>}
    </AutoLayout>
  );
}


function CarouselWidget() {
  const [selectedData, setSelectedData] = useSyncedState<string[]>('selectedData', []);
  const [cardColor, setCardColor] = useSyncedState<string>('cardColor', '#F0F0F0'); // Default color
  const [cardCount, setCardCount] = useSyncedState<number>('cardCount', 3);
  const [currentIndex, setCurrentIndex] = useSyncedState<number>('currentIndex', 0);
  const [isDataLoaded, setIsDataLoaded] = useSyncedState<boolean>('isDataLoaded', false);

  useEffect(() => {
    ui.on('message', message => {
      if (message.type === 'select-column') {
        setSelectedData(message.data.columnData);
        setCardCount(message.data.cardCount);
        setIsDataLoaded(true);
      } 
    });
  });
  useEffect(() => {
    ui.on('message', message => {
      if (message.type === 'update-color') {
        console.log('Color received: ', message.data.newColor);
        setCardColor(message.data.newColor); // Make sure newColor is being sent correctly
      }
    });
  });

  const handleButtonClick = () => {
    return new Promise<void>((resolve) => {
      showUI(__uiFiles__.main, { width: 300, height: 300 }); // Adjust UI dimensions as needed
      ui.on('message', message => {
        if (message.type === 'select-column') {
          setSelectedData(message.data.columnData);
          setCardCount(message.data.cardCount);
          setIsDataLoaded(true);
          figma.ui.close();
          resolve();
        }
      });
    });
  };

  const navigateCarousel = (direction: 'next' | 'prev') => {
    setCurrentIndex(prevIndex => {
        const step = cardCount; // The step size is the number of cards per page
        const totalItems = selectedData.length;
        const totalPages = Math.ceil(totalItems / step);

        let newPage = currentPage; // currentPage should be tracked in state or calculated

        if (direction === 'next' && currentPage < totalPages) {
            newPage = currentPage + 1;
        } else if (direction === 'prev' && currentPage > 1) {
            newPage = currentPage - 1;
        }

        // Calculate the new index based on the new page number
        return (newPage - 1) * step;
    });
};

  const totalPages = Math.ceil(selectedData.length / cardCount);
  const currentPage = Math.floor(currentIndex / cardCount) + 1;


  return (
    <AutoLayout direction="vertical" spacing={12} padding={10}>
      {!isDataLoaded && <Button onClick={handleButtonClick} children="Load xlsx and Select Column" />}
      <AutoLayout direction="horizontal" spacing={12}>
        <Button onClick={() => navigateCarousel('prev')} direction="prev" />
        {selectedData.slice(currentIndex, currentIndex + cardCount).map((data, index) => (
          <AutoLayout fill={cardColor} cornerRadius={12} padding={12} width={460} height={460} direction="vertical" spacing={10} horizontalAlignItems="center">
            <Text fontSize={18*2} horizontalAlignText="center">{currentIndex + index + 1}</Text>
            <Text fontSize={18*2} width={450} verticalAlignText="center" horizontalAlignText="left">
              {data || 'No data'}
            </Text>
          </AutoLayout>
        ))}
        <Button onClick={() => navigateCarousel('next')} direction="next" />
      </AutoLayout>
      <Text fontSize={25*2} verticalAlignText="center" horizontalAlignText="center">Page {currentPage} of {totalPages}</Text>
    </AutoLayout>
  );
}

widget.register(CarouselWidget);


