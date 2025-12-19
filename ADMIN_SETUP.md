# Admin Panel Setup & Gebruikshandleiding

## 🔗 Toegang

Ga naar: **`https://www.vishandelolivierenkelly.be/#/admin`**

**Wachtwoord:** `DeWulk2025!`

---

## 🔧 Eerste Keer Setup (GitHub Token)

Om wijzigingen op te slaan moet je een **GitHub Personal Access Token** aanmaken:

### Stap-voor-stap:

1. Ga naar [github.com/settings/tokens](https://github.com/settings/tokens)
2. Klik op **"Generate new token (classic)"**
3. Geef een beschrijvende naam: bijv. `De Wulk Admin Panel`
4. **Vink aan:** `repo` (volledige repository toegang nodig)
5. Klik onderaan op **"Generate token"**
6. **Kopieer de token** (je ziet hem maar 1 keer!)
7. Plak de token in het admin panel onder "GitHub Token"

> ⚠️ **Let op:** De token wordt lokaal opgeslagen in je browser (localStorage). Je hoeft hem maar 1 keer in te voeren.

---

## 📝 Gebruik

### Menu/Prijzen Aanpassen:
1. Log in met wachtwoord
2. Pas menu items, prijzen of openingsuren aan
3. Klik op **"ALLES OPSLAAN"**
4. Wacht 1-2 minuten → wijzigingen zijn automatisch live!

### Items Toevoegen:
- Klik op **"+ Nieuw item toevoegen"** onder een categorie
- Vul naam, prijs en eenheid in (bijv. `/kg`, `/st`, `/L`)

### Items Verwijderen:
- Klik op het rode **✕** icoon rechts van een item

### Categorieën Beheren:
- **Toevoegen:** Klik op "Nieuwe Categorie"
- **Verwijderen:** Klik op "Verwijder categorie" bij een categorie

---

## 🛠️ Hoe Het Werkt

1. **Admin panel** bewerkt data in geheugen
2. Bij opslaan wordt `public/data.json` **gecommit naar GitHub** via de API
3. **GitHub Actions** rebuild automatisch de website
4. Nieuwe versie is **live binnen 1-2 minuten**

### Voordelen:
- ✅ Gratis hosting op GitHub Pages
- ✅ Geen server of database nodig
- ✅ Versiecontrole via Git (alle wijzigingen worden bijgehouden)
- ✅ Automatische deployment

---

## 🔐 Wachtwoord Wijzigen

Om het admin wachtwoord te wijzigen:

1. Open `AdminPage.tsx` in een code editor
2. Vind regel 7: `const ADMIN_PASSWORD = 'DeWulk2025!';`
3. Vervang de waarde met een nieuw wachtwoord
4. Commit en push de wijziging

**Voorbeeld:**
```tsx
const ADMIN_PASSWORD = 'MijnNieuweWachtwoord123!';
```

---

## ❗ Troubleshooting

### "GitHub token is vereist"
→ Volg de setup instructies bovenaan om een token aan te maken

### "Update mislukt" of "401 Unauthorized"
→ Je token is mogelijk verlopen of heeft onvoldoende rechten
→ Maak een nieuwe token aan met `repo` toegang

### Wijzigingen niet zichtbaar na 2+ minuten
→ Check of GitHub Actions succesvol was: [Actions tab](https://github.com/kevinb42O/DeWulk_website/actions)
→ Hard refresh in je browser: `Ctrl + Shift + R` (Windows) of `Cmd + Shift + R` (Mac)

### "Fout bij verbinding met server"
→ Check je internetverbinding
→ Controleer of GitHub niet down is: [githubstatus.com](https://www.githubstatus.com/)

---

## 🔒 Beveiliging

- Wachtwoord is opgeslagen in code (niet ideaal voor productie, maar OK voor kleine websites)
- GitHub token wordt lokaal opgeslagen in browser (niet gecommit naar Git)
- Token heeft volledige repo toegang → **deel token nooit met anderen**
- Voor extra beveiliging: gebruik GitHub's IP whitelist of OAuth Apps

---

## 💡 Tips

- Test wijzigingen altijd in een lokale omgeving eerst (optioneel)
- Maak regelmatig backups van `public/data.json`
- Gebruik duidelijke commit messages (wordt automatisch gedaan: "Update menu en openingsuren via admin panel")
- Tokens verlopen niet standaard, maar je kunt ze handmatig intrekken via GitHub

---

## 📧 Support

Bij vragen of problemen, neem contact op met de technische beheerder of open een issue op GitHub.
