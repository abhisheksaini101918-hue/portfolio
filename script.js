/* ---------------- Smooth Scroll ---------------- */

document.querySelectorAll('nav a').forEach(link=>{
  link.addEventListener('click',e=>{
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if(target){
      target.scrollIntoView({behavior:'smooth'});
    }
  });
});


/* ---------------- Reveal Animation ---------------- */

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
},{threshold:0.15});

document.querySelectorAll(
  '.skill-card,.project-card,.timeline-item,.cert-card,.deep-card,.process-card'
).forEach(card=>{
  card.style.opacity = 0;
  card.style.transform = 'translateY(20px)';
  card.style.transition = '0.6s ease';
  observer.observe(card);
});


/* ================= Hacker Matrix Background ================= */

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const letters = "01アカサタナハマヤラワABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;

function createDrops(){
  return Array(Math.floor(canvas.width / fontSize)).fill(1);
}

let drops = createDrops();

window.addEventListener("resize", ()=>{
  drops = createDrops();
});

function drawMatrix(){

  ctx.fillStyle = "rgba(2,6,23,0.08)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "#22c55e";
  ctx.font = fontSize + "px monospace";

  for(let i=0;i<drops.length;i++){

    const char = letters[Math.floor(Math.random()*letters.length)];

    ctx.fillText(char, i * fontSize, drops[i] * fontSize);

    if(drops[i] * fontSize > canvas.height && Math.random() > 0.975){
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix,33);
