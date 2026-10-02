#  Font and Size

Diese wenigen Anpassungen haben schon einen starken Effekt auf das Optische. Basierend auf der Vorlage müssen wir uns auch noch Schrift und Schriftgrösse anschauen.

## Font-Family analysieren

Wenn du z.B. das Titel-Element H2 untersuchst, findest du folgende Definition:

```css
font-family: Lato, Arial, sans-serif;
```

## Body-Font definieren

Wir ergänzen die Schrift auf unsere ganze Page im CSS mittels dem Body-Selektor:

```css
body {
  margin: 20px;
  font-family: Lato, Arial, sans-serif;
}
```

## Computed Styles überprüfen

Wenn du deine Seite nochmals untersuchst, wirst du eine Änderung feststellen. Aber irgendwie stimmt die Schrift noch nicht. Du kannst über **"Computed"** genau sehen, welche Schrift dein Browser ausgewählt hat.

![Font Computed](images/font_computed.png)

**Fallback-Mechanismus:**
1. **Lato** versuchen → noch nicht geladen
2. **Arial** versuchen → ✅ gefunden und verwendet
3. **sans-serif** als letzte Option

> **Problem**: Es rendert die Schrift "Arial", da **Lato** noch nicht verfügbar ist.

---

# Custom Font laden

Damit der Browser Lato statt der Fallback-Schrift verwendet, laden wir die Schriftdateien lokal und binden sie mit `@font-face` ein.

## Font-Loading Grundlagen

**Referenz**: [W3Schools CSS3 Fonts](https://www.w3schools.com/css/css3_fonts.asp)

## Fontdateien herunterladen

Wir verwenden [Lato](https://fonts.google.com/specimen/Lato), eine Schrift unter der **SIL Open Font License 1.1**. Lade beide WOFF2-Dateien herunter, damit auch Umlaute und weitere Zeichen abgedeckt sind:

- [Lato-latin.woff2](https://fonts.gstatic.com/s/lato/v25/S6uyw4BMUTPHjx4wXiWtFCc.woff2)
- [Lato-latin-ext.woff2](https://fonts.gstatic.com/s/lato/v25/S6uyw4BMUTPHjxAwXiWtFCfQ7A.woff2)

Lege die Dateien in `public/02_html_css/fonts/` ab. Die Lizenz liegt dort als `OFL.txt` bei. In diesem Ordner erstellst du auch `lato.css` mit den folgenden Definitionen:

## @font-face implementieren

```css
@font-face {
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("Lato-latin-ext.woff2") format("woff2");
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

@font-face {
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("Lato-latin.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

Importiere die gemeinsame Font-Definition in der `fonts.css` deines Beispielordners:

```css
@import url("../fonts/lato.css");
```

So können alle Beispielstände dieselben Fontdateien verwenden.

** Lade die Seite neu** und prüfe unter **Computed → Rendered Fonts**, dass nun **Lato** verwendet wird.

---

# Schriftgrössen und Gewichte definieren

Damit auch die Grössen und font-weight aller Texte stimmen, gehe durch die Elemente aus der Vorlage durch und definiere es entsprechend in deinem CSS.

## H1-Element Beispiel

**Aus der Vorlage extrahierte Werte:**
- **font-weight:** 650
- **font-stretch:** normal  
- **line-height:** 36px
- **font-size:** 30px

```css
h1 {
  font-weight: 650;
  font-stretch: normal;
  line-height: 36px;
  font-size: 30px;
}
```

## Systematisches Vorgehen

1. **H1-H4 Elemente** durchgehen
2. **P-Tags** analysieren
3. **Werte aus Vorlage** übernehmen

> ⚠️ **Beachte**: Falls du den Lead als H2 und weitere als H3 definiert hast, musst du das beim Kopieren entsprechend berücksichtigen!

---

# Globale Text-Optimierungen

Vermutlich gibt es jetzt immer noch klare optische Unterschiede. Ein paar zusätzliche Definitionen kannst du mit einem `*` für alle Elemente hinzufügen:

## Universal-Selector

```css
* {
  text-wrap-mode: wrap;
  text-wrap-style: pretty;
  overflow-wrap: break-word;
  color-scheme: light;
  -webkit-font-smoothing: antialiased;
}
```

## P-Tag Letter-Spacing

```css
p {
  font-weight: 400;
  font-stretch: normal;
  line-height: 28px;
  font-size: 18px;
  letter-spacing: 0.005em;
}
```

---

# Browser-spezifische Optimierungen

## -webkit-font-smoothing

Das `-webkit-font-smoothing` ist etwas speziell und wird [hier nicht unbedingt empfohlen](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth), weil es nicht alle Browser unterstützen.

**Aber**: Es macht im Chrome einen wesentlichen optischen Unterschied!

## A/B Test

**Teste es mit und ohne:**
- **Ohne**: Text wirkt beinahe "zu fett" oder "blurry"
- **Mit**: Schärfere, glattere Darstellung

## Weitere Verbesserungen

Die weiteren Definitionen machen die Umbrüche etc. noch etwas besser:
- **text-wrap-mode**: Intelligentere Textumbrüche
- **text-wrap-style**: Schönere Zeilenumbrüche
- **overflow-wrap**: Besseres Verhalten bei langen Wörtern

**Typography-Grundlage ist gelegt!** 🎉
