# Deployment Guide - P2P Party Stream

## 🚀 Quick Deploy (No Server Needed!)

Since this is a **serverless P2P app**, you can deploy it to any static hosting service for FREE!

## Option 1: GitHub Pages (Recommended - Free Forever)

### Step 1: Create GitHub Repository
```bash
cd "c:\Users\stian\Desktop\party stream"
git init
git add p2p-index.html
git commit -m "Add P2P Party Stream"
git branch -M main
git remote add origin https://github.com/Snakkaz/party-stream-p2p.git
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to repository settings
2. Click "Pages" in sidebar
3. Source: "Deploy from a branch"
4. Branch: `main` / `root`
5. Click "Save"

### Step 3: Access Your App
```
https://snakkaz.github.io/party-stream-p2p/p2p-index.html
```

**Cost: $0/month** ✅

---

## Option 2: Netlify (Free Tier - Very Easy)

### Step 1: Drag & Drop Deploy
1. Go to https://app.netlify.com/drop
2. Drag `p2p-index.html` into the drop zone
3. Done! 🎉

### Step 2: Custom Domain (Optional)
```bash
# In Netlify dashboard:
# Settings → Domain Management → Add custom domain
# party-stream.netlify.app (free subdomain)
# or connect your own domain
```

**Cost: $0/month** ✅

---

## Option 3: Vercel (Free Tier - Fast Edge Network)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
cd "c:\Users\stian\Desktop\party stream"
vercel --prod
```

### Step 3: Follow prompts
```
? Set up and deploy? Yes
? Which scope? Your personal account
? Link to existing project? No
? Project name? party-stream-p2p
? In which directory is your code? ./
? Want to override settings? No
```

**Cost: $0/month** ✅

---

## Option 4: Cloudflare Pages (Free Tier - Global CDN)

### Step 1: Push to GitHub (see Option 1)

### Step 2: Connect to Cloudflare Pages
1. Go to https://pages.cloudflare.com/
2. Click "Create a project"
3. Connect GitHub account
4. Select repository
5. Build settings:
   - Framework: None
   - Build command: (leave empty)
   - Output directory: /
6. Deploy!

**Cost: $0/month** ✅

---

## Option 5: Firebase Hosting (Free Tier)

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Initialize Firebase
```bash
cd "c:\Users\stian\Desktop\party stream"
firebase login
firebase init hosting
```

### Step 3: Deploy
```bash
# Copy p2p-index.html to public/index.html
cp p2p-index.html public/index.html
firebase deploy
```

**Cost: $0/month** (up to 10GB/month, 360MB/day bandwidth)

---

## Local Testing (Before Deploy)

### Option A: Direct File Open
```bash
# Just open in browser
start p2p-index.html
```

### Option B: Local HTTP Server
```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server -p 8000

# Then open: http://localhost:8000/p2p-index.html
```

---

## Custom Domain Setup

### After deploying to any platform:

1. **Buy domain** (optional - platforms provide free subdomains)
   - Namecheap: ~$10/year
   - Google Domains: ~$12/year
   - Cloudflare: ~$9/year

2. **Configure DNS**
   ```
   Type: CNAME
   Name: @
   Value: [your-platform].pages.dev
   ```

3. **SSL Certificate**
   - All platforms provide free SSL automatically ✅

---

## Performance Optimization

### 1. Enable Compression
Most platforms auto-enable gzip/brotli. If not:

**Netlify** (`netlify.toml`):
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Encoding = "gzip"
```

### 2. Cache Headers
**Cloudflare Pages** (automatic edge caching)

### 3. CDN Configuration
All recommended platforms use global CDN by default ✅

---

## Monitoring & Analytics

### Free Options:

1. **Google Analytics**
   ```html
   <!-- Add before </head> in p2p-index.html -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

2. **Plausible Analytics** (privacy-focused)
   ```html
   <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
   ```

3. **Cloudflare Web Analytics** (free, no cookies)

---

## Environment Variables (Not needed for P2P!)

Since we're using PeerJS cloud and client-side only code, **no environment variables needed** ✅

For custom PeerJS server (advanced):
```javascript
const peer = new Peer({
    host: 'your-peerjs-server.com',
    port: 443,
    path: '/myapp'
});
```

---

## Deployment Checklist

- [x] Test locally (`p2p-index.html` opens in browser)
- [x] PeerJS connections work (test with 2 browser windows)
- [x] Video sync works
- [x] Chat works
- [x] Room sharing works
- [x] Chromecast button visible
- [ ] Deploy to platform of choice
- [ ] Test on deployed URL
- [ ] Share with friends!
- [ ] (Optional) Add custom domain
- [ ] (Optional) Add analytics

---

## Troubleshooting

### PeerJS Connection Fails
```javascript
// Check browser console for errors
// Common issues:
// 1. Browser blocking WebRTC (privacy settings)
// 2. Firewall blocking STUN/TURN
// 3. PeerJS cloud rate limiting

// Solution: Use custom PeerJS server
// See: https://github.com/peers/peerjs-server
```

### Video Not Loading
```javascript
// CORS issues with video URLs
// Solution: Use direct video URLs, not embedded pages
// Good: https://example.com/video.mp4
// Bad: https://youtube.com/embed/xxx (CORS restricted)
```

### Chromecast Not Working
```javascript
// Ensure HTTPS (Chromecast requires secure context)
// GitHub Pages: Automatic HTTPS ✅
// Netlify: Automatic HTTPS ✅
// Local: Use ngrok for HTTPS testing
```

---

## Recommended Deployment

**For you (Snakkaz):**

1. **Deploy to GitHub Pages** (easiest, free forever)
   ```bash
   # Already have repo at github.com/Snakkaz/party-stream
   # Just add p2p-index.html and enable Pages
   ```

2. **Keep Railway server as backup**
   ```
   Server-based: party-stream-production.up.railway.app (fallback)
   P2P version: snakkaz.github.io/party-stream/p2p-index.html (primary)
   ```

3. **Share both links**
   ```
   "Try P2P version (faster, free): [GitHub Pages link]
    Backup server version: [Railway link]"
   ```

---

## Cost Summary

| Platform | Monthly Cost | Bandwidth | Storage | Custom Domain |
|----------|-------------|-----------|---------|---------------|
| GitHub Pages | **$0** | 100GB/month | 1GB | ✅ Free |
| Netlify | **$0** | 100GB/month | Unlimited | ✅ Free |
| Vercel | **$0** | 100GB/month | Unlimited | ✅ Free |
| Cloudflare | **$0** | Unlimited | 25,000 files | ✅ Free |
| Firebase | **$0** | 10GB/month | 1GB | ✅ Free |

**Recommended: GitHub Pages or Netlify** for simplicity + reliability.

**Total cost: $0/month** 🎉

---

## Next Steps

1. Choose platform (GitHub Pages recommended)
2. Deploy `p2p-index.html`
3. Test with a friend
4. Share the link!
5. (Optional) Add custom domain
6. Enjoy free, fast, serverless video sync! 🚀

---

**Questions?** Open an issue on GitHub or contact stianpm@gmail.com
