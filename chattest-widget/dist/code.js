(()=>{var le=Object.defineProperty,de=Object.defineProperties;var ae=Object.getOwnPropertyDescriptors;var J=Object.getOwnPropertySymbols;var pe=Object.prototype.hasOwnProperty,ge=Object.prototype.propertyIsEnumerable;var X=(i,g,a)=>g in i?le(i,g,{enumerable:!0,configurable:!0,writable:!0,value:a}):i[g]=a,v=(i,g)=>{for(var a in g||(g={}))pe.call(g,a)&&X(i,a,g[a]);if(J)for(var a of J(g))ge.call(g,a)&&X(i,a,g[a]);return i},x=(i,g)=>de(i,ae(g));var ee=(i,g,a)=>new Promise((U,c)=>{var f=y=>{try{k(a.next(y))}catch(F){c(F)}},u=y=>{try{k(a.throw(y))}catch(F){c(F)}},k=y=>y.done?U(y.value):Promise.resolve(y.value).then(f,u);k((a=a.apply(i,g)).next())});var{widget:te,showUI:Le,ui:be}=figma,{AutoLayout:l,Text:p,useSyncedState:S,Input:Re,Frame:Me,Image:Ae,SVG:b}=te,ce='<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 17V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H4M4 11L8 7M4 11L8 15" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',ue='<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',fe='<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',he='<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff5252"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 14L11 16L15 12M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#ff5252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';var we='<svg fill="#303030" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z"></path> </g> </g> </g></svg>',Ce='<svg fill="#303030" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z"></path> </g> </g> </g></svg>',Fe='<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8787 3.70705C17.0503 2.53547 18.9498 2.53548 20.1213 3.70705L20.2929 3.87862C21.4645 5.05019 21.4645 6.94969 20.2929 8.12126L18.5556 9.85857L8.70713 19.7071C8.57897 19.8352 8.41839 19.9261 8.24256 19.9701L4.24256 20.9701C3.90178 21.0553 3.54129 20.9554 3.29291 20.7071C3.04453 20.4587 2.94468 20.0982 3.02988 19.7574L4.02988 15.7574C4.07384 15.5816 4.16476 15.421 4.29291 15.2928L14.1989 5.38685L15.8787 3.70705ZM18.7071 5.12126C18.3166 4.73074 17.6834 4.73074 17.2929 5.12126L16.3068 6.10738L17.8622 7.72357L18.8787 6.70705C19.2692 6.31653 19.2692 5.68336 18.8787 5.29283L18.7071 5.12126ZM16.4477 9.13804L14.8923 7.52185L5.90299 16.5112L5.37439 18.6256L7.48877 18.097L16.4477 9.13804Z" fill="#000000"></path> </g></svg>',me='<svg fill="#007AFF" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z"></path> </g> </g> </g></svg>',ve='<svg fill="#007AFF" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z"></path> </g> </g> </g></svg>';function xe(){let[i,g]=S("newMessage",""),[a,U]=S("replyToId",null),[c,f]=S("messages",[]),[u,k]=S("userName","Anonymous"),[y,F]=S("inputPlaceholder","Type a message..."),[oe,_]=S("inputActive",!1),[N,Z]=S("isEditing",!1),I=new Set(["Neel Walse","Ashwin Chembu","David M Torres-Mendoza"]),T=[];function W(n){return I.has(n)}function V(){return new Promise((n,r)=>{figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.onmessage=e=>{if(e.type==="new-message"){let o=e.payload;m(o),n()}else e.type==="close-plugin"&&(figma.closePlugin(),n())}})}function Q(n){return new Promise(r=>setTimeout(r,n))}let Y=n=>(console.log("editing"),Q(1e5),new Promise((r,e)=>{let o=c.find(t=>t.id===n);o?(console.log("opening modal"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-message",payload:o.text}),console.log("opened"),figma.ui.onmessage=t=>{if(t.type==="update-message"){console.log("updated");let s=t.payload,d=c.map(w=>w.id===n?x(v({},w),{text:s,edited:!0}):w);f(d),figma.closePlugin(),r()}else t.type==="cancel-edit"?(console.log("canceled"),e("Edit canceled by user.")):t.type==="close-plugin"&&(console.log("closed"),figma.closePlugin(),r())}):(console.log("Message not found."),e("Message not found."))})),h=()=>{figma.currentUser&&figma.currentUser.name&&k(figma.currentUser.name)},R=(n=6)=>{let r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e="";for(let o=0;o<n;o++)e+=r.charAt(Math.floor(Math.random()*r.length));return e},D=()=>{if(T.length>0){let n=T.shift();n&&f(r=>[...r,n])}},m=n=>{if(h(),n.trim()!==""){let r=Date.now(),e=R(),o=`${r}${e}${u}`;console.log(o);let t=new Date(r),s=t.getHours(),d=t.getMinutes(),w=d<10?"0"+d:d.toString(),L=s>=12?"PM":"AM",G=`${s%12||12}:${w} ${L}`,E=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:u,A={id:o,parentId:null,text:n.trim(),sender:E,timestamp:G,edited:!1,deleteConfirm:!1,showReplies:!1,pinned:!1,deleted:!1,upvotedUsers:[],downvotedUsers:[]};T.push(A),D()}},P=n=>{f(r=>r.map(e=>{if(e.id===n){let o=[...e.upvotedUsers],t=[...e.downvotedUsers],s=o.indexOf(u),d=t.indexOf(u);return s>-1?o.splice(s,1):(o.push(u),d>-1&&t.splice(d,1)),x(v({},e),{upvotedUsers:o,downvotedUsers:t})}return e}))},j=n=>{f(r=>r.map(e=>{if(e.id===n){let o=[...e.upvotedUsers],t=[...e.downvotedUsers],s=o.indexOf(u),d=t.indexOf(u);return d>-1?t.splice(d,1):(t.push(u),s>-1&&o.splice(s,1)),x(v({},e),{upvotedUsers:o,downvotedUsers:t})}return e}))},M=n=>ee(this,null,function*(){let r=Date.now(),e=R(),o=`${r}${e}${u}`,t=new Date(r),s=t.getHours(),d=t.getMinutes(),w=d<10?"0"+d:d.toString(),L=s>=12?"PM":"AM",G=`${s%12||12}:${w} ${L}`,E=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:u,A=c.find($=>$.id===n);return A?(figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"reply-message",payload:A}),new Promise(($,ne)=>{figma.ui.onmessage=O=>{if(O.type==="send-reply"){let re=O.payload,se={id:o,parentId:n,text:re,sender:u,timestamp:G,edited:!1,deleteConfirm:!1,showReplies:!1,pinned:!1,deleted:!1,upvotedUsers:[],downvotedUsers:[]};T.push(se),D(),$()}else O.type==="close-plugin"&&ne("Reply action was cancelled.")}})):(console.error("Message to reply to was not found."),Promise.reject("Message to reply to was not found."))}),B=n=>{if(c.find(e=>e.id===n)){let e=c.map(o=>o.id===n?x(v({},o),{text:"this message has been deleted",sender:"Anonymous",edited:!1,showReplies:!1}):o);f(e),U(null),g(""),F("Type a message..."),_(!0),setTimeout(()=>_(!1),2e3)}},z=n=>{let r=c.find(e=>e.id===n);r&&r.deleteConfirm===!1?f(e=>e.map(o=>o.id===n?x(v({},o),{deleteConfirm:!0}):o)):f(e=>e.map(o=>o.id===n?x(v({},o),{deleteConfirm:!1}):o))},H=n=>{let r=c.find(e=>e.id===n);r&&r.showReplies===!1?f(e=>e.map(o=>o.id===n?x(v({},o),{showReplies:!0}):o)):f(e=>e.map(o=>o.id===n?x(v({},o),{showReplies:!1}):o))},ie=n=>{if(!c.find(t=>t.id===n))return 0;let e=0,o=(t,s)=>{c.forEach(d=>{d.parentId===t&&o(d.id,s+1)}),s>e&&(e=s)};return o(n,0),e},K=n=>{I.has(u)&&f(r=>r.map(e=>{if(e.id===n){let o=e.pinned!==void 0?e.pinned:!1;return x(v({},e),{pinned:!o})}return e}))},q=(n=null)=>{let r=t=>{let s=0,d=w=>{let L=c.filter(C=>C.parentId===w);s+=L.length,L.forEach(C=>{d(C.id)})};return d(t),s},e=t=>{if(W(u))return new Promise((s,d)=>{figma.showUI(__uiFiles__.options,{width:300,height:200}),figma.ui.onmessage=w=>{if(w.type==="edit-message"){console.log("calling edit from options");let L=c.find(C=>C.id===t);L?(console.log("opening modal"),figma.showUI(__uiFiles__.main,{width:400,height:300}),figma.ui.postMessage({type:"edit-message",payload:L.text}),console.log("opened"),figma.ui.onmessage=C=>{if(C.type==="update-message"){console.log("updated");let G=C.payload,E=c.map(A=>A.id===t?x(v({},A),{text:G,edited:!0}):A);f(E),figma.closePlugin(),s()}else C.type==="cancel-edit"?(console.log("canceled"),d("Edit canceled by user.")):C.type==="close-plugin"&&(console.log("closed"),figma.closePlugin(),s())}):(console.log("Message not found."),d("Message not found."))}else w.type==="delete-message"?(B(t),s()):w.type==="pin-message"?(K(t),s()):w.type==="close-options"&&s()}})};return[...c].sort((t,s)=>t.pinned&&!s.pinned?-1:!t.pinned&&s.pinned?1:0).filter(t=>t.parentId===n).map(t=>figma.widget.h(ke,{key:t.id,message:t,onReply:()=>M(t.id),onEdit:()=>Y(t.id),onDelete:()=>B(t.id),onDeleteConfirm:()=>z(t.id),onShowReplies:()=>H(t.id),replyChain:q(t.id),replyToId:a,user:u,getMessageDepth:ie,onPin:K,totalReplies:r(t.id),allowedUsersToPin:I,onUpvote:()=>P(t.id),onDownvote:()=>j(t.id),onOptionsClick:()=>e(t.id)}))};return figma.widget.h(l,{direction:"vertical",spacing:8,padding:8,stroke:"#DADCE0",strokeWidth:1,cornerRadius:10,onClick:h},figma.widget.h(l,{direction:"vertical",spacing:8,padding:8},figma.widget.h(l,{direction:"horizontal",onClick:V,fill:"#007AFF",padding:8,cornerRadius:4},figma.widget.h(p,{fill:"#FFFFFF"},"Add Message"))),figma.widget.h(l,{direction:"vertical",spacing:1,padding:4},q()))}function ke({message:i,onReply:g,onDelete:a,onEdit:U,replyChain:c,replyToId:f,user:u,onDeleteConfirm:k,getMessageDepth:y,onShowReplies:F,onPin:oe,totalReplies:_,allowedUsersToPin:N,onUpvote:Z,onDownvote:I,onOptionsClick:T}){let W=i.parentId!==null,V=f===i.id,Q=i.upvotedUsers.length,Y=i.downvotedUsers.length,h={fill:V?"#007AFF":"#FFFFFF",color:"#000000",extra:V?"#007AFF":"#FAFAFA"},R=i.sender===u,D=i.edited,m=i.deleted,P=y(i.id),j=i.upvotedUsers.length-i.downvotedUsers.length;var M=!1;N.has(u)&&(M=!0);var B=160;P==0&&(B=160);var z=!1;P>=1&&(z=!0);var H=!0;return i.text=="this message has been deleted"&&(H=!1),figma.widget.h(l,{direction:"vertical"},!m&&figma.widget.h(l,{direction:"vertical",padding:{top:10,bottom:m?0:10,left:8,right:8},stroke:"#D3D3D3",strokeWidth:1,cornerRadius:4,fill:h.fill,width:470},figma.widget.h(l,{direction:"horizontal",width:470,padding:{top:4,bottom:1,left:4,right:8}},figma.widget.h(l,{direction:"horizontal",horizontalAlignItems:"start",width:160},figma.widget.h(p,{fontSize:14,fill:h.color,horizontalAlignText:"left"},m?"Anonymous":i.sender,":"),i.pinned&&figma.widget.h(p,{fontSize:14,fill:"#808080",horizontalAlignText:"left"}," - pinned")),figma.widget.h(l,{direction:"horizontal",horizontalAlignItems:"end",width:270},figma.widget.h(p,{fontSize:12,fill:h.color,horizontalAlignText:"right"},i.timestamp))),figma.widget.h(l,{direction:"horizontal",padding:{top:15,bottom:4,left:4,right:4},fill:h.fill},figma.widget.h(l,{direction:"vertical"},figma.widget.h(p,{width:380},m?"this message has been deleted":i.text),figma.widget.h(p,{width:60,fontSize:4,fill:"#808080"}," "),D&&!m&&figma.widget.h(p,{width:60,fontSize:12,fill:"#808080"},"(edited)"))),figma.widget.h(l,{direction:"horizontal",padding:{top:15,bottom:0,left:4,right:4},spacing:8},i.text!="this message has been deleted"&&figma.widget.h(l,{fill:h.extra,cornerRadius:4},figma.widget.h(l,{cornerRadius:4,padding:{top:10,bottom:4,left:8,right:8}},figma.widget.h(b,{src:we,onClick:()=>Z()}),figma.widget.h(p,{fontSize:14,fill:"#FFFFFF"})),figma.widget.h(l,{padding:{top:6,bottom:6,left:8,right:8}},figma.widget.h(p,{fontSize:14,fill:"#000000"},j)),figma.widget.h(l,{cornerRadius:4,padding:{top:10,bottom:4,left:8,right:8}},figma.widget.h(b,{src:Ce,onClick:()=>I()}),figma.widget.h(p,{fontSize:14,fill:"#FFFFFF"}))),i.text!="this message has been deleted"&&figma.widget.h(l,{fill:"#007AFF",cornerRadius:4,padding:{top:6,bottom:m?0:6,left:8,right:8},onClick:g},figma.widget.h(b,{src:ce,onClick:g}),figma.widget.h(p,{fontSize:14,fill:"#FFFFFF"}," Reply  ")),z&&figma.widget.h(l,{cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:F},i.showReplies&&figma.widget.h(l,{cornerRadius:4,padding:{top:4,bottom:4,left:0,right:0},onClick:F},figma.widget.h(b,{src:me,onClick:F})),!i.showReplies&&figma.widget.h(l,{cornerRadius:4,padding:{top:4,bottom:4,left:0,right:0},onClick:F},figma.widget.h(b,{src:ve,onClick:F})),figma.widget.h(p,{fontSize:14,fill:(i.showReplies,"#007AFF")},"  ",_," Replies ")),M&&figma.widget.h(l,{fill:"#007AFF",cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:T},figma.widget.h(p,{fontSize:14,fill:"#FFFFFF"},"O")),!z&&figma.widget.h(l,{fill:h.fill,stroke:i.showReplies?"#FFFFFF":"",cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8}},figma.widget.h(p,{fontSize:14,fill:h.fill},i.showReplies?`\u25B2 ${_} Replies`:`\u25BD ${_} Replies`)),(R||M)&&i.text!="this message has been deleted"&&i.deleteConfirm&&figma.widget.h(l,{fill:h.fill,cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:a},figma.widget.h(b,{src:he,onClick:a}),figma.widget.h(p,{fontSize:14,fill:"#FF3B30"})),(R||M)&&i.text!="this message has been deleted"&&!i.deleteConfirm&&figma.widget.h(l,{fill:h.fill,cornerRadius:4,padding:{top:6,bottom:6,left:14,right:14}},figma.widget.h(p,{fontSize:14,fill:"#FF3B30"},"  ")),(R||M)&&i.text!="this message has been deleted"&&!i.deleteConfirm&&figma.widget.h(l,{fill:h.fill,cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:k},figma.widget.h(b,{src:ue,onClick:k}),figma.widget.h(p,{fontSize:14,fill:"#FFFFFF"})),(R||M)&&i.text!="this message has been deleted"&&i.deleteConfirm&&figma.widget.h(l,{fill:h.fill,cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:k},figma.widget.h(b,{src:fe,onClick:k}),figma.widget.h(p,{fontSize:14,fill:"#808080"})),R&&figma.widget.h(l,{cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:U},figma.widget.h(b,{src:Fe,onClick:U}),figma.widget.h(p,{fontSize:14,fill:"#FFFFFF"})),i.text=="this message has been deleted"&&figma.widget.h(l,{fill:"#FFFFFF",cornerRadius:4,padding:{top:6,bottom:m?0:6,left:8,right:8}},figma.widget.h(p,{fontSize:14,fill:"#FFFFFF"},"FAKE")))),i.showReplies&&c&&figma.widget.h(l,{direction:"vertical",width:"fill-parent",padding:{top:m?0:10,bottom:m?0:10,left:32,right:8}},c))}te.register(xe);})();
