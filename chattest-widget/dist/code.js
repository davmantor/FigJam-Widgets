(()=>{var se=Object.defineProperty,de=Object.defineProperties;var le=Object.getOwnPropertyDescriptors;var K=Object.getOwnPropertySymbols;var ae=Object.prototype.hasOwnProperty,pe=Object.prototype.propertyIsEnumerable;var q=(o,p,d)=>p in o?se(o,p,{enumerable:!0,configurable:!0,writable:!0,value:d}):o[p]=d,k=(o,p)=>{for(var d in p||(p={}))ae.call(p,d)&&q(o,d,p[d]);if(K)for(var d of K(p))pe.call(p,d)&&q(o,d,p[d]);return o},L=(o,p)=>de(o,le(p));var J=(o,p,d)=>new Promise((A,u)=>{var f=v=>{try{m(d.next(v))}catch(w){u(w)}},c=v=>{try{m(d.throw(v))}catch(w){u(w)}},m=v=>v.done?A(v.value):Promise.resolve(v.value).then(f,c);m((d=d.apply(o,p)).next())});var{widget:X,showUI:Re,ui:ye}=figma,{AutoLayout:s,Text:g,useSyncedState:M,Input:Me,Frame:Ae,Image:Se,SVG:F}=X,ge='<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 17V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H4M4 11L8 7M4 11L8 15" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',ce='<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',ue='<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',fe='<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff5252"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 14L11 16L15 12M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#ff5252" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',he='<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1218 1.87023C15.7573 0.505682 13.4779 0.76575 12.4558 2.40261L9.61062 6.95916C9.61033 6.95965 9.60913 6.96167 9.6038 6.96549C9.59728 6.97016 9.58336 6.97822 9.56001 6.9848C9.50899 6.99916 9.44234 6.99805 9.38281 6.97599C8.41173 6.61599 6.74483 6.22052 5.01389 6.87251C4.08132 7.22378 3.61596 8.03222 3.56525 8.85243C3.51687 9.63502 3.83293 10.4395 4.41425 11.0208L7.94975 14.5563L1.26973 21.2363C0.879206 21.6269 0.879206 22.26 1.26973 22.6506C1.66025 23.0411 2.29342 23.0411 2.68394 22.6506L9.36397 15.9705L12.8995 19.5061C13.4808 20.0874 14.2853 20.4035 15.0679 20.3551C15.8881 20.3044 16.6966 19.839 17.0478 18.9065C17.6998 17.1755 17.3043 15.5086 16.9444 14.5375C16.9223 14.478 16.9212 14.4114 16.9355 14.3603C16.9421 14.337 16.9502 14.3231 16.9549 14.3165C16.9587 14.3112 16.9606 14.31 16.9611 14.3098L21.5177 11.4645C23.1546 10.4424 23.4147 8.16307 22.0501 6.79853L17.1218 1.87023ZM14.1523 3.46191C14.493 2.91629 15.2528 2.8296 15.7076 3.28445L20.6359 8.21274C21.0907 8.66759 21.0041 9.42737 20.4584 9.76806L15.9019 12.6133C14.9572 13.2032 14.7469 14.3637 15.0691 15.2327C15.3549 16.0037 15.5829 17.1217 15.1762 18.2015C15.1484 18.2752 15.1175 18.3018 15.0985 18.3149C15.0743 18.3316 15.0266 18.3538 14.9445 18.3589C14.767 18.3699 14.5135 18.2916 14.3137 18.0919L5.82846 9.6066C5.62872 9.40686 5.55046 9.15333 5.56144 8.97583C5.56651 8.8937 5.58877 8.84605 5.60548 8.82181C5.61855 8.80285 5.64516 8.7719 5.71886 8.74414C6.79869 8.33741 7.91661 8.56545 8.68762 8.85128C9.55668 9.17345 10.7171 8.96318 11.3071 8.01845L14.1523 3.46191Z" fill="#0F0F0F"></path> </g></svg>',we='<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffe042"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1218 1.87023C15.7573 0.505682 13.4779 0.76575 12.4558 2.40261L9.61062 6.95916C9.61033 6.95965 9.60913 6.96167 9.6038 6.96549C9.59728 6.97016 9.58336 6.97822 9.56001 6.9848C9.50899 6.99916 9.44234 6.99805 9.38281 6.97599C8.41173 6.61599 6.74483 6.22052 5.01389 6.87251C4.08132 7.22378 3.61596 8.03222 3.56525 8.85243C3.51687 9.63502 3.83293 10.4395 4.41425 11.0208L7.94975 14.5563L1.26973 21.2363C0.879206 21.6269 0.879206 22.26 1.26973 22.6506C1.66025 23.0411 2.29342 23.0411 2.68394 22.6506L9.36397 15.9705L12.8995 19.5061C13.4808 20.0874 14.2853 20.4035 15.0679 20.3551C15.8881 20.3044 16.6966 19.839 17.0478 18.9065C17.6998 17.1755 17.3043 15.5086 16.9444 14.5375C16.9223 14.478 16.9212 14.4114 16.9355 14.3603C16.9421 14.337 16.9502 14.3231 16.9549 14.3165C16.9587 14.3112 16.9606 14.31 16.9611 14.3098L21.5177 11.4645C23.1546 10.4424 23.4147 8.16307 22.0501 6.79853L17.1218 1.87023ZM14.1523 3.46191C14.493 2.91629 15.2528 2.8296 15.7076 3.28445L20.6359 8.21274C21.0907 8.66759 21.0041 9.42737 20.4584 9.76806L15.9019 12.6133C14.9572 13.2032 14.7469 14.3637 15.0691 15.2327C15.3549 16.0037 15.5829 17.1217 15.1762 18.2015C15.1484 18.2752 15.1175 18.3018 15.0985 18.3149C15.0743 18.3316 15.0266 18.3538 14.9445 18.3589C14.767 18.3699 14.5135 18.2916 14.3137 18.0919L5.82846 9.6066C5.62872 9.40686 5.55046 9.15333 5.56144 8.97583C5.56651 8.8937 5.58877 8.84605 5.60548 8.82181C5.61855 8.80285 5.64516 8.7719 5.71886 8.74414C6.79869 8.33741 7.91661 8.56545 8.68762 8.85128C9.55668 9.17345 10.7171 8.96318 11.3071 8.01845L14.1523 3.46191Z" fill="#ffe042"></path> </g></svg>',Ce='<svg fill="#303030" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z"></path> </g> </g> </g></svg>',Fe='<svg fill="#303030" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z"></path> </g> </g> </g></svg>',me='<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8787 3.70705C17.0503 2.53547 18.9498 2.53548 20.1213 3.70705L20.2929 3.87862C21.4645 5.05019 21.4645 6.94969 20.2929 8.12126L18.5556 9.85857L8.70713 19.7071C8.57897 19.8352 8.41839 19.9261 8.24256 19.9701L4.24256 20.9701C3.90178 21.0553 3.54129 20.9554 3.29291 20.7071C3.04453 20.4587 2.94468 20.0982 3.02988 19.7574L4.02988 15.7574C4.07384 15.5816 4.16476 15.421 4.29291 15.2928L14.1989 5.38685L15.8787 3.70705ZM18.7071 5.12126C18.3166 4.73074 17.6834 4.73074 17.2929 5.12126L16.3068 6.10738L17.8622 7.72357L18.8787 6.70705C19.2692 6.31653 19.2692 5.68336 18.8787 5.29283L18.7071 5.12126ZM16.4477 9.13804L14.8923 7.52185L5.90299 16.5112L5.37439 18.6256L7.48877 18.097L16.4477 9.13804Z" fill="#000000"></path> </g></svg>',ve='<svg fill="#007AFF" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.002 492.002" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844 L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124 c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064 c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132 C494.624,356.041,494.624,338.965,484.136,328.473z"></path> </g> </g> </g></svg>',xe='<svg fill="#007AFF" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.996 491.996" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 C491.996,136.902,489.204,130.046,484.132,124.986z"></path> </g> </g> </g></svg>';function ke(){let[o,p]=M("newMessage",""),[d,A]=M("replyToId",null),[u,f]=M("messages",[]),[c,m]=M("userName","Anonymous"),[v,w]=M("inputPlaceholder","Type a message..."),[D,S]=M("inputActive",!1),[N,O]=M("isEditing",!1),T=new Set(["Neel Walse","Ashwin Chembu","David M Torres-Mendoza"]),V=[];function U(){return new Promise((i,r)=>{figma.showUI(__html__,{width:400,height:300}),figma.ui.onmessage=t=>{if(t.type==="new-message"){let e=t.payload;z(e),i()}else t.type==="close-plugin"&&(figma.closePlugin(),i())}})}let Z=i=>new Promise((r,t)=>{let e=u.find(n=>n.id===i);e?(figma.showUI(__html__,{width:400,height:300}),figma.ui.postMessage({type:"edit-message",payload:e.text}),figma.ui.onmessage=n=>{if(n.type==="update-message"){let l=n.payload,a=u.map(x=>x.id===i?L(k({},x),{text:l,edited:!0}):x);f(a),figma.closePlugin(),r()}else n.type==="cancel-edit"?t("Edit canceled by user."):n.type==="close-plugin"&&(figma.closePlugin(),r())}):t("Message not found.")}),W=()=>{figma.currentUser&&figma.currentUser.name&&m(figma.currentUser.name)},h=(i=6)=>{let r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t="";for(let e=0;e<i;e++)t+=r.charAt(Math.floor(Math.random()*r.length));return t},R=()=>{if(V.length>0){let i=V.shift();i&&f(r=>[...r,i])}},z=i=>{if(W(),i.trim()!==""){let r=Date.now(),t=h(),e=`${r}${t}${c}`;console.log(e);let n=new Date(r),l=n.getHours(),a=n.getMinutes(),x=a<10?"0"+a:a.toString(),y=l>=12?"PM":"AM",E=`${l%12||12}:${x} ${y}`,Y=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:c,G={id:e,parentId:null,text:i.trim(),sender:Y,timestamp:E,edited:!1,deleteConfirm:!1,showReplies:!1,pinned:!1,deleted:!1,upvotedUsers:[],downvotedUsers:[]};V.push(G),R()}},C=i=>{f(r=>r.map(t=>{if(t.id===i){let e=[...t.upvotedUsers],n=[...t.downvotedUsers],l=e.indexOf(c),a=n.indexOf(c);return l>-1?e.splice(l,1):(e.push(c),a>-1&&n.splice(a,1)),L(k({},t),{upvotedUsers:e,downvotedUsers:n})}return t}))},I=i=>{f(r=>r.map(t=>{if(t.id===i){let e=[...t.upvotedUsers],n=[...t.downvotedUsers],l=e.indexOf(c),a=n.indexOf(c);return a>-1?n.splice(a,1):(n.push(c),l>-1&&e.splice(l,1)),L(k({},t),{upvotedUsers:e,downvotedUsers:n})}return t}))},P=i=>J(this,null,function*(){let r=Date.now(),t=h(),e=`${r}${t}${c}`,n=new Date(r),l=n.getHours(),a=n.getMinutes(),x=a<10?"0"+a:a.toString(),y=l>=12?"PM":"AM",E=`${l%12||12}:${x} ${y}`,Y=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:c,G=u.find(H=>H.id===i);return G?(figma.showUI(__html__,{width:400,height:300}),figma.ui.postMessage({type:"reply-message",payload:G}),new Promise((H,oe)=>{figma.ui.onmessage=$=>{if($.type==="send-reply"){let ie=$.payload,ne={id:e,parentId:i,text:ie,sender:c,timestamp:E,edited:!1,deleteConfirm:!1,showReplies:!1,pinned:!1,deleted:!1,upvotedUsers:[],downvotedUsers:[]};f(re=>[...re,ne]),H()}else $.type==="close-plugin"&&oe("Reply action was cancelled.")}})):(console.error("Message to reply to was not found."),Promise.reject("Message to reply to was not found."))}),b=i=>{if(u.find(t=>t.id===i)){let t=u.map(e=>e.id===i?L(k({},e),{text:"this message has been deleted",sender:"Anonymous",edited:!1,showReplies:!1}):e);f(t),A(null),p(""),w("Type a message..."),S(!0),setTimeout(()=>S(!1),2e3)}},B=i=>{let r=u.find(t=>t.id===i);r&&r.deleteConfirm===!1?f(t=>t.map(e=>e.id===i?L(k({},e),{deleteConfirm:!0}):e)):f(t=>t.map(e=>e.id===i?L(k({},e),{deleteConfirm:!1}):e))},_=i=>{let r=u.find(t=>t.id===i);r&&r.showReplies===!1?f(t=>t.map(e=>e.id===i?L(k({},e),{showReplies:!0}):e)):f(t=>t.map(e=>e.id===i?L(k({},e),{showReplies:!1}):e))},j=i=>{if(!u.find(n=>n.id===i))return 0;let t=0,e=(n,l)=>{u.forEach(a=>{a.parentId===n&&e(a.id,l+1)}),l>t&&(t=l)};return e(i,0),t},ee=i=>{T.has(c)&&f(r=>r.map(t=>{if(t.id===i){let e=t.pinned!==void 0?t.pinned:!1;return L(k({},t),{pinned:!e})}return t}))},Q=(i=null)=>{let r=e=>{let n=0,l=a=>{let x=u.filter(y=>y.parentId===a);n+=x.length,x.forEach(y=>{l(y.id)})};return l(e),n};return[...u].sort((e,n)=>e.pinned&&!n.pinned?-1:!e.pinned&&n.pinned?1:0).filter(e=>e.parentId===i).map(e=>figma.widget.h(Le,{key:e.id,message:e,onReply:()=>P(e.id),onEdit:()=>Z(e.id),onDelete:()=>b(e.id),onDeleteConfirm:()=>B(e.id),onShowReplies:()=>_(e.id),replyChain:Q(e.id),replyToId:d,user:c,getMessageDepth:j,onPin:ee,totalReplies:r(e.id),allowedUsersToPin:T,onUpvote:()=>C(e.id),onDownvote:()=>I(e.id)}))};return figma.widget.h(s,{direction:"vertical",spacing:8,padding:8,stroke:"#DADCE0",strokeWidth:1,cornerRadius:10},figma.widget.h(s,{direction:"vertical",spacing:8,padding:8},figma.widget.h(s,{direction:"horizontal",onClick:U,fill:"#007AFF",padding:8,cornerRadius:4},figma.widget.h(g,{fill:"#FFFFFF"},"Add Message"))),figma.widget.h(s,{direction:"vertical",spacing:1,padding:4},Q()))}function Le({message:o,onReply:p,onDelete:d,onEdit:A,replyChain:u,replyToId:f,user:c,onDeleteConfirm:m,getMessageDepth:v,onShowReplies:w,onPin:D,totalReplies:S,allowedUsersToPin:N,onUpvote:O,onDownvote:T}){let V=o.parentId!==null,U=f===o.id,Z=o.upvotedUsers.length,W=o.downvotedUsers.length,h={fill:U?"#007AFF":"#FFFFFF",color:"#000000",extra:U?"#007AFF":"#FAFAFA"},R=o.sender===c,z=o.edited,C=o.deleted,I=v(o.id),P=o.upvotedUsers.length-o.downvotedUsers.length;var b=!1;N.has(c)&&(b=!0);var B=160;I==0&&(B=160);var _=!1;I>=1&&(_=!0);var j=!0;return o.text=="this message has been deleted"&&(j=!1),figma.widget.h(s,{direction:"vertical"},!C&&figma.widget.h(s,{direction:"vertical",padding:{top:10,bottom:C?0:10,left:8,right:8},stroke:"#D3D3D3",strokeWidth:1,cornerRadius:4,fill:h.fill,width:470},figma.widget.h(s,{direction:"horizontal",width:470,padding:{top:4,bottom:1,left:4,right:8}},figma.widget.h(s,{direction:"horizontal",horizontalAlignItems:"start",width:160},figma.widget.h(g,{fontSize:14,fill:h.color,horizontalAlignText:"left"},C?"Anonymous":o.sender,":")),figma.widget.h(s,{direction:"horizontal",horizontalAlignItems:"end",width:270},figma.widget.h(g,{fontSize:12,fill:h.color,horizontalAlignText:"right"},o.timestamp))),figma.widget.h(s,{direction:"horizontal",padding:{top:15,bottom:4,left:4,right:4},fill:h.fill},figma.widget.h(s,{direction:"vertical"},figma.widget.h(g,{width:380},C?"this message has been deleted":o.text),figma.widget.h(g,{width:60,fontSize:4,fill:"#808080"}," "),z&&!C&&figma.widget.h(g,{width:60,fontSize:12,fill:"#808080"},"(edited)"))),figma.widget.h(s,{direction:"horizontal",padding:{top:15,bottom:0,left:4,right:4},spacing:8},o.text!="this message has been deleted"&&figma.widget.h(s,{fill:h.extra,cornerRadius:4},figma.widget.h(s,{cornerRadius:4,padding:{top:10,bottom:4,left:8,right:8}},figma.widget.h(F,{src:Ce,onClick:()=>O()}),figma.widget.h(g,{fontSize:14,fill:"#FFFFFF"})),figma.widget.h(s,{padding:{top:6,bottom:6,left:8,right:8}},figma.widget.h(g,{fontSize:14,fill:"#000000"},P)),figma.widget.h(s,{cornerRadius:4,padding:{top:10,bottom:4,left:8,right:8}},figma.widget.h(F,{src:Fe,onClick:()=>T()}),figma.widget.h(g,{fontSize:14,fill:"#FFFFFF"}))),o.text!="this message has been deleted"&&figma.widget.h(s,{fill:"#007AFF",cornerRadius:4,padding:{top:6,bottom:C?0:6,left:8,right:8},onClick:p},figma.widget.h(F,{src:ge,onClick:p}),figma.widget.h(g,{fontSize:14,fill:"#FFFFFF"}," Reply  ")),_&&figma.widget.h(s,{cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:w},o.showReplies&&figma.widget.h(s,{cornerRadius:4,padding:{top:4,bottom:4,left:0,right:0},onClick:w},figma.widget.h(F,{src:ve,onClick:w})),!o.showReplies&&figma.widget.h(s,{cornerRadius:4,padding:{top:4,bottom:4,left:0,right:0},onClick:w},figma.widget.h(F,{src:xe,onClick:w})),figma.widget.h(g,{fontSize:14,fill:(o.showReplies,"#007AFF")},"  ",S," Replies ")),b&&o.text!="this message has been deleted"&&figma.widget.h(s,{cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8}},!o.pinned&&figma.widget.h(F,{src:he,onClick:()=>D(o.id)}),o.pinned&&figma.widget.h(F,{src:we,onClick:()=>D(o.id)})),!b&&o.text!="this message has been deleted"&&figma.widget.h(s,{fill:h.fill,cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8}},figma.widget.h(g,{fontSize:14,fill:(o.showReplies,"#007AFF")},"     ")),!_&&figma.widget.h(s,{fill:h.fill,stroke:o.showReplies?"#FFFFFF":"",cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8}},figma.widget.h(g,{fontSize:14,fill:h.fill},o.showReplies?`\u25B2 ${S} Replies`:`\u25BD ${S} Replies`)),(R||b)&&o.text!="this message has been deleted"&&o.deleteConfirm&&figma.widget.h(s,{fill:h.fill,cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:d},figma.widget.h(F,{src:fe,onClick:d}),figma.widget.h(g,{fontSize:14,fill:"#FF3B30"})),(R||b)&&o.text!="this message has been deleted"&&!o.deleteConfirm&&figma.widget.h(s,{fill:h.fill,cornerRadius:4,padding:{top:6,bottom:6,left:14,right:14}},figma.widget.h(g,{fontSize:14,fill:"#FF3B30"},"  ")),(R||b)&&o.text!="this message has been deleted"&&!o.deleteConfirm&&figma.widget.h(s,{fill:h.fill,cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:m},figma.widget.h(F,{src:ce,onClick:m}),figma.widget.h(g,{fontSize:14,fill:"#FFFFFF"})),(R||b)&&o.text!="this message has been deleted"&&o.deleteConfirm&&figma.widget.h(s,{fill:h.fill,cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:m},figma.widget.h(F,{src:ue,onClick:m}),figma.widget.h(g,{fontSize:14,fill:"#808080"})),R&&figma.widget.h(s,{cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:A},figma.widget.h(F,{src:me,onClick:A}),figma.widget.h(g,{fontSize:14,fill:"#FFFFFF"})),o.text=="this message has been deleted"&&figma.widget.h(s,{fill:"#FFFFFF",cornerRadius:4,padding:{top:6,bottom:C?0:6,left:8,right:8}},figma.widget.h(g,{fontSize:14,fill:"#FFFFFF"},"FAKE")))),o.showReplies&&u&&figma.widget.h(s,{direction:"vertical",width:"fill-parent",padding:{top:C?0:10,bottom:C?0:10,left:32,right:8}},u))}X.register(ke);})();
