(()=>{var le=Object.defineProperty,ae=Object.defineProperties;var pe=Object.getOwnPropertyDescriptors;var te=Object.getOwnPropertySymbols;var ce=Object.prototype.hasOwnProperty,ge=Object.prototype.propertyIsEnumerable;var oe=(h,t,p)=>t in h?le(h,t,{enumerable:!0,configurable:!0,writable:!0,value:p}):h[t]=p,F=(h,t)=>{for(var p in t||(t={}))ce.call(t,p)&&oe(h,p,t[p]);if(te)for(var p of te(t))ge.call(t,p)&&oe(h,p,t[p]);return h},m=(h,t)=>ae(h,pe(t));var ie=(h,t,p)=>new Promise((_,a)=>{var u=w=>{try{R(p.next(w))}catch(b){a(b)}},c=w=>{try{R(p.throw(w))}catch(b){a(b)}},R=w=>w.done?_(w.value):Promise.resolve(w.value).then(u,c);R((p=p.apply(h,t)).next())});var{widget:ne,showUI:Se,ui:Ae}=figma,{AutoLayout:d,Text:g,useSyncedState:A,Input:_e,Frame:Ue,Image:Te,SVG:k}=ne,ue='<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 17V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H4M4 11L8 7M4 11L8 15" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',fe='<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',he='<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',we='<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff5252"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 14L11 16L15 12M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#ff5252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';var Ce='<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#1cb566"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.1835 7.80516L16.2188 4.83755C14.1921 2.8089 13.1788 1.79457 12.0904 2.03468C11.0021 2.2748 10.5086 3.62155 9.5217 6.31506L8.85373 8.1381C8.59063 8.85617 8.45908 9.2152 8.22239 9.49292C8.11619 9.61754 7.99536 9.72887 7.86251 9.82451C7.56644 10.0377 7.19811 10.1392 6.46145 10.3423C4.80107 10.8 3.97088 11.0289 3.65804 11.5721C3.5228 11.8069 3.45242 12.0735 3.45413 12.3446C3.45809 12.9715 4.06698 13.581 5.28476 14.8L6.69935 16.2163L2.22345 20.6964C1.92552 20.9946 1.92552 21.4782 2.22345 21.7764C2.52138 22.0746 3.00443 22.0746 3.30236 21.7764L7.77841 17.2961L9.24441 18.7635C10.4699 19.9902 11.0827 20.6036 11.7134 20.6045C11.9792 20.6049 12.2404 20.5358 12.4713 20.4041C13.0192 20.0914 13.2493 19.2551 13.7095 17.5825C13.9119 16.8472 14.013 16.4795 14.2254 16.1835C14.3184 16.054 14.4262 15.9358 14.5468 15.8314C14.8221 15.593 15.1788 15.459 15.8922 15.191L17.7362 14.4981C20.4 13.4973 21.7319 12.9969 21.9667 11.9115C22.2014 10.826 21.1954 9.81905 19.1835 7.80516Z" fill="#1cb566"></path> </g></svg>',Fe='<svg fill="#303030" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z"></path> </g> </g> </g></svg>',me='<svg fill="#303030" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z"></path> </g> </g> </g></svg>',ve='<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8787 3.70705C17.0503 2.53547 18.9498 2.53548 20.1213 3.70705L20.2929 3.87862C21.4645 5.05019 21.4645 6.94969 20.2929 8.12126L18.5556 9.85857L8.70713 19.7071C8.57897 19.8352 8.41839 19.9261 8.24256 19.9701L4.24256 20.9701C3.90178 21.0553 3.54129 20.9554 3.29291 20.7071C3.04453 20.4587 2.94468 20.0982 3.02988 19.7574L4.02988 15.7574C4.07384 15.5816 4.16476 15.421 4.29291 15.2928L14.1989 5.38685L15.8787 3.70705ZM18.7071 5.12126C18.3166 4.73074 17.6834 4.73074 17.2929 5.12126L16.3068 6.10738L17.8622 7.72357L18.8787 6.70705C19.2692 6.31653 19.2692 5.68336 18.8787 5.29283L18.7071 5.12126ZM16.4477 9.13804L14.8923 7.52185L5.90299 16.5112L5.37439 18.6256L7.48877 18.097L16.4477 9.13804Z" fill="#000000"></path> </g></svg>',xe='<svg fill="#007AFF" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z"></path> </g> </g> </g></svg>',ke='<svg fill="#007AFF" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z"></path> </g> </g> </g></svg>',ye='<svg fill="#000000" height="18px" width="18px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve" stroke="#000000" stroke-width="0.0033"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_509_"> <path id="XMLID_510_" d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85 S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15 s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25 C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"></path> </g> </g></svg>';function Re(){let[h,t]=A("newMessage",""),[p,_]=A("replyToId",null),[a,u]=A("messages",[]),[c,R]=A("userName","Unknown User"),[w,b]=A("inputPlaceholder","Type a message..."),[U,Z]=A("inputActive",!1),[K,q]=A("isEditing",!1),T=new Set(["Neel Walse","Ashwin Chembu","David M Torres-Mendoza"]),I=[];function j(i){return L(),console.log(T.has(i)),T.has(i)}function J(){return new Promise((i,r)=>{figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.onmessage=e=>{if(e.type==="new-message"){let o=e.payload;M(o),i()}else e.type==="close-plugin"&&(figma.closePlugin(),i())}})}function G(i){let r=i*70*Math.random();return new Promise(e=>setTimeout(e,i))}let z=i=>(console.log("editing"),G(1e4),new Promise((r,e)=>{let o=a.find(l=>l.id===i);o?(console.log("opening modal"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-message",payload:o.text}),console.log("opened"),figma.ui.onmessage=l=>{if(l.type==="update-message"){console.log("updated");let n=l.payload,s=m(F({},o),{text:n,edited:!0}),x=a.findIndex(C=>C.id===i);if(x!==-1){let C=[...a];C[x]=s,u(C)}figma.closePlugin(),r()}else l.type==="cancel-edit"?(console.log("canceled"),e("Edit canceled by user.")):l.type==="close-plugin"&&(console.log("closed"),figma.closePlugin(),r())}):(console.log("Message not found."),e("Message not found."))})),L=()=>{let i=figma.currentUser?figma.currentUser.name:"Unknown User";R(i),console.log(c)},W=(i=6)=>{let r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e="";for(let o=0;o<i;o++)e+=r.charAt(Math.floor(Math.random()*r.length));return e},f=()=>{if(I.length>0){G(1e4);let i=I.shift();i&&u(r=>[...r,i])}},M=i=>{if(L(),i.trim()!==""){let r=Date.now(),e=W(),o=`${r}${e}${c}`;console.log(o);let l=new Date(r),n=l.getHours(),s=l.getMinutes(),x=s<10?"0"+s:s.toString(),C=n>=12?"PM":"AM",y=`${n%12||12}:${x} ${C}`,$=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:c,D={id:o,parentId:null,text:i.trim(),sender:$,timestamp:y,edited:!1,deleteConfirm:!1,showReplies:!1,pinned:!1,deleted:!1,upvotedUsers:[],downvotedUsers:[],directreply:0};I.push(D),G(1e4),f()}},Q=i=>{u(r=>r.map(e=>{if(e.id===i){let o=[...e.upvotedUsers],l=[...e.downvotedUsers],n=o.indexOf(c),s=l.indexOf(c);return n>-1?o.splice(n,1):(o.push(c),s>-1&&l.splice(s,1)),m(F({},e),{upvotedUsers:o,downvotedUsers:l})}return e}))},v=i=>{u(r=>r.map(e=>{if(e.id===i){let o=[...e.upvotedUsers],l=[...e.downvotedUsers],n=o.indexOf(c),s=l.indexOf(c);return s>-1?l.splice(s,1):(l.push(c),n>-1&&o.splice(n,1)),m(F({},e),{upvotedUsers:o,downvotedUsers:l})}return e}))},E=i=>ie(this,null,function*(){let r=Date.now(),e=W(),o=`${r}${e}${c}`,l=new Date(r),n=l.getHours(),s=l.getMinutes(),x=s<10?"0"+s:s.toString(),C=n>=12?"PM":"AM",y=`${n%12||12}:${x} ${C}`,$=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:c,D=a.find(S=>S.id===i);return D?(figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"reply-message",payload:D}),new Promise((S,re)=>{figma.ui.onmessage=Y=>{if(Y.type==="send-reply"){let se=Y.payload,de={id:o,parentId:i,text:se,sender:c,timestamp:y,edited:!1,deleteConfirm:!1,showReplies:!1,pinned:!1,deleted:!1,upvotedUsers:[],downvotedUsers:[],directreply:0};console.log("newreply");let Le=a.map(O=>O.id===i?m(F({},O),{directreply:O.directreply+1}):O);I.push(de),G(1e4),f(),S()}else Y.type==="close-plugin"&&re("Reply action was cancelled.")}})):(console.error("Message to reply to was not found."),Promise.reject("Message to reply to was not found."))}),H=i=>{let r=a.find(e=>e.id===i);if(r){r.deleted=!0;let e=a.map(o=>o.id===i?m(F({},o),{text:"this message has been deleted",sender:"Anonymous",edited:!1,showReplies:!1}):o);u(e),_(null),t(""),b("Type a message..."),Z(!0),setTimeout(()=>Z(!1),2e3)}},P=i=>{let r=a.find(e=>e.id===i);r&&r.deleteConfirm===!1?u(e=>e.map(o=>o.id===i?m(F({},o),{deleteConfirm:!0}):o)):u(e=>e.map(o=>o.id===i?m(F({},o),{deleteConfirm:!1}):o))},X=i=>{let r=a.find(e=>e.id===i);r&&r.showReplies===!1?u(e=>e.map(o=>o.id===i?m(F({},o),{showReplies:!0}):o)):u(e=>e.map(o=>o.id===i?m(F({},o),{showReplies:!1}):o))},B=i=>{if(!a.find(l=>l.id===i))return 0;let e=0,o=(l,n)=>{a.forEach(s=>{s.parentId===l&&o(s.id,n+1)}),n>e&&(e=n)};return o(i,0),e},N=i=>{T.has(c)&&u(r=>r.map(e=>{if(e.id===i){let o=e.pinned!==void 0?e.pinned:!1;return m(F({},e),{pinned:!o})}return e}))},ee=(i=null)=>{let r=n=>a.filter(s=>s.parentId===n).length,e=n=>{if(L(),console.log("in options:",c),j(c))return new Promise((s,x)=>{figma.showUI(__uiFiles__.options,{width:300,height:200}),figma.ui.onmessage=C=>{if(C.type==="edit-message"){console.log("calling edit from options");let V=a.find(y=>y.id===n);V&&!V.deleted?(console.log(V.deleted),console.log("opening modal"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-message",payload:V.text}),console.log("opened"),figma.ui.onmessage=y=>{if(y.type==="update-message"){console.log("updated");let $=y.payload,D=a.map(S=>S.id===n?m(F({},S),{text:$,edited:!0}):S);u(D),figma.closePlugin(),s()}else y.type==="cancel-edit"?(console.log("canceled"),x("Edit canceled by user.")):y.type==="close-plugin"&&(console.log("closed"),figma.closePlugin(),s())}):(console.log("Message not found."),x("Message not found."))}else C.type==="delete-message"?(H(n),s()):C.type==="pin-message"?(N(n),s()):C.type==="close-options"&&s()}})},o=n=>{let s=a.filter(x=>x.parentId===n);return 0};return[...a].sort((n,s)=>n.pinned&&!s.pinned?-1:!n.pinned&&s.pinned?1:0).filter(n=>n.parentId===i).map(n=>figma.widget.h(be,{key:n.id,message:n,onReply:()=>E(n.id),onEdit:()=>z(n.id),onDelete:()=>H(n.id),onDeleteConfirm:()=>P(n.id),onShowReplies:()=>X(n.id),replyChain:ee(n.id),replyToId:p,user:c,getMessageDepth:B,onPin:N,totalReplies:r(n.id),allowedUsersToPin:T,onUpvote:()=>Q(n.id),onDownvote:()=>v(n.id),onOptionsClick:()=>e(n.id),updateUserName:()=>L(),getTotalDirectReplies:s=>o(n.id)}))};return figma.widget.h(d,{direction:"vertical",spacing:8,padding:8,stroke:"#DADCE0",strokeWidth:1,cornerRadius:10,onClick:L},figma.widget.h(d,{direction:"vertical",spacing:8,padding:8,onClick:L},figma.widget.h(d,{direction:"horizontal",onClick:J,fill:"#007AFF",padding:8,cornerRadius:4},figma.widget.h(g,{fill:"#FFFFFF"},"Add Message"))),figma.widget.h(d,{direction:"vertical",spacing:1,padding:4},ee()))}function be({getTotalDirectReplies:h,message:t,onReply:p,onDelete:_,onEdit:a,replyChain:u,replyToId:c,user:R,onDeleteConfirm:w,getMessageDepth:b,onShowReplies:U,onPin:Z,totalReplies:K,allowedUsersToPin:q,onUpvote:T,onDownvote:I,onOptionsClick:j,updateUserName:J}){let G=t.parentId!==null,z=c===t.id,L=t.upvotedUsers.length,W=t.downvotedUsers.length,f={fill:z?"#007AFF":"#FFFFFF",color:"#000000",extra:z?"#007AFF":"#FAFAFA"},M=t.sender===R,Q=t.edited,v=t.deleted,E=b(t.id),H=t.upvotedUsers.length-t.downvotedUsers.length;var P=!1;console.log("USER:",R),q.has(R)&&(console.log("inside",P),P=!0);var X=160;E==0&&(X=160);var B=!1;E>=1&&(B=!0);var N=!0;return t.text=="this message has been deleted"&&(N=!1),figma.widget.h(d,{direction:"vertical"},figma.widget.h(d,{direction:"vertical",padding:{top:10,bottom:v?0:10,left:8,right:8},stroke:"#D3D3D3",strokeWidth:1,cornerRadius:4,fill:f.fill,width:470},figma.widget.h(d,{direction:"horizontal",width:430,padding:{top:4,bottom:1,left:4,right:8}},figma.widget.h(d,{direction:"horizontal",horizontalAlignItems:"start",width:320,spacing:3},figma.widget.h(g,{fontSize:14,fill:f.color,horizontalAlignText:"left"},v?"Anonymous":t.sender,":"),t.pinned&&figma.widget.h(k,{src:Ce})),figma.widget.h(d,{direction:"horizontal",horizontalAlignItems:"end",width:100},figma.widget.h(g,{fontSize:12,fill:f.color,horizontalAlignText:"right"},t.timestamp))),figma.widget.h(d,{direction:"horizontal",padding:{top:15,bottom:4,left:4,right:4},fill:f.fill},figma.widget.h(d,{direction:"vertical"},figma.widget.h(g,{width:380},v?"this message has been deleted":t.text),figma.widget.h(g,{width:60,fontSize:4,fill:"#808080"}," "),Q&&!v&&figma.widget.h(g,{width:60,fontSize:12,fill:"#808080"},"(edited)"))),figma.widget.h(d,{direction:"horizontal",padding:{top:15,bottom:0,left:4,right:4},spacing:8},t.text!="this message has been deleted"&&figma.widget.h(d,{fill:f.extra,cornerRadius:4},figma.widget.h(d,{cornerRadius:4,padding:{top:10,bottom:4,left:8,right:8},onClick:()=>T()},figma.widget.h(k,{src:Fe}),figma.widget.h(g,{fontSize:14,fill:"#FFFFFF"})),figma.widget.h(d,{padding:{top:6,bottom:6,left:8,right:8}},figma.widget.h(g,{fontSize:14,fill:"#000000"},H)),figma.widget.h(d,{cornerRadius:4,padding:{top:10,bottom:4,left:8,right:8},onClick:()=>I()},figma.widget.h(k,{src:me}),figma.widget.h(g,{fontSize:14,fill:"#FFFFFF"}))),t.text!="this message has been deleted"&&figma.widget.h(d,{fill:"#007AFF",cornerRadius:4,padding:{top:6,bottom:v?0:6,left:8,right:8},onClick:p},figma.widget.h(k,{src:ue,onClick:p}),figma.widget.h(g,{fontSize:14,fill:"#FFFFFF"}," Reply  ")),B&&figma.widget.h(d,{cornerRadius:4,padding:{top:6,bottom:v?15:0,left:8,right:8},onClick:U},t.showReplies&&figma.widget.h(d,{cornerRadius:4,padding:{top:4,bottom:4,left:0,right:0},onClick:U},figma.widget.h(k,{src:xe,onClick:U})),!t.showReplies&&figma.widget.h(d,{cornerRadius:4,padding:{top:4,bottom:4,left:0,right:0},onClick:U},figma.widget.h(k,{src:ke,onClick:U})),figma.widget.h(g,{fontSize:14,fill:(t.showReplies,"#007AFF")},"  ",K," Replies ")),t.text!="this message has been deleted"&&P&&figma.widget.h(d,{cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:j},figma.widget.h(k,{src:ye,onClick:j})),!B&&figma.widget.h(d,{fill:f.fill,stroke:t.showReplies?"#FFFFFF":"",cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8}},figma.widget.h(g,{fontSize:14,fill:f.fill},t.showReplies?`\u25B2 ${t.directreply} Replies`:`\u25BD ${t.directreply} Replies`)),M&&t.text!="this message has been deleted"&&t.deleteConfirm&&figma.widget.h(d,{fill:f.fill,cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:_},figma.widget.h(k,{src:we,onClick:_}),figma.widget.h(g,{fontSize:14,fill:"#FF3B30"})),M&&t.text!="this message has been deleted"&&!t.deleteConfirm&&figma.widget.h(d,{fill:f.fill,cornerRadius:4,padding:{top:6,bottom:6,left:14,right:14}},figma.widget.h(g,{fontSize:14,fill:"#FF3B30"},"  ")),M&&t.text!="this message has been deleted"&&!t.deleteConfirm&&figma.widget.h(d,{fill:f.fill,cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:w},figma.widget.h(k,{src:fe,onClick:w}),figma.widget.h(g,{fontSize:14,fill:"#FFFFFF"})),M&&t.text!="this message has been deleted"&&t.deleteConfirm&&figma.widget.h(d,{fill:f.fill,cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:w},figma.widget.h(k,{src:he,onClick:w}),figma.widget.h(g,{fontSize:14,fill:"#808080"})),M&&figma.widget.h(d,{cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:a},figma.widget.h(k,{src:ve,onClick:a}),figma.widget.h(g,{fontSize:14,fill:"#FFFFFF"})),t.text=="this message has been deleted"&&figma.widget.h(d,{fill:"#FFFFFF",cornerRadius:4,padding:{top:6,bottom:v?0:6,left:8,right:8}},figma.widget.h(g,{fontSize:14,fill:"#FFFFFF"},"FAKE")))),t.showReplies&&u&&figma.widget.h(d,{direction:"vertical",width:"fill-parent",padding:{top:v?0:10,bottom:v?0:10,left:32,right:8}},u))}ne.register(Re);})();
