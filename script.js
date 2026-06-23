/**
 * THE SUNSET ENGINE
 * Flat 2D interactions and minimal tracking.
 */
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  
  const particleContainer = document.getElementById('particles');
  if (particleContainer) {
    for (let i = 1; i <= 150; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      particleContainer.appendChild(p);
    }
  }

  const clockEl = document.getElementById('clock');
  setInterval(() => {
    if (clockEl) {
      const d = new Date();
      clockEl.innerText = d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
  }, 1000);

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  
  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  let centerX = window.innerWidth / 2;
  let centerY = window.innerHeight / 2;
  
  window.addEventListener('resize', () => {
    centerX = window.innerWidth / 2;
    centerY = window.innerHeight / 2;
  });

  const lerp = (start, end, factor) => start + (end - start) * factor;

  const update = () => {
    currentX = lerp(currentX, targetX, 0.06);
    currentY = lerp(currentY, targetY, 0.06);
    
    root.style.setProperty('--mouse-x', `${currentX}px`);
    root.style.setProperty('--mouse-y', `${currentY}px`);
    
    const percentX = (currentX - centerX) / centerX;
    const percentY = (currentY - centerY) / centerY;
    
    // 2D Pan only, no 3D rotation
    const panX = percentX * 20;
    const panY = percentY * 20;
    root.style.setProperty('--scene-pan-x', `${panX}px`);
    root.style.setProperty('--scene-pan-y', `${panY}px`);
    
    const textSubject = document.querySelector('.sunset-text');
    if (textSubject) {
      const rect = textSubject.getBoundingClientRect();
      const localX = currentX - rect.left;
      const localY = currentY - rect.top;
      root.style.setProperty('--text-local-x', `${localX}px`);
      root.style.setProperty('--text-local-y', `${localY}px`);
    }
    
    requestAnimationFrame(update);
  };
  
  update();
});