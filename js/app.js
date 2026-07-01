// ── DOM Cache ──
let DOM = {};
function initDOMCache() {
  DOM = {
    app: document.getElementById('app'),
    toverlay: document.getElementById('toverlay'),
    tExname: document.getElementById('t-exname'),
    tPhase: document.getElementById('t-phase'),
    tNextInfo: document.getElementById('t-next-info'),
    ringNum: document.getElementById('ring-num'),
    ringLbl: document.getElementById('ring-lbl'),
    setdots: document.getElementById('setdots'),
    rfg: document.getElementById('rfg'),
    tPause: document.getElementById('t-pause'),
    tNext: document.getElementById('t-next'),
    daytabs: document.getElementById('daytabs'),
    daysum: document.getElementById('daysum'),
    exlist: document.getElementById('exlist'),
    mealList: document.getElementById('meal-list'),
    monthContent: document.getElementById('month-content'),
    wkRows: document.getElementById('wk-rows'),
    overallBar: document.getElementById('overall-bar'),
    overallPct: document.getElementById('overall-pct'),
    overallLbl: document.getElementById('overall-lbl'),
    bfScale: document.getElementById('bf-scale'),
    roadmapList: document.getElementById('roadmap-list'),
    weekCard: document.getElementById('week-card'),
    aiKeyCard: document.getElementById('ai-key-card'),
    aiKeyInput: document.getElementById('ai-key-input'),
    aiKeySaveBtn: document.getElementById('ai-key-save-btn'),
    chatLog: document.getElementById('chat-log'),
    chatInput: document.getElementById('chat-input'),
    chatSendBtn: document.getElementById('chat-send-btn'),
  };
}

// ── Navigation State ──
let activeNavBtn = null;
let activePage = null;

function nav(btn){
  if(activeNavBtn) activeNavBtn.classList.remove('active');
  if(activePage) activePage.classList.remove('active');
  
  btn.classList.add('active');
  const page = document.getElementById(btn.dataset.pg);
  if(page) {
    page.classList.add('active');
    activePage = page;
  }
  activeNavBtn = btn;
  DOM.app?.scrollTo(0,0);
}

// ── Render workout page ──
let curDay='mon';
function buildDayTabs(){
  if(!DOM.daytabs) return;
  DOM.daytabs.innerHTML=Object.entries(DAYS).map(([k,d])=>
    `<button class="dtab${k===curDay?' active':''}" id="dtab-${k}" onclick="switchDay('${k}')">
      ${d.label}<small>${d.focus}</small>
    </button>`).join('');
}
function switchDay(k){
  document.getElementById(`dtab-${curDay}`)?.classList.remove('active');
  document.getElementById(`dtab-${k}`)?.classList.add('active');
  curDay=k;
  renderExList();
}
function renderExList(){
  if(!DOM.exlist || !DOM.daysum) return;
  const d=DAYS[curDay];
  DOM.daysum.innerHTML=d.sum;
  DOM.exlist.innerHTML=d.ex.map((ex,i)=>`
    <div class="excard">
      <div class="excard-thumb ytthumb" data-ytid="${YT[ex.k]||''}" data-search="${encodeURIComponent(YT_SEARCH[ex.k]||ex.n)}">
        <img src="https://i.ytimg.com/vi/${YT[ex.k]}/hqdefault.jpg"
             alt="${ex.n}" loading="lazy"
             onerror="this.src='https://i.ytimg.com/vi/${YT[ex.k]}/mqdefault.jpg'"/>
        <div class="play-over"><div class="play-btn2">
          <svg width="20" height="20" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="white"/></svg>
        </div></div>
        <div class="yt-lbl">▶ แตะเพื่อเล่นวิดีโอ</div>
      </div>
      <div class="excard-body">
        <div class="exnum">ท่าที่ ${i+1} / ${d.ex.length}</div>
        <div class="exname">${ex.n}</div>
        <div class="exsub">${ex.th}</div>
        <div class="tags">
          <span class="tag tag-g">${ex.sets} เซ็ต × ${ex.reps}</span>
          <span class="tag tag-a">${ex.w}</span>
          <span class="tag tag-b">${ex.dur}</span>
        </div>
        <div class="cue">${ex.cue}</div>
        <button class="timer-btn" onclick='startTimer(${JSON.stringify(ex)})'>
          ▶ เริ่มจับเวลา · เล่น ${ex.work}วิ / พัก ${ex.rest}วิ
        </button>
      </div>
    </div>`).join('');
}

// ── Timer ──
const CIRC=2*Math.PI*94;
let T=null;

function startTimer(ex){
  if(T?.iv)clearInterval(T.iv);
  T={ex,set:1,phase:'work',remain:ex.work,total:ex.work,paused:false,iv:null};
  DOM.toverlay?.classList.add('show');
  document.body.style.overflow='hidden';
  tickUI();
  T.iv=setInterval(()=>{if(!T.paused)step();},1000);
  if(DOM.tPause) DOM.tPause.textContent='หยุด';
}
function step(){
  T.remain--;
  if(T.remain>0&&T.remain<=3)beep(`c${T.remain}`);
  if(T.remain<=0){beep(T.phase);advance();}
  tickUI();
}
function advance(){
  if(T.phase==='work'){
    if(T.set>=T.ex.sets){T.phase='done';beep('done');vibe('done');}
    else{T.phase='rest';T.remain=T.ex.rest;T.total=T.ex.rest;vibe('rest');}
  }else{T.set++;T.phase='work';T.remain=T.ex.work;T.total=T.ex.work;vibe('work');}
}
function vibe(k){
  if(!navigator.vibrate)return;
  const p={work:[100,50,100],rest:[200],done:[200,100,200,100,400]};
  navigator.vibrate(p[k]||[]);
}
function tickUI(){
  const done=T.phase==='done',rest=T.phase==='rest';
  if(DOM.tExname) DOM.tExname.textContent=T.ex.n;
  
  if(done){
    if(DOM.tPhase) { DOM.tPhase.textContent='เสร็จทุกเซ็ต 🎉'; DOM.tPhase.className='t-phase t-done'; }
    if(DOM.tNext) DOM.tNext.textContent='ปิด';
    if(DOM.tNextInfo) DOM.tNextInfo.textContent='';
  }
  else if(rest){
    if(DOM.tPhase) { DOM.tPhase.textContent=`พัก — เซ็ตถัดไป ${T.set+1}/${T.ex.sets}`; DOM.tPhase.className='t-phase t-rest'; }
    if(DOM.tNextInfo) DOM.tNextInfo.textContent=`ท่าต่อไป: ${T.ex.n} · เซ็ต ${T.set+1}`;
  }
  else{
    if(DOM.tPhase) { DOM.tPhase.textContent=`เซ็ต ${T.set} / ${T.ex.sets} — เล่น`; DOM.tPhase.className='t-phase t-work'; }
    if(DOM.tNextInfo) DOM.tNextInfo.textContent='';
  }
  
  if(DOM.ringNum) DOM.ringNum.textContent=done?'✓':T.remain;
  if(DOM.ringLbl) DOM.ringLbl.textContent=rest?'วิ. (พัก)':'วิ. (เล่น)';
  DOM.rfg?.classList.toggle('rest-clr',rest);
  const frac=T.total>0?T.remain/T.total:0;
  if(DOM.rfg) DOM.rfg.style.strokeDashoffset=CIRC*(1-frac);
  
  // dots
  let dots='';
  for(let s=1;s<=T.ex.sets;s++)
    dots+=`<div class="sdot${s<T.set?' done':s===T.set?' cur':''}"></div>`;
  if(DOM.setdots) DOM.setdots.innerHTML=dots;
}
function closeTimer(){
  if(T?.iv)clearInterval(T.iv);T=null;
  DOM.toverlay?.classList.remove('show');
  document.body.style.overflow='';
}

// ── Beep ──
let AC=null;
const BEEP_CONFIG={c3:[523,.1,.12],c2:[659,.1,.14],c1:[784,.13,.16],work:[520,.25,.16],rest:[760,.25,.18],done:[880,.5,.2]};
function beep(k){
  try{
    AC=AC||new(window.AudioContext||window.webkitAudioContext)();
    AC.resume();
    const o=AC.createOscillator(),g=AC.createGain();
    o.connect(g);g.connect(AC.destination);
    const[f,d,v]=BEEP_CONFIG[k]||BEEP_CONFIG.c3;
    o.frequency.value=f;o.type='sine';
    g.gain.setValueAtTime(v,AC.currentTime);
    g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+d);
    o.start();o.stop(AC.currentTime+d);
    if(k==='done'){[0,.18,.36].forEach((t,i)=>{
      const o2=AC.createOscillator(),g2=AC.createGain();
      o2.connect(g2);g2.connect(AC.destination);
      o2.frequency.value=[660,830,990][i];o2.type='sine';
      g2.gain.setValueAtTime(.16,AC.currentTime+t);
      g2.gain.exponentialRampToValueAtTime(.001,AC.currentTime+t+.2);
      o2.start(AC.currentTime+t);o2.stop(AC.currentTime+t+.2);
    });}
  }catch(e){}
}

// ── 3-MONTH PLAN ──
let weightLog = JSON.parse(localStorage.getItem('fitplan_weights')||'{}');
let goalLog = JSON.parse(localStorage.getItem('fitplan_goals')||'{}');

let curMonth = 1;
let activeMonthTab = null;
function switchMonth(m, btn){
  curMonth = m;
  if(activeMonthTab) activeMonthTab.classList.remove('active');
  else document.querySelectorAll('.mtab').forEach(b=>b.classList.remove('active'));
  
  btn.classList.add('active');
  activeMonthTab = btn;
  renderMonthContent();
}

function renderMonthContent(){
  const d = MONTHS[curMonth];
  if(!DOM.monthContent) return;

  // build goals checklist
  const goalKey = `m${curMonth}`;
  const checked = goalLog[goalKey] || {};
  const goalRows = d.goals.map((g,i)=>{
    const ck = checked[i];
    return `<div class="goal-row">
      <div class="goal-check${ck?' checked':''}" onclick="toggleGoal(${curMonth},${i})" id="gc-${curMonth}-${i}">
        ${ck?'<span style="font-size:11px;color:#000;font-weight:900">✓</span>':''}
      </div>
      <div class="goal-text${ck?' done-text':''}" id="gt-${curMonth}-${i}">${g}</div>
    </div>`;
  }).join('');

  DOM.monthContent.innerHTML = `
    <span class="month-badge ${d.badge}">${d.badgeText}</span>
    <div class="prog-card">
      <h3>${d.label}</h3>
      <div class="prog-row"><span class="pk">เป้าหมายเดือนนี้</span><span class="pv up">${d.goal}</span></div>
      <div class="prog-row"><span class="pk">โฟกัส</span><span class="pv">${d.focus}</span></div>
      <div class="prog-row"><span class="pk">ความเข้มข้น</span><span class="pv">${d.intensity}</span></div>
      <div class="prog-row"><span class="pk">คาร์ดิโอ</span><span class="pv">${d.cardio}</span></div>
      <div class="prog-row"><span class="pk">ดัมเบลขา/สะโพก</span><span class="pv up">${d.db_lower}</span></div>
      <div class="prog-row"><span class="pk">ดัมเบลช่วงบน</span><span class="pv up">${d.db_upper}</span></div>
      <div class="prog-row"><span class="pk">อาหาร</span><span class="pv">${d.diet}</span></div>
      <div class="prog-row"><span class="pk">เป้าน้ำหนักปลายเดือน</span><span class="pv up">≤${d.target_kg} กก.</span></div>
    </div>

    <div class="timeline" style="margin-bottom:14px;">
      ${d.weeks.map(w=>`
        <div class="tl-item">
          <div class="tl-dot"></div>
          <div class="tl-label">${w.w}</div>
          <div class="tl-title">${w.label}</div>
          <div class="tl-desc">${w.desc}</div>
        </div>`).join('')}
    </div>

    <div class="prog-card">
      <h3>✅ เป้าหมายที่ต้องทำให้ได้</h3>
      ${goalRows}
    </div>
    <div class="tip-box tip-amber" style="margin-bottom:14px;">${d.desc}</div>
  `;
  renderWeightRows();
  updateOverall();
}

function toggleGoal(month, idx){
  const key = `m${month}`;
  if(!goalLog[key]) goalLog[key]={};
  goalLog[key][idx] = !goalLog[key][idx];
  localStorage.setItem('fitplan_goals', JSON.stringify(goalLog));
  const ck = goalLog[key][idx];
  const gcEl = document.getElementById(`gc-${month}-${idx}`);
  const gtEl = document.getElementById(`gt-${month}-${idx}`);
  if(gcEl){ gcEl.className='goal-check'+(ck?' checked':'');
    gcEl.innerHTML=ck?'<span style="font-size:11px;color:#000;font-weight:900">✓</span>':''; }
  if(gtEl){ gtEl.className='goal-text'+(ck?' done-text':''); }
}

function renderWeightRows(){
  const startDate = new Date('2026-07-07');
  const rows = Array.from({length:12},(_,i)=>{
    const d = new Date(startDate); d.setDate(d.getDate()+i*7);
    const dateStr = `${d.getDate()} ${['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'][d.getMonth()]}`;
    const month = i<4?1:i<8?2:3;
    const val = weightLog[`w${i+1}`]||'';
    const prev = weightLog[`w${i}`]||'';
    let diffHtml='<span class="wk-diff neu">—</span>';
    if(val&&prev){
      const diff=(parseFloat(val)-parseFloat(prev)).toFixed(1);
      const cls=parseFloat(diff)<0?'neg':parseFloat(diff)>0?'pos':'neu';
      diffHtml=`<span class="wk-diff ${cls}">${parseFloat(diff)>0?'+':''}${diff}</span>`;
    }
    const active = month===curMonth;
    return `<div class="wk-row" style="${active?'':'opacity:.5'}">
      <span class="wk-num">สัปดาห์ ${i+1}</span>
      <span class="wk-date">${dateStr}</span>
      <input class="wk-input" type="number" inputmode="decimal" step="0.1" min="60" max="120"
             placeholder="กก." value="${val}" id="wk-${i+1}"/>
      ${diffHtml}
    </div>`;
  }).join('');
  if(DOM.wkRows) DOM.wkRows.innerHTML = rows;
}

function saveWeights(){
  for(let i=1;i<=12;i++){
    const el=document.getElementById(`wk-${i}`);
    if(el&&el.value) weightLog[`w${i}`]=el.value;
  }
  localStorage.setItem('fitplan_weights',JSON.stringify(weightLog));
  renderWeightRows();
  updateOverall();
  const btn=document.querySelector('.save-btn');
  if(btn) {
    const orig=btn.textContent;
    btn.textContent='✓ บันทึกแล้ว';
    btn.style.background='var(--green)';btn.style.color='#000';
    setTimeout(()=>{btn.textContent=orig;btn.style.background='';btn.style.color='';},1800);
  }
}

function updateOverall(){
  const start=90, target=84;
  let latest=start, latestWk=0;
  for(let i=12;i>=1;i--){
    const v=parseFloat(weightLog[`w${i}`]);
    if(!isNaN(v)){latest=v;latestWk=i;break;}
  }
  const totalLoss=start-latest;
  const totalGoal=start-target;
  const pct=Math.min(100,Math.max(0,Math.round((totalLoss/totalGoal)*100)));
  if(DOM.overallBar) DOM.overallBar.style.width=pct+'%';
  if(DOM.overallPct) DOM.overallPct.textContent=pct+'%';
  if(latestWk>0 && DOM.overallLbl){
    DOM.overallLbl.textContent=
      `สัปดาห์ ${latestWk}: ${latest} กก. · ลดไปแล้ว ${totalLoss.toFixed(1)} กก. จากเป้า 6 กก.`;
  }
}

// ── Physique Goal ──
function initPhysiqueGoal(){
  const heights=[58,50,42,34,26];
  if(DOM.bfScale) {
    DOM.bfScale.innerHTML = BF_SCALE.map((b,i)=>
      `<div class="bf-bar${b.cur?' cur':''}" style="height:${heights[i]}px;background:${b.color};">
         <span class="bf-tag">${b.label}</span>${b.pct}
       </div>`).join('');
  }

  if(DOM.roadmapList) {
    DOM.roadmapList.innerHTML = ROADMAP.map(r=>`
      <div class="roadmap-card">
        <span class="rc-month ${r.badge}">${r.month}</span>
        <div class="rc-bf">${r.bf} <small>ไขมัน</small></div>
        <div class="rc-look">${r.look}</div>
        <div class="rc-detail">${r.detail}</div>
        <div class="rc-milestone">${r.milestone}</div>
      </div>`).join('');
  }
}

function renderWeek(){
  const rows = WEEK.map(w=>{
    const clickable = w.go ? `onclick="jumpDay('${w.go}')" style="cursor:pointer"` : '';
    const arrow = w.go ? `<svg class="wk-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2.5" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>` : '';
    return `<div class="wk-day" ${clickable}>
      <span class="wk-daytag ${w.cls}">${w.d}</span>
      <div class="wk-info"><div class="wd-title">${w.title}</div><div class="wd-sub">${w.sub}</div></div>
      ${arrow}
    </div>`;
  }).join('');
  if(DOM.weekCard) {
    DOM.weekCard.innerHTML = `
      <h3>📅 ตารางทั้งสัปดาห์</h3>
      ${rows}
      <div class="wk-legend">
        <span><i class="wk-dot" style="background:var(--green)"></i>เวท</span>
        <span><i class="wk-dot" style="background:#60a5fa"></i>คาร์ดิโอ</span>
        <span><i class="wk-dot" style="background:var(--amber)"></i>ขยับเบา</span>
        <span><i class="wk-dot" style="background:var(--card2)"></i>พัก</span>
      </div>`;
  }
}
function jumpDay(k){
  if(!DAYS[k])return;
  switchDay(k);
  document.querySelector('.sec-title')?.scrollIntoView({behavior:'smooth',block:'start'});
}

// ── Event Handlers ──
document.addEventListener('click', e => {
  const b = e.target.closest('.ytthumb');
  if(!b) return;
  const id = b.dataset.ytid;
  if(!id) return;
  if(b.querySelector('iframe')) return;
  const sq = b.dataset.search || '';
  const searchUrl = 'https://www.youtube.com/results?search_query=' + sq;
  b.innerHTML = `
    <iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1"
            title="วิดีโอสาธิตท่า" frameborder="0" allowfullscreen
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            style="position:absolute;inset:0;width:100%;height:100%;border:0;"></iframe>
    <button class="yt-fallback" onclick="event.stopPropagation();window.open('${searchUrl}','_blank')">
      เล่นไม่ได้? ค้นท่านี้ใน YouTube ↗
    </button>`;
});

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  initDOMCache();
  
  activeNavBtn = document.querySelector('.nav-btn.active');
  activePage = document.querySelector('.page.active');
  activeMonthTab = document.querySelector('.mtab.active');

  // Set timer overlay UI event handlers
  if(document.getElementById('t-pause')) {
    document.getElementById('t-pause').onclick=()=>{
      T.paused=!T.paused;
      if(DOM.tPause) DOM.tPause.textContent=T.paused?'เล่นต่อ':'หยุด';
    };
  }
  if(document.getElementById('t-next')) {
    document.getElementById('t-next').onclick=()=>{
      if(T.phase==='done'){closeTimer();return;}
      T.remain=1;step();
    };
  }
  if(document.getElementById('t-close')) document.getElementById('t-close').onclick=closeTimer;
  if(document.getElementById('toverlay')) {
    document.getElementById('toverlay').addEventListener('click',e=>{
      if(e.target===DOM.toverlay)closeTimer();
    });
  }
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeTimer();});

  if(DOM.mealList) {
    DOM.mealList.innerHTML=MEALS.map(m=>`
      <div class="meal-card">
        <div class="meal-head">
          <span class="meal-time">${m.time}</span>
          <span class="meal-kcal">${m.kcal} kcal</span>
        </div>
        <div class="meal-name">${m.name}</div>
        ${m.alt?`<div class="meal-alt">${m.alt}</div>`:''}
        <div class="macro-row">
          <div class="macro"><div class="mv">${m.kcal}</div><div class="ml">kcal</div></div>
          <div class="macro"><div class="mv">${m.pro}ก.</div><div class="ml">โปรตีน</div></div>
        </div>
      </div>`).join('');
  }

  initPhysiqueGoal();
  renderWeek();
  buildDayTabs();
  renderExList();
  renderMonthContent();
  updateOverall();

  // ── Gemini Chat Event Handlers ──
  if(DOM.aiKeySaveBtn) DOM.aiKeySaveBtn.onclick = saveGeminiKey;
  if(DOM.chatSendBtn) DOM.chatSendBtn.onclick = sendAIChat;
  if(DOM.chatInput) {
    DOM.chatInput.onkeydown = e => { if(e.key === 'Enter') sendAIChat(); };
  }
  initAIChat();

  // ── Warn if opened via file:// (YouTube embeds blocked) ──
  if(location.protocol==='file:'){
    const banner=document.createElement('div');
    banner.id='file-warn';
    banner.style.cssText='position:fixed;top:0;left:0;right:0;z-index:200;'+
      'background:#fbbf24;color:#000;font-size:12.5px;font-weight:600;'+
      'padding:10px 14px;text-align:center;line-height:1.45;'+
      'font-family:-apple-system,system-ui,sans-serif;box-shadow:0 2px 12px rgba(0,0,0,.4);';
    banner.innerHTML='⚠️ ขณะนี้เปิดไฟล์โดยตรง วิดีโออาจเล่นไม่ได้ '+
      '— เปิดบนมือถือ หรืออัปโหลดขึ้นเว็บ (เช่น Netlify) เพื่อให้เล่นได้เต็มที่ '+
      '<span style="text-decoration:underline;cursor:pointer" onclick="this.parentElement.remove()">ปิด</span>';
    document.body.appendChild(banner);
  }
});

// ── Gemini API Integration (FitAI Coach) ──
let geminiKey = localStorage.getItem('fitplan_gemini_key') || '';

function initAIChat(){
  if(DOM.aiKeyInput) DOM.aiKeyInput.value = geminiKey;
  if(geminiKey) {
    if(DOM.aiKeyCard) DOM.aiKeyCard.style.display = 'none';
  } else {
    if(DOM.aiKeyCard) DOM.aiKeyCard.style.display = 'block';
  }
}

function saveGeminiKey(){
  if(!DOM.aiKeyInput) return;
  const val = DOM.aiKeyInput.value.trim();
  if(!val) {
    alert('กรุณากรอก API Key ก่อนบันทึกครับ');
    return;
  }
  geminiKey = val;
  localStorage.setItem('fitplan_gemini_key', geminiKey);
  initAIChat();
  appendMsg('บันทึก API Key สำเร็จ! ระบบพร้อมให้บริการแล้วครับ 🤖', 'ai');
}

function appendMsg(text, sender) {
  if(!DOM.chatLog) return;
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg chat-${sender}`;
  
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = sender === 'ai' ? md2html(text) : text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  msgDiv.appendChild(bubble);
  DOM.chatLog.appendChild(msgDiv);
  
  // Auto scroll to bottom
  DOM.chatLog.scrollTop = DOM.chatLog.scrollHeight;
}

function md2html(md) {
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold (**text**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  html = html.replace(/\*(.*?)\*/g, '<i>$1</i>');

  // Bullet points
  const lines = html.split('\n');
  let inList = false;
  const processedLines = lines.map(line => {
    const trimmed = line.trim();
    if(trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const content = trimmed.substring(2);
      if(!inList) {
        inList = true;
        return '<ul><li>' + content + '</li>';
      }
      return '<li>' + content + '</li>';
    } else {
      if(inList) {
        inList = false;
        return '</ul>' + line;
      }
      return line;
    }
  });
  if(inList) {
    processedLines.push('</ul>');
  }
  
  return processedLines.join('<br>').replace(/<\/ul><br>/g, '</ul>').replace(/<br><ul>/g, '<ul>');
}

let typingDiv = null;
function showTypingIndicator(){
  if(!DOM.chatLog || typingDiv) return;
  typingDiv = document.createElement('div');
  typingDiv.className = 'chat-msg chat-ai';
  typingDiv.innerHTML = `
    <div class="msg-bubble" style="padding: 12px 16px;">
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>`;
  DOM.chatLog.appendChild(typingDiv);
  DOM.chatLog.scrollTop = DOM.chatLog.scrollHeight;
}

function removeTypingIndicator(){
  if(typingDiv) {
    typingDiv.remove();
    typingDiv = null;
  }
}

async function sendAIChat(){
  if(!DOM.chatInput) return;
  const prompt = DOM.chatInput.value.trim();
  if(!prompt) return;
  
  DOM.chatInput.value = '';
  appendMsg(prompt, 'user');
  
  await callGeminiAPI(prompt);
}

async function sendQuickPrompt(promptText){
  appendMsg(promptText, 'user');
  await callGeminiAPI(promptText);
}

async function callGeminiAPI(prompt) {
  if(!geminiKey) {
    appendMsg('⚠️ กรุณากรอกและบันทึก Gemini API Key ในแถบด้านบนก่อนเริ่มใช้งานครับ เพื่อความปลอดภัยคีย์นี้จะบันทึกในเครื่องของคุณเท่านั้น', 'ai');
    if(DOM.aiKeyCard) DOM.aiKeyCard.style.display = 'block';
    return;
  }
  
  showTypingIndicator();
  
  // ── Dynamic user status injection ──
  const daysTh = {
    'Sunday': 'วันอาทิตย์ (พักผ่อน)', 'Monday': 'วันจันทร์ (เวท Full Body)',
    'Tuesday': 'วันอังคาร (คาร์ดิโอ + ท้อง)', 'Wednesday': 'วันพุธ (เวท Lower + ท้อง)',
    'Thursday': 'วันพฤหัสบดี (เวท Upper + Interval)', 'Friday': 'วันศุกร์ (คาร์ดิโอ + ท้อง)',
    'Saturday': 'วันเสาร์ (กิจกรรมเบา)'
  };
  const todayStr = daysTh[new Date().toLocaleDateString('en-US', { weekday: 'long' })] || 'ไม่ระบุ';
  const weightHistory = localStorage.getItem('fitplan_weights') || '{}';
  const goalsHistory = localStorage.getItem('fitplan_goals') || '{}';

  // ── Construct system instruction text with complete FitPlan knowledge base ──
  const systemInstructionText = `คุณคือ FitAI Coach ผู้ช่วยและโค้ชสุขภาพส่วนตัวอัจฉริยะประจำเว็บแอป FitPlan ของผู้ใช้
ทำหน้าที่วิเคราะห์ ให้คำแนะนำสุขภาพ โภชนาการ และวางแผนออกกำลังกายตามหลักวิทยาศาสตร์การกีฬาอย่างสุภาพ เป็นกันเอง โดยมีฐานข้อมูลระบบ (FitPlan Knowledge Base) ดังต่อไปนี้:

1. ข้อมูลสุขภาพและเป้าหมายผู้ใช้:
- เพศชาย, สูง 177 ซม., น้ำหนักเริ่มแรก 90 กก., ดัชนีมวลกายเริ่มต้น (BMI) 28.7 (เกณฑ์อ้วน)
- เป้าหมาย 3 เดือนคือลดลงเหลือ 84 กก. (ลดเฉลี่ยสัปดาห์ละ ~0.5 กก. หรือเดือนละ 2 กก.)

2. ตารางออกกำลังกายประจำสัปดาห์:
- จันทร์: Full Body Strength (เวททั้งตัว 5 ท่า: Goblet Squat 6-8 กก., RDL 8-10 กก./ข้าง, Floor Press 6-8 กก./ข้าง, Bent-over Row 7-9 กก./ข้าง, Plank 30-45 วิ) + เดินชัน 10 นาที
- อังคาร: คาร์ดิโอ Incline Walk (เดินชัน 8-12%, ความเร็ว 5-6 กม./ชม., 35-40 นาที) + เล่นแกนกลาง 2 ท่า (Dead Bug, Bicycle Crunch)
- พุธ: Lower Body + Core (เวทขาสะโพกท้อง 5 ท่า: Dumbbell Lunges 5-7 กก./ข้าง, Sumo Squat 8-10 กก., Glute Bridge 8-12 กก., Dumbbell Calf Raise 6-8 กก./ข้าง, Russian Twist 4-6 กก.)
- พฤหัส: Upper Body + Interval (เวทช่วงบน 5 ท่า: Shoulder Press 4-6 กก./ข้าง, Lateral Raise 2-4 กก./ข้าง, Bicep Curl 5-7 กก./ข้าง, Tricep Extension 4-6 กก./ข้าง, Renegade Row 5-7 กก./ข้าง) + interval ลู่วิ่ง 15 นาที
- ศุกร์: คาร์ดิโอ + Core (เดิน/interval 30 นาที + แกนกลาง 4 ท่า: Dead Bug, Bicycle Crunch, Mountain Climber, Hanging Leg Raise)
- เสาร์: Active Recovery (กิจกรรมเบา 30-45 นาที เช่น ปั่นจักรยาน ว่ายน้ำ หรือเดิน)
- อาทิตย์: พักผ่อนเต็มที่ (Rest Day)

3. แผนโภชนาการ (Nutrition Plan):
- พลังงาน: ~1,850 kcal/วัน (Caloric Deficit -500 kcal จากเกณฑ์ TDEE), โปรตีน 150-170 ก./วัน
- ตารางมื้ออาหารประจำวัน:
  * 07.00-08.00: ไข่ 3 ฟอง + ข้าวโอ๊ต 40 ก. + กล้วย 1 ลูก (โปรตีน ~28ก.)
  * 10.30: กรีกโยเกิร์ตไม่หวาน 1 ถ้วย + อัลมอนด์ 15-20 เม็ด (โปรตีน ~17ก.)
  * 12.00-13.00: ข้าวกล้อง 1 ทัพพี + อกไก่/ปลา 180 ก. + ผัก (โปรตีน ~45ก.)
  * 18.30 (ก่อนเล่น): กล้วย 1 ลูก หรือ แอปเปิ้ล + กาแฟดำ
  * 20.15-20.30 (หลังเล่น): อกไก่/ปลา/เต้าหู้ 200 ก. + ผักนึ่ง + ข้าวครึ่งทัพพี (โปรตีน ~48ก.)
  * ก่อนนอน (ถ้าหิว): นมจืดพร่องมันเนย 1 แก้ว หรือ เวย์โปรตีน 1 สกู๊ป
- ของกินเล่นที่กินได้: ไข่ต้ม, กรีกโยเกิร์ต, เวย์, อัลมอนด์, เอดามาเมะ, ฝรั่ง/แอปเปิ้ล
- ของที่ต้องหลีกเลี่ยง: ชานมไข่มุก, ขนมขบเคี้ยว, เบเกอรี่, ทุเรียน, เครื่องดื่มแอลกอฮอล์

4. แผนระยะยาว 3 เดือน (ก.ค. - ก.ย. 2026):
- เดือน 1 (ปรับตัว): เน้นหัดฟอร์มท่าให้ถูกต้อง ปรับพฤติกรรม ลดแคลอรี่เบาๆ -300 kcal (เป้าน้ำหนักปลายเดือน 88 กก.)
- เดือน 2 (Progressive Overload): เน้นเพิ่มน้ำหนักดัมเบลเมื่อท่าเดิมรู้สึกเบา, ทำคู่ Supersets ลดเวลาพักและเร่งการเผาผลาญ (เป้าน้ำหนักปลายเดือน 86 กก.)
- เดือน 3 (Peak): เน้นความเข้มข้นสูงด้วย Drop Set ในเซ็ตสุดท้าย และคาร์ดิโอที่ชัน/เร็วขึ้น (เป้าน้ำหนักปลายเดือน 84 กก.)

5. แผนงบประมาณสุขภาพ (Monthly Budget):
- งบรวม ~7,800 บาท/เดือน (แบ่งเป็นสัปดาห์ละ ~1,480 บาท หรือเฉลี่ยวันละ ~260 บาท)
- แหล่งวัตถุดิบประหยัด: แนะนำซื้ออกไก่/ผักสดที่ตลาดฐานเพชร (ถูกกว่าห้าง 20-40%) ซื้อข้าวสารและของแห้งยกแพ็คที่ Makro, และสั่งเวย์โปรตีนผ่านโปรโมชั่นวันเลขเบิ้ลใน Shopee

6. ข้อมูลสถานะจริงของผู้ใช้ในปัจจุบัน (ไดนามิกคอนเทนต์):
- วันนี้คือ: ${todayStr} (อ้างอิงเพื่อตอบคำถามว่าผู้ใช้ต้องซ้อมอะไรวันนี้ได้ทันที)
- ประวัติน้ำหนักที่บันทึกในเครื่อง: ${weightHistory}
- ประวัติเป้าหมายที่ทำสำเร็จ: ${goalsHistory}

คำแนะนำในการตอบคำถาม:
- ให้คำแนะนำตอบคำถามเป็นภาษาไทยอย่างสุภาพ เป็นกันเอง มีความกระตือรือร้นและคอยให้กำลังใจ (Positive reinforcement)
- พยายามเชื่อมโยงคำถามของผู้ใช้กับตารางออกกำลังกาย, เมนูอาหาร, ข้อมูลน้ำหนักตัว, และเป้าหมาย 3 เดือนของระบบ FitPlan เสมอ เพื่อให้การตอบตรงจุดและเป็นส่วนตัวที่สุด`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${geminiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: {
          parts: [{ text: systemInstructionText }]
        }
      })
    });
    
    removeTypingIndicator();
    
    if(!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errReason = errData.error?.message || response.statusText;
      appendMsg(`❌ เกิดข้อผิดพลาดจาก API: ${errReason} (กรุณาตรวจสอบว่า API Key ถูกต้องและใช้งานได้หรือไม่)`, 'ai');
      return;
    }
    
    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'ขออภัยครับ ผมไม่ได้รับคำตอบกลับมา ลองถามใหม่อีกครั้งนะครับ';
    appendMsg(reply, 'ai');
    
  } catch (error) {
    removeTypingIndicator();
    appendMsg(`❌ ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ Gemini ได้: ${error.message}`, 'ai');
  }
}
