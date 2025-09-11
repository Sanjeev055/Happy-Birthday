/* ---------- Personal message ---------- */
const lines = [
 "Hey… I just want you to know how much you mean to me. On your special day, I wish you every little thing that makes your heart smile. I hope every sunrise gives you a reason to wake up happy, every sunset reminds you how cherished and loved you are, and every quiet moment in between wraps you in the kind of warmth only you deserve. You bring so much light into my life — in your laughter, in the way you see the world, in the simple moments that we share. I hope today, and every day after, life gives back to you all the joy, love, and magic that you’ve given to everyone around you, especially me. I wish for you endless adventures that make your heart race, soft moments that make you feel at peace, and memories that sparkle forever in your mind. I hope you chase your dreams boldly, knowing I’ll always be here cheering you on, holding you close in spirit even when I can’t be there physically. You deserve every star in the sky, every whisper of happiness, and every dream you’ve ever dared to imagine. And I hope… I hope I get to see your smile, hear your laugh, and be part of your world for all the birthdays to come. You’re my heart, my joy, and the most beautiful part of every day, and I love you more than words can ever fully capture. ❤️ I LOVE YOU MORE THAN ANYTHING 😗😗"
];
/* -------------------------------------- */

const typedEl = document.getElementById('typed');
const caret = document.getElementById('caret');
const revealBtn = document.getElementById('revealBtn');
const heartBtn = document.getElementById('heartBtn');
const muteBtn = document.getElementById('muteBtn');
const viewImagesBtn = document.getElementById('viewImagesBtn');

let fullText = lines.join('\n\n');
let lineIndex = 0, charIndex = 0;

/* Typewriter effect */
function typeNext() {
  if (lineIndex >= lines.length) { caret.style.display='none'; return; }
  const line = lines[lineIndex];
  if (charIndex < line.length) {
    typedEl.innerHTML = escapeHtml(
      lines.slice(0, lineIndex).join('<br><br>') + (line.slice(0, charIndex+1))
    );
    charIndex++;
    setTimeout(typeNext, 40 + Math.random()*40);
  } else {
    charIndex = 0;
    lineIndex++;
    setTimeout(typeNext, 400);
  }
}
function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
}
typeNext();

/* Reveal full message */
revealBtn.addEventListener('click', () => {
  typedEl.innerHTML = escapeHtml(fullText).replace(/\n/g,'<br>');
  caret.style.display='none';
  burst(30);
});

/* Heart click -> confetti */
heartBtn.addEventListener('click', () => {
  burst(15);
  heartBtn.animate([{transform:'scale(1)'},{transform:'scale(1.1)'},{transform:'scale(1)'}],
                   {duration:400,easing:'ease-out'});
});

/* -------- Confetti system -------- */
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');
let W = window.innerWidth, H = window.innerHeight;
confettiCanvas.width = W; confettiCanvas.height = H;
let confettis = [];

function rand(min,max){ return Math.random()*(max-min)+min; }
function makeConfetti(n){
  for(let i=0;i<n;i++){
    confettis.push({
      x:rand(0,W), y:rand(-H,0),
      r:rand(6,12),
      speed:rand(1,4),
      color: `hsl(${rand(0,360)},70%,60%)`
    });
  }
}
function render(){
  ctx.clearRect(0,0,W,H);
  for(let i=0;i<confettis.length;i++){
    const p=confettis[i];
    p.y += p.speed;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.r, p.r*0.6);
    if(p.y > H+20) { confettis.splice(i,1); i--; }
  }
  requestAnimationFrame(render);
}
render();
function burst(n){ makeConfetti(n); }
window.addEventListener('resize', ()=>{
  W = window.innerWidth; H = window.innerHeight;
  confettiCanvas.width = W; confettiCanvas.height = H;
});
setTimeout(()=> burst(10), 800);

/* Background music */
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

muteBtn.addEventListener('click', () => {
  if (!isPlaying) {
    bgMusic.play();
    muteBtn.textContent = "Pause music";
    isPlaying = true;
  } else {
    bgMusic.pause();
    muteBtn.textContent = "Play music";
    isPlaying = false;
  }
});

/* Redirect to images page */
viewImagesBtn.addEventListener('click', () => {
  window.location.href = "images.html";
});

