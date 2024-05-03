const { widget, showUI, ui } = figma;
const { AutoLayout, Text, useSyncedState, Input, Frame, Image, SVG, useEffect, colorMapToOptions, usePropertyMenu} = widget;
//import '@fontawesome/free-solid-svg-icons';



const replyIconSrc = '<svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 17V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H4M4 11L8 7M4 11L8 15" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'

const delete1 = '<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'

const deleteNO = '<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'
const deleteYES = '<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff5252"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 14L11 16L15 12M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#ff5252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'

const pin = '<svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1218 1.87023C15.7573 0.505682 13.4779 0.76575 12.4558 2.40261L9.61062 6.95916C9.61033 6.95965 9.60913 6.96167 9.6038 6.96549C9.59728 6.97016 9.58336 6.97822 9.56001 6.9848C9.50899 6.99916 9.44234 6.99805 9.38281 6.97599C8.41173 6.61599 6.74483 6.22052 5.01389 6.87251C4.08132 7.22378 3.61596 8.03222 3.56525 8.85243C3.51687 9.63502 3.83293 10.4395 4.41425 11.0208L7.94975 14.5563L1.26973 21.2363C0.879206 21.6269 0.879206 22.26 1.26973 22.6506C1.66025 23.0411 2.29342 23.0411 2.68394 22.6506L9.36397 15.9705L12.8995 19.5061C13.4808 20.0874 14.2853 20.4035 15.0679 20.3551C15.8881 20.3044 16.6966 19.839 17.0478 18.9065C17.6998 17.1755 17.3043 15.5086 16.9444 14.5375C16.9223 14.478 16.9212 14.4114 16.9355 14.3603C16.9421 14.337 16.9502 14.3231 16.9549 14.3165C16.9587 14.3112 16.9606 14.31 16.9611 14.3098L21.5177 11.4645C23.1546 10.4424 23.4147 8.16307 22.0501 6.79853L17.1218 1.87023ZM14.1523 3.46191C14.493 2.91629 15.2528 2.8296 15.7076 3.28445L20.6359 8.21274C21.0907 8.66759 21.0041 9.42737 20.4584 9.76806L15.9019 12.6133C14.9572 13.2032 14.7469 14.3637 15.0691 15.2327C15.3549 16.0037 15.5829 17.1217 15.1762 18.2015C15.1484 18.2752 15.1175 18.3018 15.0985 18.3149C15.0743 18.3316 15.0266 18.3538 14.9445 18.3589C14.767 18.3699 14.5135 18.2916 14.3137 18.0919L5.82846 9.6066C5.62872 9.40686 5.55046 9.15333 5.56144 8.97583C5.56651 8.8937 5.58877 8.84605 5.60548 8.82181C5.61855 8.80285 5.64516 8.7719 5.71886 8.74414C6.79869 8.33741 7.91661 8.56545 8.68762 8.85128C9.55668 9.17345 10.7171 8.96318 11.3071 8.01845L14.1523 3.46191Z" fill="#0F0F0F"></path> </g></svg>'
const pinYES = '<svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#1cb566"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.1835 7.80516L16.2188 4.83755C14.1921 2.8089 13.1788 1.79457 12.0904 2.03468C11.0021 2.2748 10.5086 3.62155 9.5217 6.31506L8.85373 8.1381C8.59063 8.85617 8.45908 9.2152 8.22239 9.49292C8.11619 9.61754 7.99536 9.72887 7.86251 9.82451C7.56644 10.0377 7.19811 10.1392 6.46145 10.3423C4.80107 10.8 3.97088 11.0289 3.65804 11.5721C3.5228 11.8069 3.45242 12.0735 3.45413 12.3446C3.45809 12.9715 4.06698 13.581 5.28476 14.8L6.69935 16.2163L2.22345 20.6964C1.92552 20.9946 1.92552 21.4782 2.22345 21.7764C2.52138 22.0746 3.00443 22.0746 3.30236 21.7764L7.77841 17.2961L9.24441 18.7635C10.4699 19.9902 11.0827 20.6036 11.7134 20.6045C11.9792 20.6049 12.2404 20.5358 12.4713 20.4041C13.0192 20.0914 13.2493 19.2551 13.7095 17.5825C13.9119 16.8472 14.013 16.4795 14.2254 16.1835C14.3184 16.054 14.4262 15.9358 14.5468 15.8314C14.8221 15.593 15.1788 15.459 15.8922 15.191L17.7362 14.4981C20.4 13.4973 21.7319 12.9969 21.9667 11.9115C22.2014 10.826 21.1954 9.81905 19.1835 7.80516Z" fill="#1cb566"></path> </g></svg>'

const upvotearrow = '<svg fill="#303030" height="18px" width="18px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z"></path> </g> </g> </g></svg>'
const downvotearrow = '<svg fill="#303030" height="18px" width="18px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z"></path> </g> </g> </g></svg>'

const edit = '<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8787 3.70705C17.0503 2.53547 18.9498 2.53548 20.1213 3.70705L20.2929 3.87862C21.4645 5.05019 21.4645 6.94969 20.2929 8.12126L18.5556 9.85857L8.70713 19.7071C8.57897 19.8352 8.41839 19.9261 8.24256 19.9701L4.24256 20.9701C3.90178 21.0553 3.54129 20.9554 3.29291 20.7071C3.04453 20.4587 2.94468 20.0982 3.02988 19.7574L4.02988 15.7574C4.07384 15.5816 4.16476 15.421 4.29291 15.2928L14.1989 5.38685L15.8787 3.70705ZM18.7071 5.12126C18.3166 4.73074 17.6834 4.73074 17.2929 5.12126L16.3068 6.10738L17.8622 7.72357L18.8787 6.70705C19.2692 6.31653 19.2692 5.68336 18.8787 5.29283L18.7071 5.12126ZM16.4477 9.13804L14.8923 7.52185L5.90299 16.5112L5.37439 18.6256L7.48877 18.097L16.4477 9.13804Z" fill="#000000"></path> </g></svg>'

const repliesup = '<svg fill="#007AFF" height="18px" width="18px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z"></path> </g> </g> </g></svg>'
const repliesdown = '<svg fill="#007AFF" height="18px" width="18px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z"></path> </g> </g> </g></svg>'



const adminI = '<svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 8L4.44293 16.6576C4.76439 18.5863 6.43315 20 8.38851 20H15.6115C17.5668 20 19.2356 18.5863 19.5571 16.6576L21 8M3 8L6.75598 11.0731C7.68373 11.8321 9.06623 11.6102 9.70978 10.5989L12 7M3 8C3.82843 8 4.5 7.32843 4.5 6.5C4.5 5.67157 3.82843 5 3 5C2.17157 5 1.5 5.67157 1.5 6.5C1.5 7.32843 2.17157 8 3 8ZM21 8L17.244 11.0731C16.3163 11.8321 14.9338 11.6102 14.2902 10.5989L12 7M21 8C21.8284 8 22.5 7.32843 22.5 6.5C22.5 5.67157 21.8284 5 21 5C20.1716 5 19.5 5.67157 19.5 6.5C19.5 7.32843 20.1716 8 21 8ZM12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'

const plus = '<svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'

type Message = {
    id: string;
    parentId: string | null;
    text: string;
    sender: string;
    timestamp: string;
    edited: boolean;//used to keep tracak of edited status of message
    deleteConfirm: boolean;
    showReplies: boolean;
    pinned: boolean;
    deleted: boolean;
    upvotedUsers: string[];
    downvotedUsers: string[];
    directreply: number;
    logId: number, // Include the logId in each message
    anonymous: boolean;

};


type MessageBubbleProps = {
    message: Message;
    onReply: () => void;
    onDelete: () => void;
    onEdit: () => void;
    onDeleteConfirm: () => void;
    onShowReplies: () => void;
    replyChain: any; // Or whatever type is appropriate for your replyChain
    replyToId: string | null; // Add this line
    user: any;//
    getMessageDepth: (messageId: string) => number;
    onPin: (id: string) => void;
    totalReplies: number
    allowedUsersToPin: Set<string>;
    onUpvote: () => void;
    onDownvote: () => void; // Add this line
    onOptionsClick: () => void;
    updateUserName: () => void;
    getTotalDirectReplies: (messageId: string) => number;

};

function generateLogId() {
  const randomString = Math.random().toString(36).substring(2, 8);
  const dateString = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  return `${dateString}-${randomString}`;
}

function ChatWidget() {
    //console.log("ChatWidget rendered2");

   
    
    const [logId, setLogId] = useSyncedState('newMessage', Date.now());
    

   
    const [newMessage, setNewMessage] = useSyncedState('newMessage', '');
    const [replyToId, setReplyToId] = useSyncedState<string | null>('replyToId', null);
    const [messages, setMessages] = useSyncedState<Message[]>('messages', []);
    const [userName, setUserName] = useSyncedState('userName', 'Unknown User');
    const [inputPlaceholder, setInputPlaceholder] = useSyncedState('inputPlaceholder', 'Type a message...');
    const [inputActive, setInputActive] = useSyncedState('inputActive', false);
    const [isEditing, setIsEditing] = useSyncedState<boolean>('isEditing', false);
    const allowedUsersToPin = new Set(['Neel Walse', 'Ashwin Chembu', 'David M Torres-Mendoza']);
    let messageQueue: Message[] = [];

    const [inPrompt, setPrompt] = useSyncedState('Prompt not set', '');

    const [color, setColor] = useSyncedState("theme", "#000000");
    
    usePropertyMenu(
      [
        {
          itemType: 'color-selector',
          propertyName: 'colors',
          tooltip: 'Color selector',
          selectedOption: color,
          options: [{option: "#000000", tooltip: "Black"}, {option: "#e06666", tooltip: "Red"}, {option: "#ffe599", tooltip: "Yellow"} ],
        }
      ],
      ({propertyName, propertyValue}) => {
        if (propertyName === "colors") {
          setColor(String(propertyValue))
        }
      },
    );
    
  /*
    useEffect(() => {
      console.log("update call");
  if (logId !== 0) {
    figma.showUI(__uiFiles__.check, { visible: false });
    figma.ui.postMessage({ type: 'set-log-id', logId });

    figma.ui.onmessage = (msg) => {
      if (msg.type === 'update-messages') {
        console.log("hello", messages);
        console.log("data", msg.data);

        if (Array.isArray([msg.data])) {
          setMessages([msg.data]);
        } else {
          console.warn("Received data is not an array:", msg.data);
        }

        console.log("done", messages);
      }
    };

    // Return a cleanup function to close the UI when the component unmounts
    return () => {
      console.log("CLOSE");
      figma.ui.close();
    };
  }
});
*/

    


    function isUserAuthorized(userName: string): boolean {
      // Example implementation: Check if the user is in the list of authorized users
      updateUserName();
      console.log(allowedUsersToPin.has(userName));
      return allowedUsersToPin.has(userName);
  }
    


  function openMessageInputModal(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      figma.showUI(__uiFiles__.main, { width: 400, height: 270 });
  
      figma.ui.onmessage = async (msg) => {
        if (msg.type === 'new-message') {
          const { message, anonymous } = msg.payload; // Destructure the payload
          await handleAddMessage({ messageText: message, anonymous: anonymous });
          resolve();
        } else if (msg.type === 'close-plugin') {
          figma.closePlugin();
          resolve();
        }
      };
    });
  }
  

    /*
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
    */
    function delay(ms: number) {
      let rand = ms * 70 * Math.random();
      return new Promise( resolve => setTimeout(resolve, ms) );
  }
    const handleEditToMessage = (id: string): Promise<void> => {
      console.log("editing");
      delay(10000);
      return new Promise<void>((resolve, reject) => {
        const messageToEdit = messages.find(message => message.id === id);
        if (messageToEdit) {
          // Open the UI modal with the message content
          console.log("opening modal");
          figma.showUI(__uiFiles__.main, { width: 400, height:270 });
          figma.ui.postMessage({ type: 'edit-message', payload: messageToEdit.text });
          console.log("opened");
          figma.ui.onmessage = msg => {
            if (msg.type === 'update-message') {
              console.log("updated---", msg.payload);
              // Process the updated message text
              const updatedText = msg.payload.message;
              const anonymous = msg.payload.anonymous;
              console.log(updatedText, anonymous);
              const updatedMessage = { ...messageToEdit, text: updatedText, anonymous: anonymous, edited: true };
                    //messageQueue.push(updatedMessage); // Add the updated message to the queue
                    //delay(10000);

                    //processMessageQueue(); // Process the message queue
                    //setMessages((prevMessages) => [...prevMessages, updatedMessage]);
                    const index = messages.findIndex(message => message.id === id);

                    if (index !== -1) {
                      // Replace the existing message with the updated one
                      const updatedMessages = [...messages];
                      updatedMessages[index] = updatedMessage;
                      setMessages(updatedMessages);
                    }
                    
              figma.closePlugin();
              resolve(); // Resolve the promise when the message is updated, no value needed
            } else if (msg.type === 'cancel-edit') {
              console.log("canceled");
              reject('Edit canceled by user.'); // Reject the promise if editing is canceled, providing a reason as a string
            } else if (msg.type === 'close-plugin') {
              console.log("closed");
          figma.closePlugin(); // Close the plugin UI when 'close-plugin' message is received
          resolve(); // Optionally resolve the promise here, since the action is completed
        }
          };
        } else {
          console.log('Message not found.');
          reject('Message not found.'); // Reject the promise if the message to edit is not found, providing a reason as a string
        }
      });
    };
    
    const updateUserName = () => {
      const currentUserName = figma.currentUser ? figma.currentUser.name : 'Unknown User';
      setUserName(currentUserName);
      console.log(userName);
    };
    /*
    const checkLogId = async () => {
      console.log("no log id");
      if (logId == "None") {
        try {
          const response = await fetch('http://localhost:4000/create-widget', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const data = await response.json();
          console.log(data.logId);
          return data.logId; // Return the new logId
        } catch (error) {
          console.error('Error creating widget:', error);
        }
      }
      else{
        console.log("logID already exists");
      }
      return logId; // Return the existing logId if it's not "None"
    };
    */
    const generateRandomString = (length = 6) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };
    const processMessageQueue = () => {
      if (messageQueue.length > 0) {
        delay(10000);
        const messageToAdd = messageQueue.shift(); // Get the first message from the queue

        if (messageToAdd) {
          setMessages((prevMessages) => [...prevMessages, messageToAdd]); // Add the message to the state
          
        }

      }
    };
    

    
    
    const handleAddMessage = async (messageData: { messageText: string, anonymous: boolean }) => {
      const { messageText, anonymous } = messageData; // Destructure the message data
      console.log("anonymous:", anonymous);
      console.log("messageText:", messageText);
      console.log("messageData:", messageData);
      let count = 10;
      /*
      while (logId == "None" && count > 0){
        try {
          const generatedLogId = await checkLogId();
          console.log("Generated Log ID:", generatedLogId);
          setLogId(generatedLogId);
          console.log("Generated Log ID:", logId);
      } catch (error) {
          console.error("Error generating log ID:", error);
          return;
      }
        count--;
        delay(10000);
        console.log("not set yet,", count);
      }
      */
      updateUserName(); // Assumes you have a function to set/update the userName
    
      if (messageText.trim() !== '') {
        const timestamp = Date.now(); // Current time in milliseconds
        const randomString = generateRandomString(); // Generate a random string
        const newId = `${timestamp}${randomString}${userName}`;
        console.log(newId);
        const timestampDate = new Date(timestamp);
        const hours = timestampDate.getHours();
        const minutes = timestampDate.getMinutes();
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format
        const timestampString = `${formattedHours}:${formattedMinutes} ${ampm}`;
        const currentUserName = figma.currentUser && figma.currentUser.name ? figma.currentUser.name : userName;
        
        const newMessageObject = {
          id: newId,
          parentId: null, // Assuming direct messages have no parent; adjust if implementing replies
          text: messageText.trim(),
          sender: currentUserName,
          timestamp: timestampString,
          edited: false, // New messages are not edited at creation
          deleteConfirm: false, // Initial state for deletion confirmation
          showReplies: false, // Initial state for showing replies
          pinned: false, // Initial pinned state
          deleted: false, // Initial deletion state
          upvotedUsers: [], // Initial upvote state
          downvotedUsers: [], // Initial downvote state
          directreply: 0,
          logId: logId, // Include the logId in each message
          anonymous: anonymous
        };
        try {
          // Add the message to the state first
          console.log('newMessage before sending:', newMessageObject);

          // Then send the message to the server
          const response = await fetch(`https://figjam-widgets.onrender.com/messages`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMessageObject),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          // Optionally, you can handle the server response if needed
          const data = await response.json();
          console.log('Message added successfully:', data);
        } catch (error) {
          console.error('Error adding message:', error);
          // Optionally, handle the error (e.g., show a notification to the user)
        }
        
        messageQueue.push(newMessageObject);
        delay(10000);

        // Call the function to process the queue
        processMessageQueue();      
      }
    };
    
    
   
    const onUpvote = (id: string) => {
      setMessages(prevMessages => prevMessages.map(message => {
          if (message.id === id) {
              let newUpvotedUsers = [...message.upvotedUsers];
              let newDownvotedUsers = [...message.downvotedUsers];
  
              const upvoteIndex = newUpvotedUsers.indexOf(userName);
              const downvoteIndex = newDownvotedUsers.indexOf(userName);
  
              if (upvoteIndex > -1) {
                  // User already upvoted, so remove their upvote
                  newUpvotedUsers.splice(upvoteIndex, 1);
              } else {
                  // User hasn't upvoted, so add their upvote
                  newUpvotedUsers.push(userName);
                  if (downvoteIndex > -1) {
                      // Also remove downvote if it exists
                      newDownvotedUsers.splice(downvoteIndex, 1);
                  }
              }
              return { ...message, upvotedUsers: newUpvotedUsers, downvotedUsers: newDownvotedUsers };
          }
          return message;
      }));
    };
  
    const onDownvote = (id: string) => {
        setMessages(prevMessages => prevMessages.map(message => {
            if (message.id === id) {
                let newUpvotedUsers = [...message.upvotedUsers];
                let newDownvotedUsers = [...message.downvotedUsers];
    
                const upvoteIndex = newUpvotedUsers.indexOf(userName);
                const downvoteIndex = newDownvotedUsers.indexOf(userName);
    
                if (downvoteIndex > -1) {
                    // User already downvoted, so remove their downvote
                    newDownvotedUsers.splice(downvoteIndex, 1);
                } else {
                    // User hasn't downvoted, so add their downvote
                    newDownvotedUsers.push(userName);
                    if (upvoteIndex > -1) {
                        // Also remove upvote if it exists
                        newUpvotedUsers.splice(upvoteIndex, 1);
                    }
                }
                return { ...message, upvotedUsers: newUpvotedUsers, downvotedUsers: newDownvotedUsers };
            }
            return message;
        }));
    };
  
  
  
  

    // This function is triggered when a user clicks to reply to a message.
    const handleReplyToMessage = async (id: string) => {
            const timestamp = Date.now(); // Current time in milliseconds
            const randomString = generateRandomString(); // Generate a random string
            const newId = `${timestamp}${randomString}${userName}`;
            const timestampDate = new Date(timestamp);
            const hours = timestampDate.getHours();
            const minutes = timestampDate.getMinutes();
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12; // Convert to 12-hour format
            const timestampString = `${formattedHours}:${formattedMinutes} ${ampm}`;
            const currentUserName = figma.currentUser && figma.currentUser.name ? figma.currentUser.name : userName;
            // Find the message being replied to
            const messageToReply = messages.find(message => message.id === id);
            
            if (messageToReply) {
              // Open the UI for entering a reply message
              figma.showUI(__uiFiles__.main, { width: 400, height: 270 });
              // Send the original message text to the UI, indicating a reply action
              figma.ui.postMessage({ type: 'reply-message', payload: messageToReply });

              return new Promise<void>((resolve, reject) => {
                figma.ui.onmessage = msg => {
                  if (msg.type === 'send-reply') {
                    // Extract the reply message text from the UI response
                    console.log(msg.payload);
                    const replyText = msg.payload.message;
                    const anonymous = msg.payload.anonymous; // Extract the anonymous value
                    // Create a new message object for the reply
                    const newMessage: Message = {
                      id: newId, // Generate a unique ID for the new message
                      parentId: id, // Set the parent ID to link the reply to the original message
                      text: replyText,
                      sender: userName, // Assuming you have a variable for the current user's name
                      timestamp: timestampString, // Format the timestamp as needed
                      edited: false, // New messages are not edited
                      deleteConfirm: false, // Initial state for delete confirmation
                      showReplies: false, // Initial state for showing replies
                      pinned: false, // Initial pinned state
                      deleted: false, // Initial deletion state
                      upvotedUsers: [], // Initial upvote state
                      downvotedUsers: [], // Initial downvote state
                      directreply: 0,
                      logId: logId, // Include the logId in each message
                      anonymous: anonymous
                    };
                    console.log("newreply");
                    const updatedMessages = messages.map(message => {
                      if (message.id === id) {
                          return { ...message, directreply: message.directreply + 1 };
                      }
                      return message;
                  });
                    // Update the messages state to include the new reply
                    messageQueue.push(newMessage);
                    delay(10000);

                    // Call the function to process the queue
                    processMessageQueue(); 

                    // setMessages(prevMessages => [...prevMessages, newMessage]);
                        
                    resolve();
                  } else if (msg.type === 'close-plugin') {
                    // Handle the case where the plugin UI is closed without sending a reply
                    reject('Reply action was cancelled.');
                  }
                };
              });
            } else {
              // Handle the case where the message to reply to wasn't found
              console.error('Message to reply to was not found.');
              return Promise.reject('Message to reply to was not found.');
            }
    };

    
  


    const handleDeleteMessage = (id: string) => {
      // Find the message to delete
      const messageToDelete = messages.find(message => message.id === id);

      // Check if the message exists
      if (messageToDelete) {
        messageToDelete.deleted = true;
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

    const handleDeleteConfirm = (id: string) => {
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
    

    const handleShowReplies = (id: string) => {
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

    /*
    const updatePrompt = (prompt: string) => {
      setPrompt(prompt);
    }
    */
    
    
    const getMessageDepth = (messageId: string) => {
      let currentMessage = messages.find(message => message.id === messageId);

        if (!currentMessage) {
            return 0; // Return 0 if the message is not found
        }

        let maxDepth = 0;
        const getDepth = (parentId: string, currentDepth: number) => {
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

    const handlePinMessage = (id: string) => {
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
          //console.log("Only Ashwin Chembu can pin messages.");
    }
    };



    const renderMessages = (parentId: string | null = null) => {

      //console.log('render')
      // Function to calculate the total number of replies for a message
      const getTotalReplies = (messageId: string): number => {
        return messages.filter((message) => message.parentId === messageId).length;
      };


      const handleOptionsClick = (id: string) => {
        // Here you can add logic to check if the user is authorized
        // For example, let's assume you have a function `isUserAuthorized` that checks this
        updateUserName();
        console.log("in options:" , userName);
        if (isUserAuthorized(userName)) {
            return new Promise<void>((resolve, reject) => {
                figma.showUI(__uiFiles__.options, { width: 350, height:50 });
    
                // Listen for messages from the options.html iframe
                figma.ui.onmessage = msg => {
                    if (msg.type === 'edit-message') {
                      console.log("calling edit from options");
                        // Handle edit message action
                        const messageToEdit = messages.find(message => message.id === id);
                        if (messageToEdit && !messageToEdit.deleted) {
                          // Open the UI modal with the message content
                          console.log(messageToEdit.deleted)
                          console.log("opening modal");
                          figma.showUI(__uiFiles__.main, { width: 400, height: 270 });
                          figma.ui.postMessage({ type: 'edit-message', payload: messageToEdit.text });
                          console.log("opened");
                          figma.ui.onmessage = msg => {
                            if (msg.type === 'update-message') {
                              console.log("updated");
                              // Process the updated message text
                              const updatedText = msg.payload.message;
                              const anonymous = msg.payload.anonymous;
                              console.log(msg.payload);
                              const updatedMessages = messages.map(message => {
                                if (message.id === id) {
                                  return { ...message, text: updatedText, anonymous: anonymous, edited: true };
                                }
                                return message;
                              });
                              setMessages(updatedMessages);
                              figma.closePlugin();
                              resolve(); // Resolve the promise when the message is updated, no value needed
                            } else if (msg.type === 'cancel-edit') {
                              console.log("canceled");
                              reject('Edit canceled by user.'); // Reject the promise if editing is canceled, providing a reason as a string
                            } else if (msg.type === 'close-plugin') {
                              console.log("closed");
                              figma.closePlugin(); // Close the plugin UI when 'close-plugin' message is received
                              resolve(); // Optionally resolve the promise here, since the action is completed
                            }
                          };
                        } else {
                          console.log('Message not found.');
                          reject('Message not found.'); // Reject the promise if the message to edit is not found, providing a reason as a string
                        }

                    } else if (msg.type === 'edit-user') {
                      console.log("calling edit from options");
                        // Handle edit message action
                        const messageToEdit = messages.find(message => message.id === id);
                        if (messageToEdit && !messageToEdit.deleted) {
                          // Open the UI modal with the message content
                          console.log(messageToEdit.deleted)
                          console.log("opening modal");
                          figma.showUI(__uiFiles__.main, { width: 400, height: 270 });
                          figma.ui.postMessage({ type: 'edit-message', payload: messageToEdit.sender });
                          console.log("opened");
                          figma.ui.onmessage = msg => {
                            if (msg.type === 'update-message') {
                              console.log("updated");
                              // Process the updated message text
                              const updatedText = msg.payload.message;
                              const anonymous = msg.payload.anonymous;
                              console.log(msg.payload);
                              const updatedMessages = messages.map(message => {
                                if (message.id === id) {
                                  return { ...message, sender: updatedText, anonymous: anonymous, edited: true };
                                }
                                return message;
                              });
                              setMessages(updatedMessages);
                              figma.closePlugin();
                              resolve(); // Resolve the promise when the message is updated, no value needed
                            } else if (msg.type === 'cancel-edit') {
                              console.log("canceled");
                              reject('Edit canceled by user.'); // Reject the promise if editing is canceled, providing a reason as a string
                            } else if (msg.type === 'close-plugin') {
                              console.log("closed");
                              figma.closePlugin(); // Close the plugin UI when 'close-plugin' message is received
                              resolve(); // Optionally resolve the promise here, since the action is completed
                            }
                          };
                        } else {
                          console.log('Message not found.');
                          reject('Message not found.'); // Reject the promise if the message to edit is not found, providing a reason as a string
                        }

                    } else if (msg.type === 'update-prompt') {
                        console.log("calling prompt from options");
                        figma.showUI(__uiFiles__.main, { width: 400, height: 250 });

                        figma.ui.postMessage({ type: 'edit-prompt', payload: inPrompt });
                        console.log("opened");

                        figma.ui.onmessage = msg => {
                          if (msg.type === 'update-message') {
                                const updatedText = msg.payload.message;
                                setPrompt(updatedText);
                                figma.closePlugin();
                                resolve(); 
                              } else if (msg.type === 'cancel-edit') {
                                console.log("canceled");
                                reject('Edit canceled by user.'); // Reject the promise if editing is canceled, providing a reason as a string
                              } else if (msg.type === 'close-plugin') {
                                console.log("closed");
                                figma.closePlugin(); // Close the plugin UI when 'close-plugin' message is received
                                resolve(); // Optionally resolve the promise here, since the action is completed
                              }
                            };

                    } else if (msg.type === 'delete-message') {
                        // Handle delete message action
                        handleDeleteMessage(id);
                        resolve();
                    } else if (msg.type === 'pin-message') {
                        // Handle pin message action
                        handlePinMessage(id);
                        resolve();
                        
                    } else if (msg.type === 'close-options') {
                        // Handle closing the options iframe
                        resolve();
                    }
                };
            });
        }
    };





    const getTotalDirectReplies = (messageId: string): number => {
      
      const message = messages.filter((msg) => msg.parentId === messageId);
      if (message){
        //return the messag ereply from that message
      }
      return 0;
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

      const filteredMessages = sortedMessages.filter(message => message.parentId === parentId);

      if (filteredMessages.length === 0) {
        // Show "No messages" when there are no messages
        return <AutoLayout
                padding={30}
                direction="vertical"
                spacing={20}
                minWidth={450}
                horizontalAlignItems={"center"}
                >
                  <Text
                  fill="#60666D"
                  fontSize={16}
                  fontWeight={500}
                  lineHeight={1.4}
                  >
                    No messages yet
                  </Text>
                  <Text
                  fill="#8E939A"
                  fontSize={14}
                  lineHeight={1.4}
                  >
                    Send a message with the add message button below.
                  </Text>
              </AutoLayout>;
      }

      return sortedMessages
      .filter(message => message.parentId === parentId)
      .map((message) => (
          <MessageBubble
              key={message.id}
              message={message}
              onReply={() => handleReplyToMessage(message.id, )}
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
              onUpvote={() => onUpvote(message.id)}
              onDownvote={()=> onDownvote(message.id)}
              onOptionsClick={() => handleOptionsClick(message.id)}
              updateUserName={() => updateUserName()}
              getTotalDirectReplies = {(messageID) => getTotalDirectReplies(message.id)}
          />
      ));
    };

    const handleOptionsClickChat = () => {
      // Here you can add logic to check if the user is authorized
      // For example, let's assume you have a function `isUserAuthorized` that checks this
      updateUserName();
      console.log("in options:" , userName);
      if (isUserAuthorized(userName)) {
          return new Promise<void>((resolve, reject) => {
              figma.showUI(__uiFiles__.optionsChat, { width: 350, height: 50 });
  
              // Listen for messages from the options.html iframe
              figma.ui.onmessage = msg => {
                  if (msg.type === 'update-prompt') {
                      console.log("calling prompt from options");
                      figma.showUI(__uiFiles__.main, { width: 400, height: 250 });

                      figma.ui.postMessage({ type: 'edit-prompt', payload: inPrompt });
                      console.log("opened");

                      figma.ui.onmessage = msg => {
                        if (msg.type === 'update-message') {
                              const updatedText = msg.payload.message;
                              setPrompt(updatedText);
                              figma.closePlugin();
                              resolve(); 
                            } else if (msg.type === 'cancel-edit') {
                              console.log("canceled");
                              reject('Edit canceled by user.'); // Reject the promise if editing is canceled, providing a reason as a string
                            } else if (msg.type === 'close-plugin') {
                              console.log("closed");
                              figma.closePlugin(); // Close the plugin UI when 'close-plugin' message is received
                              resolve(); // Optionally resolve the promise here, since the action is completed
                            }
                          };
                  } else if (msg.type === 'close-options') {
                      // Handle closing the options iframe
                      resolve();
                  }
              };
          });
      }
  };
    

    

    return (
      /*
      <AutoLayout 
          direction="horizontal" 
          spacing={210}//changed from 100
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
      
       

      </AutoLayout>*/
      <AutoLayout
      direction="vertical"
      spacing={8}
      padding={20}
      stroke="#efefef" // Outline color for the send area
      strokeWidth={2} // Outline width for the send area
      cornerRadius={10} // Rounded corners for the send area
      onClick={updateUserName}
      minWidth={800}
      fill={'#FFFFFF'}
      >
      
    
      
        {/* <AutoLayout direction="vertical" spacing={8} padding={8} onClick={updateUserName}>
          <AutoLayout
            direction="horizontal"
            onClick={openMessageInputModal} // Use an AutoLayout, Frame, or similar widget as a button
            fill="#007AFF" // Example button styling
            padding={8}
            cornerRadius={100}
          >
            <AutoLayout padding={2}>
            <SVG src={plus}></SVG>
            </AutoLayout>

            <Text fill="#FFFFFF">Add Message  </Text>
          </AutoLayout>
        </AutoLayout> */}
        <AutoLayout
                //fill="#007AFF"
                cornerRadius={4}
                padding={{ top: 15, bottom: 2, left: 770, right: 10 }}
                onClick={handleOptionsClickChat}
            >
                <SVG
                  src={adminI}
                  onClick={handleOptionsClickChat}
                />


        </AutoLayout>

        <AutoLayout
          padding={{ top: 0, bottom: 20, left: 20 }}
        >
          <Text
          fill={color}
          fontSize={50}
          fontWeight={600}
          width={800}
          lineHeight={65}
          >
            {inPrompt ? inPrompt : 'Chat'}
          </Text>
        </AutoLayout>



        <AutoLayout
            direction="vertical"
            spacing={1} //changed from 10
            padding={8}
            stroke="#efefef"
            cornerRadius={10}
            minWidth={480}
        >
            {renderMessages()}
        </AutoLayout>

        <AutoLayout direction="vertical" spacing={8} padding={8} onClick={updateUserName} horizontalAlignItems={"end"} minWidth={800}>
          <AutoLayout
            direction="horizontal"
            onClick={openMessageInputModal} // Use an AutoLayout, Frame, or similar widget as a button
            fill="#007AFF" // Example button styling
            padding={8}
            cornerRadius={100}
            
          >
            <AutoLayout padding={6}>
            <SVG src={plus}></SVG>
            </AutoLayout>

            <Text fontSize={30} fill="#FFFFFF">Add Message  </Text>
          </AutoLayout>
          {/* Remaining UI elements, like the message display area */}
        </AutoLayout>
      </AutoLayout>
    );
}


function MessageBubble({ getTotalDirectReplies, message, onReply, onDelete, onEdit, replyChain, replyToId, user, onDeleteConfirm, getMessageDepth, onShowReplies, onPin, totalReplies, allowedUsersToPin, onUpvote, onDownvote,  onOptionsClick, updateUserName}: MessageBubbleProps) {
  
  //console.log("MessageBubble called with message:", message, "and replyToId:", replyToId);
  
  

  const isReply = message.parentId !== null;
  const isBeingRepliedTo = replyToId === message.id;

  const upvoteCount = message.upvotedUsers.length;
  const downvoteCount = message.downvotedUsers.length;

  //console.log(`Message ID: ${message.id}, ReplyTo ID: ${replyToId}, Is Being Replied To: ${isBeingRepliedTo}`);

  // Define the style for the message bubble
  const messageStyle = {
    fill: isBeingRepliedTo ? "#007AFF" : "#FFFFFF", // Blue if being replied to, otherwise white
    color: isBeingRepliedTo ? "#000000" : "#000000", // Text color white if being replied to, otherwise black
    extra: isBeingRepliedTo ? "#007AFF" : "#f0f0f0", // Text color white if being replied to, otherwise black
  };

  

  // Log the message style for debugging
  //console.log(messageStyle);

  //variable to hide the delete and edit buttons
  const isCurrentUserMessage = message.sender === user;
  //variable to see whether the message has been edited
  const isEdited = message.edited;

  const isDeleted = message.deleted;
  
  // Calculate the depth of the current message
  const messageDepth = getMessageDepth(message.id);
  const score = message.upvotedUsers.length - message.downvotedUsers.length;




  //const isUpvoted = message.upvotedUsers.has(user);
  var admin = false;
  console.log("USER:" , user);
  if (allowedUsersToPin.has(user)){
    console.log("inside", admin);
    admin = true;
  }


  // Adjust the right padding based on the message depth
  var adjustedRightPadding = 160;
  if (messageDepth == 0){
    adjustedRightPadding = 160;
  }


  //debugging
  //console.log("edited", isEdited);
  //console.log("user", user);
  //console.log("sender", message.sender);
  //console.log(isCurrentUserMessage);

  //show the sow replies button or not
  var repliesAvaliable = false;
  if(messageDepth >= 1){
    repliesAvaliable = true;
  }

  //console.log("users upvoted", message.upvotedUsers);


  
  var showNoRepliesDeleted = true;
  if(message.text == "this message has been deleted"){
    showNoRepliesDeleted = false;
  }
  
  return (
    
    <AutoLayout
    direction="vertical"
    

    >    
      <AutoLayout
        direction="vertical"
        padding={{ top: 15, bottom: isDeleted ? 0 : 15, left: 12, right: 12 }}
        //stroke="#D3D3D3"
        strokeWidth={2}
        cornerRadius={4}
        spacing={20}
        fill={messageStyle.fill}
        width={800}
        effect={[]}
      >
        <AutoLayout
          direction="horizontal"
          width={800}
          padding={{ top: 10, bottom: 1, left: 4, right: 8}}
        >
          <AutoLayout
            direction="horizontal"
            horizontalAlignItems="start"
            width={520}
            spacing={20}
          >
            <Text fontSize={30} fill={messageStyle.color} horizontalAlignText={"left"}>
              {(isDeleted || message.anonymous) ? 'Anonymous' : message.sender}:
            </Text>

            {message.pinned && (
            <SVG
              src={pinYES}
              //onClick={onReply}
            />
            )}
          </AutoLayout>
          
          <AutoLayout
            direction="horizontal"
            horizontalAlignItems="end"
            padding={{ top: 2, bottom: 2, left: 8, right: 8 }}
            width={200}
          >
            <Text fontSize={25} fill={messageStyle.color} horizontalAlignText={"right"}>
              {message.timestamp}
            </Text>
          </AutoLayout>

          {message.text != "this message has been deleted" && admin && (
            <AutoLayout
                //fill="#007AFF"
                cornerRadius={4}
                padding={{ top: 2, bottom: 2, left: 8, right: 8 }}
                onClick={onOptionsClick}
            >
                <SVG
                  src={adminI}
                  onClick={onOptionsClick}
                />


            </AutoLayout>
          )}

        </AutoLayout>

       
        <AutoLayout
          direction="horizontal"
          padding={{ top: 20, bottom: 4, left: 4, right: 4 }}
          fill={messageStyle.fill}
          
        >
          <AutoLayout 
            direction="vertical"
          >
            <Text width={380} fontSize={35}>
              {isDeleted ? 'this message has been deleted' : message.text}
            </Text>

            <Text width={60} fontSize={4} fill="#808080"> </Text>
            
            {isEdited && !isDeleted && (
              <Text width={60} fontSize={12} fill="#808080">
                (edited)
              </Text>
            )}
          </AutoLayout>
        </AutoLayout>

        
        <AutoLayout // Container for Reply and Delete and Edit and Show Replies buttons
          direction="horizontal"
          padding={{ top: 20, bottom: 0, left: 4, right: 4 }}
          spacing={8} // Space between buttons
        >

          {message.text != "this message has been deleted" && (
              <AutoLayout
                    fill={messageStyle.extra}
                    cornerRadius={200}
                    //padding={{ top: 6, bottom: 6, left: 8, right: 8 }}
                >
                <AutoLayout
                    //fill="#FFFFFF"
                    cornerRadius={200}
                    padding={{ top: 10, bottom: 4, left: 8, right: 8 }}
                    onClick={() => onUpvote()}
                    //stroke={"007AFF"}
                >
                  <Text fontSize={25} fill="#FFFFFF"> </Text>
                  <SVG
                    src={upvotearrow}
                    //onClick={() => onUpvote()}
                  />
                    
                </AutoLayout>
                <AutoLayout
                    //fill="#FFFFFF"
                    //cornerRadius={4}
                    padding={{ top: 6, bottom: 6, left: 8, right: 8 }}
                    //onClick={() => onUpvote()}
                >
                {/* Display Score */}
                <Text fontSize={25} fill="#000000">{score}</Text>
                </AutoLayout>

                {/* Downvote Button - Arrow Down */}
                <AutoLayout
                    //fill="#FFFFFF"
                    cornerRadius={200}
                    padding={{ top: 10, bottom: 4, left: 8, right: 8 }}
                    onClick={() => onDownvote()}
                >
                  <SVG
                    src={downvotearrow}
                    //onClick={() => onDownvote()}
                  />
                    <Text fontSize={25} fill="#FFFFFF"> </Text>
                </AutoLayout>
              </AutoLayout>
          )}



          { message.text != "this message has been deleted" && (
          <AutoLayout // Reply button with additional padding
            fill="#007AFF"
            cornerRadius={200}
            padding={{ top: 6, bottom: isDeleted ? 0 : 6, left: 8, right: 8 }} // Increased padding for the button
            onClick={onReply}

          >
            <Text fontSize={25} fill="#007AFF"> </Text>
            <SVG
            
              src={replyIconSrc}
              onClick={onReply}
            />
            <Text fontSize={25} fill="#FFFFFF"> Reply  </Text>
          </AutoLayout>
          )}


          {repliesAvaliable && (
          <AutoLayout // show replies button with additional padding
            //fill={message.showReplies ? '#FFFFFF' : '#000033'}
            //stroke={'#000033'}
            cornerRadius={4}
            padding={{ top: 6, bottom: isDeleted ? 15 : 0, left: 8, right: 8 }} // Increased padding for the button
            onClick={onShowReplies}
          >
            { message.showReplies && (
              <AutoLayout
              //fill="#FFFFFF"
              cornerRadius={4}
              padding={{ top: 4, bottom: 4, left: 0, right: 0 }}
              onClick={onShowReplies}
              //stroke={"007AFF"}
              >
                <SVG
                    src={repliesup}
                    onClick={onShowReplies}
                    //stroke={"007AFF"}
                  />
              </AutoLayout>
            )}
              
            { !message.showReplies && (
              <AutoLayout
              //fill="#FFFFFF"
              cornerRadius={4}
              padding={{ top: 4, bottom: 4, left: 0, right: 0 }}
              onClick={onShowReplies}
              //stroke={"007AFF"}
              >
                <SVG
                  src={repliesdown}
                  onClick={onShowReplies}
                />  
              </AutoLayout>  
            )}
            
            <Text fontSize={25} fill={message.showReplies ? '#007AFF' : '#007AFF'}>  {totalReplies} Replies </Text>
            
          </AutoLayout>
          )}

          
          





        </AutoLayout>
        
        
        

      </AutoLayout>

      
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