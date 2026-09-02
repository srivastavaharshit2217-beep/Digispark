(function(){
  const services=document.getElementById('services');
  if(!services||document.getElementById('ds-home-process'))return;
  const section=document.createElement('section');
  section.id='ds-home-process';
  section.className='ds-home-process';
  section.innerHTML=`
    <div class="container">
      <div class="ds-process-head">
        <div>
          <p class="tag">HOW WE WORK</p>
          <h2>From idea to digital growth, step by step.</h2>
          <p>We keep the process simple so you always know what happens next.</p>
        </div>
        <a href="#contact" class="btn primary">Start Your Project <span>→</span></a>
      </div>
      <div class="ds-process-grid">
        <article><span>01</span><div><h3>Understand</h3><p>We learn about your business, goals, audience and requirements.</p></div></article>
        <article><span>02</span><div><h3>Plan</h3><p>We recommend the right service, tools and digital approach for the project.</p></div></article>
        <article><span>03</span><div><h3>Build</h3><p>Our team turns the plan into a professional digital solution.</p></div></article>
        <article><span>04</span><div><h3>Grow</h3><p>We focus on improving your digital presence as your business grows.</p></div></article>
      </div>
    </div>`;
  services.parentNode.insertBefore(section,services.nextElementSibling);
  const style=document.createElement('style');
  style.textContent=`
    .ds-home-process{padding:78px 0;background:#0b0b0b;color:#fff;border-top:1px solid #1f1f1f;border-bottom:1px solid #1f1f1f}
    .ds-process-head{display:flex;align-items:end;justify-content:space-between;gap:30px;margin-bottom:35px}
    .ds-process-head h2{max-width:700px;margin:8px 0 10px;color:#fff}
    .ds-process-head p:not(.tag){max-width:650px;color:#a9a9a9;margin:0}
    .ds-process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
    .ds-process-grid article{min-height:180px;padding:23px;border:1px solid #2c2c2c;border-radius:18px;background:#121212;transition:.25s ease}
    .ds-process-grid article:hover{transform:translateY(-4px);border-color:#a87508}
    .ds-process-grid article>span{display:inline-flex;width:36px;height:36px;align-items:center;justify-content:center;border-radius:10px;background:#f5b72b;color:#111;font-weight:900;font-size:12px;margin-bottom:25px}
    .ds-process-grid h3{margin:0 0 8px;color:#fff;font-size:17px}.ds-process-grid p{margin:0;color:#999;font-size:12px;line-height:1.6}
    @media(max-width:850px){.ds-process-grid{grid-template-columns:1fr 1fr}.ds-process-head{align-items:flex-start;flex-direction:column}}
    @media(max-width:560px){.ds-home-process{padding:58px 0}.ds-process-grid{grid-template-columns:1fr}.ds-process-grid article{min-height:auto}}
  `;
  document.head.appendChild(style);
})();
