<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# De Wulk - Vishandel Website met Admin Panel

Website voor De Wulk vishandel in Blankenberge, inclusief admin dashboard voor het beheren van menu items en openingsuren.

## Features

- 🐟 Moderne responsive website voor vishandel
- 🔐 Admin panel voor het beheren van content
- 📝 Menu items en prijzen aanpasbaar zonder code
- ⏰ Openingsuren beheer
- 💾 JSON-based backend (geen database nodig)
- 🚀 Geschikt voor Easyhost shared hosting

## Live Site

The site is automatically deployed to GitHub Pages at: **https://kevinb42O.github.io/DeWulk_website/**

The deployment is configured with:
- Base path: `/DeWulk_website/` (set in `vite.config.ts`)
- Automatic deployment via GitHub Actions on pushes to `main` branch

## Deployment naar Easyhost

Voor volledige instructies over deployment naar Easyhost, zie **[EASYHOST_SETUP.md](EASYHOST_SETUP.md)**.

### Quick Start:

1. **Build de site:**
   ```bash
   npm install
   npm run build
   ```

2. **Upload via FTP naar Easyhost:**
   - Alle bestanden uit `dist/` → `public_html/`
   - `data/menu.json` → `public_html/data/`
   - Alle PHP files uit `api/` → `public_html/api/`
   - `.htaccess` → `public_html/`

3. **Stel bestandsrechten in:**
   - `data/` folder → `755` of `777`
   - `menu.json` → `666` of `644`

4. **Admin Panel:**
   - URL: `https://www.vishandelolivierenkelly.be/admin`
   - Standaard wachtwoord: `DeWulk2025!`

## Admin Panel

Het admin panel stelt niet-technische gebruikers in staat om:
- Prijzen aan te passen
- Menu items toe te voegen/verwijderen
- Openingsuren te wijzigen
- Categorieën te beheren

Alle wijzigingen worden opgeslagen in `data/menu.json` en zijn direct zichtbaar op de website.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the dev server:
   ```bash
   npm run dev
   ```

3. Open browser:
   - Website: `http://localhost:5173`
   - Admin panel: `http://localhost:5173/admin`

**Note:** In development mode, API calls to `/api/getMenu.php` won't work. You'll need a local PHP server or mock the API endpoints.

## Project Structure

```
DeWulk_website/
├── data/
│   └── menu.json           # Menu en openingsuren data
├── api/
│   ├── getMenu.php         # Lees menu data
│   ├── updateMenu.php      # Update menu data (auth required)
│   ├── login.php           # Admin login
│   ├── logout.php          # Admin logout
│   └── .htaccess           # Bescherm JSON files
├── App.tsx                 # Main website component
├── AdminPage.tsx           # Admin dashboard component
├── index.tsx               # App entry with routing
├── types.ts                # TypeScript types
├── .htaccess               # React Router support
├── EASYHOST_SETUP.md       # Deployment instructies
└── README.md               # Dit bestand
```

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Routing:** React Router DOM
- **Backend:** PHP 7.4+ (JSON file storage)
- **Hosting:** Easyhost shared hosting (no database required)

## Development

### Adding Menu Items

Edit `data/menu.json` or use the admin panel at `/admin`.

### Styling

The site uses Tailwind CSS with custom colors defined in `index.css`:
- `marine`: Navy blue (#0a2540)
- `salmon`: Accent color (#ff6b6b)

### Icons

Icons from `lucide-react`.

## Security

- Admin panel protected with session-based authentication
- Password stored in `api/login.php` (change after deployment)
- JSON files protected via `.htaccess`
- CORS headers configured for API endpoints

**⚠️ Important:** Change the default password in `api/login.php` after deployment!

## Support

Voor vragen of problemen:
1. Check [EASYHOST_SETUP.md](EASYHOST_SETUP.md) voor deployment issues
2. Check browser console (F12) voor JavaScript errors
3. Check PHP error logs in Easyhost control panel

## License

© 2025 De Wulk - Olivier & Kelly. All rights reserved.
