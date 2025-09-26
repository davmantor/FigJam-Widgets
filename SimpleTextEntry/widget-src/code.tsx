// widget-src/code.tsx
const { widget } = figma;
const { AutoLayout, Text, Input, Image, SVG, useSyncedState } = widget;

const palette = {
    bg: "#F1F5F9",
    fg: "#303844",
    muted: "#747470",
    card: "#FFFFFF",
    border: "#ACACAC",
    accent: "#6ea6fb",
    accentFg: "#FFFFFF",
    danger: "#DC2626",
    dangerFg: "#FFFFFF",
    highlight: "#F2DE56",
  };

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
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M3 8L4.44293 16.6576C4.76439 18.5863 6.43315 20 8.38851 20H15.6115C17.5668 20 19.2356 18.5863 19.5571 16.6576L21 8M3 8L6.75598 11.0731C7.68373 11.8321 9.06623 11.6102 9.70978 10.5989L12 7M3 8C3.82843 8 4.5 7.32843 4.5 6.5C4.5 5.67157 3.82843 5 3 5C2.17157 5 1.5 5.67157 1.5 6.5C1.5 7.32843 2.17157 8 3 8ZM21 8L17.244 11.0731C16.3163 11.8321 14.9338 11.6102 14.2902 10.5989L12 7M21 8C21.8284 8 22.5 7.32843 22.5 6.5C22.5 5.67157 21.8284 5 21 5C20.1716 5 19.5 5.67157 19.5 6.5C19.5 7.32843 20.1716 8 21 8ZM12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7Z"
    stroke="${palette.highlight}"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
`.trim();

function Widget() {
  
  // Core submission state
  const [text, setText] = useSyncedState<string>("text", "");
  const [submitted, setSubmitted] = useSyncedState<boolean>("submitted", false);
  const [name, setName] = useSyncedState<string>("name", "");
  const [photoUrl, setPhotoUrl] = useSyncedState<string | null>("photoUrl", null);
  const [timestampISO, setTimestampISO] = useSyncedState<string | null>("timestampISO", null);
  const [storedText, setStoredText] = useSyncedState<string>("storedText", "");

  // Appearance settings (from admin panel)
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

          case "unlockForEdit":
            setSubmitted(false);
            setText(storedText || "");
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
        <Text fontSize={fontSizeBase} fontWeight="medium" fill={palette.fg}>
          {name || "—"}
        </Text>
        <Text fontSize={Math.max(10, fontSizeBase - 2)} fill={palette.muted}>
          {timestampISO ? timeString(new Date(timestampISO)) : ""}
        </Text>
      </AutoLayout>

      <AutoLayout
        padding={6}
        cornerRadius={8}
        hoverStyle={{ fill: palette.bg }}
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
      padding={{ top: 16, right: 16, bottom: 8, left: 16 }}
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
      fill={palette.card}
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
            <Text
              fontSize={fontSizeBase + 2}
              fontWeight="bold"
              layoutGrow={1}
              fill={palette.fg}
            >
              Your response
            </Text>

            <AutoLayout
              padding={6}
              cornerRadius={8}
              hoverStyle={{ fill: palette.bg }}
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
              fill={palette.fg}
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
              fill={palette.accent}
              hoverStyle={{ opacity: 0.9 }}
              onClick={handleSubmit}
            >
              <Text fontSize={fontSizeBase} fill={palette.accentFg}>
                Submit
              </Text>
            </AutoLayout>
          </AutoLayout>
        </>
      ) : (
        <>
          {header}
          <Text fontSize={fontSizeBase} width="fill-parent" fill={palette.fg}>
            {storedText}
          </Text>
          <Text fontSize={Math.max(10, fontSizeBase - 2)} fill={palette.muted}>
            Submission locked. Ask the instructor if you need to reset.
          </Text>
        </>
      )}
    </AutoLayout>
  );
}

figma.widget.register(Widget);
