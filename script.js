
// ===== UTIL: Theme =====
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const storedTheme = localStorage.getItem('theme');
if(storedTheme === 'light'){ document.body.classList.add('light'); }
themeBtn.addEventListener('click',()=>{
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
  themeBtn.innerHTML = document.body.classList.contains('light') ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
});
themeBtn.innerHTML = document.body.classList.contains('light') ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';

// ===== UTIL: Mobile Nav =====
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', ()=>{
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

// ===== Scrollspy (active nav link) =====
const sections = [...document.querySelectorAll('section')];
const links = [...document.querySelectorAll('nav a')];
const spy = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      links.forEach(a=>a.classList.remove('active'));
      const id = entry.target.getAttribute('id');
      const active = document.querySelector(`nav a[href="#${id}"]`);
      if(active) active.classList.add('active');
    }
  })
},{rootMargin:'-50% 0px -48% 0px', threshold:0});
sections.forEach(s=>spy.observe(s));

// ===== Projects Filter =====
const filterButtons = document.querySelectorAll('.filters button');
const cards = document.querySelectorAll('.project');
filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
  filterButtons.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  cards.forEach(card=>{
    if(f==='all' || card.dataset.tags.includes(f)) card.classList.remove('hide');
    else card.classList.add('hide');
  })
}))

// ===== Contact form (basic validation demo) =====
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  if(!data.name || !data.email || !data.message){
    status.textContent = 'Please fill out all fields.';
    return;
  }
  status.textContent = 'Thanks! I\'ll get back to you within 24 hours.';
  form.reset();
})

// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Reveal on scroll =====
const reveal = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.style.transition='600ms ease'; entry.target.style.transform='translateY(0)'; entry.target.style.opacity='1'; reveal.unobserve(entry.target); }
  })
},{threshold:.15});

document.querySelectorAll('.card,.service,.project,.skill,.kpi,.shot').forEach(el=>{
  el.style.transform='translateY(16px)';
  el.style.opacity='.001';
  reveal.observe(el);
})
