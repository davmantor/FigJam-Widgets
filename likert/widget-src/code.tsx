const { widget, currentUser } = figma;
const { useEffect, useWidgetNodeId, useSyncedState, Text, AutoLayout, Rectangle, Frame, Input, Image } = widget;

interface Response {
  user: { icon: string, name: string };
  rating: number;
  comment: string;
}

const defaultColor = "#FFD966";
const colors = ["#FFAFA3", "#FFC470", "#FFD966", "#85E0A3", "#80CAFF", "#FFADE7", "#D9B8FF", "#E6E6E6", "AFBCCF"];

enum Loading { NOT_SENT, SENT, RECEIVED };

function Widget() {
  const [isFreeResponse, setIsFreeResponse] = useSyncedState("isFreeResponse", true);
  const [question, setQuestion] = useSyncedState("question", "");
  const [questionSource, setQuestionSource] = useSyncedState<null|{question: string, response: Response}>("questionSource", null);
  const [loading, setLoading] = useSyncedState<Loading>("loading", Loading.RECEIVED);
  const [labels, setLabels] = useSyncedState<string[]>("labels", ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]);
  const [responses, setResponses] = useSyncedState<Response[]>("responses", []);
  const widgetId = useWidgetNodeId();

  const regenerateResponse = async () => {
    if (loading === Loading.SENT) return;
    if (questionSource === null) {
      setLoading(Loading.RECEIVED);
      return;
    }
    setResponses([]);
    setLoading(Loading.SENT);
    const data = await generateLikertPoll(questionSource.question, questionSource.response);

    setQuestion(data.question);
    setLabels(data.labels);
    setLoading(Loading.RECEIVED);
  }

  useEffect(() => {
    figma.ui.onmessage = (msg) => {
      if (msg.type === "submitResponse") {
        const newResponse: Response = {
          user: { icon: msg.user.icon || "https://via.placeholder.com/20", name: msg.user.name }, // Use placeholder if no photoUrl
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
      figma.ui.postMessage({ type: "init", user: currentUser, rating: ratingIndex, question, isFreeResponse });
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
  };

  async function generateLikertPoll(question: string, response: Response) {
    const resp = await fetch("http://localhost:3000/generatePoll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, response }),
    });

    const data = await resp.json();
    if (resp.ok) {
      return { question: data.question, labels: data.labels };
    } else {
      console.error("Failed to generate poll", data);
      return { question: `Unable to generate poll (${data.error})`, labels: ["Click 'Regenerate' to get a new poll"] };
    }
  }

  const createCopy = async (res: Response) => {
    const node = await figma.getNodeByIdAsync(widgetId) as WidgetNode;
    const data = await generateLikertPoll(question, res);
    const clone = node.cloneWidget({
      question: data.question,
      questionSource: {question, response: res},
      isFreeResponse: false,
      labels: data.labels,
      loading: Loading.RECEIVED,
      responses: [],
    });
    clone.y = node.y + node.height + 16;
  };

  const responsesWithoutComments = responses.filter((res) => res.comment.length === 0);
  const optionsWithResponses = new Set(responses.map((res) => res.rating));

  return (
    <AutoLayout width={1032} direction="vertical" padding={16} spacing={4} fill={"#ffffff"} cornerRadius={10}>
      <AutoLayout width={"fill-parent"} cornerRadius={{ topLeft: 5, topRight: 5 }} verticalAlignItems="center" spacing={4} padding={8} fill={"#eeeeee"}>
        {loading === Loading.RECEIVED && <Input placeholder="Set a title..." fontSize={18} width={"fill-parent"} value={question} onTextEditEnd={(e) => setQuestion(e.characters)} />}
        {loading !== Loading.RECEIVED && <Text fill="#999999" width="fill-parent">Synthesizing a poll...</Text>}
        {questionSource && (
          <>
            <Text fontSize={12} fill="#777777">
              {questionSource.response.user.name}
            </Text>
            <Image src={questionSource.response.user.icon} width={20} height={20} cornerRadius={10} />
            <Rectangle height={1} width={4} />
            <AutoLayout
              onClick={loading === Loading.RECEIVED ? regenerateResponse : () => {}}
              fill="#dddddd"
              opacity={loading === Loading.RECEIVED ? 1 : 0.5}
              padding={4}
              cornerRadius={4}
              hoverStyle={loading === Loading.RECEIVED ? {fill: "#cccccc"} : {}}
            >
              <Text fontSize={12}>🔄️ Regenerate</Text>
            </AutoLayout>
          </>
        )}
      </AutoLayout>
      {(!isFreeResponse && loading === Loading.RECEIVED) && (
        <>
          <AutoLayout width={1000} spacing={4}>
            {labels.map((label, index) => (
              <AutoLayout onClick={openPluginWindow.bind(null, index + 1)} width={"fill-parent"} height={"fill-parent"} minHeight={150} key={index} direction="vertical" spacing={4} padding={8} fill={colors[index % colors.length]} strokeWidth={2} hoverStyle={{ stroke: "#111111", opacity: 0.8 }}>
                <Text>{label}</Text>
                <AutoLayout spacing={4} wrap={true} width={"fill-parent"}>
                  {responses
                    .filter((res) => res.rating === index + 1)
                    .map((res, i) => (
                      <Image key={i} src={res.user.icon} width={20} height={20} cornerRadius={10} />
                    ))}
                </AutoLayout>
              </AutoLayout>
            ))}
          </AutoLayout>
          {responses.length > 0 && (
            <>
              <Rectangle width={"fill-parent"} height={6} fill={"#ffffff"} />
              <AutoLayout spacing={4} cornerRadius={10}>
                {labels.map((label, index) =>
                  optionsWithResponses.has(index + 1) && (
                    <AutoLayout
                      key={index}
                      verticalAlignItems="center"
                      horizontalAlignItems="center"
                      padding={{ left: 4 }}
                      width={(1000 - (optionsWithResponses.size - 1) * 4) / responses.length * responses.filter((x) => x.rating - 1 === index).length}
                      height={16}
                      fill={colors[index % colors.length]}
                    >
                      <Text fontSize={10} fill={"#333333"}>
                        {Math.round((responses.filter((x) => x.rating - 1 === index).length / responses.length) * 100)}%
                      </Text>
                    </AutoLayout>
                  )
                )}
              </AutoLayout>
            </>
          )}
        </>
      )}
      {(isFreeResponse && loading === Loading.RECEIVED) && (
        <AutoLayout
          onClick={openPluginWindow.bind(null, -1)}
          width="fill-parent"
          height={50}
          direction="vertical"
          spacing={4}
          padding={8}
          fill={defaultColor}
          strokeWidth={2}
          cornerRadius={{ bottomLeft: 5, bottomRight: 5 }}
          hoverStyle={{ stroke: "#111111", opacity: 0.8 }}
        >
          <Text>Click here to enter a response</Text>
        </AutoLayout>
      )}
      {responses.length > 0 && (
        <>
          <Rectangle width={"fill-parent"} height={6} fill={"#ffffff"} />
          <Text>
            {responses.length} {responses.length === 1 ? "response" : "responses"}
          </Text>
          {responsesWithoutComments.length !== responses.length && (
            <AutoLayout direction="horizontal" wrap={true} spacing={4} width={1000}>
              {responses
                .filter((res) => res.comment.length > 0)
                .map((res, i) => (
                  <AutoLayout
                    onClick={createCopy.bind(null, res)}
                    width={(1000 - 16) / 5}
                    minHeight={100}
                    fill={isFreeResponse ? colors[i % colors.length] : colors[(res.rating - 1) % colors.length]}
                    strokeAlign={"inside"}
                    key={i}
                    direction="vertical"
                    spacing={4}
                    padding={8}
                  >
                    <Text width={"fill-parent"} height={"fill-parent"}>
                      {res.comment}
                    </Text>
                    <AutoLayout spacing={4} verticalAlignItems="end" width={"fill-parent"}>
                      <Text fill={"#000000"} opacity={0.5} fontSize={10}>
                        {isFreeResponse ? res.user.name : labels[res.rating - 1]}
                      </Text>
                      <Rectangle height={"fill-parent"} width={"fill-parent"} />
                      <Image src={res.user.icon} width={16} height={16} cornerRadius={10} />
                    </AutoLayout>
                  </AutoLayout>
                ))}
            </AutoLayout>
          )}
        </>
      )}
      {responsesWithoutComments.length > 0 && (
        <>
          {responsesWithoutComments.length !== responses.length && <Rectangle width={"fill-parent"} height={12} fill={"#ffffff"} />}
          <AutoLayout width={"fill-parent"} verticalAlignItems="center" spacing={8}>
            <Frame width={Math.min(20 + (responsesWithoutComments.length - 1) * 10, 110)} height={20} cornerRadius={10} fill={"#ffffff"}>
              {responsesWithoutComments.slice(0, 10).map((res, i) => (
                <Image key={i} src={res.user.icon} stroke="#ffffff" strokeWidth={1} width={20} height={20} cornerRadius={10} x={i * 10} />
              ))}
              {responsesWithoutComments.length > 10 && (
                <AutoLayout horizontalAlignItems="center" fill="#cccccc" stroke="#ffffff" strokeWidth={1} width={20} height={20} cornerRadius={10} x={90}>
                  <Text>+</Text>
                </AutoLayout>
              )}
            </Frame>
            <Text fill="#aaaaaa">
              +{responsesWithoutComments.length} {responsesWithoutComments.length === 1 ? "response" : "responses"} without comments
            </Text>
          </AutoLayout>
        </>
      )}
    </AutoLayout>
  );
}

widget.register(Widget);
