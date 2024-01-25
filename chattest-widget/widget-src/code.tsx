const { widget } = figma;
const { AutoLayout, Text, useSyncedState, Input, Frame } = widget;

type Message = {
    id: number;
    parentId: number | null;
    text: string;
    sender: string;
    timestamp: string;
    edited: boolean;//used to keep tracak of edited status of message
    deleteConfirm: boolean;
    showReplies: boolean;
    pinned: boolean;
    deleted: boolean;
};


type MessageBubbleProps = {
    message: Message;
    onReply: () => void;
    onDelete: () => void;
    onEdit: () => void;
    onDeleteConfirm: () => void;
    onShowReplies: () => void;
    replyChain: any; // Or whatever type is appropriate for your replyChain
    replyToId: number | null; // Add this line
    user: any;//
    getMessageDepth: (messageId: number) => number;
    onPin: (id: number) => void;
    totalReplies: number
    allowedUsersToPin: Set<string>;
};
  

function ChatWidget() {
    console.log("ChatWidget rendered2");
   
    const [newMessage, setNewMessage] = useSyncedState('newMessage', '');
    const [replyToId, setReplyToId] = useSyncedState<number | null>('replyToId', null);
    const [messages, setMessages] = useSyncedState<Message[]>('messages', []);
    const [userName, setUserName] = useSyncedState('userName', 'Anonymous');
    const [inputPlaceholder, setInputPlaceholder] = useSyncedState('inputPlaceholder', 'Type a message...');
    const [inputActive, setInputActive] = useSyncedState('inputActive', false);
    const [isEditing, setIsEditing] = useSyncedState<boolean>('isEditing', false);
    const allowedUsersToPin = new Set(['Neel Walse', 'John Doe', 'Alice']);


    const renderMessagesWithScroll = () => {
      return (
        <Frame // Use Frame to create a container
          width={400} // Ensure the Frame takes the full width of the parent
          height={500} // Set a fixed height to simulate a 'maxHeight'
          overflow="scroll" // Allow scrolling for overflow content
        >
          <AutoLayout
            direction="vertical"
            spacing={-100} // Adjust as needed
            padding={4}
          >
            {renderMessages()}
          </AutoLayout>
        </Frame>
      );
      
    };
    
    const updateUserName = () => {
      if (figma.currentUser && figma.currentUser.name) {
        setUserName(figma.currentUser.name);
      }
    };
    

    const handleAddMessage = () => {
      console.log('handleAddMessage called1');
      updateUserName();
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
              
        //if we are editing the message go into the if statement, else - reply or add new message
        if (isEditing) {
          // Editing an existing message
          const editedMessages = messages.map(message => {
            if (message.id === replyToId) {
              return {
                ...message,
                text: newMessage.trim(),
                edited: true
              };
            }
            return message;
          });
          setMessages(editedMessages);
          setReplyToId(null);//resets reply id
          setIsEditing(false);//resets editing to false
        } else {
          // Sending a new message or replying
          const newMessageObject = {
            id: newId,
            parentId: replyToId,
            text: newMessage.trim(),
            sender: currentUserName,
            timestamp: timestampString,
            edited: false,
            deleteConfirm: false,
            showReplies: false,
            pinned: false,
            deleted: false,
          };

          setMessages([...messages, newMessageObject]);
          setReplyToId(null);
          setIsEditing(false);//resets editing to false
        }
              
        setNewMessage(''); // Reset the new message input field
        setInputPlaceholder('Type a message...');
        setInputActive(true); // Simulate active input when a message is added
        setTimeout(() => setInputActive(false), 2000);
      }

    };
    


    const handleReplyToMessage = (id: number) => {
      // If the clicked message is already the one being replied to, deactivate reply
      if (replyToId === id) {
        setReplyToId(null);
        setNewMessage('');
        setInputPlaceholder('Type a message...');
        setInputActive(true); // Simulate active input when reply is initiated
        setTimeout(() => setInputActive(false), 2000);
        setIsEditing(false); // Set editing mode to false
      } else {
        // Set the ID of the message being replied to
        setReplyToId(id);
        const messageToReply = messages.find(message => message.id === id);
        if (messageToReply) {
          setNewMessage(""); // Prepare the reply text
          setInputPlaceholder(`Reply to "${messageToReply.text}":`); // Update placeholder to indicate replying
        }
    
        setInputActive(true); // Simulate active input when reply is initiated
        setTimeout(() => setInputActive(false), 2000);
        setIsEditing(false); // Set editing mode to false
      }
    };
    
      


    const handleDeleteMessage = (id: number) => {
      // Find the message to delete
      const messageToDelete = messages.find(message => message.id === id);

      // Check if the message exists
      if (messageToDelete) {
        // Update the message with text and sender
        const updatedMessages = messages.map(message => {
            if (message.id === id) {
                return {
                    ...message,
                    text: "this message has been deleted",
                    sender: "Anonymous", 
                    edited: false,
                    showReplies: false,
                };
            }
            return message;
        });

        // Set the updated messages in the state
        setMessages(updatedMessages);

        // Clear the replyToId, newMessage, and set input placeholder
        setReplyToId(null);
        setNewMessage('');
        setInputPlaceholder('Type a message...');

        // Simulate active input when reply is initiated
        setInputActive(true);
        setTimeout(() => setInputActive(false), 2000);
      }

    };

    const handleDeleteConfirm = (id: number) => {
      const messageToDelete = messages.find(message => message.id === id);

      // Check if the message exists
      if (messageToDelete && messageToDelete.deleteConfirm === false) {
        setMessages(prevMessages => {
          return prevMessages.map(message => {
            if (message.id === id) {
              return {
                ...message,
                deleteConfirm: true,
              };
            }
            return message;
          });
        });

      }else{
        setMessages(prevMessages => {
          return prevMessages.map(message => {
            if (message.id === id) {
              return {
                ...message,
                deleteConfirm: false,
              };
            }
            return message;
          });
        });
      }

    };
    

    const handleShowReplies = (id: number) => {
      const messageToDelete = messages.find(message => message.id === id);

      // Check if the message exists
      if (messageToDelete && messageToDelete.showReplies === false) {
        setMessages(prevMessages => {
          return prevMessages.map(message => {
            if (message.id === id) {
              return {
                ...message,
                showReplies: true,
              };
            }
            return message;
          });
        });

      }else{
        setMessages(prevMessages => {
          return prevMessages.map(message => {
            if (message.id === id) {
              return {
                ...message,
                showReplies: false,
              };
            }
            return message;
          });
        });
      }

    };

    const handleEditToMessage = (id: number) => {
      // If the clicked message is already the one being edited, deactivate edit
      if (replyToId === id) {
        setReplyToId(null);
        setNewMessage('');
        setInputPlaceholder('Type a message...');
        setInputActive(true); // Simulate active input when edit is initiated
        setTimeout(() => setInputActive(false), 2000);
        setIsEditing(false); // Set editing mode to false
      } else {
        // Set the ID of the message being edited
        setReplyToId(id);
        const messageToEdit = messages.find(message => message.id === id);
        if (messageToEdit) {
          setNewMessage(messageToEdit.text);
          setInputPlaceholder(`Edit message: "${messageToEdit.text}"`);
          setInputActive(true); // Simulate active input when edit is initiated
          setTimeout(() => setInputActive(false), 2000);
          setIsEditing(true); // Set editing mode
        }
      }
    };
    
    
    const getMessageDepth = (messageId: number) => {
      let currentMessage = messages.find(message => message.id === messageId);

        if (!currentMessage) {
            return 0; // Return 0 if the message is not found
        }

        let maxDepth = 0;
        const getDepth = (parentId: number, currentDepth: number) => {
            messages.forEach(message => {
                if (message.parentId === parentId) {
                    getDepth(message.id, currentDepth + 1);
                }
            });
            if (currentDepth > maxDepth) {
                maxDepth = currentDepth;
            }
        };

        getDepth(messageId, 0); // Start recursion with the initial message
        return maxDepth;
    };

    const handlePinMessage = (id: number) => {
      if (allowedUsersToPin.has(userName)) {
        setMessages(prevMessages => prevMessages.map(message => {
            if (message.id === id) {
                const isPinned = message.pinned !== undefined ? message.pinned : false;
                return { ...message, pinned: !isPinned }; // Toggle the pinned state
            }
            return message;
        }));
      } else {
          // Optionally, handle the case where the user is not 'Ashwin Chembu'
          console.log("Only Ashwin Chembu can pin messages.");
    }
    };

    const renderMessages = (parentId: number | null = null) => {

      console.log('render')
      // Function to calculate the total number of replies for a message
      const getTotalReplies = (messageId: number): number => {
        let totalReplies = 0;

        // Recursive function to traverse the message tree
        const countReplies = (parentId: number | null) => {
          const replies = messages.filter((message) => message.parentId === parentId);
          totalReplies += replies.length;

          replies.forEach((reply) => {
            countReplies(reply.id);
          });
        };

        countReplies(messageId);

        return totalReplies;
      };

      const sortedMessages = [...messages].sort((a, b) => {
          if (a.pinned && !b.pinned) {
              return -1; // a comes before b
          }
          if (!a.pinned && b.pinned) {
              return 1; // a comes after b
          }
          return 0; // no change in order
      });
      return sortedMessages
      .filter(message => message.parentId === parentId)
      .map((message) => (
          <MessageBubble
              key={message.id}
              message={message}
              onReply={() => handleReplyToMessage(message.id)}
              onEdit={() => handleEditToMessage(message.id)}
              onDelete={() => handleDeleteMessage(message.id)}
              onDeleteConfirm={() => handleDeleteConfirm(message.id)}
              onShowReplies={() => handleShowReplies(message.id)}
              replyChain={renderMessages(message.id)}
              replyToId={replyToId}
              user={userName}
              getMessageDepth={getMessageDepth}
              onPin={handlePinMessage}
              totalReplies={getTotalReplies(message.id)}
              allowedUsersToPin={allowedUsersToPin}
          />
      ));
    };

    //creates the send/typing box and the overall widget
    return (
      <AutoLayout
      direction="vertical"
      spacing={8}
      padding={8}
      stroke="#DADCE0" // Outline color for the send area
      strokeWidth={1} // Outline width for the send area
      cornerRadius={10} // Rounded corners for the send area
      >
      <AutoLayout 
          direction="horizontal" 
          spacing={120}//changed from 100
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
            spacing={1} //changed from 10
            padding={4}
        >
            {renderMessages()}
        </AutoLayout>
      </AutoLayout>
    );
}


function MessageBubble({ message, onReply, onDelete, onEdit, replyChain, replyToId, user, onDeleteConfirm, getMessageDepth, onShowReplies, onPin, totalReplies, allowedUsersToPin}: MessageBubbleProps) {
  
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

  //variable to hide the delete and edit buttons
  const isCurrentUserMessage = message.sender === user;
  //variable to see whether the message has been edited
  const isEdited = message.edited;

  const isDeleted = message.deleted;
  
  // Calculate the depth of the current message
  const messageDepth = getMessageDepth(message.id);

  var admin = false;
  if (allowedUsersToPin.has(user)){
    admin = true;
  }


  // Adjust the right padding based on the message depth
  var adjustedRightPadding = 160;
  if (messageDepth == 0){
    adjustedRightPadding = 160;
  }

  //debugging
  console.log("edited", isEdited);
  console.log("user", user);
  console.log("sender", message.sender);
  console.log(isCurrentUserMessage);

  //show the sow replies button or not
  var repliesAvaliable = false;
  if(messageDepth >= 1){
    repliesAvaliable = true;
  }

  
  var showNoRepliesDeleted = true;
  if(message.text == "this message has been deleted"){
    showNoRepliesDeleted = false;
  }

  return (
    
    <AutoLayout
    direction="vertical"

    >    
    {!isDeleted && (
      <AutoLayout
        direction="vertical"
        padding={{ top: 10, bottom: isDeleted ? 0 : 10, left: 8, right: 8 }}
        stroke="#D3D3D3"
        strokeWidth={1}
        cornerRadius={4}
        fill={messageStyle.fill}
        width={370}
      >
        <AutoLayout
          direction="horizontal"
          width={370}
          padding={{ top: 4, bottom: 1, left: 4, right: 8}}
        >
          <AutoLayout
            direction="horizontal"
            horizontalAlignItems="start"
            width={170}
          >
            <Text fontSize={14} fill={messageStyle.color} horizontalAlignText={"left"}>
              {isDeleted ? 'Anonymous' : message.sender}:
            </Text>
          </AutoLayout>
          
          <AutoLayout
            direction="horizontal"
            horizontalAlignItems="end"
            width={170}
          >
            <Text fontSize={12} fill={messageStyle.color} horizontalAlignText={"right"}>
              {message.timestamp}
            </Text>
          </AutoLayout>

        </AutoLayout>

       
        <AutoLayout
          direction="horizontal"
          padding={{ top: 4, bottom: 4, left: 4, right: 4 }}
          fill={messageStyle.fill}
        >
          <AutoLayout 
            direction="vertical"
          >
            <Text width={280}>
              {isDeleted ? 'this message has been deleted' : message.text}
            </Text>
            
            {isEdited && !isDeleted && (
              <Text width={60} fontSize={12} fill="#808080">
                (edited)
              </Text>
            )}
          </AutoLayout>
        </AutoLayout>

        
        <AutoLayout // Container for Reply and Delete and Edit and Show Replies buttons
          direction="horizontal"
          padding={{ top: 4, bottom: 0, left: 4, right: 4 }}
          spacing={8} // Space between buttons
        >


          { message.text != "this message has been deleted" && (
          <AutoLayout // Reply button with additional padding
            fill="#007AFF"
            cornerRadius={4}
            padding={{ top: 6, bottom: isDeleted ? 0 : 6, left: 8, right: 8 }} // Increased padding for the button
            onClick={onReply}

          >
            <Text fontSize={14} fill="#FFFFFF">Reply</Text>
          </AutoLayout>
          )}

          {(
            isCurrentUserMessage || admin) && 
            message.text != "this message has been deleted" &&
            !message.deleteConfirm && 
          (
          <AutoLayout // Delete button with additional padding
            fill="#FF3B30"
            cornerRadius={4}
            padding={{ top: 6, bottom: 6, left: 8, right: 8 }} // Increased padding for the button
            onClick={onDeleteConfirm}
          >
            <Text fontSize={14} fill="#FFFFFF">Delete</Text>
          </AutoLayout>
          )}

          {(
            isCurrentUserMessage || admin) && 
            message.text != "this message has been deleted" && 
            message.deleteConfirm && 
          (
            <AutoLayout // Cancel button with additional padding
              fill="#FFFFFF"
              cornerRadius={4}
              padding={{ top: 6, bottom: 6, left: 8, right: 8 }} // Increased padding for the button
              onClick={onDeleteConfirm}
              stroke="#808080"
            >
              <Text fontSize={14} fill="#808080">Cancel</Text>
            </AutoLayout>
          )}

          {(
            isCurrentUserMessage || admin) && 
            message.text != "this message has been deleted" && 
            message.deleteConfirm && 
          (
            <AutoLayout // Confirm button with additional padding
              fill="#FFFFFF"
              cornerRadius={4}
              padding={{ top: 6, bottom: 6, left: 8, right: 8 }} // Increased padding for the button
              onClick={onDelete}
              stroke="#FF3B30"
            >
              <Text fontSize={14} fill="#FF3B30">Confirm Deletion</Text>
            </AutoLayout>
          )}
          

          {isCurrentUserMessage && (
          <AutoLayout // Edit button with additional padding
            fill="#808080"
            cornerRadius={4}
            padding={{ top: 6, bottom: 6, left: 8, right: 8 }} // Increased padding for the button
            onClick={onEdit}
          >
            <Text fontSize={14} fill="#FFFFFF"> Edit </Text>
          </AutoLayout>
          )}

          {admin && message.text != "this message has been deleted" && (
            <AutoLayout // Pin button
              fill={message.pinned ? '#FFD700' : '#067323'} // Gold for pinned, grey otherwise
              cornerRadius={4}
              padding={{ top: 6, bottom: 6, left: 8, right: 8 }}
              onClick={() => onPin(message.id)}
            >
              <Text fontSize={14} fill='#FFFFFF'>{message.pinned ? ' Unpin' : ' Pin'} </Text>
            </AutoLayout>
          )}

          {repliesAvaliable && (
          <AutoLayout // show replies button with additional padding
            fill={message.showReplies ? '#FFFFFF' : '#000033'}
            stroke={message.showReplies ? '#000033' : ''}
            cornerRadius={4}
            padding={{ top: 6, bottom: 6, left: 8, right: 8 }} // Increased padding for the button
            onClick={onShowReplies}
          >
            <Text fontSize={14} fill={message.showReplies ? '#000033' : '#FFFFFF'}> 
              {message.showReplies ? `▲ ${totalReplies} Replies` : `▽ ${totalReplies} Replies`} 
            </Text>
            
          </AutoLayout>
          )}

          { message.text == "this message has been deleted" && (
          <AutoLayout // fake button with additional padding
            fill="#FFFFFF"
            cornerRadius={4}
            padding={{ top: 6, bottom: isDeleted ? 0 : 6, left: 8, right: 8 }} // Increased padding for the button

          >
            <Text fontSize={14} fill="#FFFFFF">FAKE</Text>
          </AutoLayout>
          )}

        </AutoLayout>
        
        
        

      </AutoLayout>
)}
      
      {message.showReplies && replyChain && (
        <AutoLayout
          direction="vertical"
          //spacing={-100} // Adjusted space between reply chains
          width={"fill-parent"}
          padding={{ top: isDeleted ? 0 : 10, bottom: isDeleted ? 0 : 10, left: 32, right: 8 }}
        >
          {replyChain}
        </AutoLayout>
      )}
    
    </AutoLayout>

  );
}

  
  

widget.register(ChatWidget);