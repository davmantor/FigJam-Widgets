(()=>{var H=Object.defineProperty,O=Object.defineProperties;var Y=Object.getOwnPropertyDescriptors;var L=Object.getOwnPropertySymbols;var q=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable;var k=(e,o,d)=>o in e?H(e,o,{enumerable:!0,configurable:!0,writable:!0,value:d}):e[o]=d,T=(e,o)=>{for(var d in o||(o={}))q.call(o,d)&&k(e,d,o[d]);if(L)for(var d of L(o))G.call(o,d)&&k(e,d,o[d]);return e},M=(e,o)=>O(e,Y(o));var{widget:E}=figma,{AutoLayout:a,Text:u,useSyncedState:m,Input:J,Frame:K}=E;function Q(){console.log("ChatWidget rendered2");let[e,o]=m("newMessage",""),[d,f]=m("replyToId",null),[s,c]=m("messages",[]),[h,C]=m("userName","Anonymous"),[x,F]=m("inputPlaceholder","Type a message..."),[b,l]=m("inputActive",!1),[g,p]=m("isEditing",!1),v=()=>figma.widget.h(K,{width:"fill-parent",height:500,overflow:"scroll"},figma.widget.h(a,{direction:"vertical",spacing:-100,padding:4},w())),D=()=>{figma.currentUser&&figma.currentUser.name&&C(figma.currentUser.name)},z=()=>{if(console.log("handleAddMessage called1"),D(),e.trim()!==""){let n=Date.now(),t=new Date(n),i=t.getHours(),r=t.getMinutes(),y=r<10?"0"+r:r.toString(),A=i>=12?"PM":"AM",N=`${i%12||12}:${y} ${A}`,j=figma.currentUser&&figma.currentUser.name?figma.currentUser.name:h;if(g){let R=s.map(S=>S.id===d?M(T({},S),{text:e.trim(),edited:!0}):S);c(R),f(null),p(!1)}else{let R={id:n,parentId:d,text:e.trim(),sender:j,timestamp:N,edited:!1,deleteConfirm:!1};c([...s,R]),f(null),p(!1)}o(""),F("Type a message..."),l(!0),setTimeout(()=>l(!1),2e3)}},U=n=>{f(n);let t=s.find(i=>i.id===n);t&&(o(""),F(`Reply to "${t.text}":`)),l(!0),setTimeout(()=>l(!1),2e3),p(!1)},B=n=>{if(s.find(i=>i.id===n)){let i=s.map(r=>r.id===n?M(T({},r),{text:"this message has been deleted",sender:"Anonymous",edited:!1}):r);c(i),f(null),o(""),F("Type a message..."),l(!0),setTimeout(()=>l(!1),2e3)}},P=n=>{let t=s.find(i=>i.id===n);t&&t.deleteConfirm===!1?c(i=>i.map(r=>r.id===n?M(T({},r),{deleteConfirm:!0}):r)):c(i=>i.map(r=>r.id===n?M(T({},r),{deleteConfirm:!1}):r))},W=n=>{let t=s.find(i=>i.id===n);t&&(f(n),o(t.text),F(`Edit message: "${t.text}"`),l(!0),p(!0),setTimeout(()=>l(!1),2e3))},$=n=>{if(!s.find(y=>y.id===n))return 0;let i=0,r=(y,A)=>{s.forEach(I=>{I.parentId===y&&r(I.id,A+1)}),A>i&&(i=A)};return r(n,0),i},w=(n=null)=>(console.log("render"),s.filter(t=>t.parentId===n).map(t=>figma.widget.h(V,{key:t.id,message:t,onReply:()=>U(t.id),onEdit:()=>W(t.id),onDelete:()=>B(t.id),onDeleteConfirm:()=>P(t.id),replyChain:w(t.id),replyToId:d,user:h,getMessageDepth:$})));return figma.widget.h(a,{direction:"vertical",spacing:8,padding:8,stroke:"#DADCE0",strokeWidth:1,cornerRadius:10},figma.widget.h(a,{direction:"horizontal",spacing:100,padding:8,stroke:b?"#007AFF":"#DADCE0",strokeWidth:1,cornerRadius:4},figma.widget.h(J,{placeholder:x,value:e,onTextEditEnd:n=>o(n.characters)}),figma.widget.h(a,{fill:"#007AFF",padding:8,cornerRadius:4,onClick:z},figma.widget.h(u,{fontSize:14,fill:"#FFFFFF"},"Send"))),figma.widget.h(a,{direction:"vertical",spacing:1,padding:4},w()))}function V({message:e,onReply:o,onDelete:d,onEdit:f,replyChain:s,replyToId:c,user:h,onDeleteConfirm:C,getMessageDepth:x}){console.log("MessageBubble called with message:",e,"and replyToId:",c);let F=e.parentId!==null,b=c===e.id;console.log(`Message ID: ${e.id}, ReplyTo ID: ${c}, Is Being Replied To: ${b}`);let l={fill:b?"#007AFF":"#FFFFFF",color:b?"#FFFFFF":"#000000"};console.log(l);let g=e.sender===h,p=e.edited,v=x(e.id);var D=160;return v==0&&(D=160),console.log("edited",p),console.log("user",h),console.log("sender",e.sender),console.log(g),figma.widget.h(a,{direction:"vertical"},figma.widget.h(a,{direction:"vertical",padding:{top:10,bottom:10,left:8,right:8},stroke:"#D3D3D3",strokeWidth:1,cornerRadius:4,fill:l.fill,width:"fill-parent",maxWidth:350,maxHeight:100},figma.widget.h(a,{direction:"horizontal",horizontalAlignItems:"start",verticalAlignItems:"center",spacing:D,padding:{top:4,bottom:1,left:4,right:8}},figma.widget.h(u,{fontSize:14,fill:l.color},e.sender,":"),figma.widget.h(u,{fontSize:12,fill:l.color},e.timestamp)),figma.widget.h(a,{direction:"horizontal",padding:{top:4,bottom:4,left:4,right:4},fill:l.fill},figma.widget.h(u,null," ",e.text),p&&figma.widget.h(u,{fontSize:12,fill:"#808080"}," (edited)")),figma.widget.h(a,{direction:"horizontal",padding:{top:4,bottom:0,left:4,right:4},spacing:8},figma.widget.h(a,{fill:"#007AFF",cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:o},figma.widget.h(u,{fontSize:14,fill:"#FFFFFF"},"Reply")),g&&!e.deleteConfirm&&figma.widget.h(a,{fill:"#FF3B30",cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:C},figma.widget.h(u,{fontSize:14,fill:"#FFFFFF"},"Delete")),g&&e.deleteConfirm&&figma.widget.h(a,{fill:"#FFFFFF",cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:C,stroke:"#808080"},figma.widget.h(u,{fontSize:14,fill:"#808080"},"Cancel")),g&&e.deleteConfirm&&figma.widget.h(a,{fill:"#FFFFFF",cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:d,stroke:"#FF3B30"},figma.widget.h(u,{fontSize:14,fill:"#FF3B30"},"Confirm Deletion")),g&&figma.widget.h(a,{fill:"#808080",cornerRadius:4,padding:{top:6,bottom:6,left:8,right:8},onClick:f},figma.widget.h(u,{fontSize:14,fill:"#FFFFFF"},"Edit")))),figma.widget.h(a,{direction:"vertical",padding:{top:10,bottom:10,left:32,right:8}},s&&figma.widget.h(a,{direction:"vertical",spacing:10,width:"fill-parent"},s)))}E.register(Q);})();
