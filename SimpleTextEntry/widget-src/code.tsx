// widget-src/code.tsx
const { widget } = figma;
const { AutoLayout, Text, Input, Image, SVG, useSyncedState } = widget;

function timeString(d: Date) {
  const mo = d.getMonth() + 1;
  const day = d.getDate();
  const hr12 = d.getHours() % 12 || 12;
  const min = d.getMinutes().toString().padStart(2, "0");
  const ampm = d.getHours() >= 12 ? "PM" : "AM";
  return `${mo}/${day} ${hr12}:${min} ${ampm}`;
}

const FALLBACK_AVATAR = `
<svg width="32" height="32" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
  <g fill="none">
    <circle cx="45" cy="45" r="44" fill="#E5E5E5"/>
    <circle cx="45" cy="37" r="16" fill="#C9C9C9"/>
    <path d="M16 74c6-15 17-22 29-22s23 7 29 22" fill="#C9C9C9"/>
  </g>
</svg>`.trim();

function Widget() {
  const [text, setText] = useSyncedState<string>("text", "");
  const [submitted, setSubmitted] = useSyncedState<boolean>("submitted", false);

  const [name, setName] = useSyncedState<string>("name", "");
  const [photoUrl, setPhotoUrl] = useSyncedState<string | null>("photoUrl", null);
  const [timestampISO, setTimestampISO] = useSyncedState<string | null>("timestampISO", null);
  const [storedText, setStoredText] = useSyncedState<string>("storedText", "");

  const handleSubmit = () => {
    if (submitted) return;
    const t = text.trim();
    if (!t) return;

    const cu = figma.currentUser;
    const now = new Date();

    setStoredText(t);
    setName(cu?.name || "Anonymous");
    setPhotoUrl(cu?.photoUrl ?? null); // key change: store URL, don't fetch
    setTimestampISO(now.toISOString());
    setSubmitted(true);
  };

  const header = (
    <AutoLayout spacing={8} padding={{ vertical: 8 }} verticalAlignItems="center">
      {photoUrl ? (
        <Image src={photoUrl} width={32} height={32} cornerRadius={16} />
      ) : (
        <SVG src={FALLBACK_AVATAR} />
      )}
      <AutoLayout direction="vertical" spacing={2}>
        <Text fontSize={14} fontWeight="medium">{name || "—"}</Text>
        <Text fontSize={12} fill="#666">
          {timestampISO ? timeString(new Date(timestampISO)) : ""}
        </Text>
      </AutoLayout>
    </AutoLayout>
  );

  return (
    <AutoLayout
      name="Simple Response Widget"
      direction="vertical"
      spacing={8}
      padding={16}
      width={420}
      cornerRadius={12}
      stroke="#000"
      strokeWidth={1}
      effect={{ type: "drop-shadow", color: "#0000001A", offset: { x: 0, y: 2 }, blur: 8 }}
      fill="#FFF"
    >
      {!submitted ? (
        <>
          <Text fontSize={16} fontWeight="bold">Your response</Text>
          <Input
            value={text}
            placeholder="Type here…"
            fontSize={14}
            inputBehavior="multiline"
            width="fill-parent"
            height={120}
            onTextEditEnd={(e) => setText(e.characters)}
          />
          <AutoLayout>
            <AutoLayout
              padding={{ vertical: 8, horizontal: 14 }}
              cornerRadius={8}
              fill="#000"
              hoverStyle={{ opacity: 0.9 }}
              onClick={handleSubmit}
            >
              <Text fontSize={14} fill="#FFF">Submit</Text>
            </AutoLayout>
          </AutoLayout>
        </>
      ) : (
        <>
          {header}
          <Text fontSize={14} width="fill-parent">
            {storedText}
          </Text>
          <Text fontSize={12} fill="#666">
            Submission locked. Ask the instructor if you need to reset.
          </Text>
        </>
      )}
    </AutoLayout>
  );
}

figma.widget.register(Widget);
