// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const inner = document.querySelector('.mobile-menu-inner');
const closeBtn = document.querySelector('.mobile-close');

function openMenu(){
  mobileMenu.hidden = false;
  requestAnimationFrame(()=> mobileMenu.classList.add('open'));
}
function closeMenu(){
  mobileMenu.classList.remove('open');
  mobileMenu.addEventListener('transitionend', ()=> mobileMenu.hidden = true, {once:true});
}

if(toggle){
  toggle.addEventListener('click', ()=>{
    const expanded = toggle.getAttribute('aria-expanded') === 'true' || false;
    toggle.setAttribute('aria-expanded', String(!expanded));
    !expanded ? openMenu() : closeMenu();
  });
}
if(closeBtn){ closeBtn.addEventListener('click', closeMenu); }
if(mobileMenu){ mobileMenu.addEventListener('click', (e)=>{ if(e.target===mobileMenu) closeMenu(); }); }

// Scroll reveal
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.2});

document.querySelectorAll('.heading-reveal, .reveal, .reveal-delay, .reveal-delay-2').forEach(el=>observer.observe(el));



// Canvas noise (animated grain)
(function(){
  const layer = document.querySelector('.noise-background-fixed');
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d', {alpha: true});
  let w, h, id;
  function resize(){
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    draw();
  }
  function draw(){
    const imageData = ctx.createImageData(w, h);
    const buf = new Uint32Array(imageData.data.buffer);
    for(let i=0;i<buf.length;i++){
      const v = Math.random()*255|0;
      buf[i] = (30<<24) | (v<<16) | (v<<8) | v;
    }
    ctx.putImageData(imageData,0,0);
  }
  function loop(){
    draw();
    id = requestAnimationFrame(loop);
  }
  resize();
  window.addEventListener('resize', resize);
  layer.appendChild(c);
  loop();
})();
