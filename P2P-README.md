# Party Stream P2P - Serverless Video Sync

> **Ny versjon!** Nå med PeerJS/WebRTC for direkte peer-to-peer forbindelser uten sentral server.

## 🚀 Funksjoner

✨ **Serverless P2P Arkitektur**
- Direkte peer-to-peer forbindelser via WebRTC
- Ingen avhengighet av sentral server (kun initial signaling)
- Gratis PeerJS cloud for peer discovery

🎥 **Video Synkronisering**
- Sanntids video synkronisering mellom brukere
- Auto-sync hvert 2. sekund
- Support for YouTube links og direkte video URLs

💬 **Chat & Brukerliste**
- Live chat mellom deltakere
- Sanntids brukerliste med status
- Typing indicators (kan legges til)

📱 **Chromecast Support**
- Google Cast SDK integrert
- Cast til TV mens du fortsatt synkroniserer

🔗 **Enkel Deling**
- Generer rom-link automatisk
- Del med venner via URL parameter
- Kopier til utklippstavle med ett klikk

## 📦 Installasjon

```bash
# Klon repository
git clone https://github.com/Snakkaz/party-stream.git
cd party-stream

# Installer avhengigheter (valgfritt - kun for lokal server)
npm install

# Start lokal server (valgfritt)
npm start
```

## 🌐 Bruk uten server

Du kan åpne `p2p-index.html` direkte i nettleseren din - ingen server trengs! PeerJS cloud håndterer signaling.

## 🎮 Hvordan bruke

### Lag et rom:
1. Skriv inn ditt navn
2. Klikk "Lag nytt rom"
3. Kopier rom-linken og del med venner

### Koble til rom:
1. Skriv inn ditt navn
2. Lim inn rom-kode (eller klikk på delt link)
3. Klikk "Koble til rom"

### Last video:
1. Lim inn YouTube URL eller direkte video link
2. Klikk "Last video"
3. Videoen vil automatisk synkroniseres til alle

### Chromecast:
1. Klikk på Cast-ikonet
2. Velg din Chromecast-enhet
3. Videoen vil streames til TV

## 🔧 Teknisk Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **P2P**: PeerJS 1.5.4, WebRTC
- **Cast**: Google Cast SDK
- **Signaling**: PeerJS Cloud (gratis)

## 📡 Hvordan det fungerer

```
User A (Host)         PeerJS Cloud           User B (Guest)
    |                      |                        |
    |--- Create Peer ----->|                        |
    |<--- Peer ID ---------|                        |
    |                      |<--- Connect(Host ID) --|
    |                      |                        |
    |<----------- WebRTC DataChannel ------------->|
    |                                               |
    |<--- Video sync, Chat, User presence -------->|
```

1. **Peer Discovery**: PeerJS Cloud brukes kun for initial signaling
2. **Direct P2P**: WebRTC etablerer direkte forbindelse mellom peers
3. **Mesh Network**: Alle peers kobler til hverandre (best for 2-4 brukere)
4. **Real-time Sync**: Video state synkroniseres via DataChannel

## ⚡ Ytelse & Optimalisering

- **Debouncing**: Sync events sendes maks hver 2. sekund
- **Lazy Loading**: Video lastes kun når nødvendig
- **LocalStorage**: Brukernavn huskes automatisk
- **Compression**: PeerJS bruker binary pack for data

## 🎯 Roadmap

- [x] P2P WebRTC arkitektur
- [x] Rom-basert token system
- [x] Video synkronisering
- [x] Audio sync (via currentTime)
- [x] Chromecast support
- [ ] YouTube iframe embed (begrenset av CORS)
- [ ] goojara.to support (må testes - kan være CORS-problemer)
- [ ] Typing indicators
- [ ] Emoji reactions
- [ ] Video quality selector

## ⚠️ Begrensninger

- **Skalerbarhet**: Mesh topology fungerer best for 2-4 brukere
- **YouTube**: Embed begrenset av CORS - krever proxy eller server-side rendering
- **goojara.to**: Ukjent embed support - må testes
- **NAT Traversal**: Noen firewalls kan blokkere WebRTC

## 📝 Lisens

MIT License - se LICENSE fil

## 👨‍💻 Utviklet av

Snakkaz (stianpm@gmail.com)

---

**Tips**: For beste opplevelse, bruk Chrome eller Edge. Firefox støttes også men kan ha lavere WebRTC kompatibilitet.
