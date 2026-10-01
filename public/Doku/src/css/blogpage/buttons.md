# 🔘 Buttons

## Button Design System

Die Buttons sehen noch nicht ganz so aus wie sie sollten. Häufig gibt es in einem Design System einen **"primary"** und **"standard"** oder **"secondary"** Button. Das ist bei uns nicht anders.

### Button-Hierarchie

| Button-Typ | Verwendung | Beschreibung |
|------------|------------|--------------|
| **Primary** | Primäre Aktion | Die gewünschte/erwartete Aktion |
| **Secondary** | Alternative Aktionen | Weniger prominente Buttons |

> ⚠️ **Realität**: Teilweise wird das auch bei uns nicht ganz eingehalten und es gibt mehr als einen Primary Button.

### Design-Referenzen

**Design System**: [Button-Design und Zustände](https://www.galaxus.ch/designsystem/components/button-design#states-primary-button)

> **Tipp**: Da es nicht so einfach ist die nötigen CSS-Werte zu finden, kann es einfacher sein, wenn du das Beispiel im **Dev-Tool des Browsers** anschaust. Immerhin die Farben findest du einigermassen übersichtlich.

### Responsive Considerations

Damit sich die Buttons in jedem Layout korrekt verhalten, werden wir auch mit **Responsive Design** in Berührung kommen. Mache allenfalls noch das **Responsive Web Design** Beispiel durch, damit du das besser verstehst.

---

## CSS-Struktur mit Verschachtelung

Um die Varianten zu stylen, können wir uns sowohl die **CSS-Verschachtelung** sowie den Umstand zu Nutze machen, dass es ein `button`-Element ist. Damit können wir den **"standard"** auf dem Button und mittels einer Klasse **"primary"** als Variante definieren.

---

## Button.css erstellen

### Setup-Prozess

Buttons sind gut geeignet, dass wir das ganze CSS aus dem "main" loslösen und ein eigenes dafür erstellen. So hast du den CSS-Code separat und ist einfacher zu verstehen.

#### **Schritt 1: Datei erstellen**
- **`buttons.css`** File erstellen

#### **Schritt 2: Import hinzufügen**
Im `main.css` am Anfang des Files:

```css
@import url("buttons.css");
```

### CSS-Implementierung

Danach fügst du nach und nach alle CSS-Definitionen ein, die für Primary und Standard-Button nötig sind. Sinnvoller nutzt du die **Macht des Cascadings**: Indem du z.B. den Standard-Button als ersten definierst, kannst du danach die Abweichungen für primary und die states hinzufügen (hover, focus, disabled).

#### **Vollständiges Button-CSS:**

```css
button {
  background-color: #eee;
  color: #000;
  border: 1px solid #0003;
  border-radius: 3px;
  padding: 7px 15px;
  width: 100%;
  cursor: pointer;
  text-align: center;
  font-family: inherit;
  font-size: inherit;
  
  &:hover {
    background-color: #ddd;
  }
  
  &:focus-visible {
    background-color: #ddd;
  }
  
  &.primary {
    background-color: #444;
    color: #fff;
    
    &:hover {
      background-color: #000;
    }
    
    &:focus-visible {
      background-color: #000;
    }
  }
  
  &.disabled,
  &.primary.disabled {
    color: #0006;
    border: 1px solid #0001;
  }
}
```

### CSS-Eigenschaften erklärt

| Eigenschaft | Standard | Primary | Beschreibung |
|-------------|----------|---------|--------------|
| **background-color** | `#eee` | `#444` | Hintergrundfarbe |
| **color** | `#000` | `#fff` | Textfarbe |
| **border** | `1px solid #0003` | Gleich | Rahmen |
| **border-radius** | `3px` | Gleich | Runde Ecken |
| **padding** | `7px 15px` | Gleich | Innenabstand |
| **width** | `100%` | Gleich | Volle Breite |
| **cursor** | `pointer` | Gleich | Hand-Cursor |

### States und Interaktionen

#### **Hover-States:**
- **Standard**: Helleres Grau (`#ddd`)
- **Primary**: Schwarz (`#000`)

#### **Focus-States:**
- **Accessibility**: Gleiche Farben wie Hover
- **Keyboard-Navigation**: Bessere Sichtbarkeit

#### **Disabled-States:**
- **Transparente Textfarbe**: `#0006`
- **Schwacher Rahmen**: `#0001`

---

## HTML-Implementation

Am Schluss musst du im HTML überall noch **"primary"** hinzufügen, wo es ein solcher ist.

### HTML-Beispiele

#### **Standard Button:**
```html
<button>Standard Button</button>
```

#### **Primary Button:**
```html
<button class="primary">Primary Button</button>
```

#### **Disabled Button:**
```html
<button class="primary disabled">Disabled Primary</button>
```

### Vorlage-Konformität

**Hältst du dich an die Vorlage**, sind das tatsächlich aktuell **alle Buttons als Primary**. Eventuell können wir diesen Umstand später noch verbessern.

**Button-System ist professionell implementiert!** 🎉


