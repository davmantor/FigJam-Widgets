(()=>{var ve=Object.defineProperty,xe=Object.defineProperties;var Fe=Object.getOwnPropertyDescriptors;var pe=Object.getOwnPropertySymbols;var ke=Object.prototype.hasOwnProperty,Me=Object.prototype.propertyIsEnumerable;var ge=(m,i,u)=>i in m?ve(m,i,{enumerable:!0,configurable:!0,writable:!0,value:u}):m[i]=u,v=(m,i)=>{for(var u in i||(i={}))ke.call(i,u)&&ge(m,u,i[u]);if(pe)for(var u of pe(i))Me.call(i,u)&&ge(m,u,i[u]);return m},x=(m,i)=>xe(m,Fe(i));var B=(m,i,u)=>new Promise((O,E)=>{var V=l=>{try{c(u.next(l))}catch(U){E(U)}},p=l=>{try{c(u.throw(l))}catch(U){E(U)}},c=l=>l.done?O(l.value):Promise.resolve(l.value).then(V,p);c((u=u.apply(m,i)).next())});var{widget:ce,showUI:Ge,ui:ze}=figma,{AutoLayout:d,Text:y,useSyncedState:M,Input:Ee,Frame:He,Image:Le,SVG:R,useEffect:je,colorMapToOptions:Be,usePropertyMenu:Oe}=ce,Re='<svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 17V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H4M4 11L8 7M4 11L8 15" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';var be='<svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#1cb566"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.1835 7.80516L16.2188 4.83755C14.1921 2.8089 13.1788 1.79457 12.0904 2.03468C11.0021 2.2748 10.5086 3.62155 9.5217 6.31506L8.85373 8.1381C8.59063 8.85617 8.45908 9.2152 8.22239 9.49292C8.11619 9.61754 7.99536 9.72887 7.86251 9.82451C7.56644 10.0377 7.19811 10.1392 6.46145 10.3423C4.80107 10.8 3.97088 11.0289 3.65804 11.5721C3.5228 11.8069 3.45242 12.0735 3.45413 12.3446C3.45809 12.9715 4.06698 13.581 5.28476 14.8L6.69935 16.2163L2.22345 20.6964C1.92552 20.9946 1.92552 21.4782 2.22345 21.7764C2.52138 22.0746 3.00443 22.0746 3.30236 21.7764L7.77841 17.2961L9.24441 18.7635C10.4699 19.9902 11.0827 20.6036 11.7134 20.6045C11.9792 20.6049 12.2404 20.5358 12.4713 20.4041C13.0192 20.0914 13.2493 19.2551 13.7095 17.5825C13.9119 16.8472 14.013 16.4795 14.2254 16.1835C14.3184 16.054 14.4262 15.9358 14.5468 15.8314C14.8221 15.593 15.1788 15.459 15.8922 15.191L17.7362 14.4981C20.4 13.4973 21.7319 12.9969 21.9667 11.9115C22.2014 10.826 21.1954 9.81905 19.1835 7.80516Z" fill="#1cb566"></path> </g></svg>',_e='<svg fill="#303030" height="18px" width="18px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z"></path> </g> </g> </g></svg>',Se='<svg fill="#303030" height="18px" width="18px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z"></path> </g> </g> </g></svg>';var Ue='<svg fill="#007AFF" height="18px" width="18px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z"></path> </g> </g> </g></svg>',Ae='<svg fill="#007AFF" height="18px" width="18px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z"></path> </g> </g> </g></svg>',ue='<svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 8L4.44293 16.6576C4.76439 18.5863 6.43315 20 8.38851 20H15.6115C17.5668 20 19.2356 18.5863 19.5571 16.6576L21 8M3 8L6.75598 11.0731C7.68373 11.8321 9.06623 11.6102 9.70978 10.5989L12 7M3 8C3.82843 8 4.5 7.32843 4.5 6.5C4.5 5.67157 3.82843 5 3 5C2.17157 5 1.5 5.67157 1.5 6.5C1.5 7.32843 2.17157 8 3 8ZM21 8L17.244 11.0731C16.3163 11.8321 14.9338 11.6102 14.2902 10.5989L12 7M21 8C21.8284 8 22.5 7.32843 22.5 6.5C22.5 5.67157 21.8284 5 21 5C20.1716 5 19.5 5.67157 19.5 6.5C19.5 7.32843 20.1716 8 21 8ZM12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',Te='<svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#ffffff" stroke-width="3.0" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';function Ie(){let[m,i]=M("newMessage",Date.now()),[u,O]=M("newMessage",""),[E,V]=M("replyToId",null),[p,c]=M("messages",[]),[l,U]=M("userName","Unknown User"),[P,oe]=M("inputPlaceholder","Type a message..."),[te,N]=M("inputActive",!1),[ne,ie]=M("isEditing",!1),A=new Set(["Neel Walse","Ashwin Chembu","David M Torres-Mendoza"]),H=[],[j,D]=M("Prompt not set",""),[J,se]=M("pborderColor","#FFFFFF"),[$,T]=M("promptColor","#000000");function q(t){return L(),console.log(A.has(t)),A.has(t)}function K(){return new Promise((t,s)=>B(this,null,function*(){figma.showUI(__uiFiles__.main,{width:400,height:270}),figma.ui.onmessage=o=>B(this,null,function*(){if(o.type==="new-message"){let{message:e,anonymous:r}=o.payload;yield Q({messageText:e,anonymous:r}),t()}else o.type==="close-plugin"&&(figma.closePlugin(),t())})}))}function F(t){let s=t*70*Math.random();return new Promise(o=>setTimeout(o,t))}let W=t=>(console.log("editing"),F(1e4),new Promise((s,o)=>{let e=p.find(r=>r.id===t);e?(console.log("opening modal"),figma.showUI(__uiFiles__.main,{width:400,height:270}),figma.ui.postMessage({type:"edit-message",payload:e.text}),console.log("opened"),figma.ui.onmessage=r=>{if(r.type==="update-message"){console.log("updated---",r.payload);let f=r.payload.message,n=r.payload.anonymous;console.log(f,n);let a=x(v({},e),{text:f,anonymous:n,edited:!0}),C=p.findIndex(w=>w.id===t);if(C!==-1){let w=[...p];w[C]=a,c(w)}figma.closePlugin(),s()}else r.type==="cancel-edit"?(console.log("canceled"),o("Edit canceled by user.")):r.type==="close-plugin"&&(console.log("closed"),figma.closePlugin(),s())}):(console.log("Message not found."),o("Message not found."))})),L=()=>{let t=figma.currentUser?figma.currentUser.name:"Unknown User";U(t),console.log(l)},G=(t=6)=>{let s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o="";for(let e=0;e<t;e++)o+=s.charAt(Math.floor(Math.random()*s.length));return o},Z=()=>{if(H.length>0){F(1e4);let t=H.shift();t&&c(s=>[...s,t])}},Q=t=>B(this,null,function*(){let{messageText:s,anonymous:o}=t;console.log("anonymous:",o),console.log("messageText:",s),console.log("messageData:",t);let e=10;if(L(),s.trim()!==""){let r=Date.now(),f=G(),n=`${r}${f}${l}`;console.log(n);let a=new Date(r),C=a.getHours(),w=a.getMinutes(),h=w<10?"0"+w:w.toString(),g=C>=12?"PM":"AM",S=`${C%12||12}:${h} ${g}`,b=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:l,k=figma.currentUser?figma.currentUser.photoUrl:null,_={id:n,parentId:null,text:s.trim(),sender:b,timestamp:S,edited:!1,deleteConfirm:!1,showReplies:!1,pinned:!1,deleted:!1,upvotedUsers:[],downvotedUsers:[],directreply:0,logId:m,userIcon:k,anonymous:o};try{console.log("newMessage before sending:",_);let I=yield fetch("https://figjam-widgets.onrender.com/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(_)});if(!I.ok)throw new Error(`HTTP error! status: ${I.status}`);let ee=yield I.json();console.log("Message added successfully:",ee)}catch(I){console.error("Error adding message:",I)}H.push(_),F(1e4),Z()}}),X=t=>{c(s=>s.map(o=>{if(o.id===t){let e=[...o.upvotedUsers],r=[...o.downvotedUsers],f=e.indexOf(l),n=r.indexOf(l);return f>-1?e.splice(f,1):(e.push(l),n>-1&&r.splice(n,1)),x(v({},o),{upvotedUsers:e,downvotedUsers:r})}return o}))},fe=t=>{c(s=>s.map(o=>{if(o.id===t){let e=[...o.upvotedUsers],r=[...o.downvotedUsers],f=e.indexOf(l),n=r.indexOf(l);return n>-1?r.splice(n,1):(r.push(l),f>-1&&e.splice(f,1)),x(v({},o),{upvotedUsers:e,downvotedUsers:r})}return o}))},he=t=>B(this,null,function*(){let s=Date.now(),o=G(),e=`${s}${o}${l}`,r=new Date(s),f=r.getHours(),n=r.getMinutes(),a=n<10?"0"+n:n.toString(),C=f>=12?"PM":"AM",h=`${f%12||12}:${a} ${C}`,g=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:l,z=figma.currentUser?figma.currentUser.photoUrl:null,S=p.find(b=>b.id===t);return S?(figma.showUI(__uiFiles__.main,{width:400,height:270}),figma.ui.postMessage({type:"reply-message",payload:S}),new Promise((b,k)=>{figma.ui.onmessage=_=>{if(_.type==="send-reply"){console.log(_.payload);let I=_.payload.message,ee=_.payload.anonymous,ye={id:e,parentId:t,text:I,sender:l,timestamp:h,edited:!1,deleteConfirm:!1,showReplies:!1,pinned:!1,deleted:!1,upvotedUsers:[],downvotedUsers:[],directreply:0,logId:m,userIcon:z,anonymous:ee};console.log("newreply");let Pe=p.map(Y=>Y.id===t?x(v({},Y),{directreply:Y.directreply+1}):Y);H.push(ye),F(1e4),Z(),b()}else _.type==="close-plugin"&&k("Reply action was cancelled.")}})):(console.error("Message to reply to was not found."),Promise.reject("Message to reply to was not found."))}),re=t=>{let s=p.find(o=>o.id===t);if(s){s.deleted=!0;let o=p.map(e=>e.id===t?x(v({},e),{text:"this message has been deleted",sender:"Anonymous",edited:!1,showReplies:!1}):e);c(o),V(null),O(""),oe("Type a message..."),N(!0),setTimeout(()=>N(!1),2e3)}},we=t=>{let s=p.find(o=>o.id===t);s&&s.deleteConfirm===!1?c(o=>o.map(e=>e.id===t?x(v({},e),{deleteConfirm:!0}):e)):c(o=>o.map(e=>e.id===t?x(v({},e),{deleteConfirm:!1}):e))},me=t=>{let s=p.find(o=>o.id===t);s&&s.showReplies===!1?c(o=>o.map(e=>e.id===t?x(v({},e),{showReplies:!0}):e)):c(o=>o.map(e=>e.id===t?x(v({},e),{showReplies:!1}):e))},Ce=t=>{if(!p.find(r=>r.id===t))return 0;let o=0,e=(r,f)=>{p.forEach(n=>{n.parentId===r&&e(n.id,f+1)}),f>o&&(o=f)};return e(t,0),o},le=t=>{A.has(l)&&c(s=>s.map(o=>{if(o.id===t){let e=o.pinned!==void 0?o.pinned:!1;return x(v({},o),{pinned:!e})}return o}))},de=(t=null)=>{let s=n=>p.filter(a=>a.parentId===n).length,o=n=>{if(L(),console.log("in options:",l),q(l))return new Promise((a,C)=>{figma.showUI(__uiFiles__.options,{width:350,height:50}),figma.ui.onmessage=w=>{if(w.type==="edit-message"){console.log("calling edit from options");let h=p.find(g=>g.id===n);h&&!h.deleted?(console.log(h.deleted),console.log("opening modal"),figma.showUI(__uiFiles__.main,{width:400,height:270}),figma.ui.postMessage({type:"edit-message",payload:h.text}),console.log("opened"),figma.ui.onmessage=g=>{if(g.type==="update-message"){console.log("updated");let z=g.payload.message,S=g.payload.anonymous;console.log(g.payload);let b=p.map(k=>k.id===n?x(v({},k),{text:z,anonymous:S,edited:!0}):k);c(b),figma.closePlugin(),a()}else g.type==="cancel-edit"?(console.log("canceled"),C("Edit canceled by user.")):g.type==="close-plugin"&&(console.log("closed"),figma.closePlugin(),a())}):(console.log("Message not found."),C("Message not found."))}else if(w.type==="edit-user"){console.log("calling edit from options");let h=p.find(g=>g.id===n);h&&!h.deleted?(console.log(h.deleted),console.log("opening modal"),figma.showUI(__uiFiles__.main,{width:400,height:270}),figma.ui.postMessage({type:"edit-message",payload:h.sender}),console.log("opened"),figma.ui.onmessage=g=>{if(g.type==="update-message"){console.log("updated");let z=g.payload.message,S=g.payload.anonymous;console.log(g.payload);let b=p.map(k=>k.id===n?x(v({},k),{sender:z,anonymous:S,edited:!0}):k);c(b),figma.closePlugin(),a()}else g.type==="cancel-edit"?(console.log("canceled"),C("Edit canceled by user.")):g.type==="close-plugin"&&(console.log("closed"),figma.closePlugin(),a())}):(console.log("Message not found."),C("Message not found."))}else w.type==="update-prompt"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:250}),figma.ui.postMessage({type:"edit-prompt",payload:j}),console.log("opened"),figma.ui.onmessage=h=>{if(h.type==="update-message"){let g=h.payload.message;D(g),figma.closePlugin(),a()}else h.type==="cancel-edit"?(console.log("canceled"),C("Edit canceled by user.")):h.type==="close-plugin"&&(console.log("closed"),figma.closePlugin(),a())}):w.type==="delete-message"?(re(n),a()):w.type==="pin-message"?(le(n),a()):w.type==="close-options"&&a()}})},e=n=>{let a=p.filter(C=>C.parentId===n);return 0},r=[...p].sort((n,a)=>n.pinned&&!a.pinned?-1:!n.pinned&&a.pinned?1:0);return r.filter(n=>n.parentId===t).length===0?figma.widget.h(d,{padding:30,direction:"vertical",spacing:20,width:800,height:250,horizontalAlignItems:"center",verticalAlignItems:"center"},figma.widget.h(y,{fill:"#60666D",fontSize:36,fontWeight:500,lineHeight:20.4},"No messages yet"),figma.widget.h(y,{fill:"#8E939A",fontSize:24,lineHeight:20.4},"Send a message with the add message button below.")):r.filter(n=>n.parentId===t).map(n=>figma.widget.h(Ve,{key:n.id,message:n,onReply:()=>he(n.id),onEdit:()=>W(n.id),onDelete:()=>re(n.id),onDeleteConfirm:()=>we(n.id),onShowReplies:()=>me(n.id),replyChain:de(n.id),replyToId:E,user:l,getMessageDepth:Ce,onPin:le,totalReplies:s(n.id),allowedUsersToPin:A,onUpvote:()=>X(n.id),onDownvote:()=>fe(n.id),onOptionsClick:()=>o(n.id),updateUserName:()=>L(),getTotalDirectReplies:a=>e(n.id)}))},ae=()=>{if(L(),console.log("in options:",l),q(l))return new Promise((t,s)=>{figma.showUI(__uiFiles__.optionsChat,{width:400,height:50}),figma.ui.onmessage=o=>{o.type==="update-prompt"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:250}),figma.ui.postMessage({type:"edit-prompt",payload:j}),console.log("opened"),figma.ui.onmessage=e=>{if(e.type==="update-message"){let r=e.payload.message;D(r),figma.closePlugin(),t()}else e.type==="cancel-edit"?(console.log("canceled"),s("Edit canceled by user.")):e.type==="close-plugin"&&(console.log("closed"),figma.closePlugin(),t())}):o.type==="update-borderColor"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:250}),figma.ui.postMessage({type:"edit-borderColor",payload:J}),console.log("opened"),figma.ui.onmessage=e=>{if(e.type==="update-message"){let r=e.payload.message;se(r),figma.closePlugin(),t()}else e.type==="cancel-edit"?(console.log("canceled"),s("Edit canceled by user.")):e.type==="close-plugin"&&(console.log("closed"),figma.closePlugin(),t())}):o.type==="update-promptColor"?(console.log("calling prompt from options"),figma.showUI(__uiFiles__.main,{width:400,height:250}),figma.ui.postMessage({type:"edit-promptColor",payload:$}),console.log("opened"),figma.ui.onmessage=e=>{if(e.type==="update-message"){let r=e.payload.message;T(r),figma.closePlugin(),t()}else e.type==="cancel-edit"?(console.log("canceled"),s("Edit canceled by user.")):e.type==="close-plugin"&&(console.log("closed"),figma.closePlugin(),t())}):o.type==="close-options"&&t()}})};return figma.widget.h(d,{direction:"vertical",spacing:8,padding:25,stroke:"#efefef",strokeWidth:2,cornerRadius:10,onClick:L,minWidth:800,fill:J},figma.widget.h(d,{direction:"vertical",spacing:8,padding:20,stroke:"#efefef",strokeWidth:2,cornerRadius:10,onClick:L,minWidth:800,fill:"#FFFFFF"},figma.widget.h(d,{cornerRadius:4,padding:{top:15,bottom:2,left:770,right:10},onClick:ae},figma.widget.h(R,{src:ue,onClick:ae})),figma.widget.h(d,{padding:{top:0,bottom:20,left:20}},figma.widget.h(y,{fill:$,fontSize:60,fontWeight:700,width:770,lineHeight:75},j||"Chat")),figma.widget.h(d,{direction:"vertical",spacing:1,padding:8,stroke:"#efefef",cornerRadius:10,minWidth:480},de()),figma.widget.h(d,{direction:"vertical",spacing:8,padding:8,onClick:L,horizontalAlignItems:"end",minWidth:800},figma.widget.h(d,{direction:"horizontal",onClick:K,fill:"#007AFF",padding:10,cornerRadius:100},figma.widget.h(d,{padding:8},figma.widget.h(R,{src:Te})),figma.widget.h(y,{fontSize:36,fill:"#FFFFFF"},"Add Message  ")))))}function Ve({getTotalDirectReplies:m,message:i,onReply:u,onDelete:O,onEdit:E,replyChain:V,replyToId:p,user:c,onDeleteConfirm:l,getMessageDepth:U,onShowReplies:P,onPin:oe,totalReplies:te,allowedUsersToPin:N,onUpvote:ne,onDownvote:ie,onOptionsClick:A,updateUserName:H}){let j=i.parentId!==null,D=p===i.id,J=i.upvotedUsers.length,se=i.downvotedUsers.length,$=i.sender.split(" ")[0],T={fill:D?"#007AFF":"#FFFFFF",color:"#000000",extra:D?"#007AFF":"#f0f0f0"},q=i.sender===c,K=i.edited,F=i.deleted,W=U(i.id),L=i.upvotedUsers.length-i.downvotedUsers.length;var G=!1;console.log("USER:",c),N.has(c)&&(console.log("inside",G),G=!0);var Z=160;W==0&&(Z=160);var Q=!1;W>=1&&(Q=!0);var X=!0;return i.text=="this message has been deleted"&&(X=!1),figma.widget.h(d,{direction:"vertical"},figma.widget.h(d,{direction:"vertical",padding:{top:15,bottom:F?0:15,left:12,right:12},strokeWidth:2,cornerRadius:4,spacing:20,fill:T.fill,width:800,effect:[]},figma.widget.h(d,{direction:"horizontal",width:800,padding:{top:10,bottom:1,left:4,right:8}},figma.widget.h(d,{direction:"horizontal",horizontalAlignItems:"start",width:520,spacing:20},i.userIcon?figma.widget.h(Le,{src:i.userIcon,width:40,height:40,cornerRadius:15}):figma.widget.h(R,{src:"<svg>...<svg>",width:30,height:30}),figma.widget.h(y,{fontSize:30,fill:T.color,horizontalAlignText:"left"},i.deleted||i.anonymous?"Anonymous":$,":"),i.pinned&&figma.widget.h(R,{src:be})),figma.widget.h(d,{direction:"horizontal",horizontalAlignItems:"end",padding:{top:2,bottom:2,left:8,right:8},width:200},figma.widget.h(y,{fontSize:25,fill:T.color,horizontalAlignText:"right"},i.timestamp)),i.text!="this message has been deleted"&&G&&figma.widget.h(d,{cornerRadius:4,padding:{top:2,bottom:2,left:8,right:8},onClick:A},figma.widget.h(R,{src:ue,onClick:A}))),figma.widget.h(d,{direction:"horizontal",padding:{top:20,bottom:4,left:10,right:4},fill:T.fill},figma.widget.h(d,{direction:"vertical"},figma.widget.h(y,{width:740,fontSize:35},F?"this message has been deleted":i.text),figma.widget.h(y,{width:60,fontSize:4,fill:"#808080"}," "),K&&!F&&figma.widget.h(y,{width:200,fontSize:25,fill:"#808080"},"(edited)"))),figma.widget.h(d,{direction:"horizontal",padding:{top:20,bottom:0,left:4,right:4},spacing:12},i.text!="this message has been deleted"&&figma.widget.h(d,{fill:T.extra,cornerRadius:200},figma.widget.h(d,{cornerRadius:200,padding:{top:14,bottom:4,left:10,right:10},onClick:()=>ne()},figma.widget.h(y,{fontSize:25,fill:"#FFFFFF"}," "),figma.widget.h(R,{src:_e})),figma.widget.h(d,{padding:{top:10,bottom:6,left:10,right:10}},figma.widget.h(y,{fontSize:25,fill:"#000000"},L)),figma.widget.h(d,{cornerRadius:200,padding:{top:14,bottom:4,left:10,right:10},onClick:()=>ie()},figma.widget.h(R,{src:Se}),figma.widget.h(y,{fontSize:25,fill:"#FFFFFF"}," "))),i.text!="this message has been deleted"&&figma.widget.h(d,{fill:"#007AFF",cornerRadius:200,padding:{top:8,bottom:F?0:8,left:10,right:10},onClick:u},figma.widget.h(y,{fontSize:25,fill:"#007AFF"}," "),figma.widget.h(R,{src:Re,onClick:u}),figma.widget.h(y,{fontSize:25,fill:"#FFFFFF"}," Reply  ")),Q&&figma.widget.h(d,{cornerRadius:4,padding:{top:8,bottom:F?15:0,left:10,right:10},onClick:P},i.showReplies&&figma.widget.h(d,{cornerRadius:4,padding:{top:6,bottom:6,left:0,right:0},onClick:P},figma.widget.h(R,{src:Ue,onClick:P})),!i.showReplies&&figma.widget.h(d,{cornerRadius:4,padding:{top:6,bottom:6,left:0,right:0},onClick:P},figma.widget.h(R,{src:Ae,onClick:P})),figma.widget.h(y,{fontSize:25,fill:(i.showReplies,"#007AFF")},"  ",te," Replies ")))),i.showReplies&&V&&figma.widget.h(d,{direction:"vertical",width:"fill-parent",padding:{top:F?0:10,bottom:F?0:10,left:32,right:8}},V))}ce.register(Ie);})();
