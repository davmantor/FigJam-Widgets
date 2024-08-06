(()=>{var We=Object.defineProperty,Be=Object.defineProperties;var je=Object.getOwnPropertyDescriptors;var Le=Object.getOwnPropertySymbols;var Ee=Object.prototype.hasOwnProperty,He=Object.prototype.propertyIsEnumerable;var Fe=(v,a,w)=>a in v?We(v,a,{enumerable:!0,configurable:!0,writable:!0,value:w}):v[a]=w,_=(v,a)=>{for(var w in a||(a={}))Ee.call(a,w)&&Fe(v,w,a[w]);if(Le)for(var w of Le(a))He.call(a,w)&&Fe(v,w,a[w]);return v},L=(v,a)=>Be(v,je(a));var J=(v,a,w)=>new Promise((q,Q)=>{var B=c=>{try{y(w.next(c))}catch(G){Q(G)}},u=c=>{try{y(w.throw(c))}catch(G){Q(G)}},y=c=>c.done?q(c.value):Promise.resolve(c.value).then(B,u);y((w=w.apply(v,a)).next())});var{widget:Se,showUI:qe,ui:Ke}=figma,{AutoLayout:p,Text:b,useSyncedState:k,Input:Xe,Frame:et,Image:Ne,SVG:U,useEffect:Oe,colorMapToOptions:tt,usePropertyMenu:ot}=Se;var h=!1;function Ze(){let[v,a]=k("newMessage",Date.now()),[w,q]=k("newMessage",""),[Q,B]=k("replyToId",null),[u,y]=k("messages",[]),[c,G]=k("userName","Unknown User"),[j,ce]=k("inputPlaceholder","Type a message..."),[ue,K]=k("inputActive",!1),[fe,ie]=k("isEditing",!1),Y=[],[E,X]=k("Prompt not set",""),[T,e]=k("pborderColor","#FFFFFF"),[$,ne]=k("widgetButtonColor","#007aff"),[H,se]=k("promptColor","#000000"),[I,re]=k("widgetWidth",800),[N,he]=k("titleFontSize",60),[z,me]=k("messageFontSize",35),[O,le]=k("borderWidth",2),[S,we]=k("widgetCornerRadius",10),[ee,l]=k("isCrownButtonPressed",!1);function n(i){let o=I/800;return Math.floor(i*o)}let ae=`<svg width="${n(28)}px" height="${n(28)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M4 12H20M12 4V20" stroke="#ffffff" stroke-width="${3}" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
    </svg>`,de=`<svg width="${n(30)}px" height="${n(30)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M3 8L4.44293 16.6576C4.76439 18.5863 6.43315 20 8.38851 20H15.6115C17.5668 20 19.2356 18.5863 19.5571 16.6576L21 8M3 8L6.75598 11.0731C7.68373 11.8321 9.06623 11.6102 9.70978 10.5989L12 7M3 8C3.82843 8 4.5 7.32843 4.5 6.5C4.5 5.67157 3.82843 5 3 5C2.17157 5 1.5 5.67157 1.5 6.5C1.5 7.32843 2.17157 8 3 8ZM21 8L17.244 11.0731C16.3163 11.8321 14.9338 11.6102 14.2902 10.5989L12 7M21 8C21.8284 8 22.5 7.32843 22.5 6.5C22.5 5.67157 21.8284 5 21 5C20.1716 5 19.5 5.67157 19.5 6.5C19.5 7.32843 20.1716 8 21 8ZM12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7Z" stroke="#000000" stroke-width="${3}" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
    </svg>`,pe=`<svg width="${n(20)}px" height="${n(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,ye=`<svg width="${n(20)}px" height="${n(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,Ce=`<svg width="${n(20)}px" height="${n(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff5252"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 14L11 16L15 12M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#ff5252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,Re=`<svg width="${n(35)}px" height="${n(35)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1218 1.87023C15.7573 0.505682 13.4779 0.76575 12.4558 2.40261L9.61062 6.95916C9.61033 6.95965 9.60913 6.96167 9.6038 6.96549C9.59728 6.97016 9.58336 6.97822 9.56001 6.9848C9.50899 6.99916 9.44234 6.99805 9.38281 6.97599C8.41173 6.61599 6.74483 6.22052 5.01389 6.87251C4.08132 7.22378 3.61596 8.03222 3.56525 8.85243C3.51687 9.63502 3.83293 10.4395 4.41425 11.0208L7.94975 14.5563L1.26973 21.2363C0.879206 21.6269 0.879206 22.26 1.26973 22.6506C1.66025 23.0411 2.29342 23.0411 2.68394 22.6506L9.36397 15.9705L12.8995 19.5061C13.4808 20.0874 14.2853 20.4035 15.0679 20.3551C15.8881 20.3044 16.6966 19.839 17.0478 18.9065C17.6998 17.1755 17.3043 15.5086 16.9444 14.5375C16.9223 14.478 16.9212 14.4114 16.9355 14.3603C16.9421 14.337 16.9502 14.3231 16.9549 14.3165C16.9587 14.3112 16.9606 14.31 16.9611 14.3098L21.5177 11.4645C23.1546 10.4424 23.4147 8.16307 22.0501 6.79853L17.1218 1.87023ZM14.1523 3.46191C14.493 2.91629 15.2528 2.8296 15.7076 3.28445L20.6359 8.21274C21.0907 8.66759 21.0041 9.42737 20.4584 9.76806L15.9019 12.6133C14.9572 13.2032 14.7469 14.3637 15.0691 15.2327C15.3549 16.0037 15.5829 17.1217 15.1762 18.2015C15.1484 18.2752 15.1175 18.3018 15.0985 18.3149C15.0743 18.3316 15.0266 18.3538 14.9445 18.3589C14.767 18.3699 14.5135 18.2916 14.3137 18.0919L5.82846 9.6066C5.62872 9.40686 5.55046 9.15333 5.56144 8.97583C5.56651 8.8937 5.58877 8.84605 5.60548 8.82181C5.61855 8.80285 5.64516 8.7719 5.71886 8.74414C6.79869 8.33741 7.91661 8.56545 8.68762 8.85128C9.55668 9.17345 10.7171 8.96318 11.3071 8.01845L14.1523 3.46191Z" fill="#0F0F0F"></path> </g></svg>`,ke=`<svg width="${n(20)}px" height="${n(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8787 3.70705C17.0503 2.53547 18.9498 2.53548 20.1213 3.70705L20.2929 3.87862C21.4645 5.05019 21.4645 6.94969 20.2929 8.12126L18.5556 9.85857L8.70713 19.7071C8.57897 19.8352 8.41839 19.9261 8.24256 19.9701L4.24256 20.9701C3.90178 21.0553 3.54129 20.9554 3.29291 20.7071C3.04453 20.4587 2.94468 20.0982 3.02988 19.7574L4.02988 15.7574C4.07384 15.5816 4.16476 15.421 4.29291 15.2928L14.1989 5.38685L15.8787 3.70705ZM18.7071 5.12126C18.3166 4.73074 17.6834 4.73074 17.2929 5.12126L16.3068 6.10738L17.8622 7.72357L18.8787 6.70705C19.2692 6.31653 19.2692 5.68336 18.8787 5.29283L18.7071 5.12126ZM16.4477 9.13804L14.8923 7.52185L5.90299 16.5112L5.37439 18.6256L7.48877 18.097L16.4477 9.13804Z" fill="#000000"></path> </g></svg>`;function Ie(i){return new Promise((t,o)=>J(this,null,function*(){figma.showUI(__uiFiles__.main,{width:400,height:270}),figma.ui.onmessage=s=>J(this,null,function*(){if(s.type==="new-message"){let{message:d,anonymous:m}=s.payload;yield Te({messageText:d,anonymous:m}),t()}else s.type==="close-plugin"?(l(!1),figma.closePlugin(),t()):s.type==="back-action"&&(l(!1),o("New message canceled by user."))})}))}function te(i){let t=i*70*Math.random();return new Promise(o=>setTimeout(o,i))}let Ue=i=>(console.log("editing"),te(1e4),new Promise((t,o)=>{let s=u.find(d=>d.id===i);s?(console.log("opening modal"),figma.showUI(__uiFiles__.main,{width:400,height:270}),figma.ui.postMessage({type:"edit-message",payload:s.text}),console.log("opened"),figma.ui.onmessage=d=>{if(d.type==="update-message"){console.log("updated---",d.payload);let m=d.payload.message,r=d.payload.anonymous;console.log(m,r);let g=L(_({},s),{text:m,anonymous:r,edited:!0}),x=u.findIndex(M=>M.id===i);if(x!==-1){let M=[...u];M[x]=g,y(M)}l(!1),figma.closePlugin(),t()}else d.type==="cancel-edit"?(console.log("canceled"),l(!1),o("Edit canceled by user.")):d.type==="close-plugin"&&(l(!1),console.log("closed"),figma.closePlugin(),t())}):(console.log("Message not found."),l(!1),o("Message not found."))})),D=()=>{let i=figma.currentUser?figma.currentUser.name:"Unknown User";G(i),console.log(c)},Me=(i=6)=>{let t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o="";for(let s=0;s<i;s++)o+=t.charAt(Math.floor(Math.random()*t.length));return o},ve=()=>{if(Y.length>0){te(1e4);let i=Y.shift();i&&y(t=>[...t,i])}},Te=i=>J(this,null,function*(){let{messageText:t,anonymous:o}=i;console.log("anonymous:",o),console.log("messageText:",t),console.log("messageData:",i);let s=10;if(D(),t.trim()!==""){let d=Date.now(),m=Me(),r=`${d}${m}${c}`;console.log(r);let g=new Date(d),x=g.getHours(),M=g.getMinutes(),C=M<10?"0"+M:M.toString(),f=x>=12?"PM":"AM",A=`${x%12||12}:${C} ${f}`,V=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:c,R=figma.currentUser?figma.currentUser.photoUrl:null,P={id:r,parentId:null,text:t.trim(),sender:V,timestamp:A,edited:!1,deleteConfirm:!1,showReplies:!1,pinned:!1,deleted:!1,upvotedUsers:[],downvotedUsers:[],directreply:0,logId:v,userIcon:R,anonymous:o};try{console.log("newMessage before sending:",P);let W=yield fetch("https://figjam-widgets.onrender.com/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(P)});if(!W.ok)throw new Error(`HTTP error! status: ${W.status}`);let ge=yield W.json();console.log("Message added successfully:",ge)}catch(W){console.error("Error adding message:",W)}Y.push(P),te(1e4),ve()}}),Ve=i=>{y(t=>t.map(o=>{if(o.id===i){let s=[...o.upvotedUsers],d=[...o.downvotedUsers],m=s.indexOf(c),r=d.indexOf(c);return m>-1?s.splice(m,1):(s.push(c),r>-1&&d.splice(r,1)),L(_({},o),{upvotedUsers:s,downvotedUsers:d})}return o}))},Pe=i=>{y(t=>t.map(o=>{if(o.id===i){let s=[...o.upvotedUsers],d=[...o.downvotedUsers],m=s.indexOf(c),r=d.indexOf(c);return r>-1?d.splice(r,1):(d.push(c),m>-1&&s.splice(m,1)),L(_({},o),{upvotedUsers:s,downvotedUsers:d})}return o}))},ze=i=>J(this,null,function*(){let t=Date.now(),o=Me(),s=`${t}${o}${c}`,d=new Date(t),m=d.getHours(),r=d.getMinutes(),g=r<10?"0"+r:r.toString(),x=m>=12?"PM":"AM",C=`${m%12||12}:${g} ${x}`,f=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:c,Z=figma.currentUser?figma.currentUser.photoUrl:null,A=u.find(V=>V.id===i);return A?(figma.showUI(__uiFiles__.main,{width:400,height:270}),figma.ui.postMessage({type:"reply-message",payload:A}),new Promise((V,R)=>{figma.ui.onmessage=P=>{if(P.type==="send-reply"){console.log(P.payload);let W=P.payload.message,ge=P.payload.anonymous,De={id:s,parentId:i,text:W,sender:c,timestamp:C,edited:!1,deleteConfirm:!1,showReplies:!1,pinned:!1,deleted:!1,upvotedUsers:[],downvotedUsers:[],directreply:0,logId:v,userIcon:Z,anonymous:ge};console.log("newreply");let Ye=u.map(oe=>oe.id===i?L(_({},oe),{directreply:oe.directreply+1}):oe);Y.push(De),te(1e4),ve(),l(!1),V()}else P.type==="close-plugin"&&(l(!1),R("Reply action was cancelled."))}})):(console.error("Message to reply to was not found."),l(!1),Promise.reject("Message to reply to was not found."))}),xe=i=>{let t=u.find(o=>o.id===i);if(t){t.deleted=!0;let o=u.map(s=>s.id===i?L(_({},s),{text:"this message has been deleted",sender:"Anonymous",edited:!1,showReplies:!1}):s);y(o),B(null),q(""),ce("Type a message..."),K(!0),setTimeout(()=>K(!1),2e3)}},Ae=i=>{let t=u.find(o=>o.id===i);t&&t.deleteConfirm===!1?y(o=>o.map(s=>s.id===i?L(_({},s),{deleteConfirm:!0}):s)):y(o=>o.map(s=>s.id===i?L(_({},s),{deleteConfirm:!1}):s))},Ge=i=>{let t=u.find(o=>o.id===i);t&&t.showReplies===!1?y(o=>o.map(s=>s.id===i?L(_({},s),{showReplies:!0}):s)):y(o=>o.map(s=>s.id===i?L(_({},s),{showReplies:!1}):s))},$e=i=>{if(!u.find(d=>d.id===i))return 0;let o=0,s=(d,m)=>{u.forEach(r=>{r.parentId===d&&s(r.id,m+1)}),m>o&&(o=m)};return s(i,0),o},be=i=>{y(t=>t.map(o=>{if(o.id===i){let s=o.pinned!==void 0?o.pinned:!1;return L(_({},o),{pinned:!s})}return o}))},_e=(i=null)=>{let t=r=>u.filter(g=>g.parentId===r).length,o=r=>(D(),console.log("in options:",c),new Promise((g,x)=>{figma.showUI(__uiFiles__.options,{width:350,height:50}),figma.ui.onmessage=M=>{if(M.type==="edit-message"){console.log("calling edit from options");let C=u.find(f=>f.id===r);C&&!C.deleted?(console.log(C.deleted),console.log("opening modal"),figma.showUI(__uiFiles__.main,{width:400,height:270}),figma.ui.postMessage({type:"edit-message",payload:C.text}),console.log("opened"),figma.ui.onmessage=f=>{if(f.type==="update-message"){console.log("updated");let Z=f.payload.message,A=f.payload.anonymous;console.log(f.payload);let V=u.map(R=>R.id===r?L(_({},R),{text:Z,anonymous:A,edited:!0}):R);y(V),l(!1),figma.closePlugin(),g()}else f.type==="cancel-edit"?(console.log("canceled"),l(!1),x("Edit canceled by user.")):f.type==="close-plugin"&&(console.log("closed"),l(!1),figma.closePlugin(),g())}):(console.log("Message not found."),l(!1),x("Message not found."))}else if(M.type==="edit-user"){console.log("calling edit from options");let C=u.find(f=>f.id===r);C&&!C.deleted?(console.log(C.deleted),console.log("opening modal"),figma.showUI(__uiFiles__.main,{width:400,height:270}),figma.ui.postMessage({type:"edit-message",payload:C.sender}),console.log("opened"),figma.ui.onmessage=f=>{if(f.type==="update-message"){console.log("updated");let Z=f.payload.message,A=f.payload.anonymous;console.log(f.payload);let V=u.map(R=>R.id===r?L(_({},R),{sender:Z,anonymous:A,edited:!0}):R);y(V),l(!1),figma.closePlugin(),g()}else f.type==="cancel-edit"?(console.log("canceled"),l(!1),x("Edit canceled by user.")):f.type==="close-plugin"&&(console.log("closed"),l(!1),figma.closePlugin(),g())}):(console.log("Message not found."),l(!1),x("Message not found."))}else M.type==="update-prompt"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:250}),figma.ui.postMessage({type:"edit-prompt",payload:E}),console.log("opened"),figma.ui.onmessage=C=>{if(C.type==="update-message"){let f=C.payload.message;X(f),l(!1),figma.closePlugin(),g()}else C.type==="cancel-edit"?(console.log("canceled"),l(!1),x("Edit canceled by user.")):C.type==="close-plugin"&&(console.log("closed"),l(!1),figma.closePlugin(),g())}):M.type==="delete-message"?(xe(r),l(!1),g()):M.type==="pin-message"?(be(r),l(!1),g()):M.type==="close-options"&&(l(!1),g())}})),s=r=>{let g=u.filter(x=>x.parentId===r);return 0},d=[...u].sort((r,g)=>r.pinned&&!g.pinned?-1:!r.pinned&&g.pinned?1:0);return d.filter(r=>r.parentId===i).length===0?figma.widget.h(p,{padding:n(30),direction:"vertical",spacing:n(20),width:n(800),height:n(250),horizontalAlignItems:"center",verticalAlignItems:"center"},figma.widget.h(b,{fill:"#60666D",fontSize:n(36),fontWeight:500,lineHeight:n(20.4)},"No messages yet"),figma.widget.h(b,{fill:"#8E939A",fontSize:n(24),lineHeight:n(20.4)},"Send a message with the add message button below.")):d.filter(r=>r.parentId===i).map(r=>figma.widget.h(Qe,{key:r.id,message:r,onReply:()=>ze(r.id),onEdit:()=>Ue(r.id),onDelete:()=>xe(r.id),onDeleteConfirm:()=>Ae(r.id),onShowReplies:()=>Ge(r.id),replyChain:_e(r.id),replyToId:Q,user:c,getMessageDepth:$e,onPin:be,totalReplies:t(r.id),onUpvote:()=>Ve(r.id),onDownvote:()=>Pe(r.id),onOptionsClick:()=>o(r.id),updateUserName:()=>D(),getTotalDirectReplies:g=>s(r.id),messageFontSize:z,widgetWidth:I,widgetButtonColor:$}))};Oe(()=>{ee&&!h&&(console.log("crown",ee),figma.showUI(__uiFiles__.optionsChat,{width:400,height:205}),figma.ui.postMessage({type:"alreadyLoggedIn",payload:h}),figma.ui.postMessage({type:"current-widthValue",payload:I}),figma.ui.postMessage({type:"current-borderWidthValue",payload:O}),figma.ui.postMessage({type:"current-titleFontSize",payload:N}),figma.ui.postMessage({type:"current-borderColor",payload:T}),figma.ui.postMessage({type:"current-messageFontSize",payload:z}),figma.ui.postMessage({type:"current-promptColor",payload:H}),figma.ui.postMessage({type:"current-widgetButtonColor",payload:$}),figma.ui.postMessage({type:"current-widgetCornerRadius",payload:S}),figma.ui.onmessage=i=>{i.type==="update-prompt"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-prompt",payload:E}),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;X(o),h=!0}else t.type==="close-plugin"?(console.log("closed"),l(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),h=!0,F())}):i.type==="update-width"?(console.log("calling width from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-width",payload:I}),figma.ui.onmessage=t=>{if(t.type==="update-message"){console.log("WIDGETWIDTGSET");let o=t.payload.message;re(parseInt(o,10)),h=!0}else t.type==="close-plugin"?(console.log("closed"),l(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),h=!0,F())}):i.type==="update-borderWidth"?(console.log("calling width from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-borderWidth",payload:O}),console.log("opened"),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;le(parseInt(o,10)),h=!0}else t.type==="close-plugin"?(console.log("closed"),l(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),h=!0,F())}):i.type==="update-titleFontSize"?(console.log("calling width from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-titleFontSize",payload:N}),console.log("opened"),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;he(parseInt(o,10)),h=!0}else t.type==="close-plugin"?(console.log("closed"),l(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),h=!0,F())}):i.type==="update-borderColor"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-borderColor",payload:T}),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;e(o),h=!0}else t.type==="close-plugin"?(console.log("closed"),l(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),h=!0,F())}):i.type==="update-messageFontSize"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-messageFontSize",payload:z}),console.log("opened"),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;me(parseInt(o,10)),h=!0}else t.type==="close-plugin"?(console.log("closed"),l(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),h=!0,F())}):i.type==="update-promptColor"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-promptColor",payload:H}),console.log("opened"),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;se(o),h=!0}else t.type==="close-plugin"?(console.log("closed"),l(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),h=!0,F())}):i.type==="update-widgetButtonColor"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-widgetButtonColor",payload:$}),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;ne(o),h=!0}else t.type==="close-plugin"?(console.log("closed"),l(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),h=!0,F())}):i.type==="update-widgetCornerRadius"&&(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-widgetCornerRadius",payload:S}),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;we(o),h=!0}else t.type==="close-plugin"?(console.log("closed"),l(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),h=!0,F())})})});let F=()=>(console.log("waiting"),D(),l(!0),new Promise((i,t)=>{figma.showUI(__uiFiles__.optionsChat,{width:400,height:205}),figma.ui.postMessage({type:"alreadyLoggedIn",payload:h}),figma.ui.postMessage({type:"current-widthValue",payload:I}),figma.ui.postMessage({type:"current-borderWidthValue",payload:O}),figma.ui.postMessage({type:"current-titleFontSize",payload:N}),figma.ui.postMessage({type:"current-borderColor",payload:T}),figma.ui.postMessage({type:"current-messageFontSize",payload:z}),figma.ui.postMessage({type:"current-promptColor",payload:H}),figma.ui.postMessage({type:"current-widgetButtonColor",payload:$}),figma.ui.postMessage({type:"current-widgetCornerRadius",payload:S}),figma.ui.onmessage=o=>{o.type==="close-plugin"?(console.log("closed"),l(!1),i()):o.type==="back-action"&&(console.log("back"),h=!0,F().then(i).catch(t))},figma.on("close",()=>{console.log("closed"),l(!1),i()})}));return figma.widget.h(p,{direction:"vertical",spacing:n(8),padding:O,stroke:"#efefef",strokeWidth:n(2),cornerRadius:n(S),onClick:D,minWidth:I,fill:"#efefef"},figma.widget.h(p,{direction:"vertical",spacing:8,padding:O,stroke:"#efefef",strokeWidth:n(2),cornerRadius:n(S),onClick:D,minWidth:I,fill:"#FFFFFF"},figma.widget.h(p,{cornerRadius:n(4),padding:{top:n(15),bottom:n(2),left:n(770),right:n(10)},onClick:F},figma.widget.h(U,{src:de,onClick:F})),figma.widget.h(p,{padding:{top:0,bottom:n(20),left:n(20)}},figma.widget.h(b,{fill:H,fontSize:n(N),fontWeight:700,width:n(770),lineHeight:n(65)},E||"Chat")),figma.widget.h(p,{direction:"vertical",spacing:n(1),padding:n(8),stroke:"#efefef",cornerRadius:n(10),minWidth:n(480)},_e()),figma.widget.h(p,{direction:"vertical",spacing:n(8),padding:n(8),onClick:D,horizontalAlignItems:"end",minWidth:I},figma.widget.h(p,{direction:"horizontal",onClick:Ie,fill:$,padding:n(10),cornerRadius:n(100)},figma.widget.h(p,{padding:n(8)},figma.widget.h(U,{src:ae,width:n(30),height:n(30)})),figma.widget.h(b,{fontSize:n(36),fill:"#FFFFFF"},"Add Message  ")))))}function Qe({getTotalDirectReplies:v,message:a,onReply:w,onDelete:q,onEdit:Q,replyChain:B,replyToId:u,user:y,onDeleteConfirm:c,getMessageDepth:G,onShowReplies:j,onPin:ce,totalReplies:ue,onUpvote:K,onDownvote:fe,onOptionsClick:ie,updateUserName:Y,messageFontSize:E,widgetWidth:X,widgetButtonColor:T}){function e(Ce){let ke=X/800;return Math.floor(Ce*ke)}let $=`<svg width="${e(30)}px" height="${e(30)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M3 8L4.44293 16.6576C4.76439 18.5863 6.43315 20 8.38851 20H15.6115C17.5668 20 19.2356 18.5863 19.5571 16.6576L21 8M3 8L6.75598 11.0731C7.68373 11.8321 9.06623 11.6102 9.70978 10.5989L12 7M3 8C3.82843 8 4.5 7.32843 4.5 6.5C4.5 5.67157 3.82843 5 3 5C2.17157 5 1.5 5.67157 1.5 6.5C1.5 7.32843 2.17157 8 3 8ZM21 8L17.244 11.0731C16.3163 11.8321 14.9338 11.6102 14.2902 10.5989L12 7M21 8C21.8284 8 22.5 7.32843 22.5 6.5C22.5 5.67157 21.8284 5 21 5C20.1716 5 19.5 5.67157 19.5 6.5C19.5 7.32843 20.1716 8 21 8ZM12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7Z" stroke="#000000" stroke-width="${3}" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
    </svg>`,ne=`<svg width="${e(32)}px" height="${e(32)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 17V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H4M4 11L8 7M4 11L8 15" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,H=`<svg width="${e(35)}px" height="${e(35)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#1cb566"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.1835 7.80516L16.2188 4.83755C14.1921 2.8089 13.1788 1.79457 12.0904 2.03468C11.0021 2.2748 10.5086 3.62155 9.5217 6.31506L8.85373 8.1381C8.59063 8.85617 8.45908 9.2152 8.22239 9.49292C8.11619 9.61754 7.99536 9.72887 7.86251 9.82451C7.56644 10.0377 7.19811 10.1392 6.46145 10.3423C4.80107 10.8 3.97088 11.0289 3.65804 11.5721C3.5228 11.8069 3.45242 12.0735 3.45413 12.3446C3.45809 12.9715 4.06698 13.581 5.28476 14.8L6.69935 16.2163L2.22345 20.6964C1.92552 20.9946 1.92552 21.4782 2.22345 21.7764C2.52138 22.0746 3.00443 22.0746 3.30236 21.7764L7.77841 17.2961L9.24441 18.7635C10.4699 19.9902 11.0827 20.6036 11.7134 20.6045C11.9792 20.6049 12.2404 20.5358 12.4713 20.4041C13.0192 20.0914 13.2493 19.2551 13.7095 17.5825C13.9119 16.8472 14.013 16.4795 14.2254 16.1835C14.3184 16.054 14.4262 15.9358 14.5468 15.8314C14.8221 15.593 15.1788 15.459 15.8922 15.191L17.7362 14.4981C20.4 13.4973 21.7319 12.9969 21.9667 11.9115C22.2014 10.826 21.1954 9.81905 19.1835 7.80516Z" fill="#1cb566"></path> </g></svg>`,se=`<svg fill="#303030" height="${e(18)}px" width="${e(18)}px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g> </g></svg>`,I=`<svg fill="#303030" height="${e(18)}px" width="${e(18)}px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g> </g></svg>`,re=`<svg width="${e(18)}px" height="${e(18)}px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g> </g></svg>`,N=`<svg width="${e(18)}px" height="${e(18)}px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g> </g></svg>`,he=a.parentId!==null,z=u===a.id,me=a.upvotedUsers.length,O=a.downvotedUsers.length,le=a.sender.split(" ")[0],S={fill:z?T:"#FFFFFF",color:"#000000",extra:z?T:"#f0f0f0"},we=a.sender===y,ee=a.edited,l=a.deleted,n=G(a.id),ae=a.upvotedUsers.length-a.downvotedUsers.length;var de=e(160);n==0&&(de=e(160));var pe=!1;n>=1&&(pe=!0);var ye=!0;return a.text=="this message has been deleted"&&(ye=!1),figma.widget.h(p,{direction:"vertical"},figma.widget.h(p,{direction:"vertical",padding:{top:e(15),bottom:l?0:e(15),left:e(12),right:e(12)},strokeWidth:e(2),cornerRadius:e(4),spacing:e(20),fill:S.fill,effect:[]},figma.widget.h(p,{direction:"horizontal",width:e(800),padding:{top:e(10),bottom:e(1),left:e(4),right:e(8)}},figma.widget.h(p,{direction:"horizontal",horizontalAlignItems:"start",width:e(520),spacing:e(20)},a.userIcon?figma.widget.h(Ne,{src:a.userIcon,width:e(40),height:e(40),cornerRadius:e(15)}):figma.widget.h(U,{src:"<svg>...<svg>",width:e(30),height:e(30)}),figma.widget.h(b,{fontSize:e(30),fill:S.color,horizontalAlignText:"left"},a.deleted||a.anonymous?"Anonymous":le,":"),a.pinned&&figma.widget.h(U,{src:H})),figma.widget.h(p,{direction:"horizontal",horizontalAlignItems:"end",padding:{top:e(2),bottom:e(2),left:e(8),right:e(8)},width:e(200)},figma.widget.h(b,{fontSize:e(25),fill:S.color,horizontalAlignText:"right"},a.timestamp)),a.text!="this message has been deleted"&&figma.widget.h(p,{cornerRadius:4,padding:{top:e(2),bottom:e(2),left:e(8),right:e(8)},onClick:ie},figma.widget.h(U,{src:$,onClick:ie}))),figma.widget.h(p,{direction:"horizontal",padding:{top:e(20),bottom:e(4),left:e(10),right:e(4)},fill:S.fill},figma.widget.h(p,{direction:"vertical"},figma.widget.h(b,{width:e(740),fontSize:e(E)},l?"this message has been deleted":a.text),figma.widget.h(b,{width:e(60),fontSize:4,fill:"#808080"}," "),ee&&!l&&figma.widget.h(b,{width:e(200),fontSize:e(25),fill:"#808080"},"(edited)"))),figma.widget.h(p,{direction:"horizontal",padding:{top:e(20),bottom:0,left:e(4),right:e(4)},spacing:12},a.text!="this message has been deleted"&&figma.widget.h(p,{fill:S.extra,cornerRadius:e(200)},figma.widget.h(p,{cornerRadius:e(200),padding:{top:e(14),bottom:e(4),left:e(10),right:e(10)},onClick:()=>K()},figma.widget.h(b,{fontSize:e(25),fill:"#FFFFFF"}," "),figma.widget.h(U,{src:se})),figma.widget.h(p,{padding:{top:e(10),bottom:e(6),left:e(10),right:e(10)}},figma.widget.h(b,{fontSize:e(25),fill:"#000000"},ae)),figma.widget.h(p,{cornerRadius:e(200),padding:{top:e(14),bottom:e(4),left:e(10),right:e(10)},onClick:()=>fe()},figma.widget.h(U,{src:I}),figma.widget.h(b,{fontSize:e(25),fill:"#FFFFFF"}," "))),a.text!="this message has been deleted"&&figma.widget.h(p,{fill:T,cornerRadius:e(200),padding:{top:e(8),bottom:l?0:e(8),left:e(10),right:e(10)},onClick:w},figma.widget.h(b,{fontSize:e(25),fill:T}," "),figma.widget.h(U,{src:ne,onClick:w}),figma.widget.h(b,{fontSize:e(25),fill:"#FFFFFF"}," Reply  ")),pe&&figma.widget.h(p,{cornerRadius:e(4),padding:{top:e(8),bottom:l?e(15):0,left:e(10),right:e(10)},onClick:j},a.showReplies&&figma.widget.h(p,{cornerRadius:e(4),padding:{top:e(6),bottom:e(6),left:0,right:0},onClick:j},figma.widget.h(U,{src:re,onClick:j})),!a.showReplies&&figma.widget.h(p,{cornerRadius:4,padding:{top:e(6),bottom:e(6),left:0,right:0},onClick:j},figma.widget.h(U,{src:N,onClick:j})),figma.widget.h(b,{fontSize:e(25),fill:T},"  ",ue," Replies ")))),a.showReplies&&B&&figma.widget.h(p,{direction:"vertical",width:"fill-parent",padding:{top:l?0:e(10),bottom:l?0:e(10),left:e(32),right:e(8)}},B))}Se.register(Ze);})();
