// DigiSpark Step 4: direct WhatsApp enquiry helper
(function initLeadTools(){
  const form=document.getElementById('contactForm');
  if(!form || form.querySelector('.ds-whatsapp-enquiry')) return;
  const phone='919236368939';
  const button=document.createElement('a');
  button.className='ds-whatsapp-enquiry';
  button.href='#';
  button.textContent='WhatsApp Enquiry';
  button.setAttribute('aria-label','Send enquiry details on WhatsApp');
  button.addEventListener('click',e=>{
    e.preventDefault();
    const name=(document.getElementById('name')?.value||'').trim();
    const email=(document.getElementById('email')?.value||'').trim();
    const phoneField=(document.getElementById('phone')?.value||'').trim();
    const service=document.getElementById('service')?.value||'';
    const projectType=document.getElementById('projectType')?.value||'';
    const budget=document.getElementById('budget')?.value||'';
    const message=(document.getElementById('message')?.value||'').trim();
    const text=`Hello DigiSpark, I want to discuss a project.\n\nName: ${name||'Not provided'}\nEmail: ${email||'Not provided'}\nPhone: ${phoneField||'Not provided'}\nService: ${service||'Not selected'}\nProject Type: ${projectType||'Not selected'}\nBudget: ${budget||'Not selected'}\nProject Details: ${message||'Not provided'}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`,'_blank','noopener');
  });
  const submit=form.querySelector('button[type="submit"]');
  if(submit){
    submit.insertAdjacentElement('afterend',button);
  }else{
    form.appendChild(button);
  }
  const style=document.createElement('style');
  style.textContent=`.ds-whatsapp-enquiry{display:flex;justify-content:center;align-items:center;margin-top:10px;padding:12px 18px;border:1px solid #25D366;border-radius:8px;background:#25D366;color:#fff;font-weight:800;text-decoration:none;transition:.2s ease}.ds-whatsapp-enquiry:hover{transform:translateY(-2px);filter:brightness(.95)}`;
  document.head.appendChild(style);
})();
