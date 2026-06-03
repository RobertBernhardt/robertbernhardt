# todo — robert bernhardt personal page (v2)

## bilder die du brauchst

alle bilder als **png**, ablegen in `/resources/images/`.

| dateiname | format / größe | beschreibung |
|---|---|---|
| `portrait.png` | portrait, ca. 640×840px | dein hauptbild für die hero-sektion. character-select-vibes — kein steifes bewerbungsfoto, eher was mit persönlichkeit. gut ausgeleuchtet, vor neutralem oder dunklem hintergrund. |
| `startup-1.png` | landscape, ca. 800×500px | bild für das erste startup. screenshot der app, foto vom team, whiteboard, whatever du hast. |
| `startup-2.png` | landscape, ca. 800×500px | bild für das zweite startup. |
| `projekt-1.png` | landscape, ca. 800×500px | bild für das erste projekt. |
| `projekt-2.png` | landscape, ca. 800×500px | bild für das zweite projekt. |
| `projekt-3.png` | landscape, ca. 800×500px | bild für das dritte projekt. |
| `book-cover-1.png` | portrait, ca. 400×570px | cover des ersten buchs. |
| `book-cover-2.png` | portrait, ca. 400×570px | cover des zweiten buchs. |
| `book-cover-3.png` | portrait, ca. 400×570px | cover des dritten buchs. |
| `book-cover-4.png` | portrait, ca. 400×570px | cover des vierten buchs. |

> **tipp**: falls du für startups/projekte keine fotos hast, können wir bilder generieren die das thema symbolisieren — sag mir einfach was die themen sind.

> **bilder in modals**: wenn du für einzelne modals zusätzliche bilder willst (z.b. screenshots, fotos, diagramme) — einfach in die json-daten in index.html einpflegen. die modals unterstützen bild-galerien.

---

## inhalte die du ersetzen musst

### in index.html direkt:

#### hero
- [ ] **tagline**: ein kurzer punchiger satz über dich (1 satz)
- [x] **stat-werte**: anpassen, umbenennen, hinzufügen oder entfernen

#### über mich
- [ ] **erster absatz**: wer du bist, was dich antreibt (4-5 sätze)
- [ ] **motto**: dein persönliches motto (1 satz)
- [ ] **zweiter absatz**: was dich anders macht (3-4 sätze)

#### das kann ich
- [ ] **fähigkeiten 1-6**: je titel + 1 satz beschreibung + level (1-5 dots)
- [ ] du kannst beliebig viele skill-items hinzufügen oder entfernen (einfach den `<div class="skill-item reveal">` block kopieren)

#### startups (nur teaser auf der karte)
- [ ] **startup 1**: name, jahreszahlen, 1 satz teaser
- [ ] **startup 2**: name, jahreszahlen, 1 satz teaser

#### projekte (nur teaser auf der karte)
- [ ] **projekt 1-3**: je name + 1 satz teaser
- [ ] du kannst beliebig viele cards hinzufügen (block kopieren + neuen `data-modal` key vergeben)

#### bücher (nur cover + titel auf der karte)
- [ ] **buch 1-4**: je titel + genre

#### interessen (nur teaser auf der kachel)
- [ ] **interesse 1-6**: je titel + icon (emoji) + 1 satz teaser

### in der JSON-daten sektion (`<script id="modal-data">`):

hier liegt der **tiefe content** für die modals. jeder key (z.b. `"startup-1"`) muss zum `data-modal` attribut auf der karte passen.

#### startups
- [ ] **startup 1**: problem (2-3 sätze), dein ansatz (2-3 sätze), was passiert ist (1-2 sätze)
- [ ] **startup 2**: gleiche struktur

#### projekte
- [ ] **projekt 1-3**: je ausgangslage (2-3 sätze) + was du gemacht hast (2-3 sätze)

#### bücher
- [ ] **buch 1-4**: je genre + worum es geht (3-4 sätze)

#### interessen
- [ ] **interesse 1-6**: je warum dich das fasziniert (3-4 sätze)

> **hinweis**: um ein neues item hinzuzufügen:
> 1. card/kachel in HTML kopieren → neuen `data-modal="mein-key"` vergeben
> 2. passenden eintrag in der JSON-sektion hinzufügen mit dem gleichen key
> 3. fertig — das modal wird automatisch generiert

---

### footer
- [ ] **e-mail link**: deine echte e-mail adresse
- [ ] **linkedin link**: dein linkedin-profil url
- [ ] **github link**: dein github-profil url (oder entfernen)

---

## sonstiges
- [ ] favicons erstellen
- [ ] open graph meta tags ergänzen
- [ ] später: englische version + geo-based language switch
