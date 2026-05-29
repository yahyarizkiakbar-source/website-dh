const video = document.getElementById('bg-video');
const music = document.getElementById('bg-music');
const muteBtn = document.getElementById('muteBtn');
const iconSound = document.getElementById('icon-sound');
const iconMute = document.getElementById('icon-mute');
const preloader = document.getElementById('preloader');
const playBtn = document.getElementById('playBtn');

const SERVER_IP = '151.240.0.201';
const SERVER_PORT = '7796';
const DISCORD_INVITE = '9BkfWF5DdQ'; // ganti kalau invite beda

// Preloader
window.addEventListener('load', () => {
  video.setAttribute('playsinline','');
  video.setAttribute('webkit-playsinline','');
  video.play().catch(()=>{});
  setTimeout(()=> preloader.style.opacity='0', 400);
  setTimeout(()=> preloader.style.display='none', 900);
});

// Musik
let musicStarted = false;
function startMusic(){
  if(musicStarted) return;
  musicStarted = true;
  music.volume = 0.6;
  music.play().catch(()=>{});
}
['click','touchstart','keydown'].forEach(e=> window.addEventListener(e, startMusic, {once:true, passive:true}));

muteBtn.addEventListener('click', ()=>{
  music.muted = !music.muted;
  iconSound.style.display = music.muted ? 'none' : 'block';
  iconMute.style.display = music.muted ? 'block' : 'none';
});

// Play button
playBtn.addEventListener('click', e=>{
  e.preventDefault();
  startMusic();
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  if(isAndroid){
    window.location = `intent://${SERVER_IP}:${SERVER_PORT}#Intent;scheme=samp;package=ro.alynsampmobile.launcher;end`;
    setTimeout(()=> window.location=`samp://${SERVER_IP}:${SERVER_PORT}`, 800);
  } else if(isIOS){
    alert('iPhone tidak bisa buka SA-MP langsung.\n\n1. Download di PC, atau\n2. Pakai Android untuk main.\n\nIP: '+SERVER_IP+':'+SERVER_PORT);
  } else {
    window.location=`samp://${SERVER_IP}:${SERVER_PORT}`;
  }
});

// Player count
async function updatePlayers(){
  const el = document.getElementById('playerCount');
  const dot = document.querySelector('.dot');
  try {
    const api = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://tsarvar.com/api/server/${SERVER_IP}:${SERVER_PORT}`)}`;
    const res = await fetch(api);
    const data = await res.json();
    if(data && data.online){
      el.textContent = `${data.players} / ${data.maxplayers} Online`;
      dot.style.background = '#2ecc71';
    } else {
      el.textContent = 'Server Online • Join Now';
    }
  } catch {
    el.textContent = 'IP: '+SERVER_IP+':'+SERVER_PORT;
  }
}

// Discord live count
async function updateDiscord(){
  const el = document.getElementById('discordCount');
  if(!el) return;
  try {
    const api = 'https://api.allorigins.win/raw?url=' + 
      encodeURIComponent(`https://discord.com/api/v10/invites/${DISCORD_INVITE}?with_counts=true`);
    const res = await fetch(api, {cache: 'no-store'});
    const data = await res.json();
    if(data && data.approximate_presence_count){
      const online = data.approximate_presence_count.toLocaleString('id-ID');
      const members = data.approximate_member_count.toLocaleString('id-ID');
      el.innerHTML = `🔴 ${online} online • ${members} members`;
    }
  } catch(e) {
    el.innerHTML = '🔴 Join Discord';
  }
}

updatePlayers();
updateDiscord();
setInterval(updatePlayers, 30000);
setInterval(updateDiscord, 60000);