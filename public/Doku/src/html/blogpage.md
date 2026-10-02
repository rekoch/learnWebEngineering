# Blog Page erstellen

## Projekt-Ziel

Wir bauen eine Page, die von einem News Artikel oder ähnlichem inspiriert ist.

Die Page enthält:
- **Video/Bild als Slide**
- **Fazit-Bereiche**
- **Tabellen und Bilder**
- **Produkt-Kacheln**
- **Empfohlene Blog-Pages**
- **Like- und Kommentar-Funktionen**

### Entwicklungsansatz

**Struktur vor Design**: Wir fokussieren uns zunächst auf das **HTML-Grundgerüst**. Das Design kommt später mit CSS.

---

## Mindest-Anforderungen

### Kern-Elemente (Must-have)

1. **Video oder Bild** als Slide (freie Tag-Wahl)
2. **Rubrik** 
3. **Titel** im H1-Format
4. **Lead-Text**
5. **Haupttext**
6. **Weitere Überschriften** im H2-Format (max. ein H1 pro Page!)
7. **Weitere Bilder**
8. **Gefällt mir Button**
9. **Empfehlungen** mit weiteren Blog Pages

### Erweiterte Elemente (Nice-to-have)

Wenn Zeit vorhanden:

10. **Autor:innen-Bereich**
11. **Tabelle**
12. **Fazit-Box**
13. **Produkt-Kachel**
14. **Autor:innen-Box** mit Folgen-Button
15. **Thema** mit Folgen-Button

---

## HTML-Grundgerüst erstellen

### Schritt 1: Projekt-Setup

1. **VS Code öffnen**
2. **Ordner für Übungen** anlegen
3. **GitHub Repository** für Referenz: [learnWebEngineering](https://github.com/rekoch/learnWebEngineering)

### Schritt 2: Basis-Datei erstellen

1. **`index.html` anlegen**
2. **Grundgerüst mit `!` + Tab** erstellen
3. **LiveServer starten** für sofortige Änderungsanzeige
4. **Titel definieren**

### Schritt 3: Body-Struktur aufbauen

#### **A. Media-Bereich**
```html
<!-- Video/Image als Slide -->
<iframe 
  src="YOUTUBE_EMBED_URL" 
  title="Video Titel">
</iframe>
<!-- ODER -->
<img src="bild.jpg" alt="Beschreibung">
```

#### **B. Content-Header**
```html
<!-- Rubrik -->
<p class="category">Kategorie</p>

<!-- Haupttitel -->
<h1>Artikel-Titel</h1>

<!-- Lead-Text -->
<h2>Lead-Text oder Untertitel</h2>
```

#### **C. Hauptinhalt**
```html
<!-- Text-Abschnitte -->
<p>Erster Textabschnitt...</p>

<!-- Gruppierte Inhalte -->
<section>
  <h3>Zwischenüberschrift</h3>
  <p>Zugehöriger Text...</p>
  <img src="bild.jpg" alt="Beschreibung">
</section>
```

#### **D. Interaktions-Elemente**
```html
<!-- Gefällt mir Button -->
<button> Gefällt mir</button>
```

#### **E. Empfehlungen**
```html
<!-- Empfohlene Artikel -->
<section>
  <h2>Diese Beiträge könnten dich auch interessieren</h2>
  <!-- Struktur für empfohlene Pages -->
</section>
```

---

## Content-Strategien

### Text-Optionen

| Methode | Beschreibung | Verwendung |
|---------|--------------|------------|
| **Lorem Ipsum** | `lorem` + Tab in VS Code | Platzhalter-Text |
| **Original-Content** | Von Beispiel-Seite kopieren | Realitätsnaher Content |
| **Eigener Content** | Selbst geschriebene Texte | Personalisierte Inhalte |

### Semantische HTML-Struktur

**Verwende logische Gruppierungen:**

```html
<!-- Beispiel: Gruppierte Inhalte -->
<article>
  <section class="intro">
    <h1>Titel</h1>
    <p>Lead</p>
  </section>
  
  <section class="content">
    <h2>Abschnitt</h2>
    <p>Text</p>
  </section>
  
  <section class="recommendations">
    <h2>Empfehlungen</h2>
    <!-- Empfohlene Artikel -->
  </section>
</article>
```

---

## Best Practices

### HTML-Struktur

- **Einen H1** pro Page
- **Logische Heading-Hierarchie** (H1 → H2 → H3)
- **Semantische Tags** verwenden (`article`, `section`, `aside`)
- **Alt-Attribute** für alle Bilder

### Media-Integration

**YouTube-Video einbetten:**
```html
<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  title="Video Titel"
  frameborder="0" 
  allowfullscreen>
</iframe>
```

**Responsive Bilder:**
```html
<img 
  src="bild.jpg" 
  alt="Beschreibende Bildbeschreibung"
  width="100%">
```

---

## Entwicklungsworkflow

### Schritt-für-Schritt-Checklist

1. **HTML-Grundgerüst** erstellen
2. **LiveServer** starten
3. **Media-Bereich** implementieren
4. **Content-Header** aufbauen
5. **Hauptinhalt** strukturieren
6. **Interaktions-Elemente** hinzufügen
7. **Empfehlungen-Bereich** erstellen
8. **Erweiterte Elemente** (optional)

### Iterativer Ansatz

1. **Basis-Version** mit Mindest-Elementen
2. **Schritt-für-Schritt-Erweiterung**
3. **Kontinuierliche Browser-Tests**
4. **Spätere CSS-Integration**

---

## Nächste Schritte

Nach Fertigstellung der HTML-Struktur:

1. **CSS-Styling** hinzufügen
2. **Responsive Design** implementieren 
3. **JavaScript-Interaktivität** einbauen
4. **Performance-Optimierung**

**Ziel erreicht**: Solide HTML-Basis für eine professionelle Blog Page!
