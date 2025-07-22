/*
 * Minimal Starry Background Effects
 * Simple twinkling stars with subtle animations
 */

document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // SIMPLE WELCOME MESSAGE
  // ===============================
  const floatingMsg = document.createElement("div");
  floatingMsg.className = "lavellune-floating-message";
  floatingMsg.textContent = "Welcome to focus";
  floatingMsg.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    font-weight: 300;
    z-index: 1000;
    pointer-events: none;
    transition: opacity 0.8s ease;
  `;
  document.body.appendChild(floatingMsg);

  // Hide the welcome message after 3 seconds
  setTimeout(() => {
    floatingMsg.style.opacity = "0";
    setTimeout(() => floatingMsg.remove(), 800);
  }, 3000);

  // ===============================
  // MINIMAL STARRY BACKGROUND
  // ===============================
  const canvas = document.createElement("canvas");
  canvas.id = "lavelluneSky";
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    pointer-events: none;
    opacity: 0.6;
  `;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let stars = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Simple Star class with gentle twinkling
  class MinimalStar {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 1 + 0.3;
      this.alpha = Math.random() * 0.4 + 0.3;
      this.twinkle = Math.random() * Math.PI * 2;
      this.twinkleSpeed = Math.random() * 0.01 + 0.005;
    }
    
    update() {
      this.twinkle += this.twinkleSpeed;
    }
    
    draw() {
      const currentAlpha = this.alpha + Math.sin(this.twinkle) * 0.2;
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, currentAlpha)})`;
      ctx.fill();
    }
  }

  // Create fewer stars for minimal effect
  for (let i = 0; i < 80; i++) {
    stars.push(new MinimalStar());
  }

  // Simple animation loop
  function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
      star.update();
      star.draw();
    });
    
    requestAnimationFrame(animateStars);
  }
  animateStars();

  // ===============================
  // SUBTLE GRADIENT OVERLAY
  // ===============================
  const gradientOverlay = document.createElement("div");
  gradientOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -2;
    pointer-events: none;
    background: radial-gradient(circle at center, 
      transparent 0%, 
      rgba(0, 0, 20, 0.1) 50%, 
      rgba(0, 0, 40, 0.2) 100%);
    opacity: 0.8;
  `;
  document.body.appendChild(gradientOverlay);

  // ===============================
  // MOUSE INTERACTION (OPTIONAL)
  // ===============================
  let mouseStars = [];
  
  document.addEventListener("mousemove", (e) => {
    // Only create mouse stars occasionally to keep it minimal
    if (Math.random() < 0.05) {
      mouseStars.push({
        x: e.clientX,
        y: e.clientY,
        life: 30,
        maxLife: 30,
        radius: Math.random() * 0.8 + 0.2
      });
    }
    
    // Keep only recent mouse stars
    mouseStars = mouseStars.filter(star => star.life > 0);
  });

  // Add mouse stars to animation
  function drawMouseStars() {
    mouseStars.forEach(star => {
      star.life--;
      const alpha = star.life / star.maxLife * 0.3;
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    });
  }

  // Update animation loop to include mouse stars
  function animateMinimalStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
      star.update();
      star.draw();
    });
    
    drawMouseStars();
    
    requestAnimationFrame(animateMinimalStars);
  }
  animateMinimalStars();
});