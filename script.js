// Lightning Particle Effect for Background
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = -1;
canvas.style.pointerEvents = "none";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function random(min, max) {
  return Math.random() * (max - min) + min;
}

let bolts = [];

function createBolt() {
  let bolt = {
    x: random(0, canvas.width),
    y: 0,
    segments: [],
    alpha: 1,
    life: 0,
    maxLife: 20
  };
  let segments = 10;
  for (let i = 0; i < segments; i++) {
    bolt.segments.push({
      x: bolt.x + random(-20, 20),
      y: i * (canvas.height / segments)
    });
  }
  bolts.push(bolt);
}

function drawBolt(bolt) {
  ctx.beginPath();
  ctx.moveTo(bolt.segments[0].x, bolt.segments[0].y);
  for (let i = 1; i < bolt.segments.length; i++) {
    ctx.lineTo(bolt.segments[i].x, bolt.segments[i].y);
  }
  ctx.strokeStyle = `rgba(173,216,230,${bolt.alpha})`;
  ctx.lineWidth = 2;
  ctx.shadowBlur = 10;
  ctx.shadowColor = "lightblue";
  ctx.stroke();
  ctx.closePath();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = bolts.length - 1; i >= 0; i--) {
    let bolt = bolts[i];
    drawBolt(bolt);
    bolt.life++;
    bolt.alpha -= 0.03;
    if (bolt.life > bolt.maxLife || bolt.alpha <= 0) {
      bolts.splice(i, 1);
    }
  }

  if (Math.random() < 0.05) {
    createBolt();
  }

  requestAnimationFrame(animate);
}

animate();

document.addEventListener('DOMContentLoaded', () => {
  // Animasi progress bar skill setelah halaman di-load
  const progressHtml = document.querySelector('.progress.html');
  const progressCss = document.querySelector('.progress.css');
  const progressJs = document.querySelector('.progress.js');

  // Modal popup certificates
const modal = document.getElementById('certModal');
const modalImg = document.getElementById('certImg');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.cert_image').forEach(img => {
  img.addEventListener('click', () => {
    modal.style.display = 'block';
    modalImg.src = img.src;
    captionText.textContent = img.alt;
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
  if(e.target === modal) {
    modal.style.display = 'none';
  }
});

  setTimeout(() => {
    progressHtml.style.width = '90%';
    progressCss.style.width = '85%';
    progressJs.style.width = '75%';
  }, 500);

  // Tombol Contact Me
  const contactBtn = document.getElementById('contactBtn');
  contactBtn.addEventListener('click', () => {
    alert('You can contact me via email: example@mail.com');
  });

  // Tombol Download CV
  const downloadBtn = document.getElementById('downloadBtn');
  downloadBtn.addEventListener('click', () => {
    // Ganti URL file CV sesuai milikmu
    const link = document.createElement('a');
    link.href = 'cv.pdf';
    link.download = 'MyPortfolio_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
