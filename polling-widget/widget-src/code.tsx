// This widget allows users to enter a text option, edit it if necessary, and submit it. 
// Once submitted, the text option becomes non-editable. The widget consists of two main components:
// 1. EditableText: Handles displaying and editing of a single text entry.
// 2. PollingWidget: Manages the overall layout and state, including submission of the text entry.
// test
//a
const { widget } = figma
const { useSyncedState, AutoLayout, Input, Text, SVG, Frame } = widget
// Define the types of properties that our EditableText component will use.
interface EditableTextProps {
  initialValue: string // The initial text to show in the component.
  onValueChange: (newValue: string) => void // What to do when the text changes.
  isEditable: boolean // Can we edit this text?
}
const textArray: EditableTextProps[] = [

]

// This component can either let you edit text or just show you the text.
function EditableText({ initialValue, onValueChange, isEditable }: EditableTextProps) {
  // 'isEditing' tracks if we're currently editing text. 'setIsEditing' changes this status.
  const [isEditing, setIsEditing] = useSyncedState('isEditing', false)
  // 'inputValue' holds the current text. 'setInputValue' updates this text.
  const [inputValue, setInputValue] = useSyncedState('inputValue', initialValue)

  // This is what the component looks like on the screen.
  // creates a vertically stacked container that either displays an editable text input 
  // (when editing is allowed and active) or static text with an optional edit icon (when editing is not active). 
  // The appearance and behavior dynamically change based on whether the text is currently being edited or not.
  return (
    <AutoLayout
      direction="vertical"  // Stack things on top of each other.
      spacing={8}  // Space between items inside.
      padding={8}  // Space around the edges inside.
      cornerRadius={4}  // Rounded corners of the border.
      stroke={isEditing ? '#24CE16' : '#E6E6E6'}  // Border color changes when editing.
      strokeWidth={2}  // How thick the border is
      
    >
      {isEditing && isEditable ? (
        <Input
          value={inputValue}  // Show the current text.
          placeholder="Enter option"  // Placeholder when nothing is typed yet.
          onTextEditEnd={(e) => {
            setInputValue(e.characters)
            setIsEditing(false)
            onValueChange(e.characters)
          }}
          width={200}  // How wide the text box is.
        />
      ) : (
        <AutoLayout spacing={8} verticalAlignItems={'center'}>
          <Text fontSize={16}>{inputValue || "Enter option"}</Text>
          {isEditable && (
            <SVG
              src={`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 13.5V10L10 1L14 5L5 14H1.5H1.5ZM10 1L14 5L5 14H1V10L10 1ZM3 11V12H4L12 4L11 3L3 11ZM11 3L12 4L10 6L9 5L11 3ZM9 5L4 10H3V9L9 5Z" fill="black"/>
                    </svg>`}
              onClick={() => setIsEditing(true)}
            ></SVG>
          )}
              <SVG
                src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="30" height="30" rx="15" fill="white"/>
                        <rect x="7.5" y="14.0625" width="15" height="1.875" fill="black" fill-opacity="0.8"/>
                        <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
                      </svg>`}
              />
        </AutoLayout>
        
      )}
      
    </AutoLayout>
  )
  
}

// The main part of our widget where we put everything together.
function PollingWidget() {
  // Keep track of the text and whether the form has been submitted.
  const [inputValue, setInputValue] = useSyncedState('inputValue', '')
  const [isSubmitted, setIsSubmitted] = useSyncedState('isSubmitted', false)
  const [textArray, setTextArray] = useSyncedState('textArray', { initialValue: "test", onValueChange: () => {}, isEditable: true})

  // Handles what happens when text changes.
  const handleValueChange = (newValue: string) => {
    setInputValue(newValue)  // Update our text with the new text.
  }

  // What to do when the submit button is pressed.
  const handleSubmit = () => {
    setIsSubmitted(true)  // Mark the form as submitted.
  }

  const handleAddTextField = () => {
    const newTextArray = [...textArray, { initialValue: "addedtest", onValueChange: () => {}, isEditable: true}]
    setTextArray(newTextArray);
  }


  // How our widget is laid out
  return (
   // textArray.map(() => (
    <AutoLayout
      direction="vertical"  // Stack elements vertically.
      verticalAlignItems="start"  // Align items to the start.
      spacing={16}  // Space between elements.
      padding={16}  // Padding around the inside.
      cornerRadius={8}  // Rounded corners.
      fill={'#FFFFFF'}  // Background color.
      stroke={'#E6E6E6'}  // Border color.
    >
      
      <EditableText //remove hardcode so that handleAddTextField {} adds a new instance of this, use array and map
        initialValue={inputValue}
        onValueChange={handleValueChange}
        isEditable={!isSubmitted}
      />
       <SVG
      src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
       <rect width="30" height="30" rx="15" fill="white"/>
       <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="black" fill-opacity="0.8"/>
       <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
       </svg>`}
       onClick={handleAddTextField }
      />
      
      {!isSubmitted && (
        <AutoLayout>
        <Frame
          width={100}  // Width of the button.
          height={32}  // Height of the button.
          cornerRadius={6}  // Rounded corners of the button.
          fill="#24CE16"  // Color of the button.
          onClick={handleSubmit}  // What to do when clicked.
        >
          <Text fontSize={14} fill="#FFFFFF">
            Submit
          </Text>
        </Frame>
        </AutoLayout>
      )}
    </AutoLayout>
   // ))
  )
}

// Make sure Figma knows this is the widget we want to use.
widget.register(PollingWidget)
