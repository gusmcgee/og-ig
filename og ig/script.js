const s = document.createElement('style');
s.textContent = `a[href*="/reels/"] { display: none !important; }`;
document.documentElement.appendChild(s);
