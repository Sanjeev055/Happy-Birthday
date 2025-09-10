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

/* Background music autoplay */
const bgMusic = document.getElementById('bgMusic');
bgMusic.play().catch(() => {
  console.log("Autoplay blocked, click anywhere to start music.");
});

document.body.addEventListener('click', () => {
  if(bgMusic.paused){
    bgMusic.play();
  }
});
