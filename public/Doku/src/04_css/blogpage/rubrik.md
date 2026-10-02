#  Rubrik

## Rubrik-Styling optimieren

Die Rubrik "BEISPIELBEITRAG" ist noch nicht ganz korrekt. Die Farbe stimmt nicht. Ausserdem können wir dafür sorgen, dass sicher immer alles mit Grossbuchstaben dargestellt wird.

### CSS-Klasse definieren

Definiere eine Klasse, auf welcher du die Werte vergibst und füge sie überall hinzu, wo du eine Rubrik hast im HTML.

#### **CSS-Implementierung:**

```css
.content-category {
  color: rgb(147, 83, 185);
  text-transform: uppercase;
}
```

#### **HTML-Anwendung:**

```html
<p class="content-category">Beispielbeitrag</p>
```

### Eigenschaften erklärt

| Eigenschaft | Wert | Beschreibung |
|-------------|------|--------------|
| **color** | `rgb(147, 83, 185)` | Violettton für Kategorien |
| **text-transform** | `uppercase` | Automatische Grossschreibung |

### Resultat

- **Korrekte Violettfarbe** wie im Farbschema
- **Automatische Grossbuchstaben** für Konsistenz
- **Wiederverwendbare Klasse** für alle Rubriken

**Rubrik-Styling ist professionell umgesetzt!** 🎉
