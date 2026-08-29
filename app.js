/* ============================================================
   NAV
============================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ============================================================
   REVEAL ON SCROLL
============================================================ */
const revealTargets = document.querySelectorAll('.reveal, .post, .t-item, .skill-tile');
revealTargets.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach(el => io.observe(el));

/* ============================================================
   HERO TERMINAL TYPING EFFECT
============================================================ */
const codeLines = [
`const betania = {
  studying: "Computer Science",
  building: ["ML systems", "iOS apps", "fullstack product"],
  currently: "looking for new opportunities",
};

export default betania;`
];
const typedEl = document.getElementById('typedCode');
let ci = 0, li = 0;
function typeCode() {
  const text = codeLines[0];
  if (ci <= text.length) {
    typedEl.textContent = text.slice(0, ci);
    ci++;
    setTimeout(typeCode, 18);
  }
}
if (typedEl) setTimeout(typeCode, 500);

/* ============================================================
   ROTATING TAGLINE
============================================================ */
const rotWords = ['developing', 'pitching', 'building', 'shipping code', 'learning'];
const rotEl = document.getElementById('rotWord');
let rotIndex = 0;
function cycleRotWord() {
  rotEl.style.opacity = 0;
  setTimeout(() => {
    rotIndex = (rotIndex + 1) % rotWords.length;
    rotEl.textContent = rotWords[rotIndex];
    rotEl.style.opacity = 1;
  }, 280);
}
if (rotEl) {
  rotEl.style.transition = 'opacity .28s ease';
  setInterval(cycleRotWord, 2600);
}

/* ============================================================
   HERO CURSOR GLOW
============================================================ */
function reduceMotionCheck() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
const glowLayer = document.getElementById('glowLayer');
if (glowLayer && !reduceMotionCheck()) {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glowLayer.appendChild(glow);
  const heroEl = glowLayer.parentElement;
  let glowFade = null;
  heroEl.addEventListener('mousemove', (e) => {
    const rect = glowLayer.getBoundingClientRect();
    glow.style.left = (e.clientX - rect.left) + 'px';
    glow.style.top = (e.clientY - rect.top) + 'px';
    glow.classList.add('show');
    clearTimeout(glowFade);
    glowFade = setTimeout(() => glow.classList.remove('show'), 700);
  });
  heroEl.addEventListener('mouseleave', () => {
    glow.classList.remove('show');
    clearTimeout(glowFade);
  });
}

/* ============================================================
   BACKGROUND NODE NETWORK CANVAS
============================================================ */
const canvas = document.getElementById('netCanvas');
const ctx = canvas.getContext('2d');
let w, h, nodes = [];
const NODE_COUNT = 46;
const MAX_DIST = 150;
let mouse = { x: null, y: null };

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = Math.min(window.innerHeight * 1.05, 950);
}
resize();
window.addEventListener('resize', resize);

function initNodes() {
  nodes = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    });
  }
}
initNodes();

window.addEventListener('mousemove', (e) => {
  if (e.clientY < h) { mouse.x = e.clientX; mouse.y = e.clientY; }
});
window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function drawNet() {
  ctx.clearRect(0, 0, w, h);
  for (let n of nodes) {
    if (!reduceMotion) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }
  }
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX_DIST) {
        ctx.strokeStyle = `rgba(108,99,255,${0.14 * (1 - dist / MAX_DIST)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
    if (mouse.x !== null) {
      const dx = nodes[i].x - mouse.x, dy = nodes[i].y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180) {
        ctx.strokeStyle = `rgba(34,211,238,${0.22 * (1 - dist / 180)})`;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
    ctx.fillStyle = 'rgba(200,200,255,0.55)';
    ctx.beginPath();
    ctx.arc(nodes[i].x, nodes[i].y, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(drawNet);
}
drawNet();

/* ============================================================
   ART GENERATORS (SVG mockups per content type, no external images)
============================================================ */
function svgWrap(inner, bg = '#0E0E14') {
  return `<svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice"><rect width="300" height="300" fill="${bg}"/>${inner}</svg>`;
}
const G = { c1: '#6C63FF', c2: '#22D3EE', c3: '#F472B6', c4: '#34D399' };

function artDevice(accent) {
  return svgWrap(`
    <defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.9"/><stop offset="1" stop-color="${G.c2}" stop-opacity="0.5"/>
    </linearGradient></defs>
    <rect x="40" y="55" width="220" height="150" rx="14" fill="#15151C" stroke="#2A2A34"/>
    <rect x="40" y="55" width="220" height="26" rx="14" fill="#1B1B24"/>
    <circle cx="54" cy="68" r="3.2" fill="#FF5F57"/><circle cx="65" cy="68" r="3.2" fill="#FEBC2E"/><circle cx="76" cy="68" r="3.2" fill="#28C840"/>
    <rect x="56" y="100" width="70" height="90" rx="8" fill="url(#g1)" opacity="0.85"/>
    <rect x="134" y="100" width="112" height="20" rx="6" fill="#22242E"/>
    <rect x="134" y="128" width="90" height="10" rx="4" fill="#2C2E3A"/>
    <rect x="134" y="146" width="112" height="44" rx="8" fill="#1B1B24"/>
    <polyline points="140,178 155,160 170,170 186,150 202,164 218,144 236,158" fill="none" stroke="${G.c2}" stroke-width="2.2"/>
    <rect x="70" y="225" width="160" height="14" rx="7" fill="#1B1B24"/>
    <rect x="70" y="225" width="96" height="14" rx="7" fill="${accent}" opacity="0.65"/>
  `);
}
function artGraph(accent) {
  const pts = Array.from({length:9}, (_,i)=>{
    const x = 40 + i*26; const y = 220 - Math.abs(Math.sin(i*0.9+1))*140 - 20;
    return `${x},${y}`;
  }).join(' ');
  return svgWrap(`
    <line x1="40" y1="230" x2="270" y2="230" stroke="#2A2A34"/>
    <line x1="40" y1="230" x2="40" y2="50" stroke="#2A2A34"/>
    ${Array.from({length:5},(_,i)=>`<line x1="40" y1="${60+i*40}" x2="270" y2="${60+i*40}" stroke="#1B1B24"/>`).join('')}
    <polyline points="${pts}" fill="none" stroke="${accent}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
    ${pts.split(' ').map(p=>{const [x,y]=p.split(',');return `<circle cx="${x}" cy="${y}" r="3.4" fill="${accent}"/>`}).join('')}
    <text x="40" y="252" fill="#68686F" font-size="10" font-family="monospace">epoch</text>
  `, '#0E0E14');
}
function artBadge(accent) {
  return svgWrap(`
    <circle cx="150" cy="120" r="66" fill="none" stroke="${accent}" stroke-width="2" opacity="0.35"/>
    <circle cx="150" cy="120" r="50" fill="url(#gb)"/>
    <defs><radialGradient id="gb"><stop offset="0" stop-color="${accent}" stop-opacity="0.9"/><stop offset="1" stop-color="${accent}" stop-opacity="0.15"/></radialGradient></defs>
    <path d="M150 90 l9 20 22 2-16 15 5 22-20-12-20 12 5-22-16-15 22-2z" fill="#08080C"/>
    <path d="M108 190 l-14 46 34-14 26 26 4-58" fill="none" stroke="${accent}" stroke-width="0" />
    <rect x="118" y="168" width="64" height="10" rx="5" fill="${accent}" opacity="0.6"/>
    <rect x="128" y="184" width="44" height="8" rx="4" fill="#2C2E3A"/>
  `);
}
function artStat(accent) {
  const bars = [40,70,50,90,65,100,80];
  return svgWrap(`
    <text x="34" y="70" fill="${accent}" font-size="34" font-family="'Space Grotesk',sans-serif" font-weight="700">2.4x</text>
    <text x="34" y="92" fill="#68686F" font-size="11" font-family="monospace">week-over-week growth</text>
    ${bars.map((b,i)=>`<rect x="${34+i*30}" y="${230-b}" width="16" height="${b}" rx="4" fill="${accent}" opacity="${0.4+i*0.08}"/>`).join('')}
    <line x1="30" y1="232" x2="270" y2="232" stroke="#2A2A34"/>
  `);
}
function artPalette(colors) {
  return svgWrap(`
    <rect x="34" y="40" width="232" height="150" rx="14" fill="#15151C" stroke="#2A2A34"/>
    <rect x="34" y="40" width="232" height="150" rx="14" fill="none" stroke="#2A2A34"/>
    <rect x="52" y="58" width="70" height="70" rx="10" fill="${colors[0]}"/>
    <rect x="130" y="58" width="34" height="34" rx="8" fill="${colors[1]}"/>
    <rect x="170" y="58" width="34" height="34" rx="8" fill="${colors[2]}"/>
    <rect x="130" y="98" width="74" height="30" rx="8" fill="#1E1E28"/>
    <rect x="52" y="138" width="152" height="10" rx="5" fill="#1E1E28"/>
    <rect x="52" y="138" width="90" height="10" rx="5" fill="${colors[0]}" opacity="0.7"/>
    ${colors.map((c,i)=>`<circle cx="${60+i*22}" cy="215" r="8" fill="${c}"/>`).join('')}
  `);
}
const ARTS = {
  device:(a)=>artDevice(a), graph:(a)=>artGraph(a), badge:(a)=>artBadge(a),
  stat:(a)=>artStat(a), palette:(c)=>artPalette(c)
};

/* ============================================================
   HIGHLIGHTS — static text links in HTML
============================================================ */

/* ---- fullscreen story viewer, auto-advancing like real IG stories ---- */
const storyViewer = document.getElementById('storyViewer');
const storyStage = document.getElementById('storyStage');
const storyProgress = document.getElementById('storyProgress');
const storySlideContent = document.getElementById('storySlideContent');
const storyHeadIcon = document.getElementById('storyHeadIcon');
const storyHeadLabel = document.getElementById('storyHeadLabel');
let storySlides = [], storyIdx = 0, storyTimer = null;
const STORY_DURATION = 3400;

function buildSlides(h) {
  return [
    { icon: h.icon, title: h.title, text: h.body },
    ...h.list.map((item, i) => ({ icon: '⭐', title: `Highlight ${i + 1}`, text: item }))
  ];
}
function openStory(h) {
  storySlides = buildSlides(h);
  storyIdx = 0;
  storyStage.style.background = `radial-gradient(circle at 50% 20%, ${h.accent}55, #0A0A10 70%)`;
  storyHeadIcon.textContent = h.icon;
  storyHeadLabel.textContent = h.label;
  storyProgress.innerHTML = storySlides.map(() => `<div class="story-progress-seg"><div class="story-progress-fill"></div></div>`).join('');
  storyViewer.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderStorySlide();
}
function renderStorySlide() {
  const s = storySlides[storyIdx];
  storySlideContent.innerHTML = `
    <div class="story-slide-icon">${s.icon}</div>
    <div class="story-slide-title">${s.title}</div>
    <div class="story-slide-text">${s.text}</div>
    <div class="story-slide-index mono">${storyIdx + 1} / ${storySlides.length}</div>`;
  const segs = storyProgress.querySelectorAll('.story-progress-seg');
  segs.forEach((seg, i) => {
    seg.classList.remove('active', 'done');
    const fill = seg.querySelector('.story-progress-fill');
    fill.style.transition = 'none';
    fill.style.width = i < storyIdx ? '100%' : '0%';
    if (i < storyIdx) seg.classList.add('done');
  });
  clearTimeout(storyTimer);
  requestAnimationFrame(() => {
    const activeSeg = segs[storyIdx];
    activeSeg.classList.add('active');
    const fill = activeSeg.querySelector('.story-progress-fill');
    requestAnimationFrame(() => {
      fill.style.transition = `width ${STORY_DURATION}ms linear`;
      fill.style.width = '100%';
    });
  });
  storyTimer = setTimeout(nextStorySlide, STORY_DURATION);
}
function nextStorySlide() {
  if (storyIdx < storySlides.length - 1) { storyIdx++; renderStorySlide(); }
  else closeStory();
}
function prevStorySlide() {
  if (storyIdx > 0) { storyIdx--; renderStorySlide(); }
}
function closeStory() {
  clearTimeout(storyTimer);
  storyViewer.classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('storyNext').addEventListener('click', nextStorySlide);
document.getElementById('storyPrev').addEventListener('click', prevStorySlide);
document.getElementById('storyClose').addEventListener('click', closeStory);
storyViewer.addEventListener('click', (e) => { if (e.target === storyViewer) closeStory(); });

/* ============================================================
   FEED / PROJECTS DATA
============================================================ */
const projects = [
  { id:'fer-fairness', title:'FER Fairness via Diffusion-Based Augmentation',
    desc:'Improved ResNet-18 fairness in facial emotion recognition by augmenting training data with Stable Diffusion XL-generated faces.',
    stack:['Python','PyTorch','HuggingFace Diffusers','OpenCV'],
    href:'https://github.com/betaniacs/fer2013-fairness-augmentation' },
  { id:'treetrade', title:'TreeTrade',
    desc:'Co-founded a full-stack peer-to-peer marketplace for Stanford students, growing to 200+ users.',
    stack:['TypeScript','React','HTML/CSS','Supabase'],
    href:'https://treetrade.org/' },
  { id:'betterlink', title:'BetterLink',
    desc:'Building an AI-powered networking platform that uses ML and behavioral insights to create meaningful, high-probability connections.',
    stack:['Python','FastAPI','scikit-learn'],
    href:'https://github.com/betaniacs/BetterLink' },
];

const feedGrid = document.getElementById('feedGrid');
function renderFeed() {
  feedGrid.innerHTML = '';
  projects.forEach(p => {
    const el = document.createElement('div');
    el.className = 'post reveal';
    el.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="modal-chips">${p.stack.map(s => `<span class="chip">${s}</span>`).join('')}</div>
      <a class="post-link" href="${p.href}" target="_blank" rel="noopener">View project ↗</a>`;
    feedGrid.appendChild(el);
    io.observe(el);
    requestAnimationFrame(() => el.classList.add('in-view'));
  });
}
renderFeed();

const projectModal = document.getElementById('projectModal');
const projectModalPanel = document.getElementById('projectModalPanel');

function openProject(p) {
  projectModalPanel.innerHTML = `
    <button class="modal-close" data-close>&times;</button>
    <div class="modal-body">
      <span class="modal-eyebrow mono">${p.period}</span>
      <h2>${p.title}</h2>
      <p>${p.desc}</p>
      <div class="modal-section-title">Technologies</div>
      <div class="modal-chips">${p.stack.map(s => `<span class="chip">${s}</span>`).join('')}</div>
      <div class="modal-links">
        <a href="${p.github}" class="btn btn-ghost btn-sm" target="_blank" rel="noopener">GitHub ↗</a>
      </div>
    </div>`;
  openModal(projectModal);
}

/* modal open/close helpers */
function openModal(overlay) {
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(overlay) {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
[projectModal].forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.dataset.close !== undefined) closeModal(overlay);
  });
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeModal(projectModal); closeStory(); }
  if (storyViewer.classList.contains('open')) {
    if (e.key === 'ArrowRight') nextStorySlide();
    if (e.key === 'ArrowLeft') prevStorySlide();
  }
});

/* ============================================================
   TIMELINE DATA
============================================================ */
const timelineData = [
  { period:'Jun 2026 – Present · Palo Alto, CA', role:'Software Engineer Intern', org:'Level 3 AI',
    desc:'iOS team for AI workers' },
  { period:'Apr 2026 – Present · Stanford, CA', role:'Research Assistant, Responsible AI Ethics', org:'Stanford University',
    desc:'AI safety & governance' },
  { period:'Sep 2024 – May 2025 · Mountain View, CA', role:'Software Engineer Intern', org:'IpserLab LLC',
    desc:'Recommendation system for e-commerce startup' },
  { period:'Jun 2024 – Aug 2024 · Cambridge, MA', role:'ML Student Researcher', org:'Harvard Undergraduate OpenBio Laboratory',
    desc:'Identifying ovarian cancer biomarkers with machine learning and SHAP' },
  { period:'Mar 2024 – Dec 2024 · White Oak, MD', role:'Data Science & AI Intern', org:'Food and Drug Administration',
    desc:'Drug clearance prediction for precision dosing research' },
];
const timelineEl = document.getElementById('timeline');
timelineData.forEach(t => {
  const el = document.createElement('div');
  el.className = 't-item reveal';
  el.innerHTML = `
    <div class="t-dot"></div>
    <div class="t-card glass">
      <div class="t-period mono">${t.period}</div>
      <div class="t-role">${t.role}</div>
      <div class="t-org">${t.org}</div>
      <div class="t-desc">${t.desc}</div>
    </div>`;
  timelineEl.appendChild(el);
  io.observe(el);
});

/* ============================================================
   SKILLS DATA
============================================================ */
const D = (id, file = `${id}-original.svg`) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${id}/${file}`;
const SI = (slug) => `https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${slug}.svg`;

const skillsData = [
  { cat:'Languages', items:[
    { name:'Python', src: D('python') },
    { name:'Java', src: D('java') },
    { name:'C', src: D('c') },
    { name:'C++', src: D('cplusplus') },
    { name:'HTML', src: D('html5') },
    { name:'CSS', src: D('css3') },
    { name:'JavaScript', src: D('javascript') },
    { name:'TypeScript', src: D('typescript') },
    { name:'Assembly', svg:`<svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true"><rect x="14" y="12" width="20" height="24" rx="3" fill="none" stroke="#34D399" stroke-width="2"/><path d="M10 16h4M10 22h4M10 28h4M10 34h4M34 16h4M34 22h4M34 28h4M34 34h4" stroke="#34D399" stroke-width="2" stroke-linecap="round"/><text x="24" y="28" text-anchor="middle" font-size="8" font-family="JetBrains Mono,monospace" fill="#34D399" font-weight="700">ASM</text></svg>` },
  ]},
  { cat:'AI / ML', items:[
    { name:'PyTorch', src: D('pytorch') },
    { name:'TensorFlow', src: D('tensorflow') },
    { name:'Hugging Face', mask: SI('huggingface'), color:'#FFD21E' },
    { name:'scikit-learn', mask: SI('scikitlearn'), color:'#F7931E' },
    { name:'OpenCV', src: D('opencv') },
    { name:'Pandas', src: D('pandas') },
    { name:'NumPy', src: D('numpy') },
    { name:'OpenAI API', mask: SI('openai'), color:'#10A37F' },
  ]},
  { cat:'Frameworks', items:[
    { name:'React', src: D('react') },
    { name:'SwiftUI', src: D('swift') },
    { name:'FastAPI', src: D('fastapi') },
    { name:'Flutter', src: D('flutter') },
    { name:'Flask', src: D('flask'), invert:true },
    { name:'Firebase', src: D('firebase') },
    { name:'Supabase', src: D('supabase') },
  ]},
  { cat:'Tools', items:[
    { name:'VS Code', src: D('vscode') },
    { name:'Git', src: D('git') },
    { name:'Xcode', src: D('xcode') },
    { name:'Jupyter', src: D('jupyter') },
    { name:'Vercel', src: D('vercel'), invert:true },
    { name:'Figma', src: D('figma') },
    { name:'Eclipse', src: D('eclipse') },
    { name:'Linux', src: D('linux') },
    { name:'Unix', src: D('unix') },
  ]},
];

function skillIcon(s) {
  if (s.svg) return s.svg;
  if (s.mask) return `<span class="skill-logo" style="background:${s.color};-webkit-mask-image:url('${s.mask}');mask-image:url('${s.mask}')"></span>`;
  return `<img src="${s.src}" alt="" width="48" height="48" loading="lazy"${s.invert ? ' class="invert"' : ''}>`;
}

const skillsGrid = document.getElementById('skillsGrid');
skillsData.forEach(group => {
  const wrap = document.createElement('div');
  wrap.className = 'skill-group reveal';
  const grid = document.createElement('div');
  grid.className = 'skills-grid';
  group.items.forEach(s => {
    const el = document.createElement('div');
    el.className = 'skill-tile';
    el.innerHTML = `${skillIcon(s)}<span>${s.name}</span>`;
    grid.appendChild(el);
  });
  wrap.innerHTML = `<h3 class="skill-group-title mono">/ ${group.cat.toLowerCase()}</h3>`;
  wrap.appendChild(grid);
  skillsGrid.appendChild(wrap);
  io.observe(wrap);
});

/* ============================================================
   VIBE SWITCHER (theme cycler)
============================================================ */
const VIBE_THEMES = ['', 'theme-sunset', 'theme-mint', 'theme-grape'];
const VIBE_NAMES = ['indigo / cyan', 'sunset', 'mint', 'grape'];
let vibeIdx = 0;
const vibeBtn = document.getElementById('vibeBtn');
const vibeTooltip = document.getElementById('vibeTooltip');
vibeBtn.addEventListener('click', () => {
  vibeIdx = (vibeIdx + 1) % VIBE_THEMES.length;
  VIBE_THEMES.forEach(t => t && document.body.classList.remove(t));
  if (VIBE_THEMES[vibeIdx]) document.body.classList.add(VIBE_THEMES[vibeIdx]);
  vibeTooltip.textContent = VIBE_NAMES[vibeIdx];
  vibeTooltip.classList.add('show');
  clearTimeout(vibeBtn._to);
  vibeBtn._to = setTimeout(() => vibeTooltip.classList.remove('show'), 1400);
});

/* ============================================================
   CONFETTI SYSTEM
============================================================ */
const confettiCanvas = document.getElementById('confettiCanvas');
const cctx = confettiCanvas.getContext('2d');
function resizeConfetti() { confettiCanvas.width = window.innerWidth; confettiCanvas.height = window.innerHeight; }
resizeConfetti();
window.addEventListener('resize', resizeConfetti);
let confettiParticles = [];
const CONFETTI_COLORS = ['#6C63FF', '#22D3EE', '#F472B6', '#34D399', '#FFD166'];
function spawnConfetti(x, y, count, spread) {
  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x, y,
      vx: (Math.random() - 0.5) * spread,
      vy: -(Math.random() * spread * 0.8) - 3,
      size: 4 + Math.random() * 5,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rot: Math.random() * 360,
      vrot: (Math.random() - 0.5) * 14,
      life: 0,
      maxLife: 70 + Math.random() * 40,
    });
  }
  if (!confettiRunning) runConfetti();
}
let confettiRunning = false;
function runConfetti() {
  confettiRunning = true;
  cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach(p => {
    p.vy += 0.14; p.x += p.vx; p.y += p.vy; p.rot += p.vrot; p.life++;
    cctx.save();
    cctx.translate(p.x, p.y);
    cctx.rotate(p.rot * Math.PI / 180);
    cctx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);
    cctx.fillStyle = p.color;
    cctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    cctx.restore();
  });
  confettiParticles = confettiParticles.filter(p => p.life < p.maxLife);
  if (confettiParticles.length) {
    requestAnimationFrame(runConfetti);
  } else {
    confettiRunning = false;
    cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}
function miniConfetti(el, count = 20) {
  const rect = el.getBoundingClientRect();
  spawnConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, count, 6);
}
function bigConfetti() {
  const w = window.innerWidth;
  spawnConfetti(w * 0.2, window.innerHeight * 0.2, 60, 10);
  spawnConfetti(w * 0.8, window.innerHeight * 0.2, 60, 10);
  spawnConfetti(w * 0.5, window.innerHeight * 0.1, 60, 12);
}

/* small confetti reward on primary CTAs */
document.querySelectorAll('.hero-cta .btn-primary, .contact-cta .btn-primary').forEach(btn => {
  btn.addEventListener('click', () => miniConfetti(btn, 26));
});

/* ============================================================
   EASTER EGG: KONAMI CODE
============================================================ */
const eggToast = document.getElementById('eggToast');
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiProgress = 0;
document.addEventListener('keydown', (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (key === KONAMI[konamiProgress]) {
    konamiProgress++;
    if (konamiProgress === KONAMI.length) {
      konamiProgress = 0;
      bigConfetti();
      eggToast.textContent = "🎉 You found the konami code. Betania would definitely hire you.";
      eggToast.classList.add('show');
      setTimeout(() => eggToast.classList.remove('show'), 3200);
    }
  } else {
    konamiProgress = (key === KONAMI[0]) ? 1 : 0;
  }
});

/* click the avatar 5 times for a small surprise */
const avatarEl = document.querySelector('.avatar-wrap');
let avatarClicks = 0;
if (avatarEl) {
  avatarEl.style.cursor = 'pointer';
  avatarEl.addEventListener('click', () => {
    avatarClicks++;
    if (avatarClicks >= 5) {
      avatarClicks = 0;
      miniConfetti(avatarEl, 30);
      eggToast.textContent = "👋 hi! thanks for clicking me that many times.";
      eggToast.classList.add('show');
      setTimeout(() => eggToast.classList.remove('show'), 2400);
    }
  });
}
