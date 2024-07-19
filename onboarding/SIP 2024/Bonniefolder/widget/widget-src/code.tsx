const { widget } = figma
const { useSyncedState, usePropertyMenu,Text, SVG, Rectangle, Frame,AutoLayout,Input} = widget
const colors = ["8dd3c7", "ffffb3", "bebada", "fb8072", "80b1d3", "fdb462"];
const sampleData = [10,20,30,40,50,60]



function BarGraphWidget() {
  const [data, setData] = useSyncedState("data", sampleData)
  const frameWidth = 400;
  const frameHeight = 200;
  const barWidth = 40;
  const barSpacing = 60;
  const barBaseY = frameHeight - 80;
  const labelY = barBaseY + 5;
  const title = "chart"
 
  
  const incrementValue = (index:number) => {
    const newData = [...data];
        newData[index] += 10;
        setData(newData)
}

const decrementValue = (index:number) => {
  const newData = [...data];
      newData[index] -= 10;
      setData(newData)
}


const addingbar = () => {
const newdata = [...data,70]
setData(newdata)
console.log(data)
console.log(newdata)
}
  
return (
<AutoLayout
  direction="vertical"
  verticalAlignItems="end"
  horizontalAlignItems={"center"}
>
<Text
   x={frameWidth/2 -80} y={60} fontSize={16} fontWeight="bold">
  {title}
</Text>

<AutoLayout
direction="horizontal"
verticalAlignItems="end"
spacing={20} >

{data.map((value, index) => (

<AutoLayout
    direction="vertical"
    horizontalAlignItems={"center"}
    spacing={15}>
      
      <Text  fontSize={12}> 
        {value}
        </Text>
        
          <Rectangle
            key={`bar-${index}`}
            width={barWidth}
            height={value}
            fill={`#${colors[index % colors.length]}`}
            rotation={180}
            />

         
        
          <Text
         fontSize={12}>
        {"input"+[index+1]}
          </Text>
          
  

          <SVG
            key={`button-${index}`}
            width={20}
            height={20}
           
           onClick={() => incrementValue(index)} 
            src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="30" height="30" rx="15" fill="white"/>
              <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="black" fill-opacity="0.8"/>
              <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
              </svg>`}
          />



          <SVG
            key={`button-${index}`}
            width={20}
            height={20}
           
            onClick={() => decrementValue(index)}
            src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="30" rx="15" fill="white"/>
        <rect x="7.5" y="14.0625" width="15" height="1.875" fill="black" fill-opacity="0.8"/>
        <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
        </svg>`}
          />


</AutoLayout>
))}

         <SVG   
       
        width={20}
        height={20}
       
        onClick={() => addingbar()} 
        src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="30" height="30" rx="15" fill="white"/>
              <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="black" fill-opacity="0.8"/>
              <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
              </svg>`}
          />







      
  


 
    




    

       
      
        
   

</AutoLayout>
</AutoLayout>


);
}

widget.register(BarGraphWidget)