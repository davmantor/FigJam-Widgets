(()=>{var We=Object.defineProperty,Be=Object.defineProperties;var He=Object.getOwnPropertyDescriptors;var Le=Object.getOwnPropertySymbols;var je=Object.prototype.hasOwnProperty,Ee=Object.prototype.propertyIsEnumerable;var Re=(v,l,k)=>l in v?We(v,l,{enumerable:!0,configurable:!0,writable:!0,value:k}):v[l]=k,L=(v,l)=>{for(var k in l||(l={}))je.call(l,k)&&Re(v,k,l[k]);if(Le)for(var k of Le(l))Ee.call(l,k)&&Re(v,k,l[k]);return v},R=(v,l)=>Be(v,He(l));var H=(v,l,k)=>new Promise((q,Y)=>{var j=u=>{try{x(k.next(u))}catch(z){Y(z)}},m=u=>{try{x(k.throw(u))}catch(z){Y(z)}},x=u=>u.done?q(u.value):Promise.resolve(u.value).then(j,m);x((k=k.apply(v,l)).next())});var{widget:Ie,showUI:Xe,ui:et}=figma,{AutoLayout:c,Text:_,useSyncedState:b,Input:tt,Frame:ot,Image:Ne,SVG:$,useEffect:Oe,colorMapToOptions:it,usePropertyMenu:nt}=Ie,st={id:"",parentId:null,text:"",sender:"Anonymous",timestamp:new Date().toISOString(),edited:!1,deleteConfirm:!1,showReplies:!1,pinned:!1,deleted:!1,upvotedUsers:[],downvotedUsers:[],directreply:0,logId:0,anonymous:!1,userIcon:null};var C=!1;function Ze(){let[v,l]=b("newMessage",Date.now()),[k,q]=b("newMessage",""),[Y,j]=b("replyToId",null),[m,x]=b("messages",[]),[u,z]=b("userName","Unknown User"),[E,me]=b("inputPlaceholder","Type a message..."),[we,K]=b("inputActive",!1),[ye,ne]=b("isEditing",!1),N=[],[O,X]=b("Prompt not set",""),[S,e]=b("borderColor","#3423232"),[G,se]=b("widgetButtonColor","#007aff"),[Z,re]=b("promptColor","#000000"),[T,ae]=b("widgetWidth",800),[J,Ce]=b("titleFontSize",60),[P,Me]=b("messageFontSize",35),[Q,le]=b("borderWidth",2),[U,ke]=b("widgetCornerRadius",10),[ee,r]=b("isCrownButtonPressed",!1);function a(i){let o=T/800;return Math.floor(i*o)}function de(i){let t=new Date(i),o=t.getFullYear(),d=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()],f=t.getDate(),n=t.getHours(),p=pe(t.getMinutes()),w=n>=12?"PM":"AM",y=n%12||12;return`${d} ${f}, ${o} ${y}:${p} ${w}`}function pe(i){return i<10?"0"+i:i.toString()}let te=`<svg width="${a(28)}px" height="${a(28)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M4 12H20M12 4V20" stroke="#ffffff" stroke-width="${3}" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
    </svg>`,ge=`<svg width="${a(30)}px" height="${a(30)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M3 8L4.44293 16.6576C4.76439 18.5863 6.43315 20 8.38851 20H15.6115C17.5668 20 19.2356 18.5863 19.5571 16.6576L21 8M3 8L6.75598 11.0731C7.68373 11.8321 9.06623 11.6102 9.70978 10.5989L12 7M3 8C3.82843 8 4.5 7.32843 4.5 6.5C4.5 5.67157 3.82843 5 3 5C2.17157 5 1.5 5.67157 1.5 6.5C1.5 7.32843 2.17157 8 3 8ZM21 8L17.244 11.0731C16.3163 11.8321 14.9338 11.6102 14.2902 10.5989L12 7M21 8C21.8284 8 22.5 7.32843 22.5 6.5C22.5 5.67157 21.8284 5 21 5C20.1716 5 19.5 5.67157 19.5 6.5C19.5 7.32843 20.1716 8 21 8ZM12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7Z" stroke="#000000" stroke-width="${3}" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
    </svg>`,ve=`<svg width="${a(20)}px" height="${a(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,Ue=`<svg width="${a(20)}px" height="${a(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,xe=`<svg width="${a(20)}px" height="${a(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff5252"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 14L11 16L15 12M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#ff5252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,Ye=`<svg width="${a(35)}px" height="${a(35)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1218 1.87023C15.7573 0.505682 13.4779 0.76575 12.4558 2.40261L9.61062 6.95916C9.61033 6.95965 9.60913 6.96167 9.6038 6.96549C9.59728 6.97016 9.58336 6.97822 9.56001 6.9848C9.50899 6.99916 9.44234 6.99805 9.38281 6.97599C8.41173 6.61599 6.74483 6.22052 5.01389 6.87251C4.08132 7.22378 3.61596 8.03222 3.56525 8.85243C3.51687 9.63502 3.83293 10.4395 4.41425 11.0208L7.94975 14.5563L1.26973 21.2363C0.879206 21.6269 0.879206 22.26 1.26973 22.6506C1.66025 23.0411 2.29342 23.0411 2.68394 22.6506L9.36397 15.9705L12.8995 19.5061C13.4808 20.0874 14.2853 20.4035 15.0679 20.3551C15.8881 20.3044 16.6966 19.839 17.0478 18.9065C17.6998 17.1755 17.3043 15.5086 16.9444 14.5375C16.9223 14.478 16.9212 14.4114 16.9355 14.3603C16.9421 14.337 16.9502 14.3231 16.9549 14.3165C16.9587 14.3112 16.9606 14.31 16.9611 14.3098L21.5177 11.4645C23.1546 10.4424 23.4147 8.16307 22.0501 6.79853L17.1218 1.87023ZM14.1523 3.46191C14.493 2.91629 15.2528 2.8296 15.7076 3.28445L20.6359 8.21274C21.0907 8.66759 21.0041 9.42737 20.4584 9.76806L15.9019 12.6133C14.9572 13.2032 14.7469 14.3637 15.0691 15.2327C15.3549 16.0037 15.5829 17.1217 15.1762 18.2015C15.1484 18.2752 15.1175 18.3018 15.0985 18.3149C15.0743 18.3316 15.0266 18.3538 14.9445 18.3589C14.767 18.3699 14.5135 18.2916 14.3137 18.0919L5.82846 9.6066C5.62872 9.40686 5.55046 9.15333 5.56144 8.97583C5.56651 8.8937 5.58877 8.84605 5.60548 8.82181C5.61855 8.80285 5.64516 8.7719 5.71886 8.74414C6.79869 8.33741 7.91661 8.56545 8.68762 8.85128C9.55668 9.17345 10.7171 8.96318 11.3071 8.01845L14.1523 3.46191Z" fill="#0F0F0F"></path> </g></svg>`,Qe=`<svg width="${a(20)}px" height="${a(20)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8787 3.70705C17.0503 2.53547 18.9498 2.53548 20.1213 3.70705L20.2929 3.87862C21.4645 5.05019 21.4645 6.94969 20.2929 8.12126L18.5556 9.85857L8.70713 19.7071C8.57897 19.8352 8.41839 19.9261 8.24256 19.9701L4.24256 20.9701C3.90178 21.0553 3.54129 20.9554 3.29291 20.7071C3.04453 20.4587 2.94468 20.0982 3.02988 19.7574L4.02988 15.7574C4.07384 15.5816 4.16476 15.421 4.29291 15.2928L14.1989 5.38685L15.8787 3.70705ZM18.7071 5.12126C18.3166 4.73074 17.6834 4.73074 17.2929 5.12126L16.3068 6.10738L17.8622 7.72357L18.8787 6.70705C19.2692 6.31653 19.2692 5.68336 18.8787 5.29283L18.7071 5.12126ZM16.4477 9.13804L14.8923 7.52185L5.90299 16.5112L5.37439 18.6256L7.48877 18.097L16.4477 9.13804Z" fill="#000000"></path> </g></svg>`;function Fe(i){return new Promise((t,o)=>H(this,null,function*(){figma.showUI(__uiFiles__.main,{width:400,height:320}),figma.ui.onmessage=s=>H(this,null,function*(){if(s.type==="new-message"){let{message:d,anonymous:f}=s.payload,n=new Date().getTime();console.log(n),console.log("this is the start time");let p=setTimeout(()=>{figma.showUI(`
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                    <h4 style="color: #333;">Message is being sent</h2>
                    <p style="color: #666;">Please wait, server is booting up...</p>
                </div>
            `)},5e3);yield fe({messageText:d,anonymous:f}),clearTimeout(p);let y=new Date().getTime()-n;console.log(`The operation took ${y} milliseconds.`),t()}else if(s.type==="bulk-load-messages"){let{messages:d}=s.payload;yield fe({messages:d},!0),t()}else s.type==="close-plugin"?(r(!1),figma.closePlugin(),t()):s.type==="back-action"&&(r(!1),o("New message canceled by user."))})}))}function oe(i){let t=i*70*Math.random();return new Promise(o=>setTimeout(o,i))}let Te=i=>(console.log("editing"),oe(1e4),new Promise((t,o)=>{let s=m.find(d=>d.id===i);s?(console.log("opening modal"),figma.showUI(__uiFiles__.main,{width:400,height:320}),figma.ui.postMessage({type:"edit-message",payload:s.text}),console.log("opened"),figma.ui.onmessage=d=>{if(d.type==="update-message"){console.log("updated---",d.payload);let f=d.payload.message,n=d.payload.anonymous;console.log(f,n);let p=R(L({},s),{text:f,anonymous:n,edited:!0}),w=m.findIndex(y=>y.id===i);if(w!==-1){let y=[...m];y[w]=p,x(y)}r(!1),figma.closePlugin(),t()}else d.type==="cancel-edit"?(console.log("canceled"),r(!1),o("Edit canceled by user.")):d.type==="close-plugin"&&(r(!1),console.log("closed"),figma.closePlugin(),t())}):(console.log("Message not found."),r(!1),o("Message not found."))})),W=()=>{let i=figma.currentUser?figma.currentUser.name:"Unknown User";z(i),console.log(u)},ce=(i=6)=>{let t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o="";for(let s=0;s<i;s++)o+=t.charAt(Math.floor(Math.random()*t.length));return o},ue=()=>{if(N.length>0){oe(1e4);let i=N.shift();i&&x(t=>[...t,i])}},fe=(i,t=!1)=>H(this,null,function*(){if(console.log("outside"),t&&"messages"in i){console.log("inside bulk load");let{messages:o}=i,s=Date.now(),d=ce(),f=`${s}${d}${u}`;console.log(f);let n=new Date(s),p=n.getHours(),w=n.getMinutes(),y=w<10?"0"+w:w.toString(),M=p>=12?"PM":"AM",D=`${p%12||12}:${y} ${M}`,A=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:u,V=figma.currentUser?figma.currentUser.photoUrl:null;o.forEach(g=>H(this,null,function*(){let F={id:g.id||f,parentId:g.parentId||null,text:g.text||"",sender:g.sender||"Anonymous",timestamp:g.timestamp?de(g.timestamp):D,edited:g.edited||!1,deleteConfirm:g.deleteConfirm||!1,showReplies:g.showReplies||!1,pinned:g.pinned||!1,deleted:g.deleted||!1,upvotedUsers:g.upvotedUsers||[],downvotedUsers:g.downvotedUsers||[],directreply:g.directreply||0,logId:g.logId||0,anonymous:g.anonymous||!1,userIcon:g.userIcon||""};N.push(F),ue()})),console.log("Bulk messages processed.")}else{let{messageText:o,anonymous:s}=i;if(console.log("anonymous:",s),console.log("messageText:",o),console.log("messageData:",i),W(),o.trim()!==""){let d=Date.now(),f=ce(),n=`${d}${f}${u}`;console.log(n);let p=new Date(d),w=p.getHours(),y=p.getMinutes(),M=y<10?"0"+y:y.toString(),h=w>=12?"PM":"AM",A=`${w%12||12}:${M} ${h}`,V=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:u,g=figma.currentUser?figma.currentUser.photoUrl:null,F={id:n,parentId:null,text:o.trim(),sender:V,timestamp:A,edited:!1,deleteConfirm:!1,showReplies:!1,pinned:!1,deleted:!1,upvotedUsers:[],downvotedUsers:[],directreply:0,logId:v,userIcon:g,anonymous:s};try{console.log("newMessage before sending:",F);let B=yield fetch("https://figjam-widgets.onrender.com/chatwidget/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(F)});if(!B.ok)throw new Error(`HTTP error! status: ${B.status}`);let he=yield B.json();console.log("Message added successfully:",he)}catch(B){console.error("Error adding message:",B)}N.push(F),oe(1e4),ue()}}}),Ve=i=>{x(t=>t.map(o=>{if(o.id===i){let s=[...o.upvotedUsers],d=[...o.downvotedUsers],f=s.indexOf(u),n=d.indexOf(u);return f>-1?s.splice(f,1):(s.push(u),n>-1&&d.splice(n,1)),R(L({},o),{upvotedUsers:s,downvotedUsers:d})}return o}))},$e=i=>{x(t=>t.map(o=>{if(o.id===i){let s=[...o.upvotedUsers],d=[...o.downvotedUsers],f=s.indexOf(u),n=d.indexOf(u);return n>-1?d.splice(n,1):(d.push(u),f>-1&&s.splice(f,1)),R(L({},o),{upvotedUsers:s,downvotedUsers:d})}return o}))},Ae=i=>H(this,null,function*(){let t=Date.now(),o=ce(),s=`${t}${o}${u}`,d=new Date(t),f=d.getHours(),n=d.getMinutes(),p=n<10?"0"+n:n.toString(),w=f>=12?"PM":"AM",M=`${f%12||12}:${p} ${w}`,h=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:u,D=figma.currentUser?figma.currentUser.photoUrl:null,A=m.find(V=>V.id===i);return A?(figma.showUI(__uiFiles__.main,{width:400,height:320}),figma.ui.postMessage({type:"reply-message",payload:A}),new Promise((V,g)=>{figma.ui.onmessage=F=>{if(F.type==="send-reply"){console.log(F.payload);let B=F.payload.message,he=F.payload.anonymous,Ge={id:s,parentId:i,text:B,sender:u,timestamp:M,edited:!1,deleteConfirm:!1,showReplies:!1,pinned:!1,deleted:!1,upvotedUsers:[],downvotedUsers:[],directreply:0,logId:v,userIcon:D,anonymous:he};console.log("newreply");let qe=m.map(ie=>ie.id===i?R(L({},ie),{directreply:ie.directreply+1}):ie);N.push(Ge),oe(1e4),ue(),r(!1),V()}else F.type==="close-plugin"&&(r(!1),g("Reply action was cancelled."))}})):(console.error("Message to reply to was not found."),r(!1),Promise.reject("Message to reply to was not found."))}),be=i=>{let t=m.find(o=>o.id===i);if(t){t.deleted=!0;let o=m.map(s=>s.id===i?R(L({},s),{text:"this message has been deleted",sender:"Anonymous",edited:!1,showReplies:!1}):s);x(o),j(null),q(""),me("Type a message..."),K(!0),setTimeout(()=>K(!1),2e3)}},Pe=i=>{let t=m.find(o=>o.id===i);t&&t.deleteConfirm===!1?x(o=>o.map(s=>s.id===i?R(L({},s),{deleteConfirm:!0}):s)):x(o=>o.map(s=>s.id===i?R(L({},s),{deleteConfirm:!1}):s))},De=i=>{let t=m.find(o=>o.id===i);t&&t.showReplies===!1?x(o=>o.map(s=>s.id===i?R(L({},s),{showReplies:!0}):s)):x(o=>o.map(s=>s.id===i?R(L({},s),{showReplies:!1}):s))},ze=i=>{if(!m.find(d=>d.id===i))return 0;let o=0,s=(d,f)=>{m.forEach(n=>{n.parentId===d&&s(n.id,f+1)}),f>o&&(o=f)};return s(i,0),o},_e=i=>{x(t=>t.map(o=>{if(o.id===i){let s=o.pinned!==void 0?o.pinned:!1;return R(L({},o),{pinned:!s})}return o}))},Se=(i=null)=>{let t=n=>m.filter(p=>p.parentId===n).length,o=n=>(W(),console.log("in options:",u),new Promise((p,w)=>{figma.showUI(__uiFiles__.options,{width:350,height:50}),figma.ui.onmessage=y=>{if(y.type==="edit-message"){console.log("calling edit from options");let M=m.find(h=>h.id===n);M&&!M.deleted?(console.log(M.deleted),console.log("opening modal"),figma.showUI(__uiFiles__.main,{width:400,height:320}),figma.ui.postMessage({type:"edit-message",payload:M.text}),console.log("opened"),figma.ui.onmessage=h=>{if(h.type==="update-message"){console.log("updated");let D=h.payload.message,A=h.payload.anonymous;console.log(h.payload);let V=m.map(g=>g.id===n?R(L({},g),{text:D,anonymous:A,edited:!0}):g);x(V),r(!1),figma.closePlugin(),p()}else h.type==="cancel-edit"?(console.log("canceled"),r(!1),w("Edit canceled by user.")):h.type==="close-plugin"&&(console.log("closed"),r(!1),figma.closePlugin(),p())}):(console.log("Message not found."),r(!1),w("Message not found."))}else if(y.type==="edit-user"){console.log("calling edit from options");let M=m.find(h=>h.id===n);M&&!M.deleted?(console.log(M.deleted),console.log("opening modal"),figma.showUI(__uiFiles__.main,{width:400,height:320}),figma.ui.postMessage({type:"edit-message",payload:M.sender}),console.log("opened"),figma.ui.onmessage=h=>{if(h.type==="update-message"){console.log("updated");let D=h.payload.message,A=h.payload.anonymous;console.log(h.payload);let V=m.map(g=>g.id===n?R(L({},g),{sender:D,anonymous:A,edited:!0}):g);x(V),r(!1),figma.closePlugin(),p()}else h.type==="cancel-edit"?(console.log("canceled"),r(!1),w("Edit canceled by user.")):h.type==="close-plugin"&&(console.log("closed"),r(!1),figma.closePlugin(),p())}):(console.log("Message not found."),r(!1),w("Message not found."))}else y.type==="update-prompt"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:250}),figma.ui.postMessage({type:"edit-prompt",payload:O}),console.log("opened"),figma.ui.onmessage=M=>{if(M.type==="update-message"){let h=M.payload.message;X(h),r(!1),figma.closePlugin(),p()}else M.type==="cancel-edit"?(console.log("canceled"),r(!1),w("Edit canceled by user.")):M.type==="close-plugin"&&(console.log("closed"),r(!1),figma.closePlugin(),p())}):y.type==="delete-message"?(be(n),r(!1),p()):y.type==="pin-message"?(_e(n),r(!1),p()):y.type==="close-options"&&(r(!1),p())}})),s=n=>{let p=m.filter(w=>w.parentId===n);return 0},d=[...m].sort((n,p)=>n.pinned&&!p.pinned?-1:!n.pinned&&p.pinned?1:0);return d.filter(n=>n.parentId===i).length===0?figma.widget.h(c,{padding:a(30),direction:"vertical",spacing:a(20),width:a(800),height:a(250),horizontalAlignItems:"center",verticalAlignItems:"center"},figma.widget.h(_,{fill:"#60666D",fontSize:a(36),fontWeight:500,lineHeight:a(20.4)},"No messages yet"),figma.widget.h(_,{fill:"#8E939A",fontSize:a(24),lineHeight:a(20.4)},"Send a message with the add message button below.")):d.filter(n=>n.parentId===i).map(n=>figma.widget.h(Je,{key:n.id,message:n,onReply:()=>Ae(n.id),onEdit:()=>Te(n.id),onDelete:()=>be(n.id),onDeleteConfirm:()=>Pe(n.id),onShowReplies:()=>De(n.id),replyChain:Se(n.id),replyToId:Y,user:u,getMessageDepth:ze,onPin:_e,totalReplies:t(n.id),onUpvote:()=>Ve(n.id),onDownvote:()=>$e(n.id),onOptionsClick:()=>o(n.id),updateUserName:()=>W(),getTotalDirectReplies:p=>s(n.id),messageFontSize:P,widgetWidth:T,widgetButtonColor:G}))};Oe(()=>{ee&&(r(!1),console.log("crown123",ee),figma.showUI(__uiFiles__.optionsChat,{width:400,height:205}),console.log("logid",v),figma.ui.postMessage({type:"set-widget-log-id",payload:v}),figma.ui.postMessage({type:"alreadyLoggedIn",payload:C}),figma.ui.postMessage({type:"current-widthValue",payload:T}),figma.ui.postMessage({type:"current-borderWidthValue",payload:Q}),figma.ui.postMessage({type:"current-titleFontSize",payload:J}),figma.ui.postMessage({type:"current-borderColor",payload:S}),figma.ui.postMessage({type:"current-messageFontSize",payload:P}),figma.ui.postMessage({type:"current-promptColor",payload:Z}),figma.ui.postMessage({type:"current-widgetButtonColor",payload:G}),figma.ui.postMessage({type:"current-widgetCornerRadius",payload:U}),figma.ui.onmessage=i=>H(this,null,function*(){if(i.type==="load-chats"){console.log("Loading new chats...",i.messages);let t=i.messages;console.log("messages",t),yield fe({messages:t},!0);let o=parseInt(i.logId,10);l(o)}else i.type==="update-prompt"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-prompt",payload:O}),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;X(o),C=!0,r(!0)}else t.type==="close-plugin"?(console.log("closed"),r(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),C=!0,I())}):i.type==="update-width"?(console.log("calling width from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-width",payload:T}),figma.ui.onmessage=t=>{if(t.type==="update-message"){console.log("WIDGETWIDTGSET");let o=t.payload.message;ae(parseInt(o,10)),C=!0,r(!0)}else t.type==="close-plugin"?(console.log("closed"),r(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),C=!0,I())}):i.type==="update-borderWidth"?(console.log("calling width from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-borderWidth",payload:Q}),console.log("opened"),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;le(parseInt(o,10)),C=!0,r(!0)}else t.type==="close-plugin"?(console.log("closed"),r(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),C=!0,I())}):i.type==="update-titleFontSize"?(console.log("calling width from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-titleFontSize",payload:J}),console.log("opened"),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;Ce(parseInt(o,10)),C=!0,r(!0)}else t.type==="close-plugin"?(console.log("closed"),r(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),C=!0,I())}):i.type==="update-borderColor"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-borderColor",payload:S}),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;e(o),C=!0,r(!0)}else t.type==="close-plugin"?(console.log("closed"),r(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),C=!0,I())}):i.type==="update-messageFontSize"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-messageFontSize",payload:P}),console.log("opened"),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;Me(parseInt(o,10)),C=!0,r(!0)}else t.type==="close-plugin"?(console.log("closed"),r(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),C=!0,I())}):i.type==="update-promptColor"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-promptColor",payload:Z}),console.log("opened"),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;re(o),C=!0,r(!0)}else t.type==="close-plugin"?(console.log("closed"),r(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),C=!0,I())}):i.type==="update-widgetButtonColor"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-widgetButtonColor",payload:G}),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;se(o),C=!0,r(!0)}else t.type==="close-plugin"?(console.log("closed"),r(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),C=!0,I())}):i.type==="update-widgetCornerRadius"&&(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-widgetCornerRadius",payload:U}),figma.ui.onmessage=t=>{if(t.type==="update-message"){let o=t.payload.message;ke(o),C=!0,r(!0)}else t.type==="close-plugin"?(console.log("closed"),r(!1),figma.closePlugin()):t.type==="back-action"&&(console.log("back"),C=!0,I())})}))});let I=()=>(console.log("waiting123"),W(),r(!0),new Promise((i,t)=>{figma.showUI(__uiFiles__.optionsChat,{width:400,height:205}),figma.ui.postMessage({type:"current-widgetId",payload:v}),figma.ui.postMessage({type:"alreadyLoggedIn",payload:C}),figma.ui.postMessage({type:"current-widthValue",payload:T}),figma.ui.postMessage({type:"current-borderWidthValue",payload:Q}),figma.ui.postMessage({type:"current-titleFontSize",payload:J}),figma.ui.postMessage({type:"current-borderColor",payload:S}),figma.ui.postMessage({type:"current-messageFontSize",payload:P}),figma.ui.postMessage({type:"current-promptColor",payload:Z}),figma.ui.postMessage({type:"current-widgetButtonColor",payload:G}),figma.ui.postMessage({type:"current-widgetCornerRadius",payload:U}),figma.ui.onmessage=o=>{o.type==="close-plugin"?(console.log("closed"),r(!1),i()):o.type==="back-action"&&(console.log("back"),C=!0,I().then(i).catch(t))},figma.on("close",()=>{console.log("closed"),r(!1),i()})}));return figma.widget.h(c,{direction:"vertical",spacing:a(8),padding:Q,stroke:S,strokeWidth:a(2),cornerRadius:a(U),onClick:W,minWidth:T,fill:S},figma.widget.h(c,{direction:"vertical",spacing:8,padding:a(10),stroke:S,strokeWidth:a(2),cornerRadius:a(U-2),onClick:W,minWidth:T,fill:"#FFFFFF"},figma.widget.h(c,{cornerRadius:a(4),padding:{top:a(15),bottom:a(2),left:a(770),right:a(10)},onClick:I},figma.widget.h($,{src:ge,onClick:I})),figma.widget.h(c,{padding:{top:0,bottom:a(20),left:a(20)}},figma.widget.h(_,{fill:Z,fontSize:a(J),fontWeight:700,width:a(770),lineHeight:a(65)},O||"Chat")),figma.widget.h(c,{direction:"vertical",spacing:a(1),padding:a(8),stroke:S,cornerRadius:a(10),minWidth:a(480)},Se()),figma.widget.h(c,{direction:"vertical",spacing:a(8),padding:a(8),onClick:W,horizontalAlignItems:"end",minWidth:T},figma.widget.h(c,{direction:"horizontal",onClick:Fe,fill:G,padding:a(10),cornerRadius:a(100)},figma.widget.h(c,{padding:a(8)},figma.widget.h($,{src:te,width:a(30),height:a(30)})),figma.widget.h(_,{fontSize:a(36),fill:"#FFFFFF"},"Add Message  ")))))}function Je({getTotalDirectReplies:v,message:l,onReply:k,onDelete:q,onEdit:Y,replyChain:j,replyToId:m,user:x,onDeleteConfirm:u,getMessageDepth:z,onShowReplies:E,onPin:me,totalReplies:we,onUpvote:K,onDownvote:ye,onOptionsClick:ne,updateUserName:N,messageFontSize:O,widgetWidth:X,widgetButtonColor:S}){function e(ve){let xe=X/800;return Math.floor(ve*xe)}let G=`<svg width="${e(30)}px" height="${e(30)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M3 8L4.44293 16.6576C4.76439 18.5863 6.43315 20 8.38851 20H15.6115C17.5668 20 19.2356 18.5863 19.5571 16.6576L21 8M3 8L6.75598 11.0731C7.68373 11.8321 9.06623 11.6102 9.70978 10.5989L12 7M3 8C3.82843 8 4.5 7.32843 4.5 6.5C4.5 5.67157 3.82843 5 3 5C2.17157 5 1.5 5.67157 1.5 6.5C1.5 7.32843 2.17157 8 3 8ZM21 8L17.244 11.0731C16.3163 11.8321 14.9338 11.6102 14.2902 10.5989L12 7M21 8C21.8284 8 22.5 7.32843 22.5 6.5C22.5 5.67157 21.8284 5 21 5C20.1716 5 19.5 5.67157 19.5 6.5C19.5 7.32843 20.1716 8 21 8ZM12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7Z" stroke="#000000" stroke-width="${3}" stroke-linecap="round" stroke-linejoin="round"></path>
    </g>
    </svg>`,se=`<svg width="${e(32)}px" height="${e(32)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 17V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H4M4 11L8 7M4 11L8 15" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,Z=`<svg width="${e(35)}px" height="${e(35)}px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#1cb566"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.1835 7.80516L16.2188 4.83755C14.1921 2.8089 13.1788 1.79457 12.0904 2.03468C11.0021 2.2748 10.5086 3.62155 9.5217 6.31506L8.85373 8.1381C8.59063 8.85617 8.45908 9.2152 8.22239 9.49292C8.11619 9.61754 7.99536 9.72887 7.86251 9.82451C7.56644 10.0377 7.19811 10.1392 6.46145 10.3423C4.80107 10.8 3.97088 11.0289 3.65804 11.5721C3.5228 11.8069 3.45242 12.0735 3.45413 12.3446C3.45809 12.9715 4.06698 13.581 5.28476 14.8L6.69935 16.2163L2.22345 20.6964C1.92552 20.9946 1.92552 21.4782 2.22345 21.7764C2.52138 22.0746 3.00443 22.0746 3.30236 21.7764L7.77841 17.2961L9.24441 18.7635C10.4699 19.9902 11.0827 20.6036 11.7134 20.6045C11.9792 20.6049 12.2404 20.5358 12.4713 20.4041C13.0192 20.0914 13.2493 19.2551 13.7095 17.5825C13.9119 16.8472 14.013 16.4795 14.2254 16.1835C14.3184 16.054 14.4262 15.9358 14.5468 15.8314C14.8221 15.593 15.1788 15.459 15.8922 15.191L17.7362 14.4981C20.4 13.4973 21.7319 12.9969 21.9667 11.9115C22.2014 10.826 21.1954 9.81905 19.1835 7.80516Z" fill="#1cb566"></path> </g></svg>`,re=`<svg fill="#303030" height="${e(18)}px" width="${e(18)}px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g> </g></svg>`,T=`<svg fill="#303030" height="${e(18)}px" width="${e(18)}px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g> </g></svg>`,ae=`<svg width="${e(18)}px" height="${e(18)}px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g> </g></svg>`,J=`<svg width="${e(18)}px" height="${e(18)}px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g> </g></svg>`,Ce=l.parentId!==null,P=m===l.id,Me=l.upvotedUsers.length,Q=l.downvotedUsers.length,le=l.sender.split(" ")[0],U={fill:P?S:"#FFFFFF",color:"#000000",extra:P?S:"#f0f0f0"},ke=l.sender===x,ee=l.edited,r=l.deleted,a=z(l.id),de=l.upvotedUsers.length-l.downvotedUsers.length,pe=e(160);a==0&&(pe=e(160));let te=!1;a>=1&&(te=!0);let ge=!0;return l.text=="this message has been deleted"&&(ge=!1),figma.widget.h(c,{direction:"vertical"},figma.widget.h(c,{direction:"vertical",padding:{top:e(15),bottom:r?0:e(15),left:e(12),right:e(12)},strokeWidth:e(2),cornerRadius:e(4),spacing:e(20),fill:U.fill,effect:[]},figma.widget.h(c,{direction:"horizontal",width:e(800),padding:{top:e(10),bottom:e(1),left:e(4),right:e(2)}},figma.widget.h(c,{direction:"horizontal",horizontalAlignItems:"start",width:e(490),spacing:e(20)},l.userIcon?figma.widget.h(Ne,{src:l.userIcon,width:e(40),height:e(40),cornerRadius:e(15)}):figma.widget.h($,{src:"<svg>...<svg>",width:e(30),height:e(30)}),figma.widget.h(_,{fontSize:e(30),fill:U.color,horizontalAlignText:"left"},l.deleted||l.anonymous?"Anonymous":le,":"),l.pinned&&figma.widget.h($,{src:Z})),figma.widget.h(c,{direction:"horizontal",horizontalAlignItems:"end",padding:{top:e(2),bottom:e(2),left:e(1),right:e(8)},width:e(260)},figma.widget.h(_,{fontSize:e(25),fill:U.color,horizontalAlignText:"right"},l.timestamp)),l.text!="this message has been deleted"&&figma.widget.h(c,{cornerRadius:4,padding:{top:e(2),bottom:e(2),left:e(8),right:e(8)},onClick:ne},figma.widget.h($,{src:G,onClick:ne}))),figma.widget.h(c,{direction:"horizontal",padding:{top:e(20),bottom:e(4),left:e(10),right:e(4)},fill:U.fill},figma.widget.h(c,{direction:"vertical"},figma.widget.h(_,{width:e(740),fontSize:e(O)},r?"this message has been deleted":l.text),figma.widget.h(_,{width:e(60),fontSize:4,fill:"#808080"}," "),ee&&!r&&figma.widget.h(_,{width:e(200),fontSize:e(25),fill:"#808080"},"(edited)"))),figma.widget.h(c,{direction:"horizontal",padding:{top:e(20),bottom:0,left:e(4),right:e(4)},spacing:12},l.text!="this message has been deleted"&&figma.widget.h(c,{fill:U.extra,cornerRadius:e(200)},figma.widget.h(c,{cornerRadius:e(200),padding:{top:e(14),bottom:e(4),left:e(10),right:e(10)},onClick:()=>K()},figma.widget.h(_,{fontSize:e(25),fill:"#FFFFFF"}," "),figma.widget.h($,{src:re})),figma.widget.h(c,{padding:{top:e(10),bottom:e(6),left:e(10),right:e(10)}},figma.widget.h(_,{fontSize:e(25),fill:"#000000"},de)),figma.widget.h(c,{cornerRadius:e(200),padding:{top:e(14),bottom:e(4),left:e(10),right:e(10)},onClick:()=>ye()},figma.widget.h($,{src:T}),figma.widget.h(_,{fontSize:e(25),fill:"#FFFFFF"}," "))),l.text!="this message has been deleted"&&figma.widget.h(c,{fill:S,cornerRadius:e(200),padding:{top:e(8),bottom:r?0:e(8),left:e(10),right:e(10)},onClick:k},figma.widget.h(_,{fontSize:e(25),fill:S}," "),figma.widget.h($,{src:se,onClick:k}),figma.widget.h(_,{fontSize:e(25),fill:"#FFFFFF"}," Reply  ")),te&&figma.widget.h(c,{cornerRadius:e(4),padding:{top:e(8),bottom:r?e(15):0,left:e(10),right:e(10)},onClick:E},l.showReplies&&figma.widget.h(c,{cornerRadius:e(4),padding:{top:e(6),bottom:e(6),left:0,right:0},onClick:E},figma.widget.h($,{src:ae,onClick:E})),!l.showReplies&&figma.widget.h(c,{cornerRadius:4,padding:{top:e(6),bottom:e(6),left:0,right:0},onClick:E},figma.widget.h($,{src:J,onClick:E})),figma.widget.h(_,{fontSize:e(25),fill:S},"  ",we," Replies ")))),l.showReplies&&j&&figma.widget.h(c,{direction:"vertical",width:"fill-parent",padding:{top:r?0:e(10),bottom:r?0:e(10),left:e(32),right:e(8)}},j))}Ie.register(Ze);})();
