# 🎬 Party Stream - Synkronisert Streaming App

Se på serier og filmer sammen med venner - helt synkronisert i sanntid!

## ✨ Features

- ✅ **Real-time synkronisering** - Play, pause, og seek synkroniseres automatisk
- ✅ **Video opplasting** - Last opp videoer som deles med alle i rommet
- ✅ **Live chat** - Chat med vennene dine mens dere ser
- ✅ **Multiple rooms** - Flere grupper kan se forskjellige ting samtidig
- ✅ **Responsivt design** - Fungerer på PC, Mac, mobil og nettbrett
- ✅ **Ingen pålogging** - Bare skriv inn navn og room ID!

## 🚀 Slik starter du appen

### 1. Installer avhengigheter
```bash
npm install
```

### 2. Start serveren
```bash
npm start
```

### 3. Åpne i nettleseren
```
http://localhost:3000
```

## 📱 Slik deler du med venner

### Alternativ 1: Dere er på samme WiFi
1. Finn din IP-adresse:
   - **Windows**: Åpne Command Prompt og skriv `ipconfig`
   - **Mac**: Åpne Terminal og skriv `ifconfig | grep inet`
   - **Linux**: Åpne Terminal og skriv `hostname -I`

2. Se etter noe som ligner: `192.168.x.x` (ditt lokale nettverk)

3. Del denne URLen med venner på samme WiFi:
   ```
   http://192.168.x.x:3000
   ```

### Alternativ 2: Venner på annet nettverk (Deploy til internett)

#### A. Deploy med ngrok (raskeste måte)
1. Last ned ngrok: https://ngrok.com/download
2. Registrer deg gratis på ngrok.com
3. Start appen din: `npm start`
4. I ny terminal: `ngrok http 3000`
5. Kopier URLen ngrok gir deg (f.eks. `https://abc123.ngrok.io`)
6. Del denne URLen med venner!

#### B. Deploy til Heroku (gratis hosting)
```bash
# Installer Heroku CLI først

# Login til Heroku
heroku login

# Opprett ny app
heroku create party-stream-app

# Deploy
git init
git add .
git commit -m "Initial commit"
git push heroku main

# Åpne appen
heroku open
```

#### C. Deploy til Railway (anbefalt, enklest)
1. Gå til https://railway.app
2. Logg inn med GitHub
3. Klikk "New Project" → "Deploy from GitHub repo"
4. Velg dette repoet
5. Railway deployer automatisk!
6. Del URLen Railway gir deg med venner

## 📖 Slik bruker du appen

### Steg 1: Koble til samme room
1. Skriv inn navnet ditt
2. Velg en Room ID (f.eks. "filmkveld123")
3. Klikk "Koble til Room"
4. Del samme Room ID med venner

### Steg 2: Last opp video
1. Klikk "Velg video"
2. Velg en videofil fra PC-en din (MP4, WebM, MKV)
3. Klikk "Last opp og start avspilling"
4. Videoen lastes nå opp og deles med alle i rommet!

### Steg 3: Se sammen!
- Alle som er i samme room ser samme video
- Play/pause synkroniseres automatisk
- Hvis noen spoler, synkroniseres det med alle
- Chat med hverandre mens dere ser!

## 🔧 Teknisk info

### Backend
- **Node.js** med Express
- **Socket.io** for sanntidssynkronisering
- **Multer** for fileopplasting

### Frontend
- **Vanilla JavaScript**
- **Socket.io client** for WebSocket-kommunikasjon
- **HTML5 Video API**

### Portforwarding (for lokal hosting)
Hvis venner ikke kan koble til:
1. Gå til router-innstillingene (vanligvis `192.168.1.1`)
2. Finn "Port Forwarding"
3. Forwarder port `3000` til din PC's lokale IP
4. Del din **offentlige IP** med venner (finn på whatismyip.com)
5. Venner går til: `http://[din-offentlige-ip]:3000`

⚠️ **OBS**: Dette åpner port 3000 til internett - kun gjør dette midlertidig!

## 🎯 Tips

- Bruk **kort Room ID** for enklere deling
- Last opp video med **god kvalitet** for best opplevelse
- Hvis synkronisering blir feil, bruk **Sync-knappen**
- Sørg for **stabil internettforbindelse** for alle

## 🐛 Feilsøking

**Video laster ikke:**
- Sjekk at videoformatet støttes (MP4, WebM)
- Sjekk filstørrelse (maks 500MB som standard)

**Ikke synkronisert:**
- Klikk på "Sync med andre" knappen
- Sjekk at alle er i samme room

**Kan ikke koble til:**
- Sjekk at serveren kjører
- Sjekk at IP-adressen er korrekt
- Sjekk brannmur/antivirus-innstillinger

## 📝 Lisens

MIT - Bruk fritt!

## 🤝 Bidra

Pull requests er velkomne! For større endringer, åpne et issue først.

---

**Laget med ❤️ for filmkvelder med venner!**
