// ...existing code...
// Small script for reveals, theme toggle and some tiny UI niceties
document.addEventListener('DOMContentLoaded', () => {
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in-view');
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // theme toggle (simple)
  const btn = document.getElementById('themeToggle');
  const root = document.documentElement;
  const pref = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(pref);
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  function applyTheme(t){
    if(t === 'dark'){
      root.style.setProperty('--bg-1','#08121a');
      root.style.setProperty('--bg-2','#0b1720');
      root.style.setProperty('--card','rgba(10,18,24,0.55)');
      root.style.setProperty('--text','#e6f0f6');
      root.style.setProperty('--muted','#9fb5c9');
      root.style.setProperty('--accent','#4ea0ff');
      root.style.setProperty('--accent-2','#70c8ff');
      root.setAttribute('data-theme','dark');
    } else {
      // default values already in CSS; reloading simple map
      root.style.removeProperty('--bg-1');
      root.style.removeProperty('--bg-2');
      root.style.removeProperty('--card');
      root.style.removeProperty('--text');
      root.style.removeProperty('--muted');
      root.style.removeProperty('--accent');
      root.style.removeProperty('--accent-2');
      root.setAttribute('data-theme','light');
    }
    localStorage.setItem('theme', t);
  }

  // simple accessible focus for keyboard users
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Tab') document.body.classList.add('show-focus');
  });
});