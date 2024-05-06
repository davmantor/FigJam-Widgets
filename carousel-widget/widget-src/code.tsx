const { widget, showUI, ui } = figma;
const { AutoLayout, Text, useEffect, useSyncedState } = widget;

interface ButtonProps {
  onClick: () => void;
  children: string;
}

function Button({ onClick, children }: ButtonProps) {
  return (
    <AutoLayout fill="#007AFF" padding={8} cornerRadius={4} onClick={onClick} horizontalAlignItems="center" verticalAlignItems="center">
      <Text fill="#FFFFFF" fontSize={16} verticalAlignText="center" horizontalAlignText="center">{children}</Text>
    </AutoLayout>
  );
}

function CarouselWidget() {
  const [selectedData, setSelectedData] = useSyncedState<string[]>('selectedData', []);
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

  const handleButtonClick = () => {
    return new Promise<void>((resolve) => {
      showUI(__uiFiles__.main, { width: 300, height: 200 });
      ui.on('message', message => {
        if (message.type === 'select-column') {
          if (Array.isArray(message.data.columnData)) {
            setSelectedData(message.data.columnData);
            setCardCount(message.data.cardCount);
            setIsDataLoaded(true);
            figma.ui.close();
            resolve();
          } else {
            console.error('Expected an array for column data, received:', message.data.columnData);
            setIsDataLoaded(false);
            setSelectedData([]); // Reset or handle as needed
            resolve();
          }
        }
      });
    });
  };

  const navigateCarousel = (direction: 'next' | 'prev') => {
    setCurrentIndex(prevIndex => {
      const maxIndex = Math.max(0, selectedData.length - cardCount);
      return direction === 'next' ? Math.min(prevIndex + cardCount, maxIndex) : Math.max(prevIndex - cardCount, 0);
    });
  };

  const currentPage = Math.floor(currentIndex / cardCount) + 1;
  const totalPages = Math.ceil(selectedData.length / cardCount);

  return (
    <AutoLayout direction="vertical" spacing={10} padding={8}>
      {!isDataLoaded && <Button onClick={handleButtonClick}>Load xlsx and Select Column</Button>}
      <AutoLayout direction="horizontal" spacing={10}>
        <Button onClick={() => navigateCarousel('prev')}>Prev</Button>
        {selectedData.slice(currentIndex, currentIndex + cardCount).map((data, index) => (
          <AutoLayout key={index} fill="#E1E1E1" padding={10} cornerRadius={4} width={400} minHeight={600} direction="vertical" verticalAlignItems="center" horizontalAlignItems="center">
            <Text fontSize={14}>Card #{currentIndex + index + 1}</Text>
            <Text fontSize={14} width={230} verticalAlignText="center" horizontalAlignText="center">
              {data || 'No data'}
            </Text>
          </AutoLayout>
        ))}
        <Button onClick={() => navigateCarousel('next')}>Next</Button>
      </AutoLayout>
      <Text fontSize={16} verticalAlignText="center" horizontalAlignText="center">Page {currentPage} of {totalPages}</Text>
    </AutoLayout>
  );
}

widget.register(CarouselWidget);
