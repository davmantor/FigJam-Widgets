(()=>{var He=Object.defineProperty,Ne=Object.defineProperties;var Oe=Object.getOwnPropertyDescriptors;var Ue=Object.getOwnPropertySymbols;var Ze=Object.prototype.hasOwnProperty,Je=Object.prototype.propertyIsEnumerable;var Fe=(x,l,h)=>l in x?He(x,l,{enumerable:!0,configurable:!0,writable:!0,value:h}):x[l]=h,L=(x,l)=>{for(var h in l||(l={}))Ze.call(l,h)&&Fe(x,h,l[h]);if(Ue)for(var h of Ue(l))Je.call(l,h)&&Fe(x,h,l[h]);return x},I=(x,l)=>Ne(x,Oe(l));var Y=(x,l,h)=>new Promise((K,ie)=>{var Q=c=>{try{E(h.next(c))}catch(b){ie(b)}},X=c=>{try{E(h.throw(c))}catch(b){ie(b)}},E=c=>c.done?K(c.value):Promise.resolve(c.value).then(Q,X);E((h=h.apply(x,l)).next())});var{widget:Te,showUI:st,ui:rt}=figma,{AutoLayout:g,Text:_,useSyncedState:v,Input:at,Frame:lt,Image:Ye,SVG:B,useEffect:Qe,colorMapToOptions:dt,usePropertyMenu:pt}=Te,gt={id:"",parentId:null,text:"",sender:"Anonymous",timestamp:new Date().toISOString(),edited:!1,deleteConfirm:!1,showReplies:!1,pinned:!1,deleted:!1,upvotedUsers:[],downvotedUsers:[],directreply:0,logId:0,anonymous:!1,userIcon:null};var k=!1;function qe(){let[x,l]=v("newMessage",Date.now()),[h,K]=v("alwaysAnonymous",!1),[ie,Q]=v("newMessage",""),[X,E]=v("replyToId",null),[c,b]=v("messages",[]),[w,we]=v("userName","Unknown User"),[Ce,de]=v("inputPlaceholder","Type a message..."),[ke,ee]=v("inputActive",!1),[Ae,Me]=v("isEditing",!1),H=[],[F,e]=v("Prompt not set",""),[P,pe]=v("borderColor","#3423232"),[D,ge]=v("widgetButtonColor","#007aff"),[q,ce]=v("promptColor","#000000"),[T,ve]=v("widgetWidth",800),[j,xe]=v("titleFontSize",60),[te,ue]=v("messageFontSize",35),[A,be]=v("borderWidth",2),[N,G]=v("widgetCornerRadius",10),[oe,a]=v("isCrownButtonPressed",!1),[ne,se]=v("sortByVotes",!1),re=()=>{se(!ne)};function n(i){let o=T/800;return Math.floor(i*o)}function Se(i){let t=new Date(i),o=t.getFullYear(),d=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()],u=t.getDate(),f=t.getHours(),r=fe(t.getMinutes()),p=f>=12?"PM":"AM",m=f%12||12;return`${d} ${u}, ${o} ${m}:${r} ${p}`}function fe(i){return i<10?"0"+i:i.toString()}let Ve=`<svg width="${n(28)}px" height="${n(28)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M4 12H20M12 4V20" stroke="#ffffff" stroke-width="${3}" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
    </svg>`,ze=`<svg width="${n(30)}px" height="${n(30)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M3 8L4.44293 16.6576C4.76439 18.5863 6.43315 20 8.38851 20H15.6115C17.5668 20 19.2356 18.5863 19.5571 16.6576L21 8M3 8L6.75598 11.0731C7.68373 11.8321 9.06623 11.6102 9.70978 10.5989L12 7M3 8C3.82843 8 4.5 7.32843 4.5 6.5C4.5 5.67157 3.82843 5 3 5C2.17157 5 1.5 5.67157 1.5 6.5C1.5 7.32843 2.17157 8 3 8ZM21 8L17.244 11.0731C16.3163 11.8321 14.9338 11.6102 14.2902 10.5989L12 7M21 8C21.8284 8 22.5 7.32843 22.5 6.5C22.5 5.67157 21.8284 5 21 5C20.1716 5 19.5 5.67157 19.5 6.5C19.5 7.32843 20.1716 8 21 8ZM12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7Z" stroke="#000000" stroke-width="${3}" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
    </svg>`,Xe=`<svg width="${n(20)}px" height="${n(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,et=`<svg width="${n(20)}px" height="${n(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,tt=`<svg width="${n(20)}px" height="${n(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff5252"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 14L11 16L15 12M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#ff5252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,ot=`<svg width="${n(35)}px" height="${n(35)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1218 1.87023C15.7573 0.505682 13.4779 0.76575 12.4558 2.40261L9.61062 6.95916C9.61033 6.95965 9.60913 6.96167 9.6038 6.96549C9.59728 6.97016 9.58336 6.97822 9.56001 6.9848C9.50899 6.99916 9.44234 6.99805 9.38281 6.97599C8.41173 6.61599 6.74483 6.22052 5.01389 6.87251C4.08132 7.22378 3.61596 8.03222 3.56525 8.85243C3.51687 9.63502 3.83293 10.4395 4.41425 11.0208L7.94975 14.5563L1.26973 21.2363C0.879206 21.6269 0.879206 22.26 1.26973 22.6506C1.66025 23.0411 2.29342 23.0411 2.68394 22.6506L9.36397 15.9705L12.8995 19.5061C13.4808 20.0874 14.2853 20.4035 15.0679 20.3551C15.8881 20.3044 16.6966 19.839 17.0478 18.9065C17.6998 17.1755 17.3043 15.5086 16.9444 14.5375C16.9223 14.478 16.9212 14.4114 16.9355 14.3603C16.9421 14.337 16.9502 14.3231 16.9549 14.3165C16.9587 14.3112 16.9606 14.31 16.9611 14.3098L21.5177 11.4645C23.1546 10.4424 23.4147 8.16307 22.0501 6.79853L17.1218 1.87023ZM14.1523 3.46191C14.493 2.91629 15.2528 2.8296 15.7076 3.28445L20.6359 8.21274C21.0907 8.66759 21.0041 9.42737 20.4584 9.76806L15.9019 12.6133C14.9572 13.2032 14.7469 14.3637 15.0691 15.2327C15.3549 16.0037 15.5829 17.1217 15.1762 18.2015C15.1484 18.2752 15.1175 18.3018 15.0985 18.3149C15.0743 18.3316 15.0266 18.3538 14.9445 18.3589C14.767 18.3699 14.5135 18.2916 14.3137 18.0919L5.82846 9.6066C5.62872 9.40686 5.55046 9.15333 5.56144 8.97583C5.56651 8.8937 5.58877 8.84605 5.60548 8.82181C5.61855 8.80285 5.64516 8.7719 5.71886 8.74414C6.79869 8.33741 7.91661 8.56545 8.68762 8.85128C9.55668 9.17345 10.7171 8.96318 11.3071 8.01845L14.1523 3.46191Z" fill="#0F0F0F"></path> </g></svg>`,it=`<svg width="${n(20)}px" height="${n(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8787 3.70705C17.0503 2.53547 18.9498 2.53548 20.1213 3.70705L20.2929 3.87862C21.4645 5.05019 21.4645 6.94969 20.2929 8.12126L18.5556 9.85857L8.70713 19.7071C8.57897 19.8352 8.41839 19.9261 8.24256 19.9701L4.24256 20.9701C3.90178 21.0553 3.54129 20.9554 3.29291 20.7071C3.04453 20.4587 2.94468 20.0982 3.02988 19.7574L4.02988 15.7574C4.07384 15.5816 4.16476 15.421 4.29291 15.2928L14.1989 5.38685L15.8787 3.70705ZM18.7071 5.12126C18.3166 4.73074 17.6834 4.73074 17.2929 5.12126L16.3068 6.10738L17.8622 7.72357L18.8787 6.70705C19.2692 6.31653 19.2692 5.68336 18.8787 5.29283L18.7071 5.12126ZM16.4477 9.13804L14.8923 7.52185L5.90299 16.5112L5.37439 18.6256L7.48877 18.097L16.4477 9.13804Z" fill="#000000"></path> </g></svg>`;function $e(i){return new Promise((t,o)=>Y(this,null,function*(){figma.showUI(__uiFiles__.main,{width:400,height:320}),figma.ui.onmessage=s=>Y(this,null,function*(){if(s.type==="new-message"){let{message:d,anonymous:u}=s.payload,f=new Date().getTime();console.log(f),console.log("this is the start time");let r=setTimeout(()=>{figma.showUI(`
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                    <h4 style="color: #333;">Message is being sent</h2>
                    <p style="color: #666;">Please wait, server is booting up...</p>
                </div>
            `)},5e3);yield ye({messageText:d,anonymous:u}),clearTimeout(r);let m=new Date().getTime()-f;console.log(`The operation took ${m} milliseconds.`),t()}else if(s.type==="bulk-load-messages"){let{messages:d}=s.payload;yield ye({messages:d},!0),t()}else s.type==="close-plugin"?(a(!1),figma.closePlugin(),t()):s.type==="back-action"&&(a(!1),o("New message canceled by user."))})}))}function ae(i){let t=i*70*Math.random();return new Promise(o=>setTimeout(o,i))}let Pe=i=>(console.log("editing"),ae(1e4),new Promise((t,o)=>{let s=c.find(d=>d.id===i);s?(console.log("opening modal"),figma.showUI(__uiFiles__.main,{width:400,height:320}),figma.ui.postMessage({type:"edit-message",payload:s.text}),console.log("opened"),figma.ui.onmessage=d=>{if(d.type==="update-message"){console.log("updated---",d.payload);let u=d.payload.message,f=d.payload.anonymous;console.log(u,f);let r=I(L({},s),{text:u,anonymous:f,edited:!0}),p=c.findIndex(m=>m.id===i);if(p!==-1){let m=[...c];m[p]=r,b(m)}a(!1),figma.closePlugin(),t()}else d.type==="cancel-edit"?(console.log("canceled"),a(!1),o("Edit canceled by user.")):d.type==="close-plugin"&&(a(!1),console.log("closed"),figma.closePlugin(),t())}):(console.log("Message not found."),a(!1),o("Message not found."))})),O=()=>{let i=figma.currentUser?figma.currentUser.name:"Unknown User";we(i),console.log(w)},he=(i=6)=>{let t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o="";for(let s=0;s<i;s++)o+=t.charAt(Math.floor(Math.random()*t.length));return o},me=()=>{if(H.length>0){ae(1e4);let i=H.shift();i&&b(t=>[...t,i])}},ye=(i,t=!1)=>Y(this,null,function*(){var o;if(console.log("outside"),t&&"messages"in i){console.log("inside bulk load");let{messages:s}=i,d=Date.now(),u=he(),f=`${d}${u}${w}`;console.log(f);let r=new Date(d),p=r.toLocaleDateString("en-US",{year:"2-digit",month:"2-digit",day:"2-digit"}),m=r.getHours(),S=r.getMinutes(),M=S<10?"0"+S:S.toString(),C=m>=12?"PM":"AM",W=m%12||12,V=`${p} ${W}:${M} ${C}`,z=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:w,R=figma.currentUser?figma.currentUser.photoUrl:null;s.forEach(y=>Y(this,null,function*(){var $;let Z=h||y.anonymous,J={id:y.id||f,parentId:y.parentId||null,text:y.text||"",sender:y.sender||"Anonymous",timestamp:y.timestamp?Se(y.timestamp):V,edited:y.edited||!1,deleteConfirm:y.deleteConfirm||!1,showReplies:y.showReplies||!1,pinned:y.pinned||!1,deleted:y.deleted||!1,upvotedUsers:y.upvotedUsers||[],downvotedUsers:y.downvotedUsers||[],directreply:y.directreply||0,logId:y.logId||0,anonymous:Z,userIcon:Z?null:(($=figma.currentUser)==null?void 0:$.photoUrl)||null};H.push(J),me()})),console.log("Bulk messages processed.")}else{let{messageText:s,anonymous:d}=i;if(console.log("anonymous:",d),console.log("messageText:",s),console.log("messageData:",i),O(),s.trim()!==""){let u=Date.now(),f=he(),r=`${u}${f}${w}`;console.log(r);let p=new Date(u),m=p.toLocaleDateString("en-US",{year:"2-digit",month:"2-digit",day:"2-digit"}),S=p.getHours(),M=p.getMinutes(),C=M<10?"0"+M:M.toString(),W=S>=12?"PM":"AM",V=S%12||12,z=`${m} ${V}:${C} ${W}`,R=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:w,y=d?"None":figma.currentUser?figma.currentUser.photoUrl:null,Z=h||d,J={id:r,parentId:null,text:s.trim(),sender:R,timestamp:z,edited:!1,deleteConfirm:!1,showReplies:!1,pinned:!1,deleted:!1,upvotedUsers:[],downvotedUsers:[],directreply:0,logId:x,anonymous:Z,userIcon:Z?null:((o=figma.currentUser)==null?void 0:o.photoUrl)||null};try{console.log("newMessage before sending:",J);let $=yield fetch("https://figjam-widgets-myhz.onrender.com/chatwidget/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(J)});if(!$.ok)throw new Error(`HTTP error! status: ${$.status}`);let Re=yield $.json();console.log("Message added successfully:",Re)}catch($){console.error("Error adding message:",$)}H.push(J),ae(1e4),me()}}}),De=i=>{b(t=>t.map(o=>{if(o.id===i){let s=[...o.upvotedUsers],d=[...o.downvotedUsers],u=s.indexOf(w),f=d.indexOf(w);return u>-1?s.splice(u,1):(s.push(w),f>-1&&d.splice(f,1)),I(L({},o),{upvotedUsers:s,downvotedUsers:d})}return o}))},Ge=i=>{b(t=>t.map(o=>{if(o.id===i){let s=[...o.upvotedUsers],d=[...o.downvotedUsers],u=s.indexOf(w),f=d.indexOf(w);return f>-1?d.splice(f,1):(d.push(w),u>-1&&s.splice(u,1)),I(L({},o),{upvotedUsers:s,downvotedUsers:d})}return o}))},We=i=>Y(this,null,function*(){let t=Date.now(),o=he(),s=`${t}${o}${w}`,d=new Date(t),u=d.toLocaleDateString("en-US",{year:"2-digit",month:"2-digit",day:"2-digit"}),f=d.getHours(),r=d.getMinutes(),p=r<10?"0"+r:r.toString(),m=f>=12?"PM":"AM",S=f%12||12,M=`${u} ${S}:${p} ${m}`,C=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:w,W=figma.currentUser?figma.currentUser.photoUrl:null,V=c.find(z=>z.id===i);return V?(figma.showUI(__uiFiles__.main,{width:400,height:320}),figma.ui.postMessage({type:"reply-message",payload:V}),new Promise((z,R)=>{figma.ui.onmessage=y=>{if(y.type==="send-reply"){console.log(y.payload);let Z=y.payload.message,J=y.payload.anonymous,$={id:s,parentId:i,text:Z,sender:w,timestamp:M,edited:!1,deleteConfirm:!1,showReplies:!1,pinned:!1,deleted:!1,upvotedUsers:[],downvotedUsers:[],directreply:0,logId:x,userIcon:W,anonymous:J};console.log("newreply");let Re=c.map(le=>le.id===i?I(L({},le),{directreply:le.directreply+1}):le);H.push($),ae(1e4),me(),a(!1),z()}else y.type==="close-plugin"&&(a(!1),R("Reply action was cancelled."))}})):(console.error("Message to reply to was not found."),a(!1),Promise.reject("Message to reply to was not found."))}),_e=i=>{let t=c.find(o=>o.id===i);if(t){t.deleted=!0;let o=c.map(s=>s.id===i?I(L({},s),{text:"this message has been deleted",sender:"Anonymous",edited:!1,showReplies:!1}):s);b(o),E(null),Q(""),de("Type a message..."),ee(!0),setTimeout(()=>ee(!1),2e3)}},Be=i=>{let t=c.find(o=>o.id===i);t&&t.deleteConfirm===!1?b(o=>o.map(s=>s.id===i?I(L({},s),{deleteConfirm:!0}):s)):b(o=>o.map(s=>s.id===i?I(L({},s),{deleteConfirm:!1}):s))},je=i=>{let t=c.find(o=>o.id===i);t&&t.showReplies===!1?b(o=>o.map(s=>s.id===i?I(L({},s),{showReplies:!0}):s)):b(o=>o.map(s=>s.id===i?I(L({},s),{showReplies:!1}):s))},Ee=i=>{if(!c.find(d=>d.id===i))return 0;let o=0,s=(d,u)=>{c.forEach(f=>{f.parentId===d&&s(f.id,u+1)}),u>o&&(o=u)};return s(i,0),o},Le=i=>{b(t=>t.map(o=>{if(o.id===i){let s=o.pinned!==void 0?o.pinned:!1;return I(L({},o),{pinned:!s})}return o}))},Ie=(i=null)=>{let t=r=>c.filter(p=>p.parentId===r).length,o=r=>(O(),console.log("in options:",w),new Promise((p,m)=>{figma.showUI(__uiFiles__.options,{width:350,height:50}),figma.ui.onmessage=S=>{if(S.type==="edit-message"){let M=c.find(C=>C.id===r);M&&!M.deleted?(figma.showUI(__uiFiles__.main,{width:400,height:320}),figma.ui.postMessage({type:"edit-message",payload:M.text}),figma.ui.onmessage=C=>{if(C.type==="update-message"){let W=C.payload.message,V=C.payload.anonymous,z=c.map(R=>R.id===r?I(L({},R),{text:W,anonymous:V,edited:!0}):R);b(z),a(!1),figma.closePlugin(),p()}else C.type==="cancel-edit"?(a(!1),m("Edit canceled by user.")):C.type==="close-plugin"&&(a(!1),figma.closePlugin(),p())}):(console.log("Message not found."),a(!1),m("Message not found."))}else if(S.type==="edit-user"){let M=c.find(C=>C.id===r);M&&!M.deleted?(figma.showUI(__uiFiles__.main,{width:400,height:320}),figma.ui.postMessage({type:"edit-message",payload:M.sender}),figma.ui.onmessage=C=>{if(C.type==="update-message"){let W=C.payload.message,V=C.payload.anonymous,z=c.map(R=>R.id===r?I(L({},R),{sender:W,anonymous:V,edited:!0}):R);b(z),a(!1),figma.closePlugin(),p()}else C.type==="cancel-edit"?(a(!1),m("Edit canceled by user.")):C.type==="close-plugin"&&(a(!1),figma.closePlugin(),p())}):(console.log("Message not found."),a(!1),m("Message not found."))}else S.type==="update-prompt"?(figma.showUI(__uiFiles__.main,{width:400,height:250}),figma.ui.postMessage({type:"edit-prompt",payload:F}),figma.ui.onmessage=M=>{if(M.type==="update-message"){let C=M.payload.message;e(C),a(!1),figma.closePlugin(),p()}else M.type==="cancel-edit"?(a(!1),m("Edit canceled by user.")):M.type==="close-plugin"&&(a(!1),figma.closePlugin(),p())}):S.type==="delete-message"?(_e(r),a(!1),p()):S.type==="pin-message"?(Le(r),a(!1),p()):S.type==="close-options"?(a(!1),p()):S.type==="toggle-anonymous-mode"&&K(S.payload)}})),s=r=>{let p=c.filter(m=>m.parentId===r);return 0},d=r=>r.upvotedUsers.length-r.downvotedUsers.length,u=[...c].sort((r,p)=>r.pinned&&!p.pinned?-1:!r.pinned&&p.pinned?1:ne?d(p)-d(r):0);return u.filter(r=>r.parentId===i).length===0?figma.widget.h(g,{padding:n(30),direction:"vertical",spacing:n(20),width:n(800),height:n(250),horizontalAlignItems:"center",verticalAlignItems:"center"},figma.widget.h(_,{fill:"#60666D",fontSize:n(36),fontWeight:500,lineHeight:n(20.4)},"No messages yet"),figma.widget.h(_,{fill:"#8E939A",fontSize:n(24),lineHeight:n(20.4)},"Send a message with the add message button below.")):u.filter(r=>r.parentId===i).map(r=>figma.widget.h(Ke,{key:r.id,message:r,onReply:()=>We(r.id),onEdit:()=>Pe(r.id),onDelete:()=>_e(r.id),onDeleteConfirm:()=>Be(r.id),onShowReplies:()=>je(r.id),replyChain:Ie(r.id),replyToId:X,user:w,getMessageDepth:Ee,onPin:Le,totalReplies:t(r.id),onUpvote:()=>De(r.id),onDownvote:()=>Ge(r.id),onOptionsClick:()=>o(r.id),updateUserName:()=>O(),getTotalDirectReplies:p=>s(r.id),messageFontSize:te,widgetWidth:T,widgetButtonColor:D}))};n(10),n(10),n(10),n(4),n(10),n(10),n(20),n(20),n(25),Qe(()=>{oe&&(a(!1),console.log("crown123",oe),figma.showUI(__uiFiles__.optionsChat,{width:400,height:205}),console.log("logid",x),figma.ui.postMessage({type:"set-widget-log-id",payload:x}),figma.ui.postMessage({type:"alreadyLoggedIn",payload:k}),figma.ui.postMessage({type:"current-widthValue",payload:T}),figma.ui.postMessage({type:"current-borderWidthValue",payload:A}),figma.ui.postMessage({type:"current-titleFontSize",payload:j}),figma.ui.postMessage({type:"current-borderColor",payload:P}),figma.ui.postMessage({type:"current-messageFontSize",payload:te}),figma.ui.postMessage({type:"current-promptColor",payload:q}),figma.ui.postMessage({type:"current-widgetButtonColor",payload:D}),figma.ui.postMessage({type:"current-widgetCornerRadius",payload:N}),figma.ui.postMessage({type:"current-anonymous",payload:h}),figma.ui.onmessage=i=>Y(this,null,function*(){if(console.log("message",i),i.type==="load-chats"){console.log("Loading new chats...",i.messages);let t=i.messages;console.log("messages",t),yield ye({messages:t},!0);let o=parseInt(i.logId,10);l(o)}else i.type==="update-prompt"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-prompt",payload:F}),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;e(o),k=!0,a(!0)}else t.type==="close-plugin"?(console.log("closed"),a(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),k=!0,U())}):i.type==="update-width"?(console.log("calling width from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-width",payload:T}),figma.ui.onmessage=t=>{if(t.type==="update-message"){console.log("WIDGETWIDTGSET");let o=t.payload.message;ve(parseInt(o,10)),k=!0,a(!0)}else t.type==="close-plugin"?(console.log("closed"),a(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),k=!0,U())}):i.type==="update-borderWidth"?(console.log("calling width from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-borderWidth",payload:A}),console.log("opened"),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;be(parseInt(o,10)),k=!0,a(!0)}else t.type==="close-plugin"?(console.log("closed"),a(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),k=!0,U())}):i.type==="update-titleFontSize"?(console.log("calling width from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-titleFontSize",payload:j}),console.log("opened"),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;xe(parseInt(o,10)),k=!0,a(!0)}else t.type==="close-plugin"?(console.log("closed"),a(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),k=!0,U())}):i.type==="update-borderColor"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-borderColor",payload:P}),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;pe(o),k=!0,a(!0)}else t.type==="close-plugin"?(console.log("closed"),a(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),k=!0,U())}):i.type==="update-messageFontSize"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-messageFontSize",payload:te}),console.log("opened"),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;ue(parseInt(o,10)),k=!0,a(!0)}else t.type==="close-plugin"?(console.log("closed"),a(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),k=!0,U())}):i.type==="update-promptColor"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-promptColor",payload:q}),console.log("opened"),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;ce(o),k=!0,a(!0)}else t.type==="close-plugin"?(console.log("closed"),a(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),k=!0,U())}):i.type==="update-widgetButtonColor"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-widgetButtonColor",payload:D}),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;ge(o),k=!0,a(!0)}else t.type==="close-plugin"?(console.log("closed"),a(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),k=!0,U())}):i.type==="update-widgetCornerRadius"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-widgetCornerRadius",payload:N}),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;G(o),k=!0,a(!0)}else t.type==="close-plugin"?(console.log("closed"),a(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),k=!0,U())}):i.type==="toggle-anonymous-mode"&&(console.log("HERE",h,i.payload),K(i.payload),console.log("HERE2",h,i.payload))}))});let U=()=>(console.log("waiting123"),O(),a(!0),new Promise((i,t)=>{figma.showUI(__uiFiles__.optionsChat,{width:400,height:205}),figma.ui.postMessage({type:"current-widgetId",payload:x}),figma.ui.postMessage({type:"alreadyLoggedIn",payload:k}),figma.ui.postMessage({type:"current-widthValue",payload:T}),figma.ui.postMessage({type:"current-borderWidthValue",payload:A}),figma.ui.postMessage({type:"current-titleFontSize",payload:j}),figma.ui.postMessage({type:"current-borderColor",payload:P}),figma.ui.postMessage({type:"current-messageFontSize",payload:te}),figma.ui.postMessage({type:"current-promptColor",payload:q}),figma.ui.postMessage({type:"current-widgetButtonColor",payload:D}),figma.ui.postMessage({type:"current-widgetCornerRadius",payload:N}),figma.ui.onmessage=o=>{o.type==="close-plugin"?(console.log("closed"),a(!1),i()):o.type==="back-action"&&(console.log("back"),k=!0,U().then(i).catch(t))},figma.on("close",()=>{console.log("closed"),a(!1),i()})}));return figma.widget.h(g,{direction:"vertical",spacing:n(8),padding:A,stroke:P,strokeWidth:n(2),cornerRadius:n(N),onClick:O,minWidth:T,fill:P},figma.widget.h(g,{direction:"vertical",spacing:8,padding:n(10),stroke:P,strokeWidth:n(2),cornerRadius:n(N-2),onClick:O,minWidth:T,fill:"#FFFFFF"},figma.widget.h(g,{cornerRadius:n(4),padding:{top:n(15),bottom:n(2),left:n(590),right:n(10)},verticalAlignItems:"center",horizontalAlignItems:"end"},figma.widget.h(g,{cornerRadius:n(100),padding:{top:n(5),bottom:n(5),left:n(20),right:n(20)},onClick:re,fill:D},figma.widget.h(_,{fontSize:n(25),fill:"#FFFFFF"},"Sort by Votes")),figma.widget.h(g,{padding:{left:n(10)}},figma.widget.h(B,{src:ze,onClick:U}))),figma.widget.h(g,{padding:{top:0,bottom:n(20),left:n(20)}},figma.widget.h(_,{fill:q,fontSize:n(j),fontWeight:700,width:n(770),lineHeight:n(65)},F||"Chat")),figma.widget.h(g,{direction:"vertical",spacing:n(1),padding:n(8),stroke:P,cornerRadius:n(10),minWidth:n(480)},Ie()),figma.widget.h(g,{direction:"vertical",spacing:n(8),padding:n(8),onClick:O,horizontalAlignItems:"end",minWidth:T},figma.widget.h(g,{direction:"horizontal",onClick:$e,fill:D,padding:{top:n(10),bottom:n(10),left:n(10),right:n(20)},cornerRadius:n(100)},figma.widget.h(g,{padding:n(8)},figma.widget.h(B,{src:Ve,width:n(30),height:n(30)})),figma.widget.h(_,{fontSize:n(36),fill:"#FFFFFF"},"Add Message")))))}function Ke({getTotalDirectReplies:x,message:l,onReply:h,onDelete:K,onEdit:ie,replyChain:Q,replyToId:X,user:E,onDeleteConfirm:c,getMessageDepth:b,onShowReplies:w,onPin:we,totalReplies:Ce,onUpvote:de,onDownvote:ke,onOptionsClick:ee,updateUserName:Ae,messageFontSize:Me,widgetWidth:H,widgetButtonColor:F}){function e(n){let fe=H/800;return Math.floor(n*fe)}let P=`<svg width="${e(30)}px" height="${e(30)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M3 8L4.44293 16.6576C4.76439 18.5863 6.43315 20 8.38851 20H15.6115C17.5668 20 19.2356 18.5863 19.5571 16.6576L21 8M3 8L6.75598 11.0731C7.68373 11.8321 9.06623 11.6102 9.70978 10.5989L12 7M3 8C3.82843 8 4.5 7.32843 4.5 6.5C4.5 5.67157 3.82843 5 3 5C2.17157 5 1.5 5.67157 1.5 6.5C1.5 7.32843 2.17157 8 3 8ZM21 8L17.244 11.0731C16.3163 11.8321 14.9338 11.6102 14.2902 10.5989L12 7M21 8C21.8284 8 22.5 7.32843 22.5 6.5C22.5 5.67157 21.8284 5 21 5C20.1716 5 19.5 5.67157 19.5 6.5C19.5 7.32843 20.1716 8 21 8ZM12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7Z" stroke="#000000" stroke-width="${3}" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
    </svg>`,pe=`<svg width="${e(32)}px" height="${e(32)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 17V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H4M4 11L8 7M4 11L8 15" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,D=`<svg width="${e(35)}px" height="${e(35)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#1cb566"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.1835 7.80516L16.2188 4.83755C14.1921 2.8089 13.1788 1.79457 12.0904 2.03468C11.0021 2.2748 10.5086 3.62155 9.5217 6.31506L8.85373 8.1381C8.59063 8.85617 8.45908 9.2152 8.22239 9.49292C8.11619 9.61754 7.99536 9.72887 7.86251 9.82451C7.56644 10.0377 7.19811 10.1392 6.46145 10.3423C4.80107 10.8 3.97088 11.0289 3.65804 11.5721C3.5228 11.8069 3.45242 12.0735 3.45413 12.3446C3.45809 12.9715 4.06698 13.581 5.28476 14.8L6.69935 16.2163L2.22345 20.6964C1.92552 20.9946 1.92552 21.4782 2.22345 21.7764C2.52138 22.0746 3.00443 22.0746 3.30236 21.7764L7.77841 17.2961L9.24441 18.7635C10.4699 19.9902 11.0827 20.6036 11.7134 20.6045C11.9792 20.6049 12.2404 20.5358 12.4713 20.4041C13.0192 20.0914 13.2493 19.2551 13.7095 17.5825C13.9119 16.8472 14.013 16.4795 14.2254 16.1835C14.3184 16.054 14.4262 15.9358 14.5468 15.8314C14.8221 15.593 15.1788 15.459 15.8922 15.191L17.7362 14.4981C20.4 13.4973 21.7319 12.9969 21.9667 11.9115C22.2014 10.826 21.1954 9.81905 19.1835 7.80516Z" fill="#1cb566"></path> </g></svg>`,ge=`<svg fill="#303030" height="${e(18)}px" width="${e(18)}px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g> </g></svg>`,q=`<svg fill="#303030" height="${e(18)}px" width="${e(18)}px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g> </g></svg>`,ce=`<svg width="${e(18)}px" height="${e(18)}px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g> </g></svg>`,T=`<svg width="${e(18)}px" height="${e(18)}px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g> </g></svg>`,ve=l.parentId!==null,j=X===l.id,xe=l.upvotedUsers.length,te=l.downvotedUsers.length,ue=l.sender.split(" ")[0],A={fill:j?F:"#FFFFFF",color:"#000000",extra:j?F:"#f0f0f0"},be=l.sender===E,N=l.edited,G=l.deleted,oe=b(l.id),a=l.upvotedUsers.length-l.downvotedUsers.length,ne=e(160);oe==0&&(ne=e(160));let se=!1;oe>=1&&(se=!0);let re=!0;return l.text=="this message has been deleted"&&(re=!1),figma.widget.h(g,{direction:"vertical"},figma.widget.h(g,{direction:"vertical",padding:{top:e(15),bottom:G?0:e(15),left:e(12),right:e(12)},strokeWidth:e(2),cornerRadius:e(4),spacing:e(20),fill:A.fill,effect:[]},figma.widget.h(g,{direction:"horizontal",verticalAlignItems:"center",width:e(800),padding:{top:e(10),bottom:e(1),left:e(4),right:e(2)}},figma.widget.h(g,{direction:"horizontal",horizontalAlignItems:"start",verticalAlignItems:"center",width:e(490),spacing:e(20)},!l.anonymous&&l.userIcon&&l.userIcon!=="None"?figma.widget.h(Ye,{src:l.userIcon,width:e(40),height:e(40),cornerRadius:e(15)}):null,figma.widget.h(_,{fontSize:e(30),fill:A.color,horizontalAlignText:"left"},l.deleted||l.anonymous?"Anonymous":ue,":"),l.pinned&&figma.widget.h(B,{src:D})),figma.widget.h(g,{direction:"horizontal",horizontalAlignItems:"end",verticalAlignItems:"center",padding:{top:e(2),bottom:e(2),left:e(1),right:e(8)},width:e(260)},figma.widget.h(_,{fontSize:e(15),fill:A.color,horizontalAlignText:"right"},l.timestamp.replace(" ",`
`))),l.text!="this message has been deleted"&&figma.widget.h(g,{cornerRadius:4,padding:{top:e(2),bottom:e(2),left:e(8),right:e(8)},onClick:ee},figma.widget.h(B,{src:P,onClick:ee}))),figma.widget.h(g,{direction:"horizontal",padding:{top:e(20),bottom:e(4),left:e(10),right:e(4)},fill:A.fill},figma.widget.h(g,{direction:"vertical"},figma.widget.h(_,{width:e(740),fontSize:e(Me)},G?"this message has been deleted":l.text),figma.widget.h(_,{width:e(60),fontSize:4,fill:"#808080"}," "),N&&!G&&figma.widget.h(_,{width:e(200),fontSize:e(25),fill:"#808080"},"(edited)"))),figma.widget.h(g,{direction:"horizontal",padding:{top:e(20),bottom:0,left:e(4),right:e(4)},spacing:12},l.text!="this message has been deleted"&&figma.widget.h(g,{fill:A.extra,cornerRadius:e(200)},figma.widget.h(g,{cornerRadius:e(200),padding:{top:e(14),bottom:e(4),left:e(10),right:e(10)},onClick:()=>de()},figma.widget.h(_,{fontSize:e(25),fill:"#FFFFFF"}," "),figma.widget.h(B,{src:ge})),figma.widget.h(g,{padding:{top:e(10),bottom:e(6),left:e(10),right:e(10)}},figma.widget.h(_,{fontSize:e(25),fill:"#000000"},a)),figma.widget.h(g,{cornerRadius:e(200),padding:{top:e(14),bottom:e(4),left:e(10),right:e(10)},onClick:()=>ke()},figma.widget.h(B,{src:q}),figma.widget.h(_,{fontSize:e(25),fill:"#FFFFFF"}," "))),l.text!="this message has been deleted"&&figma.widget.h(g,{fill:F,cornerRadius:e(200),padding:{top:e(8),bottom:G?0:e(8),left:e(10),right:e(10)},onClick:h},figma.widget.h(_,{fontSize:e(25),fill:F}," "),figma.widget.h(B,{src:pe,onClick:h}),figma.widget.h(_,{fontSize:e(25),fill:"#FFFFFF"}," Reply  ")),se&&figma.widget.h(g,{cornerRadius:e(4),padding:{top:e(8),bottom:G?e(15):0,left:e(10),right:e(10)},onClick:w},l.showReplies&&figma.widget.h(g,{cornerRadius:e(4),padding:{top:e(6),bottom:e(6),left:0,right:0},onClick:w},figma.widget.h(B,{src:ce,onClick:w})),!l.showReplies&&figma.widget.h(g,{cornerRadius:4,padding:{top:e(6),bottom:e(6),left:0,right:0},onClick:w},figma.widget.h(B,{src:T,onClick:w})),figma.widget.h(_,{fontSize:e(25),fill:F},"  ",Ce," Replies ")))),l.showReplies&&Q&&figma.widget.h(g,{direction:"vertical",width:"fill-parent",padding:{top:G?0:e(10),bottom:G?0:e(10),left:e(32),right:e(8)}},Q))}Te.register(qe);})();
