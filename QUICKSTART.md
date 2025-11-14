# 🎬 Party Stream P2P - Quick Start Guide

## 🚀 Start på 30 sekunder!

### Metode 1: Åpne direkte i nettleser (Enkleste)

1. **Dobbeltklikk på filen**
   ```
   p2p-index.html
   ```

2. **Eller høyreklikk → Åpne med → Chrome/Edge**

3. **Ferdig!** 🎉 Du kan nå:
   - Lage rom
   - Dele link med venner
   - Se video sammen

---

### Metode 2: Med lokal server (Anbefalt for testing)

#### Windows PowerShell:
```powershell
cd "c:\Users\stian\Desktop\party stream"
python -m http.server 8000
# Åpne: http://localhost:8000/p2p-index.html
```

#### Eller med Node.js:
```powershell
npx http-server -p 8000
# Åpne: http://localhost:8000/p2p-index.html
```

---

## 📱 Hvordan bruke (Steg-for-steg)

### 👤 Bruker A (Vert/Host):

1. **Åpne appen**
   - Dobbeltklikk `p2p-index.html`

2. **Skriv inn navn**
   - F.eks: "Stian"

3. **Klikk "Lag nytt rom"**
   - Du får automatisk et rom-ID
   - Status endres til "Tilkoblet" (grønn)

4. **Del linken**
   - Klikk "📋 Kopier rom-link"
   - Send til venn via Discord/Messenger/etc.

5. **Last video**
   - Lim inn YouTube URL eller direkte link
   - Klikk "Last video"
   - Videoen starter!

### 👥 Bruker B (Gjest):

1. **Få link fra venn**
   - F.eks: `file:///p2p-index.html?room=abc123`

2. **Klikk på linken**
   - Appen åpnes automatisk med rom-kode fylt inn

3. **Skriv inn navn**
   - F.eks: "Emma"

4. **Klikk "Koble til rom"**
   - Du kobles direkte til verten
   - Status blir "Tilkoblet" (grønn)

5. **Se video sammen**
   - Videoen synkroniserer automatisk!
   - Chat med hverandre
   - Se hvem som er online

---

## 🎥 Videokilder som fungerer

### ✅ Fungerer (Testet):

1. **Direkte video-linker (.mp4, .webm)**
   ```
   https://example.com/video.mp4
   https://example.com/movie.webm
   ```

2. **Publiske video-servere**
   ```
   https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
   ```

3. **YouTube** (kommer snart - begrenset av CORS)

### ❌ Fungerer IKKE (ennå):

1. **YouTube embed** - CORS policy blokkerer
2. **goojara.to** - må testes, sannsynligvis CORS-problemer
3. **Netflix/Disney+** - DRM-beskyttet innhold

---

## 💬 Chat & Synkronisering

### Chat:
- Skriv melding i chat-boksen
- Trykk Enter eller klikk "Send"
- Alle i rommet ser meldingen instantly!

### Video Synkronisering:
- **Automatisk**: Sync hvert 2. sekund
- **Manuell**: Klikk "🔄 Synkroniser" når som helst
- **Play/Pause**: Alle ser samme play/pause state

### Brukerliste:
- Se hvem som er online
- 👑 = Vert (den som laget rommet)
- 🟢 Grønn prikk = Aktiv forbindelse

---

## 📱 Chromecast (TV Streaming)

### Forutsetninger:
- Chromecast-enhet koblet til TV
- Samme WiFi-nettverk
- HTTPS forbindelse (kreves av Chromecast)

### Bruk:
1. Klikk på Cast-ikonet (øverst til høyre i video)
2. Velg din Chromecast fra listen
3. Videoen vises på TV!
4. Kontroller fra nettleser

**NVA!** Synkronisering fungerer fortsatt mens du caster!

---

## 🔧 Feilsøking

### Problem: "Kan ikke koble til rom"
**Løsning:**
- Sjekk at rom-koden er riktig
- Sjekk internettforbindelse
- Vent 5-10 sekunder (PeerJS connection setup)
- Prøv å lage nytt rom

### Problem: "Video lastes ikke"
**Løsning:**
- Bruk direkte video-link (.mp4)
- Ikke YouTube embed URLs (CORS)
- Sjekk at URL er offentlig tilgjengelig
- Test URL i ny fane først

### Problem: "Chromecast-knapp vises ikke"
**Løsning:**
- Bruk Chrome eller Edge (ikke Firefox)
- Sjekk at Chromecast er på samme WiFi
- Åpne via HTTPS (ikke file://)
- For lokal testing: Bruk ngrok for HTTPS

### Problem: "Peer ikke funnet"
**Løsning:**
- Firewall blokkerer WebRTC - sjekk brannmur
- PeerJS cloud nede (sjekk status.peerjs.com)
- Begge må være online samtidig
- Vent 10-15 sekunder for handshake

---

## ⚡ Tips & Triks

### 1. **Beste ytelse:**
   - Chrome eller Edge (nyeste versjon)
   - Stabil internettforbindelse
   - Kun 2-4 brukere per rom (optimal)

### 2. **Raskere start:**
   - Lagre favoritt-navn i nettleser (autofylles)
   - Bookmark rom-linker for raske reoppkoblinger
   - Bruk korte, memorable rom-koder

### 3. **Testing:**
   - Åpne 2 nettleservinduer (Incognito + Normal)
   - Test lokal synkronisering først
   - Del deretter med venner

### 4. **Deling:**
   - Kopier link direkte via knappen
   - Eller manuelt: `[URL]?room=[ROOM_ID]`
   - QR-kode generator (ekstra feature - kan legges til)

---

## 🆚 Server vs P2P - Når bruke hva?

### Bruk P2P (p2p-index.html) når:
- ✅ 2-4 personer
- ✅ Vil ha gratis hosting
- ✅ Trenger lav latency
- ✅ Privat/sikker deling

### Bruk Server (Railway) når:
- ✅ 5+ personer
- ✅ Bedriftsnett med strict firewall
- ✅ Garantert pålitelighet viktigere enn kostnad

---

## 📊 Hva skjer bak kulissene?

```
1. Du åpner appen
   ↓
2. PeerJS oppretter peer (får ID fra cloud)
   ↓
3. Du lager rom → Ditt Peer ID = Rom ID
   ↓
4. Venn klikker link → Kobler til ditt Peer ID
   ↓
5. WebRTC etablerer direkte P2P forbindelse
   ↓
6. All data (video sync, chat) går direkte mellom dere
   (INGEN server i mellom!) 🚀
```

**Resultat:**
- ⚡ Raskere (direkte forbindelse)
- 🔒 Sikrere (data ikke via server)
- 💰 Gratis (ingen server-kostnader)

---

## 🎯 Neste Steg

1. **Test lokalt:**
   ```bash
   # Åpne p2p-index.html
   # Test med 2 nettleservinduer
   ```

2. **Del med 1 venn:**
   ```bash
   # Lag rom
   # Kopier link
   # Send til venn
   # Test sammen!
   ```

3. **Deploy (valgfritt):**
   ```bash
   # Se DEPLOYMENT.md for hosting-instruksjoner
   # GitHub Pages, Netlify, etc. - alle gratis!
   ```

---

## 📞 Trenger hjelp?

- **GitHub Issues**: https://github.com/Snakkaz/party-stream/issues
- **Email**: stianpm@gmail.com
- **README**: Se P2P-README.md for tekniske detaljer

---

## ✨ Gratulerer!

Du har nå en **gratis, serverless, P2P video-sync app**! 🎉

**Kos deg med venner!** 🍿🎬
