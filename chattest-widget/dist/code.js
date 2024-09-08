(()=>{var We=Object.defineProperty,Be=Object.defineProperties;var je=Object.getOwnPropertyDescriptors;var Le=Object.getOwnPropertySymbols;var Ee=Object.prototype.hasOwnProperty,He=Object.prototype.propertyIsEnumerable;var Se=(v,l,w)=>l in v?We(v,l,{enumerable:!0,configurable:!0,writable:!0,value:w}):v[l]=w,L=(v,l)=>{for(var w in l||(l={}))Ee.call(l,w)&&Se(v,w,l[w]);if(Le)for(var w of Le(l))He.call(l,w)&&Se(v,w,l[w]);return v},S=(v,l)=>Be(v,je(l));var J=(v,l,w)=>new Promise((q,Z)=>{var B=c=>{try{y(w.next(c))}catch(D){Z(D)}},u=c=>{try{y(w.throw(c))}catch(D){Z(D)}},y=c=>c.done?q(c.value):Promise.resolve(c.value).then(B,u);y((w=w.apply(v,l)).next())});var{widget:Re,showUI:qe,ui:Ke}=figma,{AutoLayout:g,Text:b,useSyncedState:M,Input:Xe,Frame:et,Image:Ne,SVG:U,useEffect:Oe,colorMapToOptions:tt,usePropertyMenu:ot}=Re;var h=!1;function Ze(){let[v,l]=M("newMessage",Date.now()),[w,q]=M("newMessage",""),[Z,B]=M("replyToId",null),[u,y]=M("messages",[]),[c,D]=M("userName","Unknown User"),[j,ce]=M("inputPlaceholder","Type a message..."),[ue,K]=M("inputActive",!1),[fe,ie]=M("isEditing",!1),Q=[],[E,X]=M("Prompt not set",""),[_,e]=M("borderColor","#3423232"),[G,ne]=M("widgetButtonColor","#007aff"),[H,se]=M("promptColor","#000000"),[T,re]=M("widgetWidth",800),[N,he]=M("titleFontSize",60),[z,me]=M("messageFontSize",35),[Y,ae]=M("borderWidth",2),[I,we]=M("widgetCornerRadius",10),[ee,s]=M("isCrownButtonPressed",!1);function r(i){let o=T/800;return Math.floor(i*o)}let le=`<svg width="${r(28)}px" height="${r(28)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M4 12H20M12 4V20" stroke="#ffffff" stroke-width="${3}" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
    </svg>`,de=`<svg width="${r(30)}px" height="${r(30)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M3 8L4.44293 16.6576C4.76439 18.5863 6.43315 20 8.38851 20H15.6115C17.5668 20 19.2356 18.5863 19.5571 16.6576L21 8M3 8L6.75598 11.0731C7.68373 11.8321 9.06623 11.6102 9.70978 10.5989L12 7M3 8C3.82843 8 4.5 7.32843 4.5 6.5C4.5 5.67157 3.82843 5 3 5C2.17157 5 1.5 5.67157 1.5 6.5C1.5 7.32843 2.17157 8 3 8ZM21 8L17.244 11.0731C16.3163 11.8321 14.9338 11.6102 14.2902 10.5989L12 7M21 8C21.8284 8 22.5 7.32843 22.5 6.5C22.5 5.67157 21.8284 5 21 5C20.1716 5 19.5 5.67157 19.5 6.5C19.5 7.32843 20.1716 8 21 8ZM12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7Z" stroke="#000000" stroke-width="${3}" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
    </svg>`,ge=`<svg width="${r(20)}px" height="${r(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,ye=`<svg width="${r(20)}px" height="${r(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,Ce=`<svg width="${r(20)}px" height="${r(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff5252"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 14L11 16L15 12M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#ff5252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,Ie=`<svg width="${r(35)}px" height="${r(35)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1218 1.87023C15.7573 0.505682 13.4779 0.76575 12.4558 2.40261L9.61062 6.95916C9.61033 6.95965 9.60913 6.96167 9.6038 6.96549C9.59728 6.97016 9.58336 6.97822 9.56001 6.9848C9.50899 6.99916 9.44234 6.99805 9.38281 6.97599C8.41173 6.61599 6.74483 6.22052 5.01389 6.87251C4.08132 7.22378 3.61596 8.03222 3.56525 8.85243C3.51687 9.63502 3.83293 10.4395 4.41425 11.0208L7.94975 14.5563L1.26973 21.2363C0.879206 21.6269 0.879206 22.26 1.26973 22.6506C1.66025 23.0411 2.29342 23.0411 2.68394 22.6506L9.36397 15.9705L12.8995 19.5061C13.4808 20.0874 14.2853 20.4035 15.0679 20.3551C15.8881 20.3044 16.6966 19.839 17.0478 18.9065C17.6998 17.1755 17.3043 15.5086 16.9444 14.5375C16.9223 14.478 16.9212 14.4114 16.9355 14.3603C16.9421 14.337 16.9502 14.3231 16.9549 14.3165C16.9587 14.3112 16.9606 14.31 16.9611 14.3098L21.5177 11.4645C23.1546 10.4424 23.4147 8.16307 22.0501 6.79853L17.1218 1.87023ZM14.1523 3.46191C14.493 2.91629 15.2528 2.8296 15.7076 3.28445L20.6359 8.21274C21.0907 8.66759 21.0041 9.42737 20.4584 9.76806L15.9019 12.6133C14.9572 13.2032 14.7469 14.3637 15.0691 15.2327C15.3549 16.0037 15.5829 17.1217 15.1762 18.2015C15.1484 18.2752 15.1175 18.3018 15.0985 18.3149C15.0743 18.3316 15.0266 18.3538 14.9445 18.3589C14.767 18.3699 14.5135 18.2916 14.3137 18.0919L5.82846 9.6066C5.62872 9.40686 5.55046 9.15333 5.56144 8.97583C5.56651 8.8937 5.58877 8.84605 5.60548 8.82181C5.61855 8.80285 5.64516 8.7719 5.71886 8.74414C6.79869 8.33741 7.91661 8.56545 8.68762 8.85128C9.55668 9.17345 10.7171 8.96318 11.3071 8.01845L14.1523 3.46191Z" fill="#0F0F0F"></path> </g></svg>`,ke=`<svg width="${r(20)}px" height="${r(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8787 3.70705C17.0503 2.53547 18.9498 2.53548 20.1213 3.70705L20.2929 3.87862C21.4645 5.05019 21.4645 6.94969 20.2929 8.12126L18.5556 9.85857L8.70713 19.7071C8.57897 19.8352 8.41839 19.9261 8.24256 19.9701L4.24256 20.9701C3.90178 21.0553 3.54129 20.9554 3.29291 20.7071C3.04453 20.4587 2.94468 20.0982 3.02988 19.7574L4.02988 15.7574C4.07384 15.5816 4.16476 15.421 4.29291 15.2928L14.1989 5.38685L15.8787 3.70705ZM18.7071 5.12126C18.3166 4.73074 17.6834 4.73074 17.2929 5.12126L16.3068 6.10738L17.8622 7.72357L18.8787 6.70705C19.2692 6.31653 19.2692 5.68336 18.8787 5.29283L18.7071 5.12126ZM16.4477 9.13804L14.8923 7.52185L5.90299 16.5112L5.37439 18.6256L7.48877 18.097L16.4477 9.13804Z" fill="#000000"></path> </g></svg>`;function Fe(i){return new Promise((t,o)=>J(this,null,function*(){figma.showUI(__uiFiles__.main,{width:400,height:320}),figma.ui.onmessage=n=>J(this,null,function*(){if(n.type==="new-message"){let{message:d,anonymous:m}=n.payload,a=new Date().getTime();console.log(a),console.log("this is the start time");let p=setTimeout(()=>{figma.showUI(`
              <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                  <h4 style="color: #333;">Message is being sent</h2>
                  <p style="color: #666;">Please wait, server is booting up...</p>
              </div>
          `)},5e3);yield Ue({messageText:d,anonymous:m}),clearTimeout(p);let C=new Date().getTime()-a;console.log(`The operation took ${C} milliseconds.`),t()}else n.type==="close-plugin"?(s(!1),figma.closePlugin(),t()):n.type==="back-action"&&(s(!1),o("New message canceled by user."))})}))}function te(i){let t=i*70*Math.random();return new Promise(o=>setTimeout(o,i))}let Te=i=>(console.log("editing"),te(1e4),new Promise((t,o)=>{let n=u.find(d=>d.id===i);n?(console.log("opening modal"),figma.showUI(__uiFiles__.main,{width:400,height:320}),figma.ui.postMessage({type:"edit-message",payload:n.text}),console.log("opened"),figma.ui.onmessage=d=>{if(d.type==="update-message"){console.log("updated---",d.payload);let m=d.payload.message,a=d.payload.anonymous;console.log(m,a);let p=S(L({},n),{text:m,anonymous:a,edited:!0}),x=u.findIndex(C=>C.id===i);if(x!==-1){let C=[...u];C[x]=p,y(C)}s(!1),figma.closePlugin(),t()}else d.type==="cancel-edit"?(console.log("canceled"),s(!1),o("Edit canceled by user.")):d.type==="close-plugin"&&(s(!1),console.log("closed"),figma.closePlugin(),t())}):(console.log("Message not found."),s(!1),o("Message not found."))})),$=()=>{let i=figma.currentUser?figma.currentUser.name:"Unknown User";D(i),console.log(c)},Me=(i=6)=>{let t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o="";for(let n=0;n<i;n++)o+=t.charAt(Math.floor(Math.random()*t.length));return o},ve=()=>{if(Q.length>0){te(1e4);let i=Q.shift();i&&y(t=>[...t,i])}},Ue=i=>J(this,null,function*(){let{messageText:t,anonymous:o}=i;console.log("anonymous:",o),console.log("messageText:",t),console.log("messageData:",i);let n=10;if($(),t.trim()!==""){let d=Date.now(),m=Me(),a=`${d}${m}${c}`;console.log(a);let p=new Date(d),x=p.getHours(),C=p.getMinutes(),k=C<10?"0"+C:C.toString(),f=x>=12?"PM":"AM",A=`${x%12||12}:${k} ${f}`,V=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:c,F=figma.currentUser?figma.currentUser.photoUrl:null,P={id:a,parentId:null,text:t.trim(),sender:V,timestamp:A,edited:!1,deleteConfirm:!1,showReplies:!1,pinned:!1,deleted:!1,upvotedUsers:[],downvotedUsers:[],directreply:0,logId:v,userIcon:F,anonymous:o};try{console.log("newMessage before sending:",P);let W=yield fetch("https://figjam-widgets.onrender.com/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(P)});if(!W.ok)throw new Error(`HTTP error! status: ${W.status}`);let pe=yield W.json();console.log("Message added successfully:",pe)}catch(W){console.error("Error adding message:",W)}Q.push(P),te(1e4),ve()}}),Ve=i=>{y(t=>t.map(o=>{if(o.id===i){let n=[...o.upvotedUsers],d=[...o.downvotedUsers],m=n.indexOf(c),a=d.indexOf(c);return m>-1?n.splice(m,1):(n.push(c),a>-1&&d.splice(a,1)),S(L({},o),{upvotedUsers:n,downvotedUsers:d})}return o}))},Pe=i=>{y(t=>t.map(o=>{if(o.id===i){let n=[...o.upvotedUsers],d=[...o.downvotedUsers],m=n.indexOf(c),a=d.indexOf(c);return a>-1?d.splice(a,1):(d.push(c),m>-1&&n.splice(m,1)),S(L({},o),{upvotedUsers:n,downvotedUsers:d})}return o}))},ze=i=>J(this,null,function*(){let t=Date.now(),o=Me(),n=`${t}${o}${c}`,d=new Date(t),m=d.getHours(),a=d.getMinutes(),p=a<10?"0"+a:a.toString(),x=m>=12?"PM":"AM",k=`${m%12||12}:${p} ${x}`,f=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:c,O=figma.currentUser?figma.currentUser.photoUrl:null,A=u.find(V=>V.id===i);return A?(figma.showUI(__uiFiles__.main,{width:400,height:320}),figma.ui.postMessage({type:"reply-message",payload:A}),new Promise((V,F)=>{figma.ui.onmessage=P=>{if(P.type==="send-reply"){console.log(P.payload);let W=P.payload.message,pe=P.payload.anonymous,$e={id:n,parentId:i,text:W,sender:c,timestamp:k,edited:!1,deleteConfirm:!1,showReplies:!1,pinned:!1,deleted:!1,upvotedUsers:[],downvotedUsers:[],directreply:0,logId:v,userIcon:O,anonymous:pe};console.log("newreply");let Ye=u.map(oe=>oe.id===i?S(L({},oe),{directreply:oe.directreply+1}):oe);Q.push($e),te(1e4),ve(),s(!1),V()}else P.type==="close-plugin"&&(s(!1),F("Reply action was cancelled."))}})):(console.error("Message to reply to was not found."),s(!1),Promise.reject("Message to reply to was not found."))}),xe=i=>{let t=u.find(o=>o.id===i);if(t){t.deleted=!0;let o=u.map(n=>n.id===i?S(L({},n),{text:"this message has been deleted",sender:"Anonymous",edited:!1,showReplies:!1}):n);y(o),B(null),q(""),ce("Type a message..."),K(!0),setTimeout(()=>K(!1),2e3)}},Ae=i=>{let t=u.find(o=>o.id===i);t&&t.deleteConfirm===!1?y(o=>o.map(n=>n.id===i?S(L({},n),{deleteConfirm:!0}):n)):y(o=>o.map(n=>n.id===i?S(L({},n),{deleteConfirm:!1}):n))},De=i=>{let t=u.find(o=>o.id===i);t&&t.showReplies===!1?y(o=>o.map(n=>n.id===i?S(L({},n),{showReplies:!0}):n)):y(o=>o.map(n=>n.id===i?S(L({},n),{showReplies:!1}):n))},Ge=i=>{if(!u.find(d=>d.id===i))return 0;let o=0,n=(d,m)=>{u.forEach(a=>{a.parentId===d&&n(a.id,m+1)}),m>o&&(o=m)};return n(i,0),o},be=i=>{y(t=>t.map(o=>{if(o.id===i){let n=o.pinned!==void 0?o.pinned:!1;return S(L({},o),{pinned:!n})}return o}))},_e=(i=null)=>{let t=a=>u.filter(p=>p.parentId===a).length,o=a=>($(),console.log("in options:",c),new Promise((p,x)=>{figma.showUI(__uiFiles__.options,{width:350,height:50}),figma.ui.onmessage=C=>{if(C.type==="edit-message"){console.log("calling edit from options");let k=u.find(f=>f.id===a);k&&!k.deleted?(console.log(k.deleted),console.log("opening modal"),figma.showUI(__uiFiles__.main,{width:400,height:320}),figma.ui.postMessage({type:"edit-message",payload:k.text}),console.log("opened"),figma.ui.onmessage=f=>{if(f.type==="update-message"){console.log("updated");let O=f.payload.message,A=f.payload.anonymous;console.log(f.payload);let V=u.map(F=>F.id===a?S(L({},F),{text:O,anonymous:A,edited:!0}):F);y(V),s(!1),figma.closePlugin(),p()}else f.type==="cancel-edit"?(console.log("canceled"),s(!1),x("Edit canceled by user.")):f.type==="close-plugin"&&(console.log("closed"),s(!1),figma.closePlugin(),p())}):(console.log("Message not found."),s(!1),x("Message not found."))}else if(C.type==="edit-user"){console.log("calling edit from options");let k=u.find(f=>f.id===a);k&&!k.deleted?(console.log(k.deleted),console.log("opening modal"),figma.showUI(__uiFiles__.main,{width:400,height:320}),figma.ui.postMessage({type:"edit-message",payload:k.sender}),console.log("opened"),figma.ui.onmessage=f=>{if(f.type==="update-message"){console.log("updated");let O=f.payload.message,A=f.payload.anonymous;console.log(f.payload);let V=u.map(F=>F.id===a?S(L({},F),{sender:O,anonymous:A,edited:!0}):F);y(V),s(!1),figma.closePlugin(),p()}else f.type==="cancel-edit"?(console.log("canceled"),s(!1),x("Edit canceled by user.")):f.type==="close-plugin"&&(console.log("closed"),s(!1),figma.closePlugin(),p())}):(console.log("Message not found."),s(!1),x("Message not found."))}else C.type==="update-prompt"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:250}),figma.ui.postMessage({type:"edit-prompt",payload:E}),console.log("opened"),figma.ui.onmessage=k=>{if(k.type==="update-message"){let f=k.payload.message;X(f),s(!1),figma.closePlugin(),p()}else k.type==="cancel-edit"?(console.log("canceled"),s(!1),x("Edit canceled by user.")):k.type==="close-plugin"&&(console.log("closed"),s(!1),figma.closePlugin(),p())}):C.type==="delete-message"?(xe(a),s(!1),p()):C.type==="pin-message"?(be(a),s(!1),p()):C.type==="close-options"&&(s(!1),p())}})),n=a=>{let p=u.filter(x=>x.parentId===a);return 0},d=[...u].sort((a,p)=>a.pinned&&!p.pinned?-1:!a.pinned&&p.pinned?1:0);return d.filter(a=>a.parentId===i).length===0?figma.widget.h(g,{padding:r(30),direction:"vertical",spacing:r(20),width:r(800),height:r(250),horizontalAlignItems:"center",verticalAlignItems:"center"},figma.widget.h(b,{fill:"#60666D",fontSize:r(36),fontWeight:500,lineHeight:r(20.4)},"No messages yet"),figma.widget.h(b,{fill:"#8E939A",fontSize:r(24),lineHeight:r(20.4)},"Send a message with the add message button below.")):d.filter(a=>a.parentId===i).map(a=>figma.widget.h(Qe,{key:a.id,message:a,onReply:()=>ze(a.id),onEdit:()=>Te(a.id),onDelete:()=>xe(a.id),onDeleteConfirm:()=>Ae(a.id),onShowReplies:()=>De(a.id),replyChain:_e(a.id),replyToId:Z,user:c,getMessageDepth:Ge,onPin:be,totalReplies:t(a.id),onUpvote:()=>Ve(a.id),onDownvote:()=>Pe(a.id),onOptionsClick:()=>o(a.id),updateUserName:()=>$(),getTotalDirectReplies:p=>n(a.id),messageFontSize:z,widgetWidth:T,widgetButtonColor:G}))};Oe(()=>{ee&&(s(!1),console.log("crown123",ee),figma.showUI(__uiFiles__.optionsChat,{width:400,height:205}),console.log("logid",v),figma.ui.postMessage({type:"set-widget-log-id",payload:v}),figma.ui.postMessage({type:"alreadyLoggedIn",payload:h}),figma.ui.postMessage({type:"current-widthValue",payload:T}),figma.ui.postMessage({type:"current-borderWidthValue",payload:Y}),figma.ui.postMessage({type:"current-titleFontSize",payload:N}),figma.ui.postMessage({type:"current-borderColor",payload:_}),figma.ui.postMessage({type:"current-messageFontSize",payload:z}),figma.ui.postMessage({type:"current-promptColor",payload:H}),figma.ui.postMessage({type:"current-widgetButtonColor",payload:G}),figma.ui.postMessage({type:"current-widgetCornerRadius",payload:I}),figma.ui.onmessage=i=>{if(i.type==="load-chats"){console.log("Loading new chats...",i.messages);let t=i.messages,o=t.map(n=>((!n.timestamp||isNaN(Date.parse(n.timestamp)))&&(n.timestamp=new Date().toISOString()),n));y(o),o.length!==t.length&&console.error("Some messages had invalid structures."),console.log("New messages loaded:",t)}else i.type==="update-prompt"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-prompt",payload:E}),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;X(o),h=!0,s(!0)}else t.type==="close-plugin"?(console.log("closed"),s(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),h=!0,R())}):i.type==="update-width"?(console.log("calling width from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-width",payload:T}),figma.ui.onmessage=t=>{if(t.type==="update-message"){console.log("WIDGETWIDTGSET");let o=t.payload.message;re(parseInt(o,10)),h=!0,s(!0)}else t.type==="close-plugin"?(console.log("closed"),s(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),h=!0,R())}):i.type==="update-borderWidth"?(console.log("calling width from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-borderWidth",payload:Y}),console.log("opened"),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;ae(parseInt(o,10)),h=!0,s(!0)}else t.type==="close-plugin"?(console.log("closed"),s(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),h=!0,R())}):i.type==="update-titleFontSize"?(console.log("calling width from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-titleFontSize",payload:N}),console.log("opened"),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;he(parseInt(o,10)),h=!0,s(!0)}else t.type==="close-plugin"?(console.log("closed"),s(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),h=!0,R())}):i.type==="update-borderColor"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-borderColor",payload:_}),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;e(o),h=!0,s(!0)}else t.type==="close-plugin"?(console.log("closed"),s(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),h=!0,R())}):i.type==="update-messageFontSize"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-messageFontSize",payload:z}),console.log("opened"),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;me(parseInt(o,10)),h=!0,s(!0)}else t.type==="close-plugin"?(console.log("closed"),s(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),h=!0,R())}):i.type==="update-promptColor"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-promptColor",payload:H}),console.log("opened"),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;se(o),h=!0,s(!0)}else t.type==="close-plugin"?(console.log("closed"),s(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),h=!0,R())}):i.type==="update-widgetButtonColor"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-widgetButtonColor",payload:G}),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;ne(o),h=!0,s(!0)}else t.type==="close-plugin"?(console.log("closed"),s(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),h=!0,R())}):i.type==="update-widgetCornerRadius"&&(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-widgetCornerRadius",payload:I}),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;we(o),h=!0,s(!0)}else t.type==="close-plugin"?(console.log("closed"),s(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),h=!0,R())})})});let R=()=>(console.log("waiting"),$(),s(!0),new Promise((i,t)=>{figma.showUI(__uiFiles__.optionsChat,{width:400,height:205}),figma.ui.postMessage({type:"alreadyLoggedIn",payload:h}),figma.ui.postMessage({type:"current-widthValue",payload:T}),figma.ui.postMessage({type:"current-borderWidthValue",payload:Y}),figma.ui.postMessage({type:"current-titleFontSize",payload:N}),figma.ui.postMessage({type:"current-borderColor",payload:_}),figma.ui.postMessage({type:"current-messageFontSize",payload:z}),figma.ui.postMessage({type:"current-promptColor",payload:H}),figma.ui.postMessage({type:"current-widgetButtonColor",payload:G}),figma.ui.postMessage({type:"current-widgetCornerRadius",payload:I}),figma.ui.onmessage=o=>{o.type==="close-plugin"?(console.log("closed"),s(!1),i()):o.type==="back-action"&&(console.log("back"),h=!0,R().then(i).catch(t))},figma.on("close",()=>{console.log("closed"),s(!1),i()})}));return figma.widget.h(g,{direction:"vertical",spacing:r(8),padding:Y,stroke:_,strokeWidth:r(2),cornerRadius:r(I),onClick:$,minWidth:T,fill:_},figma.widget.h(g,{direction:"vertical",spacing:8,padding:r(10),stroke:_,strokeWidth:r(2),cornerRadius:r(I-2),onClick:$,minWidth:T,fill:"#FFFFFF"},figma.widget.h(g,{cornerRadius:r(4),padding:{top:r(15),bottom:r(2),left:r(770),right:r(10)},onClick:R},figma.widget.h(U,{src:de,onClick:R})),figma.widget.h(g,{padding:{top:0,bottom:r(20),left:r(20)}},figma.widget.h(b,{fill:H,fontSize:r(N),fontWeight:700,width:r(770),lineHeight:r(65)},E||"Chat")),figma.widget.h(g,{direction:"vertical",spacing:r(1),padding:r(8),stroke:_,cornerRadius:r(10),minWidth:r(480)},_e()),figma.widget.h(g,{direction:"vertical",spacing:r(8),padding:r(8),onClick:$,horizontalAlignItems:"end",minWidth:T},figma.widget.h(g,{direction:"horizontal",onClick:Fe,fill:G,padding:r(10),cornerRadius:r(100)},figma.widget.h(g,{padding:r(8)},figma.widget.h(U,{src:le,width:r(30),height:r(30)})),figma.widget.h(b,{fontSize:r(36),fill:"#FFFFFF"},"Add Message  ")))))}function Qe({getTotalDirectReplies:v,message:l,onReply:w,onDelete:q,onEdit:Z,replyChain:B,replyToId:u,user:y,onDeleteConfirm:c,getMessageDepth:D,onShowReplies:j,onPin:ce,totalReplies:ue,onUpvote:K,onDownvote:fe,onOptionsClick:ie,updateUserName:Q,messageFontSize:E,widgetWidth:X,widgetButtonColor:_}){function e(Ce){let ke=X/800;return Math.floor(Ce*ke)}let G=`<svg width="${e(30)}px" height="${e(30)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M3 8L4.44293 16.6576C4.76439 18.5863 6.43315 20 8.38851 20H15.6115C17.5668 20 19.2356 18.5863 19.5571 16.6576L21 8M3 8L6.75598 11.0731C7.68373 11.8321 9.06623 11.6102 9.70978 10.5989L12 7M3 8C3.82843 8 4.5 7.32843 4.5 6.5C4.5 5.67157 3.82843 5 3 5C2.17157 5 1.5 5.67157 1.5 6.5C1.5 7.32843 2.17157 8 3 8ZM21 8L17.244 11.0731C16.3163 11.8321 14.9338 11.6102 14.2902 10.5989L12 7M21 8C21.8284 8 22.5 7.32843 22.5 6.5C22.5 5.67157 21.8284 5 21 5C20.1716 5 19.5 5.67157 19.5 6.5C19.5 7.32843 20.1716 8 21 8ZM12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7Z" stroke="#000000" stroke-width="${3}" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
    </svg>`,ne=`<svg width="${e(32)}px" height="${e(32)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 17V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H4M4 11L8 7M4 11L8 15" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,H=`<svg width="${e(35)}px" height="${e(35)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#1cb566"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.1835 7.80516L16.2188 4.83755C14.1921 2.8089 13.1788 1.79457 12.0904 2.03468C11.0021 2.2748 10.5086 3.62155 9.5217 6.31506L8.85373 8.1381C8.59063 8.85617 8.45908 9.2152 8.22239 9.49292C8.11619 9.61754 7.99536 9.72887 7.86251 9.82451C7.56644 10.0377 7.19811 10.1392 6.46145 10.3423C4.80107 10.8 3.97088 11.0289 3.65804 11.5721C3.5228 11.8069 3.45242 12.0735 3.45413 12.3446C3.45809 12.9715 4.06698 13.581 5.28476 14.8L6.69935 16.2163L2.22345 20.6964C1.92552 20.9946 1.92552 21.4782 2.22345 21.7764C2.52138 22.0746 3.00443 22.0746 3.30236 21.7764L7.77841 17.2961L9.24441 18.7635C10.4699 19.9902 11.0827 20.6036 11.7134 20.6045C11.9792 20.6049 12.2404 20.5358 12.4713 20.4041C13.0192 20.0914 13.2493 19.2551 13.7095 17.5825C13.9119 16.8472 14.013 16.4795 14.2254 16.1835C14.3184 16.054 14.4262 15.9358 14.5468 15.8314C14.8221 15.593 15.1788 15.459 15.8922 15.191L17.7362 14.4981C20.4 13.4973 21.7319 12.9969 21.9667 11.9115C22.2014 10.826 21.1954 9.81905 19.1835 7.80516Z" fill="#1cb566"></path> </g></svg>`,se=`<svg fill="#303030" height="${e(18)}px" width="${e(18)}px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g> </g></svg>`,T=`<svg fill="#303030" height="${e(18)}px" width="${e(18)}px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g> </g></svg>`,re=`<svg width="${e(18)}px" height="${e(18)}px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g> </g></svg>`,N=`<svg width="${e(18)}px" height="${e(18)}px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g> </g></svg>`,he=l.parentId!==null,z=u===l.id,me=l.upvotedUsers.length,Y=l.downvotedUsers.length,ae=l.sender.split(" ")[0],I={fill:z?_:"#FFFFFF",color:"#000000",extra:z?_:"#f0f0f0"},we=l.sender===y,ee=l.edited,s=l.deleted,r=D(l.id),le=l.upvotedUsers.length-l.downvotedUsers.length,de=e(160);r==0&&(de=e(160));let ge=!1;r>=1&&(ge=!0);let ye=!0;return l.text=="this message has been deleted"&&(ye=!1),figma.widget.h(g,{direction:"vertical"},figma.widget.h(g,{direction:"vertical",padding:{top:e(15),bottom:s?0:e(15),left:e(12),right:e(12)},strokeWidth:e(2),cornerRadius:e(4),spacing:e(20),fill:I.fill,effect:[]},figma.widget.h(g,{direction:"horizontal",width:e(800),padding:{top:e(10),bottom:e(1),left:e(4),right:e(8)}},figma.widget.h(g,{direction:"horizontal",horizontalAlignItems:"start",width:e(520),spacing:e(20)},l.userIcon?figma.widget.h(Ne,{src:l.userIcon,width:e(40),height:e(40),cornerRadius:e(15)}):figma.widget.h(U,{src:"<svg>...<svg>",width:e(30),height:e(30)}),figma.widget.h(b,{fontSize:e(30),fill:I.color,horizontalAlignText:"left"},l.deleted||l.anonymous?"Anonymous":ae,":"),l.pinned&&figma.widget.h(U,{src:H})),figma.widget.h(g,{direction:"horizontal",horizontalAlignItems:"end",padding:{top:e(2),bottom:e(2),left:e(8),right:e(8)},width:e(200)},figma.widget.h(b,{fontSize:e(25),fill:I.color,horizontalAlignText:"right"},l.timestamp)),l.text!="this message has been deleted"&&figma.widget.h(g,{cornerRadius:4,padding:{top:e(2),bottom:e(2),left:e(8),right:e(8)},onClick:ie},figma.widget.h(U,{src:G,onClick:ie}))),figma.widget.h(g,{direction:"horizontal",padding:{top:e(20),bottom:e(4),left:e(10),right:e(4)},fill:I.fill},figma.widget.h(g,{direction:"vertical"},figma.widget.h(b,{width:e(740),fontSize:e(E)},s?"this message has been deleted":l.text),figma.widget.h(b,{width:e(60),fontSize:4,fill:"#808080"}," "),ee&&!s&&figma.widget.h(b,{width:e(200),fontSize:e(25),fill:"#808080"},"(edited)"))),figma.widget.h(g,{direction:"horizontal",padding:{top:e(20),bottom:0,left:e(4),right:e(4)},spacing:12},l.text!="this message has been deleted"&&figma.widget.h(g,{fill:I.extra,cornerRadius:e(200)},figma.widget.h(g,{cornerRadius:e(200),padding:{top:e(14),bottom:e(4),left:e(10),right:e(10)},onClick:()=>K()},figma.widget.h(b,{fontSize:e(25),fill:"#FFFFFF"}," "),figma.widget.h(U,{src:se})),figma.widget.h(g,{padding:{top:e(10),bottom:e(6),left:e(10),right:e(10)}},figma.widget.h(b,{fontSize:e(25),fill:"#000000"},le)),figma.widget.h(g,{cornerRadius:e(200),padding:{top:e(14),bottom:e(4),left:e(10),right:e(10)},onClick:()=>fe()},figma.widget.h(U,{src:T}),figma.widget.h(b,{fontSize:e(25),fill:"#FFFFFF"}," "))),l.text!="this message has been deleted"&&figma.widget.h(g,{fill:_,cornerRadius:e(200),padding:{top:e(8),bottom:s?0:e(8),left:e(10),right:e(10)},onClick:w},figma.widget.h(b,{fontSize:e(25),fill:_}," "),figma.widget.h(U,{src:ne,onClick:w}),figma.widget.h(b,{fontSize:e(25),fill:"#FFFFFF"}," Reply  ")),ge&&figma.widget.h(g,{cornerRadius:e(4),padding:{top:e(8),bottom:s?e(15):0,left:e(10),right:e(10)},onClick:j},l.showReplies&&figma.widget.h(g,{cornerRadius:e(4),padding:{top:e(6),bottom:e(6),left:0,right:0},onClick:j},figma.widget.h(U,{src:re,onClick:j})),!l.showReplies&&figma.widget.h(g,{cornerRadius:4,padding:{top:e(6),bottom:e(6),left:0,right:0},onClick:j},figma.widget.h(U,{src:N,onClick:j})),figma.widget.h(b,{fontSize:e(25),fill:_},"  ",ue," Replies ")))),l.showReplies&&B&&figma.widget.h(g,{direction:"vertical",width:"fill-parent",padding:{top:s?0:e(10),bottom:s?0:e(10),left:e(32),right:e(8)}},B))}Re.register(Ze);})();
