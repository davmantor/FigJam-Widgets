const { widget, currentUser } = figma;
const { useEffect, Text, useSyncedState, AutoLayout, Rectangle, Image } = widget;

function Widget() {
  const [question, setQuestion] = useSyncedState("question", "What did you like/dislike about the class?");
  const [responses, setResponses] = useSyncedState("responses", []);
  const scaleLabels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];

  useEffect(() => {
    figma.ui.onmessage = (msg) => {
      if (msg.type === "submitResponse") {
        const newResponse = {
          user: { icon: msg.user.icon || "https://via.placeholder.com/20" }, // Use placeholder if no photoUrl
          rating: msg.rating,
          comment: msg.comment,
        };
        console.log("back in widget", msg.user)
        setResponses([...responses, newResponse]);
      }
      if (msg.type === "close") {
        figma.closePlugin();
      }
    };
  });

  const openPluginWindow = () => {
    return new Promise<void>((resolve) => {
      figma.showUI(__html__, { width: 300, height: 300 });
      figma.ui.postMessage({ type: "setUser", user: currentUser });
    });
  };

  return (
    <AutoLayout padding={16} spacing={8} onClick={openPluginWindow}>
      <Text fontSize={18}>{question}</Text>
      {scaleLabels.map((label, index) => (
        <AutoLayout key={index} direction="horizontal" spacing={4} padding={8}>
          <Text>{label}</Text>
          <Rectangle width={20} height={20} cornerRadius={5} fills={[{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }]} />
          <AutoLayout spacing={4}>
            {responses
              .filter((res) => res.rating === index + 1)
              .map((res, i) => (
                <Image key={i} src={res.user.icon} width={20} height={20} cornerRadius={10} />
              ))}
          </AutoLayout>
        </AutoLayout>
      ))}
    </AutoLayout>
  );
}

widget.register(Widget);
