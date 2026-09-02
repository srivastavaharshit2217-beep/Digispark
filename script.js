/* DigiSpark navigation enhancement loader */
(function(){
  const original=document.createElement('script');
  original.src='https://raw.githubusercontent.com/srivastavaharshit2217-beep/Digispark/92cbdd2a75cd95ff9c7e6ca39aaa44d6eb82ee55/script.js';
  original.onload=function(){
    const nav=document.querySelector('.nav-links');
    const menu=document.querySelector('.menu-btn');
    if(!nav||!menu)return;
    nav.innerHTML=`
      <a href="#home" class="ds-main-link">⌂ <span>Home</span></a>
      <div class="ds-nav-group"><button type="button" class="ds-nav-parent">↗ <span>Marketing</span><b>⌄</b></button><div class="ds-nav-dropdown"><a href="service.html?service=digital-marketing">Digital Marketing</a><a href="service.html?service=seo">SEO</a></div></div>
      <div class="ds-nav-group"><button type="button" class="ds-nav-parent">&lt;&gt; <span>Development</span><b>⌄</b></button><div class="ds-nav-dropdown"><a href="service.html?service=web-development">Web Development</a><a href="service.html?service=business-solutions">Business Solutions</a></div></div>
      <div class="ds-nav-group"><button type="button" class="ds-nav-parent">✎ <span>Design</span><b>⌄</b></button><div class="ds-nav-dropdown"><a href="service.html?service=graphic-design">Graphic Design</a><a href="service.html?service=video-editing">Video Editing</a></div></div>
      <div class="ds-nav-group"><button type="button" class="ds-nav-parent">▣ <span>Company</span><b>⌄</b></button><div class="ds-nav-dropdown"><a href="#about">About</a><a href="#portfolio">Portfolio</a><a href="#testimonials">Reviews</a><a href="#industries">Industries</a><a href="#faq">FAQ</a><a href="#contact">Contact</a><a href="client-status.html">Track Enquiry</a></div></div>
      <a href="#contact" class="nav-btn">Get Started</a>`;
    const css=document.createElement('style');
    css.textContent=`
      @media(min-width:851px){
        .nav-links{position:absolute!important;right:0!important;top:62px!important;width:min(760px,calc(100vw - 40px))!important;min-width:0!important;padding:10px!important;display:none!important;flex-direction:row!important;align-items:center!important;justify-content:flex-start!important;gap:3px!important;background:rgba(7,7,7,.98)!important;border:1px solid #343434!important;border-radius:16px!important;box-shadow:0 22px 55px rgba(0,0,0,.4)!important;z-index:9998!important}
        .nav-links.open{display:flex!important}.nav-links>a,.ds-nav-parent{color:#fff!important;text-decoration:none!important;font:700 13px Inter,Arial,sans-serif!important;border:0!important;background:transparent!important;padding:12px 11px!important;border-radius:10px!important;white-space:nowrap!important}.nav-links>a:hover,.ds-nav-parent:hover{background:#1a1a1a!important;color:#ffd866!important}.ds-nav-group{position:relative!important}.ds-nav-parent{display:flex!important;align-items:center!important;gap:7px!important;cursor:pointer!important}.ds-nav-parent b{font-size:13px!important;color:#999!important;font-weight:800!important}.ds-nav-dropdown{position:absolute!important;left:0!important;top:calc(100% + 7px)!important;min-width:210px!important;padding:7px!important;background:#111!important;border:1px solid #343434!important;border-radius:12px!important;box-shadow:0 18px 45px rgba(0,0,0,.42)!important;display:none!important}.ds-nav-group.open .ds-nav-dropdown{display:block!important}.ds-nav-dropdown a{display:block!important;padding:10px 12px!important;border-radius:8px!important;color:#ddd!important;text-decoration:none!important;font:600 12px Inter,Arial,sans-serif!important}.ds-nav-dropdown a:hover{background:#202020!important;color:#ffd866!important}.nav-links .nav-btn{margin-left:auto!important;background:#f5b72b!important;color:#111!important;padding:11px 14px!important}.nav-links .nav-btn:hover{background:#ffd866!important;color:#111!important}
      }
      @media(max-width:850px){
        .nav-links{overflow:visible!important}.ds-nav-group{width:100%}.ds-nav-parent{width:100%;display:flex;align-items:center;justify-content:space-between;border:0;background:transparent;color:inherit;padding:12px 0;font:inherit;cursor:pointer}.ds-nav-parent span{margin-right:auto;margin-left:8px}.ds-nav-dropdown{display:none;padding:4px 0 5px 18px}.ds-nav-group.open .ds-nav-dropdown{display:block}.ds-nav-dropdown a{display:block;padding:10px 8px;color:inherit;text-decoration:none}.ds-nav-parent b{font-size:12px}.ds-nav-group.open .ds-nav-parent b{transform:rotate(180deg);display:inline-block}.nav-links>a{display:block}.nav-links .nav-btn{margin-top:6px}
      }
    `;
    document.head.appendChild(css);
    nav.querySelectorAll('.ds-nav-parent').forEach(btn=>btn.addEventListener('click',function(e){
      e.preventDefault();e.stopPropagation();
      const group=this.parentElement;
      nav.querySelectorAll('.ds-nav-group').forEach(g=>{if(g!==group)g.classList.remove('open')});
      group.classList.toggle('open');
    }));
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.querySelectorAll('.ds-nav-group').forEach(g=>g.classList.remove('open'));nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
    document.addEventListener('click',e=>{if(!e.target.closest('.ds-nav-group'))nav.querySelectorAll('.ds-nav-group').forEach(g=>g.classList.remove('open'))});
  };
  document.head.appendChild(original);
})();
