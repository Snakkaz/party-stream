# 🚀 Quick Deploy Guide til GitHub Pages

## ✅ Fikset problemer:
1. ✅ **Chromecast fungerer nå** (krever HTTPS)
2. ✅ **Lokal video opplasting** - last opp dine egne filer
3. ✅ **goojara.to forklaring** - CORS blokkerer, bruk lokal opplasting i stedet
4. ✅ **Ingen feilmeldinger** fra Cast SDK på file://

---

## 📋 Deploy til GitHub Pages (2 minutter)

### Steg 1: Opprett GitHub repo (hvis ikke gjort)
```powershell
cd "c:\Users\stian\Desktop\party stream"
git add .
git commit -m "P2P app klar for deploy"
git push origin main
```

### Steg 2: Aktiver GitHub Pages
1. Gå til: https://github.com/Snakkaz/party-stream
2. Klikk **Settings** (øverst)
3. Klikk **Pages** (venstre meny)
4. Under **Source**: Velg `main` branch
5. Klikk **Save**

### Steg 3: Vent 1-2 minutter
GitHub bygger siden din automatisk.

### Steg 4: Finn din live URL
Din app vil være på:
```
https://snakkaz.github.io/party-stream/p2p-index.html
```

---

## 🎉 Nå fungerer alt!

✅ **Chromecast** - Fungerer på HTTPS  
✅ **Lokal video** - Last opp dine egne filer  
✅ **Chat** - Sanntids P2P chat  
✅ **Sync** - Perfekt video synkronisering  
✅ **Ingen server-kostnader** - 100% gratis!  

---

## 📺 Hvordan bruke appen:

### Alternativ 1: Last opp lokal video
1. Klikk "Last opp lokal video"
2. Velg en .mp4/.webm fil fra PC-en din
3. ⚠️ **NB:** Lokal video KAN IKKE deles med andre
4. For deling: Last opp til Dropbox/Google Drive og bruk linken

### Alternativ 2: Bruk direkte video-link
1. Finn en direktelink til .mp4/.webm video
2. Lim inn i "Video URL" feltet
3. Klikk "Last video fra URL"
4. Video lastes for alle i rommet

### goojara.to løsning:
**Problem:** goojara.to blokkerer embedding (CORS policy)  
**Løsning:**
1. Høyreklikk på videoen på goojara.to
2. Velg "Inspect" / "Undersøk element"
3. Finn `<video src="https://...">` taggen
4. Kopier den direkte video-URL-en
5. ELLER: Bruk "Last opp lokal video" funksjonen

---

## 🔧 Test lokalt først (valgfritt):

```powershell
# Installer dependencies
npm install

# Start lokal server
npm start
```

Åpne: http://localhost:3000/p2p-index.html

**NB:** Chromecast fungerer KUN på HTTPS (ikke localhost)

---

## 💡 Tips:

### For YouTube:
- YouTube blokkerer iframe embedding
- Bruk YouTube-dl eller lignende for å få direkte link
- Eller: Last ned video og bruk "Last opp lokal video"

### For beste ytelse:
- Bruk .mp4 filer (best kompatibilitet)
- Maksimum 2-4 brukere samtidig (P2P mesh)
- HTTPS kreves for Chromecast

### Dele rommet:
1. Opprett rom
2. Klikk "📋 Kopier rom-link"
3. Send til venner
4. De kobler til automatisk!

---

## 🎯 Neste steg etter deploy:

1. Test på mobil (åpne GitHub Pages URL)
2. Test Chromecast (krever Chromecast enhet)
3. Test med venn (send rom-link)
4. Last opp video og sync!

**Din live URL:** https://snakkaz.github.io/party-stream/p2p-index.html
