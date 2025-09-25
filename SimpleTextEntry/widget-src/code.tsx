// widget-src/code.tsx
const { widget } = figma;
const {
  AutoLayout,
  Text,
  Input,
  Image,
  SVG,
  useSyncedState,
} = widget;

function timeString(d: Date) {
  const mo = d.getMonth() + 1;
  const day = d.getDate();
  const hr12 = d.getHours() % 12 || 12;
  const min = d.getMinutes().toString().padStart(2, "0");
  const ampm = d.getHours() >= 12 ? "PM" : "AM";
  return `${mo}/${day} ${hr12}:${min} ${ampm}`;
}

const ADMIN_PASSWORD = "312cmpm15";

const FALLBACK_AVATAR = `
<svg width="32" height="32" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
  <g fill="none">
    <circle cx="45" cy="45" r="44" fill="#E5E5E5"/>
    <circle cx="45" cy="37" r="16" fill="#C9C9C9"/>
    <path d="M16 74c6-15 17-22 29-22s23 7 29 22" fill="#C9C9C9"/>
  </g>
</svg>`.trim();

const CROWN_ICON = `
<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 18h18l-1.2-8-4.6 3.2L12 6 8.8 13.2 4.2 10z" stroke="#111" stroke-width="1.5" fill="none" stroke-linejoin="round"/>
  <path d="M6 18v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="#111" stroke-width="1.5" stroke-linecap="round"/>
</svg>`.trim();

function Widget() {
  // Core submission state
  const [text, setText] = useSyncedState<string>("text", "");
  const [submitted, setSubmitted] = useSyncedState<boolean>("submitted", false);
  const [name, setName] = useSyncedState<string>("name", "");
  const [photoUrl, setPhotoUrl] = useSyncedState<string | null>("photoUrl", null);
  const [timestampISO, setTimestampISO] = useSyncedState<string | null>("timestampISO", null);
  const [storedText, setStoredText] = useSyncedState<string>("storedText", "");

  // Appearance settings controlled by admin panel (defaults from the complex widget)
  const [boxWidth, setBoxWidth] = useSyncedState<number>("boxWidth", 1020);
  const [boxHeight, setBoxHeight] = useSyncedState<number>("boxHeight", 235);
  const [fontSizeBase, setFontSizeBase] = useSyncedState<number>("fontSizeBase", 16);
  const [borderColor, setBorderColor] = useSyncedState<string>("borderColor", "#000000");
  const [borderWidth, setBorderWidth] = useSyncedState<number>("borderWidth", 1);
  const [shadowColor, setShadowColor] = useSyncedState<string>("shadowColor", "#000000");
  const [shadowOffsetX, setShadowOffsetX] = useSyncedState<number>("shadowOffsetX", 0);
  const [shadowOffsetY, setShadowOffsetY] = useSyncedState<number>("shadowOffsetY", 2);
  const [shadowBlur, setShadowBlur] = useSyncedState<number>("shadowBlur", 10);
  const [shadowSpread, setShadowSpread] = useSyncedState<number>("shadowSpread", 0);

  const handleSubmit = () => {
    if (submitted) return;
    const t = text.trim();
    if (!t) return;

    const cu = figma.currentUser;
    const now = new Date();

    setStoredText(t);
    setName(cu?.name || "Anonymous");
    setPhotoUrl(cu?.photoUrl ?? null);
    setTimestampISO(now.toISOString());
    setSubmitted(true);
  };

  // Admin panel flow
  function openAdminFlow(): Promise<void> {
    return new Promise<void>((resolve) => {
      figma.showUI(__html__, { width: 480, height: 420 });

      const sendPanelState = () => {
        figma.ui.postMessage({
          type: "showAdminPanel",
          values: {
            boxWidth,
            boxHeight,
            fontSizeBase,
            borderColor,
            borderWidth,
            shadowColor,
            shadowOffsetX,
            shadowOffsetY,
            shadowBlur,
            shadowSpread,
          },
        });
      };

      const handler = (msg: any) => {
        switch (msg.type) {
          case "ready":
            figma.ui.postMessage({ type: "promptPassword" });
            break;

          case "passwordSubmit":
            if (msg.value === ADMIN_PASSWORD) {
              sendPanelState();
            } else {
              figma.ui.postMessage({ type: "error", message: "Incorrect password" });
            }
            break;

          // Live updates from panel
          case "updateWidth":
            if (typeof msg.value === "number") setBoxWidth(msg.value);
            break;
          case "updateHeight":
            if (typeof msg.value === "number") setBoxHeight(msg.value);
            break;
          case "updateFontSize":
            if (typeof msg.value === "number") setFontSizeBase(msg.value);
            break;
          case "updateBorderWidth":
            if (typeof msg.value === "number") setBorderWidth(msg.value);
            break;
          case "updateBorderColor":
            if (typeof msg.value === "string") setBorderColor(msg.value);
            break;

          case "updateShadowColor":
            if (typeof msg.value === "string") setShadowColor(msg.value);
            break;
          case "updateShadowOffsetX":
            if (typeof msg.value === "number") setShadowOffsetX(msg.value);
            break;
          case "updateShadowOffsetY":
            if (typeof msg.value === "number") setShadowOffsetY(msg.value);
            break;
          case "updateShadowBlur":
            if (typeof msg.value === "number") setShadowBlur(msg.value);
            break;
          case "updateShadowSpread":
            if (typeof msg.value === "number") setShadowSpread(msg.value);
            break;

          case "resetResponse":
            setSubmitted(false);
            setText("");
            setStoredText("");
            setName("");
            setPhotoUrl(null);
            setTimestampISO(null);
            break;

          case "close":
          case "done":
            figma.ui.off("message", handler as any);
            figma.closePlugin();
            resolve();
            break;
        }
      };

      figma.ui.on("message", handler);
      figma.ui.postMessage({ type: "promptPassword" });
    });
  }

  const header = (
    <AutoLayout spacing={8} padding={{ vertical: 8 }} verticalAlignItems="center" width="fill-parent">
      {photoUrl ? (
        <Image src={photoUrl} width={32} height={32} cornerRadius={16} />
      ) : (
        <SVG src={FALLBACK_AVATAR} />
      )}
      <AutoLayout direction="vertical" spacing={2} width="fill-parent">
        <Text fontSize={fontSizeBase} fontWeight="medium">{name || "—"}</Text>
        <Text fontSize={Math.max(10, fontSizeBase - 2)} fill="#666">
          {timestampISO ? timeString(new Date(timestampISO)) : ""}
        </Text>
      </AutoLayout>

      <AutoLayout
        padding={6}
        cornerRadius={8}
        hoverStyle={{ fill: "#F2F2F2" }}
        onClick={() => openAdminFlow()}
      >
        <SVG src={CROWN_ICON} width={fontSizeBase + 6} height={fontSizeBase + 6} />
      </AutoLayout>
    </AutoLayout>
  );

  return (
    <AutoLayout
      name="Simple Response Widget"
      direction="vertical"
      spacing={8}
      padding={{ top:16, right:16, bottom:8, left:16 }}
      width={boxWidth}
      height={boxHeight}
      cornerRadius={12}
      stroke={borderColor}
      strokeWidth={borderWidth}
      effect={{
        type: "drop-shadow",
        color: shadowColor,
        offset: { x: shadowOffsetX, y: shadowOffsetY },
        blur: shadowBlur,
        spread: shadowSpread,
      }}
      fill="#FFF"
    >
      {!submitted ? (
        <>
          {/* Inline title + crown */}
          <AutoLayout
            direction="horizontal"
            width="fill-parent"
            verticalAlignItems="center"
            spacing={8}
          >
            <Text fontSize={fontSizeBase + 2} fontWeight="bold" layoutGrow={1}>
              Your response
            </Text>

            <AutoLayout
              padding={6}
              cornerRadius={8}
              hoverStyle={{ fill: "#F2F2F2" }}
              onClick={() => openAdminFlow()}
            >
              <SVG src={CROWN_ICON} width={fontSizeBase + 6} height={fontSizeBase + 6} />
            </AutoLayout>
          </AutoLayout>

          {/* Growable input area so the button never gets clipped */}
          <AutoLayout direction="vertical" layoutGrow={1} width="fill-parent">
            <Input
              value={text}
              placeholder="Type here…"
              fontSize={fontSizeBase}
              inputBehavior="multiline"
              width="fill-parent"
              height="fill-parent"
              onTextEditEnd={(e) => setText(e.characters)}
            />
          </AutoLayout>

          {/* Submit row anchored below */}
          <AutoLayout>
            <AutoLayout
              padding={{ vertical: 8, horizontal: 14 }}
              cornerRadius={8}
              fill="#000"
              hoverStyle={{ opacity: 0.9 }}
              onClick={handleSubmit}
            >
              <Text fontSize={fontSizeBase} fill="#FFF">Submit</Text>
            </AutoLayout>
          </AutoLayout>
        </>
      ) : (
        <>
          {header}
          <Text fontSize={fontSizeBase} width="fill-parent">
            {storedText}
          </Text>
          <Text fontSize={Math.max(10, fontSizeBase - 2)} fill="#666">
            Submission locked. Ask the instructor if you need to reset.
          </Text>
        </>
      )}
    </AutoLayout>
  );
}

figma.widget.register(Widget);
