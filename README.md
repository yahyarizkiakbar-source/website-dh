# Dream Haven Roleplay — SA-MP Landing Page

Static landing page untuk server SA-MP / open.mp. Dibangun tanpa framework, fokus ke kecepatan dan kompatibilitas mobile.

Demo: [https://username.github.io/Dream Haven-rp](https://jabrann.github.io/Dream Haven-Website-Gta-Samp/)

## Features

- Video background dengan fallback untuk mobile
- Background music (play on first interaction)
- Play button dengan auto-detect platform (Android intent, PC samp://, iOS alert)
- Live server status via tsarvar.com API
- Live Discord member count via Discord API
- Preloader, mute toggle, OG meta tags
- Fully responsive (iOS safe-area, Android 100dvh)

## Quick Start

1. Clone atau download repo
2. Edit konfigurasi di `script.js`:
   ```js
   const SERVER_IP = '15.235.133.208';
   const SERVER_PORT = '7004';
   const DISCORD_INVITE = '4yzemNcgw8'; // ambil dari discord.gg/xxx
