const { widget, currentUser } = figma;
const { useEffect, Text, useSyncedState, AutoLayout, Rectangle, Frame, Input, Image } = widget;

interface Response {
  user: { icon: string };
  rating: number;
  comment: string;
}

function Widget() {
  const [question, setQuestion] = useSyncedState("question", "");
  const [responses, setResponses] = useSyncedState<Response[]>("responses", []);
  const scaleLabels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
  const colors = ["#FFAFA3", "#FFC470", "#FFD966", "#85E0A3", "#80CAFF", "#FFADE7", "#D9B8FF", "#E6E6E6", "AFBCCF"];

  useEffect(() => {
    figma.ui.onmessage = (msg) => {
      if (msg.type === "submitResponse") {
        const newResponse: Response = {
          user: { icon: msg.user.icon || "https://via.placeholder.com/20" }, // Use placeholder if no photoUrl
          rating: msg.rating,
          comment: msg.comment.trim(),
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
      figma.showUI(__html__, { width: 300, height: 300, title: question });
      figma.ui.postMessage({ type: "init", user: currentUser, rating: ratingIndex, question });
    });
  };

  const createSticky = async (res: Response) => {
    const sticky = figma.createSticky();
    const color = colors[(res.rating - 1) % colors.length];
    const rgb = { r: parseInt(color.slice(1, 3), 16) / 255, g: parseInt(color.slice(3, 5), 16) / 255, b: parseInt(color.slice(5, 7), 16) / 255 };
    sticky.fills = [{ type: "SOLID", color: rgb }];
    sticky.authorVisible = false;
    sticky.x = figma.viewport.center.x - sticky.width / 2;
    sticky.y = figma.viewport.center.y - sticky.height / 2;

    // Load the font before setting characters
    await figma.loadFontAsync(sticky.text.fontName as FontName);
    sticky.text.characters = res.comment;
  }

  const responsesWithoutComments = responses.filter(res => res.comment.length === 0);

  return (
    <AutoLayout direction="vertical" padding={16} spacing={4} fill={'#ffffff'} cornerRadius={10}>
      <AutoLayout width={'fill-parent'} cornerRadius={{topLeft: 5, topRight: 5}} direction="vertical" spacing={4} padding={8} fill={'#eeeeee'}>
        <Input placeholder="Set a title..." fontSize={18} width={'fill-parent'} value={question} onTextEditEnd={(e) => setQuestion(e.characters)} />
      </AutoLayout>
      <AutoLayout width={1000} spacing={4}>
        {scaleLabels.map((label, index) => (
          <AutoLayout onClick={openPluginWindow.bind(null, index + 1)} width={'fill-parent'} height={'fill-parent'} minHeight={150} key={index} direction="vertical" spacing={4} padding={8} fill={colors[index % colors.length]} strokeWidth={2} hoverStyle={{stroke: "#111111", opacity: 0.8}}>
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
      {responses.length > 0 && <>
        <Rectangle width={'fill-parent'} height={12} fill={'#ffffff'} />
        <Text>{responses.length} {responses.length === 1 ? "response" : "responses"}</Text>
        {responsesWithoutComments.length !== responses.length &&
          <AutoLayout direction="horizontal" wrap={true} spacing={4} width={1000}>
            {
              responses.filter(res => res.comment.length > 0).map((res, i) => (
                <AutoLayout onClick={createSticky.bind(null, res)} width={(1000 - 16) / 5} minHeight={100} fill={colors[(res.rating - 1) % colors.length]} strokeAlign={"inside"} key={i} direction="vertical" spacing={4} padding={8}>
                  <Text width={'fill-parent'} height={'fill-parent'}>{res.comment}</Text>
                  <AutoLayout spacing={4} verticalAlignItems="end" width={'fill-parent'}>
                    <Text fill={'#000000'} opacity={0.5} fontSize={10}>{scaleLabels[res.rating - 1]}</Text>
                    <Rectangle height={'fill-parent'} width={'fill-parent'} />
                    <Image src={res.user.icon} width={16} height={16} cornerRadius={10} />
                  </AutoLayout>
                </AutoLayout>
              ))
            }
          </AutoLayout>
        }
      </>}
      {
        responsesWithoutComments.length > 0 && <>
          {responsesWithoutComments.length !== responses.length && <Rectangle width={'fill-parent'} height={12} fill={'#ffffff'} />}
          <AutoLayout width={'fill-parent'} verticalAlignItems="center" spacing={8}>
            <Frame width={Math.min(20 + (responsesWithoutComments.length - 1) * 10, 110)} height={20} cornerRadius={10} fill={'#ffffff'}>
              {responsesWithoutComments.slice(0, 10).map((res, i) => (
                <Image key={i} src={res.user.icon} stroke="#ffffff" strokeWidth={1} width={20} height={20} cornerRadius={10} x={i * 10} />
              ))}
              {responsesWithoutComments.length > 10 && <AutoLayout horizontalAlignItems="center" fill="#cccccc" stroke="#ffffff" strokeWidth={1} width={20} height={20} cornerRadius={10} x={90}><Text>+</Text></AutoLayout>}
            </Frame>
            <Text fill="#aaaaaa">+{responsesWithoutComments.length} {responsesWithoutComments.length === 1 ? "response" : "responses"} without comments</Text>
          </AutoLayout>
        </>
      }
    </AutoLayout>
  );
}

widget.register(Widget);
