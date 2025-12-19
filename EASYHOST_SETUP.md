# Easyhost Setup Instructies voor De Wulk Admin Panel

## Wat is dit?

Dit admin panel stelt je in staat om de prijzen, menu items en openingsuren van je website te wijzigen zonder code te hoeven aanpassen. Alle wijzigingen worden opgeslagen in een JSON bestand en zijn direct zichtbaar op de website.

## Wat kun je ermee doen?

- **Openingsuren aanpassen** - Verander de openingsuren per dag
- **Prijzen aanpassen** - Wijzig prijzen van alle menu items
- **Items toevoegen/verwijderen** - Voeg nieuwe gerechten toe of verwijder oude
- **Categorieën beheren** - Voeg nieuwe categorieën toe of verwijder bestaande

## Installatie

### Stap 1: Site builden

Open een terminal/command prompt op je computer en voer de volgende commando's uit:

```bash
cd /pad/naar/DeWulk_website
npm install
npm run build
```

Dit maakt een `dist/` folder aan met alle bestanden die je moet uploaden.

### Stap 2: FTP upload naar Easyhost

**Goed nieuws:** Alle benodigde bestanden zitten nu in de `dist/` folder na het builden!

#### Optie A: FileZilla (Aanbevolen)

1. Download en installeer [FileZilla](https://filezilla-project.org/)
2. Vind je FTP inloggegevens in het Easyhost control panel:
   - Host: `ftp.jouwdomein.be` of IP adres
   - Gebruikersnaam: meestal je domeinnaam of gebruikersnaam
   - Wachtwoord: je FTP wachtwoord
3. Maak verbinding via FileZilla
4. Upload **ALLE** bestanden en folders uit `dist/` naar `public_html/`:
   - Sleep de hele inhoud van de `dist/` folder naar `public_html/`
   - Zorg dat de structuur behouden blijft (api/, data/, assets/, .htaccess, index.html)

**De structuur in `public_html/` moet zijn:**
```
public_html/
├── index.html
├── .htaccess
├── assets/
│   └── (alle bestanden)
├── data/
│   └── menu.json
└── api/
    ├── .htaccess
    ├── getMenu.php
    ├── updateMenu.php
    ├── login.php
    └── logout.php
```

#### Optie B: Easyhost File Manager

1. Log in op het Easyhost control panel
2. Ga naar "Bestandsbeheer" of "File Manager"
3. Navigeer naar `public_html/`
4. Upload alle bestanden en folders uit `dist/`
5. Zorg dat de folder structuur behouden blijft

### Stap 3: Bestandsrechten instellen

**Belangrijk:** De `data/` folder en `menu.json` moeten schrijfbaar zijn zodat het admin panel wijzigingen kan opslaan.

#### Via FileZilla:
1. Rechtermuisklik op de `data/` folder
2. Kies "File permissions..."
3. Zet de rechten op `755` of `777`
4. Vink "Recurse into subdirectories" aan
5. Klik OK

#### Via Easyhost File Manager:
1. Selecteer de `data/` folder
2. Klik op "Permissions" of "Rechten"
3. Zet op `755` of `777`
4. Doe hetzelfde voor `menu.json` (rechten `666` of `644`)

**Troubleshooting:** Als je later een foutmelding krijgt over schrijfrechten, zet dan de rechten op `777` voor de `data/` folder.

### Stap 4: Test de website

1. Ga naar je website: `https://www.vishandelolivierenkelly.be`
2. Controleer of de website goed laadt
3. Controleer of het menu zichtbaar is
4. Controleer of de openingsuren kloppen

### Stap 5: Wachtwoord aanpassen (Optioneel maar aanbevolen)

**⚠️ BELANGRIJK VOOR BEVEILIGING:**

Het standaard wachtwoord is `DeWulk2025!`. Om veiligheidsredenen is het **sterk aanbevolen** dit te wijzigen:

1. Open `api/login.php` in een text editor (bijv. Notepad++ of via File Manager)
2. Zoek de regel: `$correctPassword = 'DeWulk2025!';`
3. Verander `DeWulk2025!` naar je eigen wachtwoord
4. Sla het bestand op
5. Upload het opnieuw naar de server via FTP

**Voorbeeld:**
```php
$correctPassword = 'MijnVeiligWachtwoord123!';
```

**Extra beveiligingstips:**
- **Gebruik HTTPS**: Zorg dat je website HTTPS gebruikt (SSL certificaat). Vraag Easyhost om een gratis Let's Encrypt certificaat te installeren. Dit is cruciaal om het wachtwoord veilig over te dragen.
- **Sterk wachtwoord**: Gebruik minimaal 12 karakters met hoofdletters, kleine letters, cijfers en speciale tekens.
- **Backup regelmatig**: Maak regelmatig backups van `menu.json`.

## Admin Panel Gebruiken

### Inloggen

1. Ga naar: `https://www.vishandelolivierenkelly.be/admin`
2. Vul het wachtwoord in: `DeWulk2025!` (of jouw aangepaste wachtwoord)
3. Klik op "Inloggen"

### Openingsuren aanpassen

1. Scroll naar de sectie "Openingsuren"
2. Klik in het tekstveld naast de dag die je wilt aanpassen
3. Verander de uren (bijv. `09:00 – 18:00` of `Gesloten`)
4. Scroll naar beneden en klik op de groene knop "Alles Opslaan"

### Menu items aanpassen

1. Scroll naar de sectie "Menu Items"
2. Zoek het item dat je wilt aanpassen
3. Klik in de velden om te bewerken:
   - **Naam**: De naam van het gerecht
   - **Prijs**: De prijs (bijv. `€12,50` of `Dagprijs`)
   - **Eenheid**: De eenheid (bijv. `/kg`, `/st`, `/L`)
4. Klik op "Alles Opslaan" wanneer je klaar bent

### Nieuwe items toevoegen

1. Zoek de categorie waar je een item wilt toevoegen
2. Klik op de groene knop "Item Toevoegen"
3. Er verschijnt een nieuw item met standaardwaarden
4. Pas de naam, prijs en eenheid aan naar wens
5. Klik op "Alles Opslaan"

### Items verwijderen

1. Zoek het item dat je wilt verwijderen
2. Klik op de rode prullenbak knop rechts van het item
3. Bevestig de verwijdering
4. Klik op "Alles Opslaan"

### Nieuwe categorie toevoegen

1. Klik bovenaan op de blauwe knop "Nieuwe Categorie"
2. Vul de naam van de categorie in
3. Klik OK
4. De nieuwe categorie verschijnt onderaan
5. Voeg items toe met de groene knop "Item Toevoegen"
6. Klik op "Alles Opslaan"

### Categorie verwijderen

1. Zoek de categorie die je wilt verwijderen
2. Klik op de rode knop "Categorie Verwijderen"
3. Bevestig de verwijdering
4. Klik op "Alles Opslaan"

### Uitloggen

Klik rechtsboven op de knop "Uitloggen" wanneer je klaar bent.

## Wijzigingen bekijken

Na het opslaan:
1. Ga naar de hoofdwebsite: `https://www.vishandelolivierenkelly.be`
2. Refresh de pagina (F5 of Ctrl+R / Cmd+R)
3. Je wijzigingen zijn nu live!

## Troubleshooting

### Fout: "Kon data niet opslaan"

**Oorzaak:** De `data/` folder of `menu.json` heeft geen schrijfrechten.

**Oplossing:**
1. Ga via FTP of File Manager naar de `data/` folder
2. Zet de rechten op `777` (volledige toegang)
3. Doe hetzelfde voor `menu.json`
4. Probeer opnieuw op te slaan

### Website laadt geen menu

**Oorzaak:** De `api/getMenu.php` is niet bereikbaar of `menu.json` bestaat niet.

**Oplossing:**
1. Controleer of `api/getMenu.php` bestaat in de juiste folder
2. Controleer of `data/menu.json` bestaat
3. Test direct: ga naar `https://www.vishandelolivierenkelly.be/api/getMenu.php`
4. Je zou de JSON data moeten zien

### Admin panel niet bereikbaar op /admin

**Oorzaak:** React Router werkt niet goed zonder de juiste `.htaccess` configuratie.

**Oplossing:**
Maak een `.htaccess` bestand in `public_html/` met de volgende inhoud:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

Upload dit bestand en probeer opnieuw naar `/admin` te gaan.

### CORS errors in browser console

**Oorzaak:** De PHP files hebben niet de juiste CORS headers.

**Oplossing:**
Dit zou niet moeten gebeuren als je de meegeleverde PHP files gebruikt. Controleer of alle PHP files de volgende headers hebben:

```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
```

### Kan niet inloggen

**Mogelijke oorzaken:**
1. **Verkeerd wachtwoord** - Controleer of je het juiste wachtwoord gebruikt
2. **Sessies werken niet** - Controleer of PHP sessies ingeschakeld zijn bij Easyhost (dit zou standaard moeten zijn)
3. **PHP versie te oud** - Controleer of je PHP 7.4 of hoger gebruikt

**Oplossing:**
1. Probeer het standaard wachtwoord: `DeWulk2025!`
2. Als dit niet werkt, controleer `api/login.php` voor het juiste wachtwoord
3. Controleer in het Easyhost control panel of PHP sessies enabled zijn

## Backup maken

**Aanbevolen:** Maak regelmatig een backup van `menu.json`.

### Via FTP:
1. Connect met FileZilla
2. Download `public_html/data/menu.json` naar je computer
3. Bewaar met datum in de bestandsnaam: `menu-backup-2025-01-15.json`

### Via File Manager:
1. Ga naar `public_html/data/`
2. Download `menu.json`
3. Bewaar lokaal op je computer

### Backup terugzetten:
1. Hernoem je backup bestand naar `menu.json`
2. Upload naar `public_html/data/` (overschrijf bestaande)
3. Refresh de website

## Extra tips

- **Test eerst lokaal**: Maak wijzigingen en test ze voordat je live gaat
- **Kleine wijzigingen**: Maak kleine wijzigingen en sla vaak op
- **Backup**: Maak een backup voor je grote wijzigingen maakt
- **Browser cache**: Als wijzigingen niet zichtbaar zijn, probeer Ctrl+Shift+R (hard refresh)
- **Mobiel testen**: Test de admin panel ook op je smartphone

## Support

Voor technische vragen of problemen, check de volgende bestanden:
- `README.md` - Algemene project informatie
- Browser console (F12) - Voor JavaScript errors
- PHP error logs in Easyhost control panel

## Veelgestelde vragen

**Q: Kan ik meerdere mensen toegang geven?**
A: Ja, maar iedereen gebruikt hetzelfde wachtwoord. Voor meerdere gebruikers zou je een uitgebreidere auth-oplossing nodig hebben.

**Q: Kan ik foto's uploaden via het admin panel?**
A: Nee, foto's moeten via FTP geüpload worden. Het admin panel is alleen voor tekst/prijzen.

**Q: Hoeveel items kan ik toevoegen?**
A: Technisch gezien onbeperkt, maar houd het overzichtelijk voor je bezoekers.

**Q: Kan ik de layout aanpassen via het admin panel?**
A: Nee, alleen content (tekst, prijzen, uren). Voor layout wijzigingen moet je de code aanpassen.

**Q: Wat gebeurt er als ik per ongeluk iets verkeerds opsla?**
A: Herstel je laatste backup van `menu.json` via FTP.
