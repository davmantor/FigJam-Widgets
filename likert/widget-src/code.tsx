const { widget, currentUser } = figma;
const { useEffect, Text, useSyncedState, AutoLayout, Rectangle, Input, Image } = widget;

interface Response {
  user: { icon: string };
  rating: number;
  comment: string;
}

function Widget() {
  const [question, setQuestion] = useSyncedState("question", "What did you like/dislike about the class?");
  const [responses, setResponses] = useSyncedState<Response[]>("responses", []);
  const scaleLabels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
  const colors = ["#FFAFA3", "#FFC470", "#FFD966", "#85E0A3", "#80CAFF", "#FFADE7", "#D9B8FF", "#E6E6E6", "AFBCCF"];

  useEffect(() => {
    figma.ui.onmessage = (msg) => {
      if (msg.type === "submitResponse") {
        const newResponse: Response = {
          user: { icon: msg.user.icon || "https://via.placeholder.com/20" }, // Use placeholder if no photoUrl
          rating: msg.rating,
          comment: msg.comment,
        };
        setResponses([...responses, newResponse]);
      }
      if (msg.type === "close") {
        figma.closePlugin();
      }
    };
  });

  const openPluginWindow = (ratingIndex: number) => {
    return new Promise<void>((resolve) => {
      figma.showUI(__html__, { width: 300, height: 300 });
      figma.ui.postMessage({ type: "init", user: currentUser, rating: ratingIndex, question });
    });
  };

  return (
    <AutoLayout direction="vertical" padding={16} spacing={4} fill={'#ffffff'} cornerRadius={10}>
      <AutoLayout width={'fill-parent'} cornerRadius={{topLeft: 5, topRight: 5}} direction="vertical" spacing={4} padding={8} fill={'#eeeeee'}>
        <Input fontSize={18} width={'fill-parent'} value={question} onTextEditEnd={(e) => setQuestion(e.characters)} />
      </AutoLayout>
      <AutoLayout width={1000} spacing={4}>
        {scaleLabels.map((label, index) => (
          <AutoLayout onClick={openPluginWindow.bind(null, index + 1)} width={'fill-parent'} height={'fill-parent'} key={index} direction="vertical" spacing={4} padding={8} fill={colors[index % colors.length]}>
            <Text>{label}</Text>
            <AutoLayout spacing={4} wrap={true} width={'fill-parent'}>
              {responses
                .filter((res) => res.rating === index + 1)
                .map((res, i) => (
                  <Image key={i} src={res.user.icon} width={20} height={20} cornerRadius={10} />
                ))}
            </AutoLayout>
          </AutoLayout>
        ))}
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(Widget);
