# Breite der Seite

## Problem: Zu breite Darstellung

Im Vergleich wirst du feststellen, dass unsere Page zu breit werden kann. Die Vorlage hat beim Text eine **eingeschränkte Breite**. 

### Analyse mit DevTools

Versuche mittels dem **Dev-Tools in Chrome** herauszufinden, welche Werte und wo du sie hinzufügen musst.

---

## HTML-Struktur optimieren

### Container-Ansatz

Arbeite hier mit dem `div`-Element um den eigentlichen Artikel zu umschliessen und vergib dann eine Klasse, auf welcher du das `max-width` abkopierst.

> **Beachte**: Das Slide Video/Bild hat eine **andere Breite** definiert. Füge also allenfalls zwei verschiedene Klassen dazu oder passe `iframe` an.

### Hero-Bereich Spacing

**Wenn du schon beim iframe bist**: Du findest auch eine margin-Angabe dazu. Wir wollen zwischen Hero-Bild/Video noch etwas Abstand gewinnen.

---

## CSS-Implementation

### Content-Breite definieren

```css
.content-max-width {
  max-width: calc(640px + (80px * 2));
  margin: 0 auto;
}
```

### iframe optimieren

```css
iframe {
  min-width: 100%;
  max-width: 1839px;
  aspect-ratio: 16 / 9;
  height: auto;
  display: block;
  margin: 0 auto 80px auto;
}
```

### Zentrierung verstehen

**Mit `margin: 0 auto;`** kannst du die Elemente zentrieren:
- **0**: Kein vertikaler Margin
- **auto**: Automatische horizontale Zentrierung

---

## Implementierungs-Checklist

1. ** Container-div** um Artikel-Content
2. ** Klasse vergeben** für max-width
3. ** iframe-Spacing** anpassen
4. ** Responsive** testen

**Layout-Breite ist professionell optimiert!**
