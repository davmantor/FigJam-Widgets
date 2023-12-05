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
    replyToId: number | null; // Add this line

  };

function ChatWidget() {
  console.log("ChatWidget rendered");
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
        console.log('handleAddMessage called1');
        if (newMessage.trim() !== '') {
            const newId = Date.now();
            const timestampDate = new Date(newId);
            const hours = timestampDate.getHours();
            const minutes = timestampDate.getMinutes();
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12; // Convert to 12-hour format
            const timestampString = `${formattedHours}:${formattedMinutes} ${ampm}`;
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
        console.log("render")
        return messages
          .filter(message => message.parentId === parentId)
          .map((message) => (
            <MessageBubble
              
              key={message.id}
              message={message}
              onReply={() => handleReplyToMessage(message.id)}
              onDelete={() => setMessages(messages.filter(m => m.id !== message.id))}
              replyChain={renderMessages(message.id)}
              replyToId={replyToId} // Pass replyToId as a prop
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
                spacing={100}
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
                spacing={-100} //changed from 1
                padding={4}
            >
                {renderMessages()}
            </AutoLayout>
        </AutoLayout>
    );
}

function MessageBubble({ message, onReply, onDelete, replyChain, replyToId }: MessageBubbleProps) {
  console.log("MessageBubble called with message:", message, "and replyToId:", replyToId);

  const isReply = message.parentId !== null;
  const isBeingRepliedTo = replyToId === message.id;

  console.log(`Message ID: ${message.id}, ReplyTo ID: ${replyToId}, Is Being Replied To: ${isBeingRepliedTo}`);

  // Define the style for the message bubble
  const messageStyle = {
    fill: isBeingRepliedTo ? "#007AFF" : "#FFFFFF", // Blue if being replied to, otherwise white
    color: isBeingRepliedTo ? "#FFFFFF" : "#000000", // Text color white if being replied to, otherwise black
  };

  // Log the message style for debugging
  console.log(messageStyle);

  return (
    <AutoLayout
      direction="vertical"
      padding={{ top: 1, bottom: 1, left: isReply ? 32 : 8, right: 8 }}
    >
      <AutoLayout
        direction="horizontal"
        horizontalAlignItems="start"
        verticalAlignItems="center"
        spacing={4}
        padding={{ top: 4, bottom: 4, left: 4, right: 4 }}
        stroke="#DADCE0"
        strokeWidth={1}
        cornerRadius={4}
        fill={messageStyle.fill} // Apply dynamic background color
      >
        <Text fontSize={14} width="fill-parent" fill={messageStyle.color}>{message.sender}: {message.text}</Text>
        <Text fontSize={12} fill={messageStyle.color}>{message.timestamp}</Text>
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
          spacing={-100} // Reduced space between reply chains was 100
        >
          {replyChain}
        </AutoLayout>
      )}
    </AutoLayout>
  );
}

  
  

widget.register(ChatWidget);