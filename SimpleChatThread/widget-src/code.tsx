const { widget, showUI, ui } = figma;
const { AutoLayout, Text, useSyncedState, Image, SVG, useEffect } = widget;

type Message = {
  id: string;
  parentId: string | null;
  text: string;
  sender: string;
  timestamp: string;
  edited: boolean;
  deleteConfirm: boolean;
  showReplies: boolean;
  pinned: boolean;
  deleted: boolean;
  upvotedUsers: string[];
  downvotedUsers: string[];
  directreply: number;
  logId: number;
  anonymous: boolean;
  userIcon: string | null;
};

type MessageBubbleProps = {
  message: Message;
  onReply: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onDeleteConfirm: () => void;
  onShowReplies: () => void;
  replyChain: any;
  replyToId: string | null;
  user: any;
  getMessageDepth: (messageId: string) => number;
  onPin: (id: string) => void;
  totalReplies: number;
  onUpvote: () => void;
  onDownvote: () => void;
  onOptionsClick: () => void;
  updateUserName: () => void;
  getTotalDirectReplies: (messageId: string) => number;
  messageFontSize: number;
  widgetWidth: number;
  widgetButtonColor: string;
};

function generateLogId() {
  const randomString = Math.random().toString(36).substring(2, 8);
  const dateString = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
  return `${dateString}-${randomString}`;
}

let alreadyLoggedIn = false;
const thenFlag = false;
const curr_config = "";

const AnonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><g transform="scale(2.81)"><path d="M45 88c-11.049 0-21.18-2.003-29.021-8.634C6.212 71.105 0 58.764 0 45 0 20.187 20.187 0 45 0s45 20.187 45 45c0 13.765-6.212 26.105-15.979 34.366C66.181 85.998 56.049 88 45 88z" fill="#d6d6d6"/><path d="M45 60.71c-11.479 0-20.818-9.339-20.818-20.817S33.521 19.075 45 19.075s20.817 9.339 20.817 20.818S56.479 60.71 45 60.71z" fill="#a5a4a4"/><path d="M45 90c-10.613 0-20.922-3.773-29.028-10.625-.648-.548-.88-1.444-.579-2.237C20.034 64.919 31.933 56.71 45 56.71s24.966 8.209 29.607 20.428c.301.793.069 1.689-.579 2.237C65.922 86.227 55.613 90 45 90z" fill="#a5a4a4"/></g></svg>`;

function ChatWidget() {
  const [logId, setLogId] = useSyncedState("logId", Date.now());
  const [alwaysAnonymous, setAlwaysAnonymous] = useSyncedState("alwaysAnonymous", false);

  const [newMessage, setNewMessage] = useSyncedState("newMessage", "");
  const [replyToId, setReplyToId] = useSyncedState<string | null>("replyToId", null);
  const [messages, setMessages] = useSyncedState<Message[]>("messages", []);
  const [userName, setUserName] = useSyncedState("userName", "Unknown User");
  const [inputPlaceholder, setInputPlaceholder] = useSyncedState("inputPlaceholder", "Type a message...");
  const [inputActive, setInputActive] = useSyncedState("inputActive", false);
  const [isEditing, setIsEditing] = useSyncedState<boolean>("isEditing", false);

  const [inPrompt, setPrompt] = useSyncedState("Prompt not set", "");

  const [borderColor, setBorderColor] = useSyncedState("borderColor", "#3423232");
  const [widgetButtonColor, setWidgetButtonColor] = useSyncedState("widgetButtonColor", "#007aff");

  const [promptColor, setPromptColor] = useSyncedState("promptColor", "#000000");
  const [widgetWidth, setWidgetWidth] = useSyncedState("widgetWidth", 800);

  const [titleFontSize, setTitleFontSize] = useSyncedState("titleFontSize", 60);
  const [messageFontSize, setMessageFontSize] = useSyncedState("messageFontSize", 35);
  const [borderWidth, setBorderWidth] = useSyncedState("borderWidth", 2);
  const [widgetCornerRadius, setWidgetCornerRadius] = useSyncedState("widgetCornerRadius", 10);

  const [isCrownButtonPressed, setIsCrownButtonPressed] = useSyncedState("isCrownButtonPressed", false);
  const [sortByVotes, setSortByVotes] = useSyncedState<boolean>("sortByVotes", false);

  const handleSortByVotesToggle = () => setSortByVotes(!sortByVotes);

  function getWidgetValue(input: number): number {
    const currentWidgetWidth = widgetWidth;
    const scalingRatio = currentWidgetWidth / 800;
    return Math.floor(input * scalingRatio);
  }

  function convertISOToDateTime(isoString: string): string {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = padWithZero(date.getMinutes());
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${month} ${day}, ${year} ${formattedHours}:${minutes} ${ampm}`;
  }
  function padWithZero(number: number): string {
    return number < 10 ? "0" + number : number.toString();
  }

  const plus = `<svg width="${getWidgetValue(28)}px" height="${getWidgetValue(28)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><path d="M4 12H20M12 4V20" stroke="#ffffff" stroke-width="${3.0}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const adminI = `<svg width="${getWidgetValue(30)}px" height="${getWidgetValue(30)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8L4.44293 16.6576C4.76439 18.5863 6.43315 20 8.38851 20H15.6115C17.5668 20 19.2356 18.5863 19.5571 16.6576L21 8M3 8L6.75598 11.0731C7.68373 11.8321 9.06623 11.6102 9.70978 10.5989L12 7M3 8C3.82843 8 4.5 7.32843 4.5 6.5C4.5 5.67157 3.82843 5 3 5C2.17157 5 1.5 5.67157 1.5 6.5C1.5 7.32843 2.17157 8 3 8ZM21 8L17.244 11.0731C16.3163 11.8321 14.9338 11.6102 14.2902 10.5989L12 7M21 8C21.8284 8 22.5 7.32843 22.5 6.5C22.5 5.67157 21.8284 5 21 5C20.1716 5 19.5 5.67157 19.5 6.5C19.5 7.32843 20.1716 8 21 8ZM12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7Z" stroke="#000000" stroke-width="${3}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const delete1 = `<svg width="${getWidgetValue(20)}px" height="${getWidgetValue(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const deleteNO = `<svg width="${getWidgetValue(20)}px" height="${getWidgetValue(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const deleteYES = `<svg width="${getWidgetValue(20)}px" height="${getWidgetValue(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff5252"><path d="M9 14L11 16L15 12M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#ff5252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const pin = `<svg width="${getWidgetValue(35)}px" height="${getWidgetValue(35)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.1218 1.87023C15.7573 0.505682 13.4779 0.76575 12.4558 2.40261L9.61062 6.95916C9.61033 6.95965 9.60913 6.96167 9.6038 6.96549C9.59728 6.97016 9.58336 6.97822 9.56001 6.9848C9.50899 6.99916 9.44234 6.99805 9.38281 6.97599C8.41173 6.61599 6.74483 6.22052 5.01389 6.87251C4.08132 7.22378 3.61596 8.03222 3.56525 8.85243C3.51687 9.63502 3.83293 10.4395 4.41425 11.0208L7.94975 14.5563L1.26973 21.2363C0.879206 21.6269 0.879206 22.26 1.26973 22.6506C1.66025 23.0411 2.29342 23.0411 2.68394 22.6506L9.36397 15.9705L12.8995 19.5061C13.4808 20.0874 14.2853 20.4035 15.0679 20.3551C15.8881 20.3044 16.6966 19.839 17.0478 18.9065C17.6998 17.1755 17.3043 15.5086 16.9444 14.5375C16.9223 14.478 16.9212 14.4114 16.9355 14.3603C16.9421 14.337 16.9502 14.3231 16.9549 14.3165C16.9587 14.3112 16.9606 14.31 16.9611 14.3098L21.5177 11.4645C23.1546 10.4424 23.4147 8.16307 22.0501 6.79853L17.1218 1.87023Z" fill="#0F0F0F"/></svg>`;
  const edit = `<svg width="${getWidgetValue(20)}px" height="${getWidgetValue(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.8787 3.70705C17.0503 2.53547 18.9498 2.53548 20.1213 3.70705L20.2929 3.87862C21.4645 5.05019 21.4645 6.94969 20.2929 8.12126L18.5556 9.85857L8.70713 19.7071C8.57897 19.8352 8.41839 19.9261 8.24256 19.9701L4.24256 20.9701C3.90178 21.0553 3.54129 20.9554 3.29291 20.7071C3.04453 20.4587 2.94468 20.0982 3.02988 19.7574L4.02988 15.7574C4.07384 15.5816 4.16476 15.421 4.29291 15.2928L14.1989 5.38685L15.8787 3.70705ZM18.7071 5.12126C18.3166 4.73074 17.6834 4.73074 17.2929 5.12126L16.3068 6.10738L17.8622 7.72357L18.8787 6.70705C19.2692 6.31653 19.2692 5.68336 18.8787 5.29283L18.7071 5.12126ZM16.4477 9.13804L14.8923 7.52185L5.90299 16.5112L5.37439 18.6256L7.48877 18.097L16.4477 9.13804Z" fill="#000000"/></svg>`;

  function openMessageInputModal(event: any): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      figma.showUI(__uiFiles__.main, { width: 400, height: 320 });

      figma.ui.onmessage = async (msg) => {
        if (msg.type === "new-message") {
          const { message, anonymous } = msg.payload;
          await handleAddMessage({ messageText: message, anonymous });
          resolve();
        } else if (msg.type === "bulk-load-messages") {
          const { messages } = msg.payload;
          await handleAddMessage({ messages }, true);
          resolve();
        } else if (msg.type === "close-plugin") {
          setIsCrownButtonPressed(false);
          figma.closePlugin();
          resolve();
        } else if (msg.type === "back-action") {
          setIsCrownButtonPressed(false);
          reject("New message canceled by user.");
        }
      };
    });
  }

  const handleEditToMessage = (id: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const messageToEdit = messages.find((message) => message.id === id);
      if (messageToEdit) {
        figma.showUI(__uiFiles__.main, { width: 400, height: 320 });
        figma.ui.postMessage({ type: "edit-message", payload: messageToEdit.text });
        figma.ui.onmessage = (msg) => {
          if (msg.type === "update-message") {
            const updatedText = msg.payload.message;
            const anonymous = msg.payload.anonymous;
            const updatedMessage = { ...messageToEdit, text: updatedText, anonymous, edited: true };
            const index = messages.findIndex((m) => m.id === id);
            if (index !== -1) {
              const updatedMessages = [...messages];
              updatedMessages[index] = updatedMessage;
              setMessages(updatedMessages);
            }
            setIsCrownButtonPressed(false);
            figma.closePlugin();
            resolve();
          } else if (msg.type === "cancel-edit") {
            setIsCrownButtonPressed(false);
            reject("Edit canceled by user.");
          } else if (msg.type === "close-plugin") {
            setIsCrownButtonPressed(false);
            figma.closePlugin();
            resolve();
          }
        };
      } else {
        setIsCrownButtonPressed(false);
        reject("Message not found.");
      }
    });
  };

  const updateUserName = () => {
    const currentUserName = figma.currentUser ? figma.currentUser.name : "Unknown User";
    setUserName(currentUserName);
  };

  const generateRandomString = (length = 6) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * characters.length));
    return result;
  };

  const handleAddMessage = async (
    messageData: { messageText: string; anonymous: boolean } | { messages: Partial<Message>[] },
    isBulkLoad: boolean = false
  ) => {
    if (isBulkLoad && "messages" in messageData) {
      const { messages: incoming } = messageData;
      const timestamp = Date.now();
      const timestampDate = new Date(timestamp);
      const date = timestampDate.toLocaleDateString("en-US", { year: "2-digit", month: "2-digit", day: "2-digit" });
      const hours = timestampDate.getHours();
      const minutes = timestampDate.getMinutes();
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const timestampString = `${date} ${formattedHours}:${formattedMinutes} ${ampm}`;

      const validated = incoming.map((m) => {
        const enforcedAnonymous = alwaysAnonymous || !!m.anonymous;
        return {
          id: m.id ?? `${timestamp}${generateRandomString()}${userName}`,
          parentId: m.parentId ?? null,
          text: m.text ?? "",
          sender: m.sender ?? "Anonymous",
          timestamp: m.timestamp ? convertISOToDateTime(m.timestamp) : timestampString,
          edited: m.edited ?? false,
          deleteConfirm: m.deleteConfirm ?? false,
          showReplies: m.showReplies ?? false,
          pinned: m.pinned ?? false,
          deleted: m.deleted ?? false,
          upvotedUsers: m.upvotedUsers ?? [],
          downvotedUsers: m.downvotedUsers ?? [],
          directreply: m.directreply ?? 0,
          logId: m.logId ?? 0,
          anonymous: enforcedAnonymous,
          userIcon: enforcedAnonymous ? null : figma.currentUser?.photoUrl ?? null,
        } as Message;
      });

      setMessages((prev) => [...prev, ...validated]);
      return;
    } else {
      const { messageText, anonymous } = messageData as { messageText: string; anonymous: boolean };
      updateUserName();

      if (messageText.trim() !== "") {
        const timestamp = Date.now();
        const randomString = generateRandomString();
        const newId = `${timestamp}${randomString}${userName}`;

        const timestampDate = new Date(timestamp);
        const date = timestampDate.toLocaleDateString("en-US", { year: "2-digit", month: "2-digit", day: "2-digit" });
        const hours = timestampDate.getHours();
        const minutes = timestampDate.getMinutes();
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        const timestampString = `${date} ${formattedHours}:${formattedMinutes} ${ampm}`;
        const currentUserName = figma.currentUser && figma.currentUser.name ? figma.currentUser.name : userName;
        const enforcedAnonymous = alwaysAnonymous || anonymous;

        const newMessageObject: Message = {
          id: newId,
          parentId: null,
          text: messageText.trim(),
          sender: currentUserName,
          timestamp: timestampString,
          edited: false,
          deleteConfirm: false,
          showReplies: false,
          pinned: false,
          deleted: false,
          upvotedUsers: [],
          downvotedUsers: [],
          directreply: 0,
          logId: logId,
          anonymous: enforcedAnonymous,
          userIcon: enforcedAnonymous ? null : figma.currentUser?.photoUrl || null,
        };

        setMessages((prev) => [...prev, newMessageObject]);
      }
    }
  };

  const onUpvote = (id: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) => {
        if (message.id === id) {
          const newUpvotedUsers = [...message.upvotedUsers];
          const newDownvotedUsers = [...message.downvotedUsers];

          const upvoteIndex = newUpvotedUsers.indexOf(userName);
          const downvoteIndex = newDownvotedUsers.indexOf(userName);

          if (upvoteIndex > -1) newUpvotedUsers.splice(upvoteIndex, 1);
          else {
            newUpvotedUsers.push(userName);
            if (downvoteIndex > -1) newDownvotedUsers.splice(downvoteIndex, 1);
          }
          return { ...message, upvotedUsers: newUpvotedUsers, downvotedUsers: newDownvotedUsers };
        }
        return message;
      })
    );
  };

  const onDownvote = (id: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) => {
        if (message.id === id) {
          const newUpvotedUsers = [...message.upvotedUsers];
          const newDownvotedUsers = [...message.downvotedUsers];

          const upvoteIndex = newUpvotedUsers.indexOf(userName);
          const downvoteIndex = newDownvotedUsers.indexOf(userName);

          if (downvoteIndex > -1) newDownvotedUsers.splice(downvoteIndex, 1);
          else {
            newDownvotedUsers.push(userName);
            if (upvoteIndex > -1) newUpvotedUsers.splice(upvoteIndex, 1);
          }
          return { ...message, upvotedUsers: newUpvotedUsers, downvotedUsers: newDownvotedUsers };
        }
        return message;
      })
    );
  };

  const handleReplyToMessage = async (id: string) => {
    const timestamp = Date.now();
    const randomString = generateRandomString();
    const newId = `${timestamp}${randomString}${userName}`;
    const timestampDate = new Date(timestamp);
    const date = timestampDate.toLocaleDateString("en-US", { year: "2-digit", month: "2-digit", day: "2-digit" });
    const hours = timestampDate.getHours();
    const minutes = timestampDate.getMinutes();
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const timestampString = `${date} ${formattedHours}:${formattedMinutes} ${ampm}`;
    const currentUserName = figma.currentUser && figma.currentUser.name ? figma.currentUser.name : userName;
    const userIcon = figma.currentUser ? figma.currentUser.photoUrl : null;

    const messageToReply = messages.find((message) => message.id === id);

    if (messageToReply) {
      figma.showUI(__uiFiles__.main, { width: 400, height: 320 });
      figma.ui.postMessage({ type: "reply-message", payload: messageToReply });

      return new Promise<void>((resolve, reject) => {
        figma.ui.onmessage = (msg) => {
          if (msg.type === "send-reply") {
            const replyText = msg.payload.message;
            const anonymous = msg.payload.anonymous;
            const newMessage: Message = {
              id: newId,
              parentId: id,
              text: replyText,
              sender: userName,
              timestamp: timestampString,
              edited: false,
              deleteConfirm: false,
              showReplies: false,
              pinned: false,
              deleted: false,
              upvotedUsers: [],
              downvotedUsers: [],
              directreply: 0,
              logId: logId,
              userIcon: userIcon,
              anonymous,
            };

            setMessages((prev) => {
              const bumped = prev.map((m) => (m.id === id ? { ...m, directreply: m.directreply + 1 } : m));
              return [...bumped, newMessage];
            });

            setIsCrownButtonPressed(false);
            resolve();
          } else if (msg.type === "close-plugin") {
            setIsCrownButtonPressed(false);
            reject("Reply action was cancelled.");
          }
        };
      });
    } else {
      setIsCrownButtonPressed(false);
      return Promise.reject("Message to reply to was not found.");
    }
  };

  const handleDeleteMessage = (id: string) => {
    const messageToDelete = messages.find((message) => message.id === id);
    if (messageToDelete) {
      messageToDelete.deleted = true;
      const updatedMessages = messages.map((message) => {
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

      setMessages(updatedMessages);
      setReplyToId(null);
      setNewMessage("");
      setInputPlaceholder("Type a message...");
      setInputActive(true);
      setTimeout(() => setInputActive(false), 2000);
    }
  };

  const handleDeleteConfirm = (id: string) => {
    const messageToDelete = messages.find((message) => message.id === id);
    if (messageToDelete && messageToDelete.deleteConfirm === false) {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, deleteConfirm: true } : m))
      );
    } else {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, deleteConfirm: false } : m))
      );
    }
  };

  const handleShowReplies = (id: string) => {
    const messageToToggle = messages.find((message) => message.id === id);
    if (messageToToggle) {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, showReplies: !m.showReplies } : m))
      );
    }
  };

  const getMessageDepth = (messageId: string) => {
    const currentMessage = messages.find((message) => message.id === messageId);
    if (!currentMessage) return 0;

    let maxDepth = 0;
    const getDepth = (parentId: string, currentDepth: number) => {
      messages.forEach((message) => {
        if (message.parentId === parentId) getDepth(message.id, currentDepth + 1);
      });
      if (currentDepth > maxDepth) maxDepth = currentDepth;
    };

    getDepth(messageId, 0);
    return maxDepth;
  };

  const handlePinMessage = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, pinned: !m.pinned } : m))
    );
  };

  const renderMessages = (parentId: string | null = null) => {
    const getTotalReplies = (messageId: string): number =>
      messages.filter((m) => m.parentId === messageId).length;

    const handleOptionsClick = (id: string) => {
      updateUserName();
      return new Promise<void>((resolve, reject) => {
        figma.showUI(__uiFiles__.options, { width: 350, height: 50 });

        figma.ui.onmessage = (msg) => {
          if (msg.type === "edit-message") {
            const messageToEdit = messages.find((message) => message.id === id);
            if (messageToEdit && !messageToEdit.deleted) {
              figma.showUI(__uiFiles__.main, { width: 400, height: 320 });
              figma.ui.postMessage({ type: "edit-message", payload: messageToEdit.text });
              figma.ui.onmessage = (msg) => {
                if (msg.type === "update-message") {
                  const updatedText = msg.payload.message;
                  const anonymous = msg.payload.anonymous;
                  const updatedMessages = messages.map((message) =>
                    message.id === id
                      ? { ...message, text: updatedText, anonymous, edited: true }
                      : message
                  );
                  setMessages(updatedMessages);
                  setIsCrownButtonPressed(false);
                  figma.closePlugin();
                  resolve();
                } else if (msg.type === "cancel-edit") {
                  setIsCrownButtonPressed(false);
                  reject("Edit canceled by user.");
                } else if (msg.type === "close-plugin") {
                  setIsCrownButtonPressed(false);
                  figma.closePlugin();
                  resolve();
                }
              };
            } else {
              setIsCrownButtonPressed(false);
              reject("Message not found.");
            }
          } else if (msg.type === "edit-user") {
            const messageToEdit = messages.find((message) => message.id === id);
            if (messageToEdit && !messageToEdit.deleted) {
              figma.showUI(__uiFiles__.main, { width: 400, height: 320 });
              figma.ui.postMessage({ type: "edit-message", payload: messageToEdit.sender });
              figma.ui.onmessage = (msg) => {
                if (msg.type === "update-message") {
                  const updatedText = msg.payload.message;
                  const anonymous = msg.payload.anonymous;
                  const updatedMessages = messages.map((message) =>
                    message.id === id
                      ? { ...message, sender: updatedText, anonymous, edited: true }
                      : message
                  );
                  setMessages(updatedMessages);
                  setIsCrownButtonPressed(false);
                  figma.closePlugin();
                  resolve();
                } else if (msg.type === "cancel-edit") {
                  setIsCrownButtonPressed(false);
                  reject("Edit canceled by user.");
                } else if (msg.type === "close-plugin") {
                  setIsCrownButtonPressed(false);
                  figma.closePlugin();
                  resolve();
                }
              };
            } else {
              setIsCrownButtonPressed(false);
              reject("Message not found.");
            }
          } else if (msg.type === "update-prompt") {
            figma.showUI(__uiFiles__.main, { width: 400, height: 250 });
            figma.ui.postMessage({ type: "edit-prompt", payload: inPrompt });
            figma.ui.onmessage = (msg) => {
              if (msg.type === "update-message") {
                const updatedText = msg.payload.message;
                setPrompt(updatedText);
                setIsCrownButtonPressed(false);
                figma.closePlugin();
                resolve();
              } else if (msg.type === "cancel-edit") {
                setIsCrownButtonPressed(false);
                reject("Edit canceled by user.");
              } else if (msg.type === "close-plugin") {
                setIsCrownButtonPressed(false);
                figma.closePlugin();
                resolve();
              }
            };
          } else if (msg.type === "delete-message") {
            handleDeleteMessage(id);
            setIsCrownButtonPressed(false);
            resolve();
          } else if (msg.type === "pin-message") {
            handlePinMessage(id);
            setIsCrownButtonPressed(false);
            resolve();
          } else if (msg.type === "close-options") {
            setIsCrownButtonPressed(false);
            resolve();
          } else if (msg.type === "toggle-anonymous-mode") {
            setAlwaysAnonymous(msg.payload);
          }
        };
      });
    };

    const getTotalDirectReplies = (messageId: string): number => {
      messages.filter((msg) => msg.parentId === messageId);
      return 0;
    };

    const calculateScore = (message: Message) =>
      message.upvotedUsers.length - message.downvotedUsers.length;

    let sortedMessages = [...messages].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      if (sortByVotes) return calculateScore(b) - calculateScore(a);
      return 0;
    });

    const filteredMessages = sortedMessages.filter((message) => message.parentId === parentId);

    if (filteredMessages.length === 0) {
      return (
        <AutoLayout
          padding={getWidgetValue(30)}
          direction="vertical"
          spacing={getWidgetValue(20)}
          width={getWidgetValue(800)}
          height={getWidgetValue(250)}
          horizontalAlignItems={"center"}
          verticalAlignItems={"center"}
        >
          <Text fill="#60666D" fontSize={getWidgetValue(36)} fontWeight={500} lineHeight={getWidgetValue(20.4)}>
            No messages yet
          </Text>
          <Text fill="#8E939A" fontSize={getWidgetValue(24)} lineHeight={getWidgetValue(20.4)}>
            Send a message with the add message button below.
          </Text>
        </AutoLayout>
      );
    }

    return sortedMessages
      .filter((message) => message.parentId === parentId)
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
          onUpvote={() => onUpvote(message.id)}
          onDownvote={() => onDownvote(message.id)}
          onOptionsClick={() => handleOptionsClick(message.id)}
          updateUserName={() => updateUserName()}
          getTotalDirectReplies={(messageID) => getTotalDirectReplies(message.id)}
          messageFontSize={messageFontSize}
          widgetWidth={widgetWidth}
          widgetButtonColor={widgetButtonColor}
        />
      ));
  };

  <AutoLayout
    direction="horizontal"
    padding={{ top: getWidgetValue(10), bottom: getWidgetValue(10), right: getWidgetValue(10) }}
    horizontalAlignItems="end"
    verticalAlignItems="center"
  >
    <AutoLayout
      cornerRadius={getWidgetValue(4)}
      padding={{ top: getWidgetValue(10), bottom: getWidgetValue(10), left: getWidgetValue(20), right: getWidgetValue(20) }}
      onClick={handleSortByVotesToggle}
      fill={widgetButtonColor}
    >
      <Text fontSize={getWidgetValue(25)} fill="#FFFFFF">
        Sort by Votes
      </Text>
    </AutoLayout>
  </AutoLayout>;

  useEffect(() => {
    if (isCrownButtonPressed) {
      setIsCrownButtonPressed(false);
      figma.showUI(__uiFiles__.optionsChat, { width: 400, height: 205 });
      figma.ui.postMessage({ type: "set-widget-log-id", payload: logId });
      figma.ui.postMessage({ type: "alreadyLoggedIn", payload: alreadyLoggedIn });
      figma.ui.postMessage({ type: "current-widthValue", payload: widgetWidth });
      figma.ui.postMessage({ type: "current-borderWidthValue", payload: borderWidth });
      figma.ui.postMessage({ type: "current-titleFontSize", payload: titleFontSize });
      figma.ui.postMessage({ type: "current-borderColor", payload: borderColor });
      figma.ui.postMessage({ type: "current-messageFontSize", payload: messageFontSize });
      figma.ui.postMessage({ type: "current-promptColor", payload: promptColor });
      figma.ui.postMessage({ type: "current-widgetButtonColor", payload: widgetButtonColor });
      figma.ui.postMessage({ type: "current-widgetCornerRadius", payload: widgetCornerRadius });
      figma.ui.postMessage({ type: "current-anonymous", payload: alwaysAnonymous });

      figma.ui.onmessage = async (msg) => {
        if (msg.type === "update-prompt") {
          figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
          figma.ui.postMessage({ type: "edit-prompt", payload: inPrompt });
          figma.ui.onmessage = (msg) => {
            if (msg.type === "update-message") {
              const updatedText = msg.payload.message;
              setPrompt(updatedText);
              alreadyLoggedIn = true;
              setIsCrownButtonPressed(true);
            } else if (msg.type === "close-plugin") {
              setIsCrownButtonPressed(false);
              figma.closePlugin();
            } else if (msg.type === "back-action") {
              alreadyLoggedIn = true;
              handleOptionsClickChat();
            }
          };
        } else if (msg.type === "update-width") {
          figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
          figma.ui.postMessage({ type: "edit-width", payload: widgetWidth });
          figma.ui.onmessage = (msg) => {
            if (msg.type === "update-message") {
              const updatedWidth = msg.payload.message;
              setWidgetWidth(parseInt(updatedWidth, 10));
              alreadyLoggedIn = true;
              setIsCrownButtonPressed(true);
            } else if (msg.type === "close-plugin") {
              setIsCrownButtonPressed(false);
              figma.closePlugin();
            } else if (msg.type === "back-action") {
              alreadyLoggedIn = true;
              handleOptionsClickChat();
            }
          };
        } else if (msg.type === "update-borderWidth") {
          figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
          figma.ui.postMessage({ type: "edit-borderWidth", payload: borderWidth });
          figma.ui.onmessage = (msg) => {
            if (msg.type === "update-message") {
              const updatedBorderWidth = msg.payload.message;
              setBorderWidth(parseInt(updatedBorderWidth, 10));
              alreadyLoggedIn = true;
              setIsCrownButtonPressed(true);
            } else if (msg.type === "close-plugin") {
              setIsCrownButtonPressed(false);
              figma.closePlugin();
            } else if (msg.type === "back-action") {
              alreadyLoggedIn = true;
              handleOptionsClickChat();
            }
          };
        } else if (msg.type === "update-titleFontSize") {
          figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
          figma.ui.postMessage({ type: "edit-titleFontSize", payload: titleFontSize });
          figma.ui.onmessage = (msg) => {
            if (msg.type === "update-message") {
              const updatedTitleFontSize = msg.payload.message;
              setTitleFontSize(parseInt(updatedTitleFontSize, 10));
              alreadyLoggedIn = true;
              setIsCrownButtonPressed(true);
            } else if (msg.type === "close-plugin") {
              setIsCrownButtonPressed(false);
              figma.closePlugin();
            } else if (msg.type === "back-action") {
              alreadyLoggedIn = true;
              handleOptionsClickChat();
            }
          };
        } else if (msg.type === "update-borderColor") {
          figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
          figma.ui.postMessage({ type: "edit-borderColor", payload: borderColor });
          figma.ui.onmessage = (msg) => {
            if (msg.type === "update-message") {
              const updatedText = msg.payload.message;
              setBorderColor(updatedText);
              alreadyLoggedIn = true;
              setIsCrownButtonPressed(true);
            } else if (msg.type === "close-plugin") {
              setIsCrownButtonPressed(false);
              figma.closePlugin();
            } else if (msg.type === "back-action") {
              alreadyLoggedIn = true;
              handleOptionsClickChat();
            }
          };
        } else if (msg.type === "update-messageFontSize") {
          figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
          figma.ui.postMessage({ type: "edit-messageFontSize", payload: messageFontSize });
          figma.ui.onmessage = (msg) => {
            if (msg.type === "update-message") {
              const updatedMessageFontSize = msg.payload.message;
              setMessageFontSize(parseInt(updatedMessageFontSize, 10));
              alreadyLoggedIn = true;
              setIsCrownButtonPressed(true);
            } else if (msg.type === "close-plugin") {
              setIsCrownButtonPressed(false);
              figma.closePlugin();
            } else if (msg.type === "back-action") {
              alreadyLoggedIn = true;
              handleOptionsClickChat();
            }
          };
        } else if (msg.type === "update-promptColor") {
          figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
          figma.ui.postMessage({ type: "edit-promptColor", payload: promptColor });
          figma.ui.onmessage = (msg) => {
            if (msg.type === "update-message") {
              const updatedText = msg.payload.message;
              setPromptColor(updatedText);
              alreadyLoggedIn = true;
              setIsCrownButtonPressed(true);
            } else if (msg.type === "close-plugin") {
              setIsCrownButtonPressed(false);
              figma.closePlugin();
            } else if (msg.type === "back-action") {
              alreadyLoggedIn = true;
              handleOptionsClickChat();
            }
          };
        } else if (msg.type === "update-widgetButtonColor") {
          figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
          figma.ui.postMessage({ type: "edit-widgetButtonColor", payload: widgetButtonColor });
          figma.ui.onmessage = (msg) => {
            if (msg.type === "update-message") {
              const updatedText = msg.payload.message;
              setWidgetButtonColor(updatedText);
              alreadyLoggedIn = true;
              setIsCrownButtonPressed(true);
            } else if (msg.type === "close-plugin") {
              setIsCrownButtonPressed(false);
              figma.closePlugin();
            } else if (msg.type === "back-action") {
              alreadyLoggedIn = true;
              handleOptionsClickChat();
            }
          };
        } else if (msg.type === "update-widgetCornerRadius") {
          figma.showUI(__uiFiles__.main, { width: 400, height: 300 });
          figma.ui.postMessage({ type: "edit-widgetCornerRadius", payload: widgetCornerRadius });
          figma.ui.onmessage = (msg) => {
            if (msg.type === "update-message") {
              const updatedText = msg.payload.message;
              setWidgetCornerRadius(updatedText);
              alreadyLoggedIn = true;
              setIsCrownButtonPressed(true);
            } else if (msg.type === "close-plugin") {
              setIsCrownButtonPressed(false);
              figma.closePlugin();
            } else if (msg.type === "back-action") {
              alreadyLoggedIn = true;
              handleOptionsClickChat();
            }
          };
        } else if (msg.type === "toggle-anonymous-mode") {
          setAlwaysAnonymous(msg.payload);
        }
      };
    }
  });

  const handleOptionsClickChat = () => {
    updateUserName();
    setIsCrownButtonPressed(true);
    return new Promise<void>((resolve, reject) => {
      figma.showUI(__uiFiles__.optionsChat, { width: 400, height: 205 });
      figma.ui.postMessage({ type: "current-widgetId", payload: logId });
      figma.ui.postMessage({ type: "alreadyLoggedIn", payload: alreadyLoggedIn });
      figma.ui.postMessage({ type: "current-widthValue", payload: widgetWidth });
      figma.ui.postMessage({ type: "current-borderWidthValue", payload: borderWidth });
      figma.ui.postMessage({ type: "current-titleFontSize", payload: titleFontSize });
      figma.ui.postMessage({ type: "current-borderColor", payload: borderColor });
      figma.ui.postMessage({ type: "current-messageFontSize", payload: messageFontSize });
      figma.ui.postMessage({ type: "current-promptColor", payload: promptColor });
      figma.ui.postMessage({ type: "current-widgetButtonColor", payload: widgetButtonColor });
      figma.ui.postMessage({ type: "current-widgetCornerRadius", payload: widgetCornerRadius });

      figma.ui.onmessage = (msg) => {
        if (msg.type === "close-plugin") {
          setIsCrownButtonPressed(false);
          resolve();
        } else if (msg.type === "back-action") {
          alreadyLoggedIn = true;
          handleOptionsClickChat().then(resolve).catch(reject);
        }
      };

      figma.on("close", () => {
        setIsCrownButtonPressed(false);
        resolve();
      });
    });
  };

  return (
    <AutoLayout
      direction="vertical"
      spacing={getWidgetValue(8)}
      padding={borderWidth}
      stroke={borderColor}
      strokeWidth={getWidgetValue(2)}
      cornerRadius={getWidgetValue(widgetCornerRadius)}
      onClick={updateUserName}
      minWidth={widgetWidth}
      fill={borderColor}
    >
      <AutoLayout
        direction="vertical"
        spacing={8}
        padding={getWidgetValue(10)}
        stroke={borderColor}
        strokeWidth={getWidgetValue(2)}
        cornerRadius={getWidgetValue(widgetCornerRadius - 2)}
        onClick={updateUserName}
        minWidth={widgetWidth}
        fill={"#FFFFFF"}
      >
        <AutoLayout
          cornerRadius={getWidgetValue(4)}
          padding={{
            top: getWidgetValue(15),
            bottom: getWidgetValue(2),
            left: getWidgetValue(590),
            right: getWidgetValue(10),
          }}
          verticalAlignItems="center"
          horizontalAlignItems="end"
        >
          <AutoLayout
            cornerRadius={getWidgetValue(100)}
            padding={{
              top: getWidgetValue(5),
              bottom: getWidgetValue(5),
              left: getWidgetValue(20),
              right: getWidgetValue(20),
            }}
            onClick={handleSortByVotesToggle}
            fill={widgetButtonColor}
          >
            <Text fontSize={getWidgetValue(25)} fill="#FFFFFF">
              Sort by Votes
            </Text>
          </AutoLayout>

          <AutoLayout padding={{ left: getWidgetValue(10) }}>
            <SVG src={adminI} onClick={handleOptionsClickChat} />
          </AutoLayout>
        </AutoLayout>

        <AutoLayout padding={{ top: 0, bottom: getWidgetValue(20), left: getWidgetValue(20) }}>
          <Text
            fill={promptColor}
            fontSize={getWidgetValue(titleFontSize)}
            fontWeight={700}
            width={getWidgetValue(770)}
            lineHeight={getWidgetValue(65)}
          >
            {inPrompt ? inPrompt : "Chat"}
          </Text>
        </AutoLayout>

        <AutoLayout
          direction="vertical"
          spacing={getWidgetValue(1)}
          padding={getWidgetValue(8)}
          stroke={borderColor}
          cornerRadius={getWidgetValue(10)}
          minWidth={getWidgetValue(480)}
        >
          {renderMessages()}
        </AutoLayout>

        <AutoLayout
          direction="vertical"
          spacing={getWidgetValue(8)}
          padding={getWidgetValue(8)}
          onClick={updateUserName}
          horizontalAlignItems={"end"}
          minWidth={widgetWidth}
        >
          <AutoLayout
            direction="horizontal"
            onClick={openMessageInputModal}
            fill={widgetButtonColor}
            padding={{
              top: getWidgetValue(10),
              bottom: getWidgetValue(10),
              left: getWidgetValue(10),
              right: getWidgetValue(20),
            }}
            cornerRadius={getWidgetValue(100)}
          >
            <AutoLayout padding={getWidgetValue(8)}>
              <SVG src={plus} width={getWidgetValue(30)} height={getWidgetValue(30)} />
            </AutoLayout>
            <Text fontSize={getWidgetValue(36)} fill="#FFFFFF">
              Add Message
            </Text>
          </AutoLayout>
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
}

function MessageBubble({
  getTotalDirectReplies,
  message,
  onReply,
  onDelete,
  onEdit,
  replyChain,
  replyToId,
  user,
  onDeleteConfirm,
  getMessageDepth,
  onShowReplies,
  onPin,
  totalReplies,
  onUpvote,
  onDownvote,
  onOptionsClick,
  updateUserName,
  messageFontSize,
  widgetWidth,
  widgetButtonColor,
}: MessageBubbleProps) {
  function getWidgetValue(input: number): number {
    const scalingRatio = widgetWidth / 800;
    return Math.floor(input * scalingRatio);
  }

  const adminI = `<svg width="${getWidgetValue(30)}px" height="${getWidgetValue(30)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8L4.44293 16.6576C4.76439 18.5863 6.43315 20 8.38851 20H15.6115C17.5668 20 19.2356 18.5863 19.5571 16.6576L21 8M3 8L6.75598 11.0731C7.68373 11.8321 9.06623 11.6102 9.70978 10.5989L12 7M3 8C3.82843 8 4.5 7.32843 4.5 6.5C4.5 5.67157 3.82843 5 3 5C2.17157 5 1.5 5.67157 1.5 6.5C1.5 7.32843 2.17157 8 3 8ZM21 8L17.244 11.0731C16.3163 11.8321 14.9338 11.6102 14.2902 10.5989L12 7M21 8C21.8284 8 22.5 7.32843 22.5 6.5C22.5 5.67157 21.8284 5 21 5C20.1716 5 19.5 5.67157 19.5 6.5C19.5 7.32843 20.1716 8 21 8ZM12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7Z" stroke="#000000" stroke-width="${3}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const replyIconSrc = `<svg width="${getWidgetValue(32)}px" height="${getWidgetValue(32)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><path d="M20 17V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H4M4 11L8 7M4 11L8 15" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const pinYES = `<svg width="${getWidgetValue(35)}px" height="${getWidgetValue(35)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#1cb566"><path d="M19.1835 7.80516L16.2188 4.83755C14.1921 2.8089 13.1788 1.79457 12.0904 2.03468C11.0021 2.2748 10.5086 3.62155 9.5217 6.31506L8.85373 8.1381C8.59063 8.85617 8.45908 9.2152 8.22239 9.49292C8.11619 9.61754 7.99536 9.72887 7.86251 9.82451C7.56644 10.0377 7.19811 10.1392 6.46145 10.3423C4.80107 10.8 3.97088 11.0289 3.65804 11.5721C3.5228 11.8069 3.45242 12.0735 3.45413 12.3446C3.45809 12.9715 4.06698 13.581 5.28476 14.8L6.69935 16.2163L2.22345 20.6964C1.92552 20.9946 1.92552 21.4782 2.22345 21.7764C2.52138 22.0746 3.00443 22.0746 3.30236 21.7764L7.77841 17.2961L9.24441 18.7635C10.4699 19.9902 11.0827 20.6036 11.7134 20.6045C11.9792 20.6049 12.2404 20.5358 12.4713 20.4041C13.0192 20.0914 13.2493 19.2551 13.7095 17.5825C13.9119 16.8472 14.013 16.4795 14.2254 16.1835C14.3184 16.054 14.4262 15.9358 14.5468 15.8314C14.8221 15.593 15.1788 15.459 15.8922 15.191L17.7362 14.4981C20.4 13.4973 21.7319 12.9969 21.9667 11.9115C22.2014 10.826 21.1954 9.81905 19.1835 7.80516Z" fill="#1cb566"/></svg>`;

  const upvotearrow = `<svg fill="#303030" height="${getWidgetValue(18)}px" width="${getWidgetValue(18)}px" viewBox="0 0 492.002 492.002" xmlns="http://www.w3.org/2000/svg"><path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844L7.852,328.265 C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124c5.064,5.064,11.824,7.86,19.032,7.86 s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064c5.064,5.06,11.82,7.852,19.032,7.852 c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132C494.624,356.041,494.624,338.965,484.136,328.473z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const downvotearrow = `<svg fill="#303030" height="${getWidgetValue(18)}px" width="${getWidgetValue(18)}px" viewBox="0 0 491.996 491.996" xmlns="http://www.w3.org/2000/svg"><path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const repliesup = upvotearrow;
  const repliesdown = downvotearrow;

  const isBeingRepliedTo = replyToId === message.id;

  const firstName = message.sender.split(" ")[0];

  const messageStyle = {
    fill: isBeingRepliedTo ? widgetButtonColor : "#FFFFFF",
    color: "#000000",
    extra: isBeingRepliedTo ? widgetButtonColor : "#f0f0f0",
  };

  const isEdited = message.edited;
  const isDeleted = message.deleted;
  const messageDepth = getMessageDepth(message.id);
  const score = message.upvotedUsers.length - message.downvotedUsers.length;

  let repliesAvaliable = false;
  if (messageDepth >= 1) repliesAvaliable = true;

  return (
    <AutoLayout direction="vertical">
      <AutoLayout
        direction="vertical"
        padding={{ top: getWidgetValue(15), bottom: isDeleted ? 0 : getWidgetValue(15), left: getWidgetValue(12), right: getWidgetValue(12) }}
        strokeWidth={getWidgetValue(2)}
        cornerRadius={getWidgetValue(4)}
        spacing={getWidgetValue(20)}
        fill={messageStyle.fill}
        effect={[]}
      >
        <AutoLayout
          direction="horizontal"
          verticalAlignItems="center"
          width={getWidgetValue(800)}
          padding={{ top: getWidgetValue(10), bottom: getWidgetValue(1), left: getWidgetValue(4), right: getWidgetValue(2) }}
        >
          <AutoLayout direction="horizontal" horizontalAlignItems="start" verticalAlignItems="center" width={getWidgetValue(490)} spacing={getWidgetValue(20)}>
            {!message.anonymous && message.userIcon && message.userIcon !== "None" ? (
              <Image src={message.userIcon} width={getWidgetValue(40)} height={getWidgetValue(40)} cornerRadius={getWidgetValue(15)} />
            ) : null}
            <Text fontSize={getWidgetValue(30)} fill={messageStyle.color} horizontalAlignText={"left"}>
              {(message.deleted || message.anonymous) ? "Anonymous" : firstName}:
            </Text>

            {message.pinned && <SVG src={pinYES} />}
          </AutoLayout>

          <AutoLayout direction="horizontal" horizontalAlignItems="end" verticalAlignItems="center" padding={{ top: getWidgetValue(2), bottom: getWidgetValue(2), left: getWidgetValue(1), right: getWidgetValue(8) }} width={getWidgetValue(260)}>
            <Text fontSize={getWidgetValue(16)} fill={messageStyle.color} horizontalAlignText={"right"}>
              {message.timestamp.replace(" ", "\n")}
            </Text>
          </AutoLayout>

          {message.text != "this message has been deleted" && (
            <AutoLayout cornerRadius={4} padding={{ top: getWidgetValue(2), bottom: getWidgetValue(2), left: getWidgetValue(8), right: getWidgetValue(8) }} onClick={onOptionsClick}>
              <SVG src={adminI} onClick={onOptionsClick} />
            </AutoLayout>
          )}
        </AutoLayout>

        <AutoLayout direction="horizontal" padding={{ top: getWidgetValue(20), bottom: getWidgetValue(4), left: getWidgetValue(10), right: getWidgetValue(4) }} fill={messageStyle.fill}>
          <AutoLayout direction="vertical">
            <Text width={getWidgetValue(740)} fontSize={getWidgetValue(messageFontSize)}>
              {isDeleted ? "this message has been deleted" : message.text}
            </Text>

            <Text width={getWidgetValue(60)} fontSize={4} fill="#808080">
              {" "}
            </Text>

            {isEdited && !isDeleted && (
              <Text width={getWidgetValue(200)} fontSize={getWidgetValue(25)} fill="#808080">
                (edited)
              </Text>
            )}
          </AutoLayout>
        </AutoLayout>

        <AutoLayout direction="horizontal" padding={{ top: getWidgetValue(20), bottom: 0, left: getWidgetValue(4), right: getWidgetValue(4) }} spacing={12}>
          {message.text != "this message has been deleted" && (
            <AutoLayout fill={messageStyle.extra} cornerRadius={getWidgetValue(200)}>
              <AutoLayout cornerRadius={getWidgetValue(200)} padding={{ top: getWidgetValue(14), bottom: getWidgetValue(4), left: getWidgetValue(10), right: getWidgetValue(10) }} onClick={() => onUpvote()}>
                <Text fontSize={getWidgetValue(25)} fill="#FFFFFF">
                  {" "}
                </Text>
                <SVG src={upvotearrow} />
              </AutoLayout>
              <AutoLayout padding={{ top: getWidgetValue(10), bottom: getWidgetValue(6), left: getWidgetValue(10), right: getWidgetValue(10) }}>
                <Text fontSize={getWidgetValue(25)} fill="#000000">
                  {score}
                </Text>
              </AutoLayout>
              <AutoLayout cornerRadius={getWidgetValue(200)} padding={{ top: getWidgetValue(14), bottom: getWidgetValue(4), left: getWidgetValue(10), right: getWidgetValue(10) }} onClick={() => onDownvote()}>
                <SVG src={downvotearrow} />
                <Text fontSize={getWidgetValue(25)} fill="#FFFFFF">
                  {" "}
                </Text>
              </AutoLayout>
            </AutoLayout>
          )}
          {message.text != "this message has been deleted" && (
            <AutoLayout fill={widgetButtonColor} cornerRadius={getWidgetValue(200)} padding={{ top: getWidgetValue(8), bottom: isDeleted ? 0 : getWidgetValue(8), left: getWidgetValue(10), right: getWidgetValue(10) }} onClick={onReply}>
              <Text fontSize={getWidgetValue(25)} fill={widgetButtonColor}>
                {" "}
              </Text>
              <SVG src={replyIconSrc} onClick={onReply} />
              <Text fontSize={getWidgetValue(25)} fill="#FFFFFF">
                {" "}
                Reply{" "}
              </Text>
            </AutoLayout>
          )}
          {repliesAvaliable && (
            <AutoLayout cornerRadius={getWidgetValue(4)} padding={{ top: getWidgetValue(8), bottom: isDeleted ? getWidgetValue(15) : 0, left: getWidgetValue(10), right: getWidgetValue(10) }} onClick={onShowReplies}>
              {message.showReplies ? (
                <AutoLayout cornerRadius={getWidgetValue(4)} padding={{ top: getWidgetValue(6), bottom: getWidgetValue(6), left: 0, right: 0 }} onClick={onShowReplies}>
                  <SVG src={repliesup} onClick={onShowReplies} />
                </AutoLayout>
              ) : (
                <AutoLayout cornerRadius={4} padding={{ top: getWidgetValue(6), bottom: getWidgetValue(6), left: 0, right: 0 }} onClick={onShowReplies}>
                  <SVG src={repliesdown} onClick={onShowReplies} />
                </AutoLayout>
              )}
              <Text fontSize={getWidgetValue(25)} fill={widgetButtonColor}>
                {" "}
                {totalReplies} Replies{" "}
              </Text>
            </AutoLayout>
          )}
        </AutoLayout>
      </AutoLayout>

      {message.showReplies && replyChain && (
        <AutoLayout direction="vertical" width={"fill-parent"} padding={{ top: isDeleted ? 0 : getWidgetValue(10), bottom: isDeleted ? 0 : getWidgetValue(10), left: getWidgetValue(32), right: getWidgetValue(8) }}>
          {replyChain}
        </AutoLayout>
      )}
    </AutoLayout>
  );
}

widget.register(ChatWidget);
