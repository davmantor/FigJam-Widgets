const { widget } = figma 
const { useSyncedState, usePropertyMenu,Text, SVG, Rectangle, Frame,AutoLayout,Input} = widget 


const colors = ["8dd3c7", "ffffb3", "bebada", "fb8072", "80b1d3", "fdb462"]; 
const labels = ["input 1", "input 2", "input 3", "input 4", "input 5", "input 6"]; 
const sampleData=[10,20,30,40,50,60]

const ADD_BUTTON_X = 150;
const ADD_BUTTON_Y = 20;

function BarGraphWidget() 
const [sampleData, setSampleData] = useSyncedState
  const frameWidth = 400;
  const frameHeight = 200;
  const barWidth = 40;
  const barSpacing = 60;
  const barBaseY = frameHeight - 30; 
  const labelY = barBaseY + 10; 
  const title = "chart"
  const incremenValue=(index:number)=>{
    const newData=[...SampleData];
    newData[index]+=10;

}
 
  return (
  <AutoLayout
  directionm="horizontal" x={10} y={frameHeight +10}> 
 data.map(_, index) = useSyncedState
          <svg key={index} width="24" height="24" onClick={() => incrementValue(index)}>
            {/* SVG for increment button */}
            <rect width="24" height="24" fill="lightgray" />
            <text x="12" y="16" textAnchor="middle" fill="black">+</text>
          </svg>
         
        
  <Frame
width={frameWidth} height={frameHeight}>
  {data.map((height, index))}
  {title} 
  </Frame>

  ╵

  
  <Rectangle
            key={`bar-${index}`} 
            x={barSpacing * index + 20} 
            y={barBaseY - value} 
            width={50}
            height={60}
            fill={`#FFFFFF`} 
            rotation={180}
          />
       
         
      <Text
        x={frameWidth / 2 - 110} 
        y={20} 
        fontSize={16}
        fontWeight="bold"
      >
     
        
        
        {title} 
      </Text>
    
     
   



     
      
    
      
      
      <SVG
        src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="30" height="30" rx="15" fill="white"/>
        <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="black" fill-opacity="0.8"/>
        <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
        </svg>`}
        onClick={() => {
        setCount(count + 1)
        }}
      ></SVG>
   
   </AutoLayout>)
    
        
        
      (labels[index])
        
        
    
  
  


widget.register (BarGraphWidget)
