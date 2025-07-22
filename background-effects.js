/*
 * Enhanced Lavellune Background Effects
 * Creates animated starry background, floating particles, and welcome message
 */

document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // FLOATING WELCOME MESSAGE
  // ===============================
  const floatingMsg = document.createElement("div");
  floatingMsg.className = "lavellune-floating-message";
  floatingMsg.textContent = "✨ Welcome to your sanctuary of focus ✨";
  document.body.appendChild(floatingMsg);

  // Hide the welcome message after 5 seconds or on scroll
  function hideFloatingMsg() {
    floatingMsg.style.transition = "opacity 1s ease, transform 1s ease";
    floatingMsg.style.opacity = "0";
    floatingMsg.style.transform = "translateX(-50%) translateY(-30px)";
    setTimeout(() => floatingMsg.remove(), 1000);
  }
  
  setTimeout(hideFloatingMsg, 5000);
  window.addEventListener("scroll", hideFloatingMsg, { once: true });

  // ===============================
  // ENHANCED STARRY BACKGROUND
  // ===============================
  const canvas = document.createElement("canvas");
  canvas.id = "lavelluneSky";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.zIndex = "-1";
  canvas.style.pointerEvents = "none";
  canvas.style.mixBlendMode = "screen";
  canvas.style.opacity = "0.8";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let stars = [];
  let shootingStars = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Enhanced Star class with more beautiful effects
  class Star {
    constructor() {
      this.reset();
      this.twinkleOffset = Math.random() * Math.PI * 2;
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 100;
      this.radius = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.speed = Math.random() * 0.2 + 0.05;
      this.twinkle = 0;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
    }
    
    update() {
      this.y -= this.speed;
      this.twinkle += this.pulseSpeed;
      if (this.y < -20) this.reset();
    }
    
    draw() {
      const twinkleAlpha = this.alpha + Math.sin(this.twinkle + this.twinkleOffset) * 0.3;
      const twinkleRadius = this.radius + Math.sin(this.twinkle * 2) * 0.2;
      
      // Main star
      ctx.beginPath();
      ctx.arc(this.x, this.y, twinkleRadius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, twinkleAlpha)})`;
      ctx.fill();
      
      // Glow effect
      if (twinkleAlpha > 0.7) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, twinkleRadius * 2, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${(twinkleAlpha - 0.7) * 0.2})`;
        ctx.fill();
      }
    }
  }

  // Shooting Star class for magical effects
  class ShootingStar {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = -10;
      this.length = Math.random() * 80 + 40;
      this.speed = Math.random() * 3 + 2;
      this.angle = Math.random() * 30 + 15; // Degrees
      this.opacity = Math.random() * 0.8 + 0.2;
      this.life = 0;
      this.maxLife = Math.random() * 60 + 40;
    }
    
    update() {
      this.x += Math.cos(this.angle * Math.PI / 180) * this.speed;
      this.y += Math.sin(this.angle * Math.PI / 180) * this.speed;
      this.life++;
      
      if (this.life > this.maxLife || this.x > canvas.width + 100 || this.y > canvas.height + 100) {
        this.reset();
      }
    }
    
    draw() {
      const alpha = this.opacity * (1 - this.life / this.maxLife);
      
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle * Math.PI / 180);
      
      // Create gradient for the tail
      const gradient = ctx.createLinearGradient(0, 0, -this.length, 0);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.5})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-this.length, -2);
      ctx.lineTo(-this.length, 2);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Bright head
      ctx.beginPath();
      ctx.arc(0, 0, 2, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
      
      ctx.restore();
    }
  }

  // Create stars
  for (let i = 0; i < 150; i++) {
    stars.push(new Star());
  }

  // Create fewer shooting stars for subtle effect
  for (let i = 0; i < 3; i++) {
    shootingStars.push(new ShootingStar());
  }

  // Animation loop
  function animateSky() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw regular stars
    stars.forEach(star => {
      star.update();
      star.draw();
    });
    
    // Update and draw shooting stars occasionally
    if (Math.random() < 0.995) { // 0.5% chance each frame
      shootingStars.forEach(shootingStar => {
        shootingStar.update();
        shootingStar.draw();
      });
    }
    
    requestAnimationFrame(animateSky);
  }
  animateSky();

  // ===============================
  // FLOATING PARTICLES EFFECT
  // ===============================
  const particleCanvas = document.createElement("canvas");
  particleCanvas.style.position = "fixed";
  particleCanvas.style.top = "0";
  particleCanvas.style.left = "0";
  particleCanvas.style.width = "100vw";
  particleCanvas.style.height = "100vh";
  particleCanvas.style.zIndex = "-2";
  particleCanvas.style.pointerEvents = "none";
  particleCanvas.style.opacity = "0.3";
  document.body.appendChild(particleCanvas);

  const pCtx = particleCanvas.getContext("2d");
  let particles = [];

  function resizeParticleCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }
  resizeParticleCanvas();
  window.addEventListener("resize", resizeParticleCanvas);

  class FloatingParticle {
    constructor() {
      this.x = Math.random() * particleCanvas.width;
      this.y = Math.random() * particleCanvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.speedY = (Math.random() - 0.5) * 0.2;
      this.opacity = Math.random() * 0.3 + 0.1;
      this.pulseSpeed = Math.random() * 0.01 + 0.005;
      this.pulse = 0;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.pulse += this.pulseSpeed;
      
      // Wrap around screen
      if (this.x < 0) this.x = particleCanvas.width;
      if (this.x > particleCanvas.width) this.x = 0;
      if (this.y < 0) this.y = particleCanvas.height;
      if (this.y > particleCanvas.height) this.y = 0;
    }
    
    draw() {
      const currentOpacity = this.opacity + Math.sin(this.pulse) * 0.1;
      pCtx.beginPath();
      pCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      pCtx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, currentOpacity)})`;
      pCtx.fill();
    }
  }

  // Create floating particles
  for (let i = 0; i < 50; i++) {
    particles.push(new FloatingParticle());
  }

  function animateParticles() {
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ===============================
  // SOFT MIST OVERLAY
  // ===============================
  const mistOverlay = document.createElement("div");
  mistOverlay.className = "lavellune-mist-overlay";
  document.body.appendChild(mistOverlay);
});