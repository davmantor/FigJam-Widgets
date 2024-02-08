const { widget } = figma;
const { AutoLayout, Text, useSyncedState, Input, Frame, Image, SVG} = widget;
//import '@fontawesome/free-solid-svg-icons';


const replyIconSrc = '<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 17V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H4M4 11L8 7M4 11L8 15" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'

const delete1 = '<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'

const deleteNO = '<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'
const deleteYES = '<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff5252"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 14L11 16L15 12M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#ff5252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'

const pin = '<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1218 1.87023C15.7573 0.505682 13.4779 0.76575 12.4558 2.40261L9.61062 6.95916C9.61033 6.95965 9.60913 6.96167 9.6038 6.96549C9.59728 6.97016 9.58336 6.97822 9.56001 6.9848C9.50899 6.99916 9.44234 6.99805 9.38281 6.97599C8.41173 6.61599 6.74483 6.22052 5.01389 6.87251C4.08132 7.22378 3.61596 8.03222 3.56525 8.85243C3.51687 9.63502 3.83293 10.4395 4.41425 11.0208L7.94975 14.5563L1.26973 21.2363C0.879206 21.6269 0.879206 22.26 1.26973 22.6506C1.66025 23.0411 2.29342 23.0411 2.68394 22.6506L9.36397 15.9705L12.8995 19.5061C13.4808 20.0874 14.2853 20.4035 15.0679 20.3551C15.8881 20.3044 16.6966 19.839 17.0478 18.9065C17.6998 17.1755 17.3043 15.5086 16.9444 14.5375C16.9223 14.478 16.9212 14.4114 16.9355 14.3603C16.9421 14.337 16.9502 14.3231 16.9549 14.3165C16.9587 14.3112 16.9606 14.31 16.9611 14.3098L21.5177 11.4645C23.1546 10.4424 23.4147 8.16307 22.0501 6.79853L17.1218 1.87023ZM14.1523 3.46191C14.493 2.91629 15.2528 2.8296 15.7076 3.28445L20.6359 8.21274C21.0907 8.66759 21.0041 9.42737 20.4584 9.76806L15.9019 12.6133C14.9572 13.2032 14.7469 14.3637 15.0691 15.2327C15.3549 16.0037 15.5829 17.1217 15.1762 18.2015C15.1484 18.2752 15.1175 18.3018 15.0985 18.3149C15.0743 18.3316 15.0266 18.3538 14.9445 18.3589C14.767 18.3699 14.5135 18.2916 14.3137 18.0919L5.82846 9.6066C5.62872 9.40686 5.55046 9.15333 5.56144 8.97583C5.56651 8.8937 5.58877 8.84605 5.60548 8.82181C5.61855 8.80285 5.64516 8.7719 5.71886 8.74414C6.79869 8.33741 7.91661 8.56545 8.68762 8.85128C9.55668 9.17345 10.7171 8.96318 11.3071 8.01845L14.1523 3.46191Z" fill="#0F0F0F"></path> </g></svg>'
//const pinYES = '<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff5252"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1218 1.87023C15.7573 0.505682 13.4779 0.76575 12.4558 2.40261L9.61062 6.95916C9.61033 6.95965 9.60913 6.96167 9.6038 6.96549C9.59728 6.97016 9.58336 6.97822 9.56001 6.9848C9.50899 6.99916 9.44234 6.99805 9.38281 6.97599C8.41173 6.61599 6.74483 6.22052 5.01389 6.87251C4.08132 7.22378 3.61596 8.03222 3.56525 8.85243C3.51687 9.63502 3.83293 10.4395 4.41425 11.0208L7.94975 14.5563L1.26973 21.2363C0.879206 21.6269 0.879206 22.26 1.26973 22.6506C1.66025 23.0411 2.29342 23.0411 2.68394 22.6506L9.36397 15.9705L12.8995 19.5061C13.4808 20.0874 14.2853 20.4035 15.0679 20.3551C15.8881 20.3044 16.6966 19.839 17.0478 18.9065C17.6998 17.1755 17.3043 15.5086 16.9444 14.5375C16.9223 14.478 16.9212 14.4114 16.9355 14.3603C16.9421 14.337 16.9502 14.3231 16.9549 14.3165C16.9587 14.3112 16.9606 14.31 16.9611 14.3098L21.5177 11.4645C23.1546 10.4424 23.4147 8.16307 22.0501 6.79853L17.1218 1.87023ZM14.1523 3.46191C14.493 2.91629 15.2528 2.8296 15.7076 3.28445L20.6359 8.21274C21.0907 8.66759 21.0041 9.42737 20.4584 9.76806L15.9019 12.6133C14.9572 13.2032 14.7469 14.3637 15.0691 15.2327C15.3549 16.0037 15.5829 17.1217 15.1762 18.2015C15.1484 18.2752 15.1175 18.3018 15.0985 18.3149C15.0743 18.3316 15.0266 18.3538 14.9445 18.3589C14.767 18.3699 14.5135 18.2916 14.3137 18.0919L5.82846 9.6066C5.62872 9.40686 5.55046 9.15333 5.56144 8.97583C5.56651 8.8937 5.58877 8.84605 5.60548 8.82181C5.61855 8.80285 5.64516 8.7719 5.71886 8.74414C6.79869 8.33741 7.91661 8.56545 8.68762 8.85128C9.55668 9.17345 10.7171 8.96318 11.3071 8.01845L14.1523 3.46191Z" fill="#0F0F0F"></path> </g></svg>'
const pinYES = '<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffe042"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1218 1.87023C15.7573 0.505682 13.4779 0.76575 12.4558 2.40261L9.61062 6.95916C9.61033 6.95965 9.60913 6.96167 9.6038 6.96549C9.59728 6.97016 9.58336 6.97822 9.56001 6.9848C9.50899 6.99916 9.44234 6.99805 9.38281 6.97599C8.41173 6.61599 6.74483 6.22052 5.01389 6.87251C4.08132 7.22378 3.61596 8.03222 3.56525 8.85243C3.51687 9.63502 3.83293 10.4395 4.41425 11.0208L7.94975 14.5563L1.26973 21.2363C0.879206 21.6269 0.879206 22.26 1.26973 22.6506C1.66025 23.0411 2.29342 23.0411 2.68394 22.6506L9.36397 15.9705L12.8995 19.5061C13.4808 20.0874 14.2853 20.4035 15.0679 20.3551C15.8881 20.3044 16.6966 19.839 17.0478 18.9065C17.6998 17.1755 17.3043 15.5086 16.9444 14.5375C16.9223 14.478 16.9212 14.4114 16.9355 14.3603C16.9421 14.337 16.9502 14.3231 16.9549 14.3165C16.9587 14.3112 16.9606 14.31 16.9611 14.3098L21.5177 11.4645C23.1546 10.4424 23.4147 8.16307 22.0501 6.79853L17.1218 1.87023ZM14.1523 3.46191C14.493 2.91629 15.2528 2.8296 15.7076 3.28445L20.6359 8.21274C21.0907 8.66759 21.0041 9.42737 20.4584 9.76806L15.9019 12.6133C14.9572 13.2032 14.7469 14.3637 15.0691 15.2327C15.3549 16.0037 15.5829 17.1217 15.1762 18.2015C15.1484 18.2752 15.1175 18.3018 15.0985 18.3149C15.0743 18.3316 15.0266 18.3538 14.9445 18.3589C14.767 18.3699 14.5135 18.2916 14.3137 18.0919L5.82846 9.6066C5.62872 9.40686 5.55046 9.15333 5.56144 8.97583C5.56651 8.8937 5.58877 8.84605 5.60548 8.82181C5.61855 8.80285 5.64516 8.7719 5.71886 8.74414C6.79869 8.33741 7.91661 8.56545 8.68762 8.85128C9.55668 9.17345 10.7171 8.96318 11.3071 8.01845L14.1523 3.46191Z" fill="#ffe042"></path> </g></svg>'

const upvotearrow = '<svg fill="#303030" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z"></path> </g> </g> </g></svg>'
const downvotearrow = '<svg fill="#303030" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z"></path> </g> </g> </g></svg>'

const edit = '<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8787 3.70705C17.0503 2.53547 18.9498 2.53548 20.1213 3.70705L20.2929 3.87862C21.4645 5.05019 21.4645 6.94969 20.2929 8.12126L18.5556 9.85857L8.70713 19.7071C8.57897 19.8352 8.41839 19.9261 8.24256 19.9701L4.24256 20.9701C3.90178 21.0553 3.54129 20.9554 3.29291 20.7071C3.04453 20.4587 2.94468 20.0982 3.02988 19.7574L4.02988 15.7574C4.07384 15.5816 4.16476 15.421 4.29291 15.2928L14.1989 5.38685L15.8787 3.70705ZM18.7071 5.12126C18.3166 4.73074 17.6834 4.73074 17.2929 5.12126L16.3068 6.10738L17.8622 7.72357L18.8787 6.70705C19.2692 6.31653 19.2692 5.68336 18.8787 5.29283L18.7071 5.12126ZM16.4477 9.13804L14.8923 7.52185L5.90299 16.5112L5.37439 18.6256L7.48877 18.097L16.4477 9.13804Z" fill="#000000"></path> </g></svg>'

const repliesup = '<svg fill="#007AFF" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z"></path> </g> </g> </g></svg>'
const repliesdown = '<svg fill="#007AFF" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z"></path> </g> </g> </g></svg>'


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
    upvotedUsers: string[];
    downvotedUsers: string[];
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
    onUpvote: () => void;
    onDownvote: () => void; // Add this line
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
    const allowedUsersToPin = new Set(['Neel Walse', 'Ashwin Chembu', 'David M Torres-Mendoza']);


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
        console.log("userName", currentUserName);
        console.log("userName", currentUserName);

        if (isEditing && userName === currentUserName) {
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
        } else if(userName === currentUserName) {
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
            upvotedUsers: [],
            downvotedUsers: [],
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
    
   
    const onUpvote = (id: number) => {
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
  
    const onDownvote = (id: number) => {
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
      updateUserName();

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

      //console.log('render')
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
              onUpvote={() => onUpvote(message.id)}
              onDownvote={()=> onDownvote(message.id)}
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
      cornerRadius={10} // Rounded corners for the send area
      >
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


function MessageBubble({ message, onReply, onDelete, onEdit, replyChain, replyToId, user, onDeleteConfirm, getMessageDepth, onShowReplies, onPin, totalReplies, allowedUsersToPin, onUpvote, onDownvote}: MessageBubbleProps) {
  
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
    extra: isBeingRepliedTo ? "#007AFF" : "#FAFAFA", // Text color white if being replied to, otherwise black
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
  if (allowedUsersToPin.has(user)){
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

  console.log("users upvoted", message.upvotedUsers);


  
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
        width={470}
      >
        <AutoLayout
          direction="horizontal"
          width={470}
          padding={{ top: 4, bottom: 1, left: 4, right: 8}}
        >
          <AutoLayout
            direction="horizontal"
            horizontalAlignItems="start"
            width={160}
          >
            <Text fontSize={14} fill={messageStyle.color} horizontalAlignText={"left"}>
              {isDeleted ? 'Anonymous' : message.sender}:
            </Text>
          </AutoLayout>
          
          <AutoLayout
            direction="horizontal"
            horizontalAlignItems="end"
            width={270}
          >
            <Text fontSize={12} fill={messageStyle.color} horizontalAlignText={"right"}>
              {message.timestamp}
            </Text>
          </AutoLayout>

        </AutoLayout>

       
        <AutoLayout
          direction="horizontal"
          padding={{ top: 15, bottom: 4, left: 4, right: 4 }}
          fill={messageStyle.fill}
          
        >
          <AutoLayout 
            direction="vertical"
          >
            <Text width={380}>
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
          padding={{ top: 15, bottom: 0, left: 4, right: 4 }}
          spacing={8} // Space between buttons
        >

          {message.text != "this message has been deleted" && (
              <AutoLayout
                    fill={messageStyle.extra}
                    cornerRadius={4}
                    //padding={{ top: 6, bottom: 6, left: 8, right: 8 }}
                >
                <AutoLayout
                    //fill="#FFFFFF"
                    cornerRadius={4}
                    padding={{ top: 10, bottom: 4, left: 8, right: 8 }}
                    //onClick={() => onUpvote()}
                    //stroke={"007AFF"}
                >
                  <SVG
                    src={upvotearrow}
                    onClick={() => onUpvote()}
                  />
                    <Text fontSize={14} fill="#FFFFFF"></Text>
                </AutoLayout>
                <AutoLayout
                    //fill="#FFFFFF"
                    //cornerRadius={4}
                    padding={{ top: 6, bottom: 6, left: 8, right: 8 }}
                    //onClick={() => onUpvote()}
                >
                {/* Display Score */}
                <Text fontSize={14} fill="#000000">{score}</Text>
                </AutoLayout>

                {/* Downvote Button - Arrow Down */}
                <AutoLayout
                    //fill="#FFFFFF"
                    cornerRadius={4}
                    padding={{ top: 10, bottom: 4, left: 8, right: 8 }}
                    //onClick={() => onDownvote()}
                >
                  <SVG
                    src={downvotearrow}
                    onClick={() => onDownvote()}
                  />
                    <Text fontSize={14} fill="#FFFFFF"></Text>
                </AutoLayout>
              </AutoLayout>
          )}



          { message.text != "this message has been deleted" && (
          <AutoLayout // Reply button with additional padding
            fill="#007AFF"
            cornerRadius={4}
            padding={{ top: 6, bottom: isDeleted ? 0 : 6, left: 8, right: 8 }} // Increased padding for the button
            onClick={onReply}

          >
            <SVG
              src={replyIconSrc}
              onClick={onReply}
            />
            <Text fontSize={14} fill="#FFFFFF"> Reply  </Text>
          </AutoLayout>
          )}


          {repliesAvaliable && (
          <AutoLayout // show replies button with additional padding
            //fill={message.showReplies ? '#FFFFFF' : '#000033'}
            //stroke={message.showReplies ? '#000033' : ''}
            cornerRadius={4}
            padding={{ top: 6, bottom: 6, left: 8, right: 8 }} // Increased padding for the button
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
            
            <Text fontSize={14} fill={message.showReplies ? '#007AFF' : '#007AFF'}>  {totalReplies} Replies </Text>
            
          </AutoLayout>
          )}

          {admin && message.text != "this message has been deleted" && (
            <AutoLayout // Pin button
              //fill={message.pinned ? '#FFD700' : '#067323'} // Gold for pinned, grey otherwise
              cornerRadius={4}
              padding={{ top: 6, bottom: 6, left: 8, right: 8 }}
              //onClick={() => onPin(message.id)}
            >
              { !message.pinned && (
              <SVG
                src={pin}
                onClick={() => onPin(message.id)}
              />
              )}
              { message.pinned && (
              <SVG
                src={pinYES}
                onClick={() => onPin(message.id)}
              />
              )}
            </AutoLayout>
          )}

          {!repliesAvaliable && (
          <AutoLayout // show replies button with additional padding
            //fill={message.showReplies ? '#FFFFFF' : '#FFFFFF'}
            fill={messageStyle.fill}
            stroke={message.showReplies ? '#FFFFFF' : ''}
            cornerRadius={4}
            padding={{ top: 6, bottom: 6, left: 8, right: 8 }} // Increased padding for the button
          >
            <Text fontSize={14} fill={messageStyle.fill}> 
              {message.showReplies ? `▲ ${totalReplies} Replies` : `▽ ${totalReplies} Replies`} 
            </Text>
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
              //stroke="#FF3B30"
            >
              <SVG
              src={deleteYES}
              onClick={onDelete}
            />
              <Text fontSize={14} fill="#FF3B30"></Text>
            </AutoLayout>
          )}




          {(
            isCurrentUserMessage || admin) && 
            message.text != "this message has been deleted" && 
            !message.deleteConfirm && 
          (
            <AutoLayout // Confirm button with additional padding
              //fill="#FFFFFF"
              fill={messageStyle.fill}
              cornerRadius={4}
              padding={{ top: 6, bottom: 6, left: 14, right: 14 }} // Increased padding for the button
              //stroke="#FF3B30"
            >
              
              <Text fontSize={14} fill="#FF3B30">  </Text>
            </AutoLayout>
          )}



          {(
            isCurrentUserMessage || admin) && 
            message.text != "this message has been deleted" &&
            !message.deleteConfirm && 
          (
          <AutoLayout // Delete button with additional padding
            //fill="#FF3B30"
            cornerRadius={4}
            padding={{ top: 6, bottom: 6, left: 8, right: 8 }} // Increased padding for the button
            onClick={onDeleteConfirm}
          >
            <SVG
              src={delete1}
              onClick={onDeleteConfirm}
            />
            <Text fontSize={14} fill="#FFFFFF"></Text>
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
              //stroke="#808080"
            >
              <SVG
              src={deleteNO}
              onClick={onDeleteConfirm}
            />
              <Text fontSize={14} fill="#808080"></Text>
            </AutoLayout>
          )}

          


          
          

          {isCurrentUserMessage && (
          <AutoLayout // Edit button with additional padding
            //fill="#808080"
            cornerRadius={4}
            padding={{ top: 6, bottom: 6, left: 8, right: 8 }} // Increased padding for the button
            onClick={onEdit}
          >
            <SVG
                src={edit}
                onClick={onEdit}
            />
            <Text fontSize={14} fill="#FFFFFF"></Text>
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