(()=>{var ae=Object.defineProperty,pe=Object.defineProperties;var ce=Object.getOwnPropertyDescriptors;var ie=Object.getOwnPropertySymbols;var ge=Object.prototype.hasOwnProperty,ue=Object.prototype.propertyIsEnumerable;var ne=(u,o,p)=>o in u?ae(u,o,{enumerable:!0,configurable:!0,writable:!0,value:p}):u[o]=p,C=(u,o)=>{for(var p in o||(o={}))ge.call(o,p)&&ne(u,p,o[p]);if(ie)for(var p of ie(o))ue.call(o,p)&&ne(u,p,o[p]);return u},F=(u,o)=>pe(u,ce(o));var B=(u,o,p)=>new Promise((I,M)=>{var c=h=>{try{a(p.next(h))}catch(V){M(V)}},f=h=>{try{a(p.throw(h))}catch(V){M(V)}},a=h=>h.done?I(h.value):Promise.resolve(h.value).then(c,f);a((p=p.apply(u,o)).next())});var{widget:re,showUI:Ae,ui:Ue}=figma,{AutoLayout:l,Text:g,useSyncedState:T,Input:_e,Frame:Te,Image:Ie,SVG:x,useEffect:fe}=re,he='<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 17V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H4M4 11L8 7M4 11L8 15" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',we='<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',Ce='<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',Fe='<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff5252"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 14L11 16L15 12M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#ff5252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';var me='<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffe042"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1218 1.87023C15.7573 0.505682 13.4779 0.76575 12.4558 2.40261L9.61062 6.95916C9.61033 6.95965 9.60913 6.96167 9.6038 6.96549C9.59728 6.97016 9.58336 6.97822 9.56001 6.9848C9.50899 6.99916 9.44234 6.99805 9.38281 6.97599C8.41173 6.61599 6.74483 6.22052 5.01389 6.87251C4.08132 7.22378 3.61596 8.03222 3.56525 8.85243C3.51687 9.63502 3.83293 10.4395 4.41425 11.0208L7.94975 14.5563L1.26973 21.2363C0.879206 21.6269 0.879206 22.26 1.26973 22.6506C1.66025 23.0411 2.29342 23.0411 2.68394 22.6506L9.36397 15.9705L12.8995 19.5061C13.4808 20.0874 14.2853 20.4035 15.0679 20.3551C15.8881 20.3044 16.6966 19.839 17.0478 18.9065C17.6998 17.1755 17.3043 15.5086 16.9444 14.5375C16.9223 14.478 16.9212 14.4114 16.9355 14.3603C16.9421 14.337 16.9502 14.3231 16.9549 14.3165C16.9587 14.3112 16.9606 14.31 16.9611 14.3098L21.5177 11.4645C23.1546 10.4424 23.4147 8.16307 22.0501 6.79853L17.1218 1.87023ZM14.1523 3.46191C14.493 2.91629 15.2528 2.8296 15.7076 3.28445L20.6359 8.21274C21.0907 8.66759 21.0041 9.42737 20.4584 9.76806L15.9019 12.6133C14.9572 13.2032 14.7469 14.3637 15.0691 15.2327C15.3549 16.0037 15.5829 17.1217 15.1762 18.2015C15.1484 18.2752 15.1175 18.3018 15.0985 18.3149C15.0743 18.3316 15.0266 18.3538 14.9445 18.3589C14.767 18.3699 14.5135 18.2916 14.3137 18.0919L5.82846 9.6066C5.62872 9.40686 5.55046 9.15333 5.56144 8.97583C5.56651 8.8937 5.58877 8.84605 5.60548 8.82181C5.61855 8.80285 5.64516 8.7719 5.71886 8.74414C6.79869 8.33741 7.91661 8.56545 8.68762 8.85128C9.55668 9.17345 10.7171 8.96318 11.3071 8.01845L14.1523 3.46191Z" fill="#ffe042"></path> </g></svg>',ve='<svg fill="#303030" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z"></path> </g> </g> </g></svg>',ye='<svg fill="#303030" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z"></path> </g> </g> </g></svg>',xe='<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8787 3.70705C17.0503 2.53547 18.9498 2.53548 20.1213 3.70705L20.2929 3.87862C21.4645 5.05019 21.4645 6.94969 20.2929 8.12126L18.5556 9.85857L8.70713 19.7071C8.57897 19.8352 8.41839 19.9261 8.24256 19.9701L4.24256 20.9701C3.90178 21.0553 3.54129 20.9554 3.29291 20.7071C3.04453 20.4587 2.94468 20.0982 3.02988 19.7574L4.02988 15.7574C4.07384 15.5816 4.16476 15.421 4.29291 15.2928L14.1989 5.38685L15.8787 3.70705ZM18.7071 5.12126C18.3166 4.73074 17.6834 4.73074 17.2929 5.12126L16.3068 6.10738L17.8622 7.72357L18.8787 6.70705C19.2692 6.31653 19.2692 5.68336 18.8787 5.29283L18.7071 5.12126ZM16.4477 9.13804L14.8923 7.52185L5.90299 16.5112L5.37439 18.6256L7.48877 18.097L16.4477 9.13804Z" fill="#000000"></path> </g></svg>',ke='<svg fill="#007AFF" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z"></path> </g> </g> </g></svg>',be='<svg fill="#007AFF" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z"></path> </g> </g> </g></svg>';function Le(){let u=Date.now(),[o,p]=T("newMessage",""),[I,M]=T("replyToId",null),[c,f]=T("messages",[]),[a,h]=T("userName","Unknown User"),[V,S]=T("inputPlaceholder","Type a message..."),[se,H]=T("inputActive",!1),[J,K]=T("isEditing",!1),D=new Set(["Neel Walse","Ashwin Chembu","David M Torres-Mendoza"]),A=[];fe(()=>{if(console.log("update call"),u!==0)return figma.showUI(__uiFiles__.check,{visible:!1}),figma.ui.postMessage({type:"set-log-id",logId:u}),figma.ui.onmessage=t=>{t.type==="update-messages"&&(console.log("hello",c),console.log("data",t.data),Array.isArray([t.data])?f([t.data]):console.warn("Received data is not an array:",t.data),console.log("done",c))},()=>{console.log("CLOSE"),figma.ui.close()}});function q(t){return G(),console.log(D.has(t)),D.has(t)}function X(){return new Promise((t,r)=>B(this,null,function*(){figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.onmessage=e=>B(this,null,function*(){if(e.type==="new-message"){let i=e.payload;yield Z(i),t()}else e.type==="close-plugin"&&(figma.closePlugin(),t())})}))}function k(t){let r=t*70*Math.random();return new Promise(e=>setTimeout(e,t))}let ee=t=>(console.log("editing"),k(1e4),new Promise((r,e)=>{let i=c.find(d=>d.id===t);i?(console.log("opening modal"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-message",payload:i.text}),console.log("opened"),figma.ui.onmessage=d=>{if(d.type==="update-message"){console.log("updated");let n=d.payload,s=F(C({},i),{text:n,edited:!0});A.push(s),k(1e4),b(),figma.closePlugin(),r()}else d.type==="cancel-edit"?(console.log("canceled"),e("Edit canceled by user.")):d.type==="close-plugin"&&(console.log("closed"),figma.closePlugin(),r())}):(console.log("Message not found."),e("Message not found."))})),G=()=>{let t=figma.currentUser?figma.currentUser.name:"Unknown User";h(t),console.log(a)},w=(t=6)=>{let r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e="";for(let i=0;i<t;i++)e+=r.charAt(Math.floor(Math.random()*r.length));return e},b=()=>{if(A.length>0){k(1e4);let t=A.shift();t&&f(r=>[...r,t])}},Z=t=>B(this,null,function*(){console.log("logID:",u);let r=10;if(G(),t.trim()!==""){let e=Date.now(),i=w(),d=`${e}${i}${a}`;console.log(d);let n=new Date(e),s=n.getHours(),y=n.getMinutes(),R=y<10?"0"+y:y.toString(),U=s>=12?"PM":"AM",$=`${s%12||12}:${R} ${U}`,P=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:a,m={id:d,parentId:null,text:t.trim(),sender:P,timestamp:$,edited:!1,deleteConfirm:!1,showReplies:!1,pinned:!1,deleted:!1,upvotedUsers:[],downvotedUsers:[],directreply:0,logId:u};try{console.log("newMessage before sending:",m);let _=yield fetch("http://localhost:4000/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(m)});if(!_.ok)throw new Error(`HTTP error! status: ${_.status}`);let j=yield _.json();console.log("Message added successfully:",j)}catch(_){console.error("Error adding message:",_)}A.push(m),k(1e4),b()}}),v=t=>{f(r=>r.map(e=>{if(e.id===t){let i=[...e.upvotedUsers],d=[...e.downvotedUsers],n=i.indexOf(a),s=d.indexOf(a);return n>-1?i.splice(n,1):(i.push(a),s>-1&&d.splice(s,1)),F(C({},e),{upvotedUsers:i,downvotedUsers:d})}return e}))},O=t=>{f(r=>r.map(e=>{if(e.id===t){let i=[...e.upvotedUsers],d=[...e.downvotedUsers],n=i.indexOf(a),s=d.indexOf(a);return s>-1?d.splice(s,1):(d.push(a),n>-1&&i.splice(n,1)),F(C({},e),{upvotedUsers:i,downvotedUsers:d})}return e}))},W=t=>B(this,null,function*(){let r=Date.now(),e=w(),i=`${r}${e}${a}`,d=new Date(r),n=d.getHours(),s=d.getMinutes(),y=s<10?"0"+s:s.toString(),R=n>=12?"PM":"AM",L=`${n%12||12}:${y} ${R}`,$=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:a,P=c.find(m=>m.id===t);return P?(figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"reply-message",payload:P}),new Promise((m,_)=>{figma.ui.onmessage=j=>{if(j.type==="send-reply"){let le=j.payload,de={id:i,parentId:t,text:le,sender:a,timestamp:L,edited:!1,deleteConfirm:!1,showReplies:!1,pinned:!1,deleted:!1,upvotedUsers:[],downvotedUsers:[],directreply:0,logId:u};console.log("newreply");let Me=c.map(N=>N.id===t?F(C({},N),{directreply:N.directreply+1}):N);A.push(de),k(1e4),b(),m()}else j.type==="close-plugin"&&_("Reply action was cancelled.")}})):(console.error("Message to reply to was not found."),Promise.reject("Message to reply to was not found."))}),z=t=>{let r=c.find(e=>e.id===t);if(r){r.deleted=!0;let e=c.map(i=>i.id===t?F(C({},i),{text:"this message has been deleted",sender:"Anonymous",edited:!1,showReplies:!1}):i);f(e),M(null),p(""),S("Type a message..."),H(!0),setTimeout(()=>H(!1),2e3)}},Q=t=>{let r=c.find(e=>e.id===t);r&&r.deleteConfirm===!1?f(e=>e.map(i=>i.id===t?F(C({},i),{deleteConfirm:!0}):i)):f(e=>e.map(i=>i.id===t?F(C({},i),{deleteConfirm:!1}):i))},E=t=>{let r=c.find(e=>e.id===t);r&&r.showReplies===!1?f(e=>e.map(i=>i.id===t?F(C({},i),{showReplies:!0}):i)):f(e=>e.map(i=>i.id===t?F(C({},i),{showReplies:!1}):i))},Y=t=>{if(!c.find(d=>d.id===t))return 0;let e=0,i=(d,n)=>{c.forEach(s=>{s.parentId===d&&i(s.id,n+1)}),n>e&&(e=n)};return i(t,0),e},te=t=>{D.has(a)&&f(r=>r.map(e=>{if(e.id===t){let i=e.pinned!==void 0?e.pinned:!1;return F(C({},e),{pinned:!i})}return e}))},oe=(t=null)=>{let r=n=>c.filter(s=>s.parentId===n).length,e=n=>{if(G(),console.log("in options:",a),q(a))return new Promise((s,y)=>{figma.showUI(__uiFiles__.options,{width:300,height:200}),figma.ui.onmessage=R=>{if(R.type==="edit-message"){console.log("calling edit from options");let U=c.find(L=>L.id===n);U&&!U.deleted?(console.log(U.deleted),console.log("opening modal"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-message",payload:U.text}),console.log("opened"),figma.ui.onmessage=L=>{if(L.type==="update-message"){console.log("updated");let $=L.payload,P=c.map(m=>m.id===n?F(C({},m),{text:$,edited:!0}):m);f(P),figma.closePlugin(),s()}else L.type==="cancel-edit"?(console.log("canceled"),y("Edit canceled by user.")):L.type==="close-plugin"&&(console.log("closed"),figma.closePlugin(),s())}):(console.log("Message not found."),y("Message not found."))}else R.type==="delete-message"?(z(n),s()):R.type==="pin-message"?(te(n),s()):R.type==="close-options"&&s()}})},i=n=>{let s=c.filter(y=>y.parentId===n);return 0};return[...c].sort((n,s)=>n.pinned&&!s.pinned?-1:!n.pinned&&s.pinned?1:0).filter(n=>n.parentId===t).map(n=>figma.widget.h(Re,{key:n.id,message:n,onReply:()=>W(n.id),onEdit:()=>ee(n.id),onDelete:()=>z(n.id),onDeleteConfirm:()=>Q(n.id),onShowReplies:()=>E(n.id),replyChain:oe(n.id),replyToId:I,user:a,getMessageDepth:Y,onPin:te,totalReplies:r(n.id),allowedUsersToPin:D,onUpvote:()=>v(n.id),onDownvote:()=>O(n.id),onOptionsClick:()=>e(n.id),updateUserName:()=>G(),getTotalDirectReplies:s=>i(n.id)}))};return figma.widget.h(l,{direction:"vertical",spacing:8,padding:8,stroke:"#DADCE0",strokeWidth:1,cornerRadius:10,onClick:G},figma.widget.h(l,{direction:"vertical",spacing:8,padding:8},figma.widget.h(l,{direction:"horizontal",onClick:X,fill:"#007AFF",padding:8,cornerRadius:4},figma.widget.h(g,{fill:"#FFFFFF"},"Add Message"))),figma.widget.h(l,{direction:"vertical",spacing:1,padding:4},oe()))}function Re({getTotalDirectReplies:u,message:o,onReply:p,onDelete:I,onEdit:M,replyChain:c,replyToId:f,user:a,onDeleteConfirm:h,getMessageDepth:V,onShowReplies:S,onPin:se,totalReplies:H,allowedUsersToPin:J,onUpvote:K,onDownvote:D,onOptionsClick:A,updateUserName:q}){let X=o.parentId!==null,k=f===o.id,ee=o.upvotedUsers.length,G=o.downvotedUsers.length,w={fill:k?"#007AFF":"#FFFFFF",color:"#000000",extra:k?"#007AFF":"#FAFAFA"},b=o.sender===a,Z=o.edited,v=o.deleted,O=V(o.id),W=o.upvotedUsers.length-o.downvotedUsers.length;var z=!1;console.log("USER:",a),J.has(a)&&(console.log("inside",z),z=!0);var Q=160;O==0&&(Q=160);var E=!1;O>=1&&(E=!0);var Y=!0;return o.text=="this message has been deleted"&&(Y=!1),figma.widget.h(l,{direction:"vertical"},figma.widget.h(l,{direction:"vertical",padding:{top:10,bottom:v?0:10,left:8,right:8},stroke:"#D3D3D3",strokeWidth:1,cornerRadius:4,fill:w.fill,width:470},figma.widget.h(l,{direction:"horizontal",width:430,padding:{top:4,bottom:1,left:4,right:8}},figma.widget.h(l,{direction:"horizontal",horizontalAlignItems:"start",width:200},figma.widget.h(g,{fontSize:14,fill:w.color,horizontalAlignText:"left"},v?"Anonymous":o.sender,":"),o.pinned&&figma.widget.h(x,{src:me,onClick:p})),figma.widget.h(l,{direction:"horizontal",horizontalAlignItems:"end",width:220},figma.widget.h(g,{fontSize:12,fill:w.color,horizontalAlignText:"right"},o.timestamp))),figma.widget.h(l,{direction:"horizontal",padding:{top:15,bottom:4,left:4,right:4},fill:w.fill},figma.widget.h(l,{direction:"vertical"},figma.widget.h(g,{width:380},v?"this message has been deleted":o.text),figma.widget.h(g,{width:60,fontSize:4,fill:"#808080"}," "),Z&&!v&&figma.widget.h(g,{width:60,fontSize:12,fill:"#808080"},"(edited)"))),figma.widget.h(l,{direction:"horizontal",padding:{top:15,bottom:0,left:4,right:4},spacing:8},o.text!="this message has been deleted"&&figma.widget.h(l,{fill:w.extra,cornerRadius:4},figma.widget.h(l,{cornerRadius:4,padding:{top:10,bottom:4,left:8,right:8}},figma.widget.h(x,{src:ve,onClick:()=>K()}),figma.widget.h(g,{fontSize:14,fill:"#FFFFFF"})),figma.widget.h(l,{padding:{top:6,bottom:6,left:8,right:8}},figma.widget.h(g,{fontSize:14,fill:"#000000"},W)),figma.widget.h(l,{cornerRadius:4,padding:{top:10,bottom:4,left:8,right:8}},figma.widget.h(x,{src:ye,onClick:()=>D()}),figma.widget.h(g,{fontSize:14,fill:"#FFFFFF"}))),o.text!="this message has been deleted"&&figma.widget.h(l,{fill:"#007AFF",cornerRadius:4,padding:{top:6,bottom:v?0:6,left:8,right:8},onClick:p},figma.widget.h(x,{src:he,onClick:p}),figma.widget.h(g,{fontSize:14,fill:"#FFFFFF"}," Reply  ")),E&&figma.widget.h(l,{cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:S},o.showReplies&&figma.widget.h(l,{cornerRadius:4,padding:{top:4,bottom:4,left:0,right:0},onClick:S},figma.widget.h(x,{src:ke,onClick:S})),!o.showReplies&&figma.widget.h(l,{cornerRadius:4,padding:{top:4,bottom:4,left:0,right:0},onClick:S},figma.widget.h(x,{src:be,onClick:S})),figma.widget.h(g,{fontSize:14,fill:(o.showReplies,"#007AFF")},"  ",H," Replies ")),z&&figma.widget.h(l,{fill:"#007AFF",cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:A},figma.widget.h(g,{fontSize:14,fill:"#FFFFFF"},"O")),!E&&figma.widget.h(l,{fill:w.fill,stroke:o.showReplies?"#FFFFFF":"",cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8}},figma.widget.h(g,{fontSize:14,fill:w.fill},o.showReplies?`\u25B2 ${o.directreply} Replies`:`\u25BD ${o.directreply} Replies`)),b&&o.text!="this message has been deleted"&&o.deleteConfirm&&figma.widget.h(l,{fill:w.fill,cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:I},figma.widget.h(x,{src:Fe,onClick:I}),figma.widget.h(g,{fontSize:14,fill:"#FF3B30"})),b&&o.text!="this message has been deleted"&&!o.deleteConfirm&&figma.widget.h(l,{fill:w.fill,cornerRadius:4,padding:{top:6,bottom:6,left:14,right:14}},figma.widget.h(g,{fontSize:14,fill:"#FF3B30"},"  ")),b&&o.text!="this message has been deleted"&&!o.deleteConfirm&&figma.widget.h(l,{fill:w.fill,cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:h},figma.widget.h(x,{src:we,onClick:h}),figma.widget.h(g,{fontSize:14,fill:"#FFFFFF"})),b&&o.text!="this message has been deleted"&&o.deleteConfirm&&figma.widget.h(l,{fill:w.fill,cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:h},figma.widget.h(x,{src:Ce,onClick:h}),figma.widget.h(g,{fontSize:14,fill:"#808080"})),b&&figma.widget.h(l,{cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:M},figma.widget.h(x,{src:xe,onClick:M}),figma.widget.h(g,{fontSize:14,fill:"#FFFFFF"})),o.text=="this message has been deleted"&&figma.widget.h(l,{fill:"#FFFFFF",cornerRadius:4,padding:{top:6,bottom:v?0:6,left:8,right:8}},figma.widget.h(g,{fontSize:14,fill:"#FFFFFF"},"FAKE")))),o.showReplies&&c&&figma.widget.h(l,{direction:"vertical",width:"fill-parent",padding:{top:v?0:10,bottom:v?0:10,left:32,right:8}},c))}re.register(Le);})();
