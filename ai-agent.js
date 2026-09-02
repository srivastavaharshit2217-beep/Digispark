// DigiSpark AI website chat assistant
(function initDigiSparkAI(){
  if(document.getElementById("ds-ai-widget")) return;

  const API_URL = "https://digispark-v0hl.onrender.com";
  const BUSINESS_PHONE = "919236368939";
  const messages = [];

  const style = document.createElement("style");
  style.textContent = `
    #ds-ai-widget{position:fixed;left:20px;bottom:20px;z-index:10000;font-family:Inter,Arial,sans-serif}
    .ds-ai-toggle{width:58px;height:58px;border:1px solid #a87508;border-radius:50%;background:#111;color:#f5b72b;display:grid;place-items:center;cursor:pointer;box-shadow:0 12px 35px rgba(0,0,0,.3);font-size:25px;transition:.25s ease}
    .ds-ai-toggle:hover{transform:translateY(-3px) scale(1.03)}
    .ds-ai-toggle svg{width:30px;height:30px}
    .ds-ai-panel{position:absolute;left:0;bottom:70px;width:min(380px,calc(100vw - 32px));height:min(570px,calc(100vh - 110px));background:#fff;border:1px solid #ddd;border-radius:20px;box-shadow:0 22px 65px rgba(0,0,0,.28);overflow:hidden;display:none;flex-direction:column}
    .ds-ai-panel.open{display:flex}
    .ds-ai-head{background:#111;color:#fff;padding:16px 17px;display:flex;align-items:center;gap:11px}
    .ds-ai-avatar{width:40px;height:40px;border-radius:12px;background:#f5b72b;color:#111;display:grid;place-items:center;font-weight:900;font-size:16px;flex:0 0 40px}
    .ds-ai-head-text{min-width:0;flex:1}.ds-ai-head-text strong{display:block;font-size:15px}.ds-ai-head-text small{display:block;color:#cfcfcf;font-size:11px;margin-top:2px}
    .ds-ai-close{background:transparent;border:0;color:#fff;font-size:24px;cursor:pointer;line-height:1}
    .ds-ai-body{flex:1;overflow:auto;padding:15px;background:#f7f7f7;display:flex;flex-direction:column;gap:10px}
    .ds-ai-msg{max-width:86%;padding:10px 12px;border-radius:14px;font-size:13px;line-height:1.5;white-space:pre-wrap;word-break:break-word}
    .ds-ai-msg.bot{align-self:flex-start;background:#fff;border:1px solid #e3e3e3;color:#222;border-bottom-left-radius:5px}.ds-ai-msg.user{align-self:flex-end;background:#111;color:#fff;border-bottom-right-radius:5px}
    .ds-ai-quick{display:flex;gap:7px;flex-wrap:wrap;padding:0 15px 10px;background:#f7f7f7}.ds-ai-quick button{border:1px solid #ddd;background:#fff;border-radius:999px;padding:7px 10px;font-size:11px;cursor:pointer}.ds-ai-quick button:hover{border-color:#a87508}
    .ds-ai-foot{padding:10px;border-top:1px solid #e5e5e5;background:#fff;display:flex;gap:8px}.ds-ai-input{flex:1;min-width:0;border:1px solid #ddd;border-radius:12px;padding:11px 12px;outline:none;font:13px Inter,Arial,sans-serif}.ds-ai-input:focus{border-color:#a87508}.ds-ai-send{width:44px;border:0;border-radius:12px;background:#111;color:#f5b72b;cursor:pointer;font-size:18px}.ds-ai-send:disabled{opacity:.5;cursor:not-allowed}
    .ds-ai-wa{display:block;margin:0 15px 12px;text-align:center;text-decoration:none;background:#25D366;color:#fff;border-radius:11px;padding:9px;font-size:12px;font-weight:800}
    @media(max-width:600px){#ds-ai-widget{left:12px;bottom:12px}.ds-ai-toggle{width:52px;height:52px}.ds-ai-panel{left:-2px;bottom:62px;width:calc(100vw - 24px);height:min(610px,calc(100vh - 88px))}}
  `;
  document.head.appendChild(style);

  const root = document.createElement("div");
  root.id = "ds-ai-widget";
  root.innerHTML = `
    <div class="ds-ai-panel" id="dsAiPanel" aria-label="DigiSpark AI Chat">
      <div class="ds-ai-head">
        <div class="ds-ai-avatar">AI</div>
        <div class="ds-ai-head-text"><strong>DigiSpark AI</strong><small>Ask anything • Hindi / English / Hinglish</small></div>
        <button class="ds-ai-close" id="dsAiClose" aria-label="Close AI chat">×</button>
      </div>
      <div class="ds-ai-body" id="dsAiBody"></div>
      <div class="ds-ai-quick" id="dsAiQuick">
        <button data-q="DigiSpark kya services provide karta hai?">Services</button>
        <button data-q="Website banwane ka process kya hai?">Website process</button>
        <button data-q="Digital marketing kaise help karega?">Marketing</button>
        <button data-q="How can I start a project with DigiSpark?">Start project</button>
      </div>
      <a class="ds-ai-wa" href="https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent("Hello DigiSpark, I want to discuss a project.")}" target="_blank" rel="noopener">Need direct help? Chat on WhatsApp</a>
      <form class="ds-ai-foot" id="dsAiForm">
        <input class="ds-ai-input" id="dsAiInput" autocomplete="off" placeholder="Ask DigiSpark AI..." aria-label="Ask DigiSpark AI">
        <button class="ds-ai-send" id="dsAiSend" type="submit" aria-label="Send message">➤</button>
      </form>
    </div>
    <button class="ds-ai-toggle" id="dsAiToggle" aria-label="Open DigiSpark AI" aria-expanded="false">
      <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3C8.8 3 3 8.2 3 14.6c0 3.2 1.6 6.1 4.1 8.1L6 29l6.4-3.4c1.1.4 2.3.6 3.6.6 7.2 0 13-5.2 13-11.6S23.2 3 16 3zm-5 10h10a1.4 1.4 0 1 1 0 2.8H11a1.4 1.4 0 1 1 0-2.8zm0 5h7a1.4 1.4 0 1 1 0 2.8h-7a1.4 1.4 0 1 1 0-2.8z"/></svg>
    </button>
  `;
  document.body.appendChild(root);

  const panel = document.getElementById("dsAiPanel");
  const toggle = document.getElementById("dsAiToggle");
  const close = document.getElementById("dsAiClose");
  const body = document.getElementById("dsAiBody");
  const form = document.getElementById("dsAiForm");
  const input = document.getElementById("dsAiInput");
  const send = document.getElementById("dsAiSend");

  function addMessage(role,text){
    messages.push({role,content:text});
    const item = document.createElement("div");
    item.className = `ds-ai-msg ${role === "user" ? "user" : "bot"}`;
    item.textContent = text;
    body.appendChild(item);
    body.scrollTop = body.scrollHeight;
  }

  function openChat(){
    panel.classList.add("open");
    toggle.setAttribute("aria-expanded","true");
    if(!messages.length){
      addMessage("assistant","Namaste! 👋 Main DigiSpark AI hoon. Aap DigiSpark ki services, website, digital marketing, SEO, design, video editing ya project process ke baare mein Hindi ya English mein kuch bhi pooch sakte hain.");
    }
    setTimeout(()=>input.focus(),50);
  }
  function closeChat(){panel.classList.remove("open");toggle.setAttribute("aria-expanded","false")}
  toggle.addEventListener("click",()=>panel.classList.contains("open")?closeChat():openChat());
  close.addEventListener("click",closeChat);

  async function ask(text){
    const question = String(text || "").trim();
    if(!question || send.disabled) return;
    addMessage("user",question);
    input.value="";
    send.disabled=true;
    const thinking=document.createElement("div");
    thinking.className="ds-ai-msg bot";
    thinking.textContent="Thinking…";
    body.appendChild(thinking);
    body.scrollTop=body.scrollHeight;
    try{
      const response=await fetch(`${API_URL}/api/ai/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages})});
      const data=await response.json();
      thinking.remove();
      addMessage("assistant",data.message || "Sorry, I could not answer right now.");
    }catch(error){
      console.error("DigiSpark AI frontend error:",error);
      thinking.remove();
      addMessage("assistant","AI se connection nahi ho pa raha. Aap WhatsApp par DigiSpark se direct baat kar sakte hain.");
    }finally{send.disabled=false;input.focus()}
  }

  form.addEventListener("submit",e=>{e.preventDefault();ask(input.value)});
  document.querySelectorAll("#dsAiQuick button").forEach(button=>button.addEventListener("click",()=>ask(button.dataset.q)));
})();
