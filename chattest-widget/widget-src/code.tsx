const { widget } = figma;
const { AutoLayout, Text, useSyncedState, Input, Frame } = widget;
type Message = {
    id: number;
    parentId: number | null;
    text: string;
    sender: string;
    timestamp: string;
  };
type MessageBubbleProps = {
    message: Message;
    onReply: () => void;
    onDelete: () => void;
    replyChain: any; // Or whatever type is appropriate for your replyChain
  };

function ChatWidget() {
    const [newMessage, setNewMessage] = useSyncedState('newMessage', '');
    const [replyToId, setReplyToId] = useSyncedState<number | null>('replyToId', null);
    const [messages, setMessages] = useSyncedState<Message[]>('messages', []);
    const [userName, setUserName] = useSyncedState('userName', 'Anonymous');
    const [inputPlaceholder, setInputPlaceholder] = useSyncedState('inputPlaceholder', 'Type a message...');
    const [inputActive, setInputActive] = useSyncedState('inputActive', false);


    
    const updateUserName = () => {
        if (figma.currentUser && figma.currentUser.name) {
          setUserName(figma.currentUser.name);
        }
      };
    
      const handleAddMessage = () => {
        console.log('handleAddMessage called');
        if (newMessage.trim() !== '') {
            const newId = Date.now();
            const timestampDate = new Date(newId);
            const hours = timestampDate.getHours();
            const minutes = timestampDate.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12; // Convert to 12-hour format
            const timestampString = `${formattedHours}:${minutes} ${ampm}`;
            const currentUserName = figma.currentUser && figma.currentUser.name ? figma.currentUser.name : userName;
            const newMessageObject = {
                id: newId,
                parentId: replyToId,
                text: newMessage.trim(),
                sender: currentUserName,
                timestamp: timestampString,
            
            };
            setMessages([...messages, newMessageObject]); // Add the new message to the messages state
            setNewMessage(''); // Reset the new message input field
            setReplyToId(null); // Reset replyToId after message is sent
            setInputPlaceholder('Type a message...');
            setInputActive(true); // Simulate active input when a message is added
            setTimeout(() => setInputActive(false), 2000);
        }
    };
    

    const handleReplyToMessage = (id: number) => {
        setReplyToId(id); // Set the ID of the message being replied to
        const messageToReply = messages.find(message => message.id === id);
        if (messageToReply) {
          setNewMessage(""); // Prepare the reply text
          setInputPlaceholder(`Reply to "${messageToReply.text}":`); // Update placeholder to indicate replying
        }
        setInputActive(true); // Simulate active input when reply is initiated
        setTimeout(() => setInputActive(false), 2000);
      };

      const renderMessages = (parentId: number | null = null) => {
        return messages
          .filter(message => message.parentId === parentId)
          .map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onReply={() => handleReplyToMessage(message.id)}
              onDelete={() => setMessages(messages.filter(m => m.id !== message.id))}
              replyChain={renderMessages(message.id)}
            />
          ));
      };

      return (
        <AutoLayout
            direction="vertical"
            spacing={8}
            padding={8}
            stroke="#DADCE0" // Outline color for the send area
            strokeWidth={1} // Outline width for the send area
            cornerRadius={4} // Rounded corners for the send area
        >
            <AutoLayout 
                direction="horizontal" 
                spacing={4} 
                padding={8} 
                stroke={inputActive ? "#007AFF" : "#DADCE0"} // Set the border color to blue by default
                strokeWidth={1} 
                cornerRadius={4} 
            >
                <Input
                    placeholder={inputPlaceholder}
                    value={newMessage}
                    onTextEditEnd={(e) => setNewMessage(e.characters)}
                />
                <AutoLayout // Send button with additional styling
                    fill="#007AFF"
                    padding={8}
                    cornerRadius={4}
                    onClick={handleAddMessage}
                >
                    <Text fontSize={14} fill="#FFFFFF">Send</Text>
                </AutoLayout>
            </AutoLayout>
            <AutoLayout
                direction="vertical"
                spacing={2}
                padding={4}
            >
                {renderMessages()}
            </AutoLayout>
        </AutoLayout>
    );
}

function MessageBubble({ message, onReply, onDelete, replyChain }: MessageBubbleProps) {
    const isReply = message.parentId !== null; // Check if the message is a reply
  
    const bubbleStyles = {
      marginLeft: isReply ? '16px' : '0', // Indent replies
    };
  
    const spacingStyle = {
      marginBottom: isReply ? '1px' : '0px', // Adjust spacing for replies and top-level messages
    };
  
    return (
      <AutoLayout
        direction="vertical"
        padding={{ top: 4, bottom: 4, left: isReply ? 32 : 8, right: 8 }} // Increased left padding for replies
      >
        <AutoLayout
          direction="horizontal"
          horizontalAlignItems="start"
          verticalAlignItems="center"
          spacing={4}
          padding={{ top: 4, bottom: 4, left: 4, right: 4 }} // Consistent padding inside the message bubble
          stroke="#DADCE0"
          strokeWidth={1}
          cornerRadius={4}
          fill="#FFFFFF"
        >
          <Text fontSize={14} width="fill-parent">{message.sender}: {message.text}</Text>
          <Text fontSize={12} fill="#777777">{message.timestamp}</Text>
          <AutoLayout // Reply button with additional padding
            fill="#007AFF"
            cornerRadius={4}
            padding={{ top: 6, bottom: 6, left: 8, right: 8 }} // Increased padding for the button
            onClick={onReply}
          >
            <Text fontSize={14} fill="#FFFFFF">Reply</Text>
          </AutoLayout>
          <AutoLayout // Delete button with additional padding
            fill="#FF3B30"
            cornerRadius={4}
            padding={{ top: 6, bottom: 6, left: 8, right: 8 }} // Increased padding for the button
            onClick={onDelete}
          >
            <Text fontSize={14} fill="#FFFFFF">Delete</Text>
          </AutoLayout>
        </AutoLayout>
        {replyChain && (
          <AutoLayout
            direction="vertical"
            spacing={-100} // Reduced space between reply chains
          >
            {replyChain}
          </AutoLayout>
        )}
      </AutoLayout>
    );
  }
  
  

widget.register(ChatWidget);