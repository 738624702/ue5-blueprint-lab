/* Blueprint Lab v0.2 — illustrative browser exercises, NOT Unreal Engine runtime. */
(() => {
  'use strict';
  if (document.body.dataset.page !== 'lesson') return;
  const lab = document.getElementById('lesson-lab');
  const quiz = document.getElementById('lesson-quiz');
  if (!lab || !quiz) return;
  const id = new URLSearchParams(location.search).get('id') || 'first-blueprint';
  const note = '<p class="lab-disclaimer">这是浏览器中的概念模拟，帮助你理解规则；真正的蓝图仍需要在 UE5 编辑器中按课程步骤搭建。</p>';
  const btn = (action, label, extra='') => `<button type="button" class="lab-btn ${extra}" data-action="${action}">${label}</button>`;
  const panel = (content) => `${content}${note}`;
  const templates = {
    'first-blueprint': panel(`<div class="lab-status"><span>Event BeginPlay → Print String</span><strong id="lab-output">尚未触发</strong></div><div class="lab-controls">${btn('run','▶ 模拟运行 BeginPlay','lab-primary')}${btn('clear','清空输出')}</div>`),
    'character-move': panel(`<div class="lab-status"><span>输入动作 IA_Move (Axis2D)</span><strong id="lab-output">X = 0，Y = 0 · 未输入</strong></div><div class="lab-pad"><div></div>${btn('w','W · 前')}<div></div>${btn('a','A · 左')}${btn('neutral','停止')}${btn('d','D · 右')}<div></div>${btn('s','S · 后')}<div></div></div><p class="lab-detail" id="lab-detail">方向只是输入意图；Add Movement Input 再根据朝向推动角色移动。</p>`),
    'camera-follow': panel(`<label class="lab-range-label" for="camera-length">Target Arm Length <strong id="camera-length-out">350 cm</strong></label><input id="camera-length" type="range" min="150" max="500" step="50" value="350"/><div class="camera-track"><span class="camera-avatar">角色</span><span id="camera-arm" class="camera-arm"></span><span class="camera-eye">摄像机</span></div><p id="lab-output" class="lab-detail">摄像机与角色目标距离：350 cm。实际引擎中墙体碰撞可能让距离变短。</p>`),
    'character-jump': panel(`<div class="lab-status"><span>CharacterMovement 状态</span><strong id="lab-output">Walking · 已落地</strong></div><div class="lab-controls">${btn('jump','空格 / Jump','lab-primary')}${btn('land','模拟落地')}</div><p class="lab-detail">Jump 请求起跳；是否在空中由 CharacterMovement 判断，不是直接修改坐标。</p>`),
    'character-sprint': panel(`<div class="lab-status"><span>CharacterMovement.MaxWalkSpeed</span><strong id="lab-output">300 cm/s · 普通行走</strong></div><div class="lab-controls">${btn('sprint-on','Shift Started · 按住','lab-primary')}${btn('sprint-off','Shift Completed · 松开')}</div><p class="lab-detail">这里模拟切换速度上限，实际加速度与位移由 CharacterMovement 处理。</p>`),
    'health-variables': panel(`<div class="lab-status"><span>CurrentHealth / MaxHealth</span><strong id="lab-output">100 / 100 HP</strong></div><div class="lab-meter"><div id="lab-health-fill" style="width:100%"></div></div><div class="lab-controls">${btn('damage','Apply Damage 25','lab-primary')}${btn('reset','重置血量')}</div><p class="lab-detail">每次受到 25 伤害：CurrentHealth = Clamp(CurrentHealth - 25, 0, 100)。</p>`),
    'health-ui': panel(`<label class="lab-range-label" for="lab-current-hp">拖动生命值 <strong id="lab-output">75 / 100 HP</strong></label><input id="lab-current-hp" type="range" min="0" max="100" step="5" value="75"/><div class="lab-meter"><div id="lab-health-fill" style="width:75%"></div></div><p class="lab-detail" id="lab-detail">Percent = 75 ÷ 100 = 0.75。Progress Bar 要填入 0 ～ 1，而非 75。</p>`),
    'door-interaction': panel(`<div class="lab-status"><span>交互对象 NearbyDoor</span><strong id="lab-output">无 · 未进入交互范围</strong></div><div class="lab-controls">${btn('approach','走近门')}${btn('open','按下 E','lab-primary')}${btn('leave','离开范围')}</div><p class="lab-detail" id="lab-detail">只有 NearbyDoor 有效时，才允许触发 OpenDoor。</p>`)
  };
  lab.innerHTML = templates[id] || '<p>本节课请按下方步骤完成实践。</p>';

  const output = lab.querySelector('#lab-output');
  const detail = lab.querySelector('#lab-detail');
  let health = 100, grounded = true, near = false, opened = false;
  function setOut(text) { if (output) output.textContent = text; }
  function setDetail(text) { if (detail) detail.textContent = text; }
  lab.addEventListener('click',(event) => {
    const el = event.target.closest('[data-action]');
    if (!el) return;
    const action=el.dataset.action;
    switch(action){
      case 'run': setOut('Hello Blueprint! ✓'); break;
      case 'clear': setOut('尚未触发'); break;
      case 'w': case 'a': case 's': case 'd': case 'neutral': {
        const points={w:[0,1,'前进'],s:[0,-1,'后退'],a:[-1,0,'左移'],d:[1,0,'右移'],neutral:[0,0,'未输入']};
        const [x,y,label]=points[action]; setOut(`X = ${x}，Y = ${y} · ${label}`);
        setDetail('IA_Move 输出二维轴值。角色蓝图将输入转换成前 / 右方向，再送给 Add Movement Input。'); break;
      }
      case 'jump':
        if (grounded) { grounded=false;setOut('Falling · 已起跳'); }
        else setOut('Falling · 正在空中（本例不能二段跳）');
        break;
      case 'land':grounded=true;setOut('Walking · 已落地');break;
      case 'sprint-on':setOut('600 cm/s · 奔跑');break;
      case 'sprint-off':setOut('300 cm/s · 普通行走');break;
      case 'damage':health=Math.max(0,health-25);setOut(`${health} / 100 HP`);lab.querySelector('#lab-health-fill').style.width=health+'%';break;
      case 'reset':health=100;setOut('100 / 100 HP');lab.querySelector('#lab-health-fill').style.width='100%';break;
      case 'approach':near=true;opened=false;setOut('BP_Door · 已进入范围');setDetail('NearbyDoor = BP_Door。现在可以点击「按下 E」。');break;
      case 'open':if(near){opened=true;setOut('BP_Door · 开门成功');setDetail('Is Valid(NearbyDoor) 为 true → 调用 OpenDoor。');} else {setOut('无有效交互对象 · 无法开门');setDetail('先进入 Box Collision，角色才会记录 NearbyDoor。');}break;
      case 'leave':near=false;opened=false;setOut('无 · 已离开交互范围');setDetail('EndOverlap 清空 NearbyDoor，之后按 E 不应触发。');break;
    }
  });
  const camera=lab.querySelector('#camera-length');
  if(camera) camera.addEventListener('input',()=>{
    const v=Number(camera.value);
    lab.querySelector('#camera-length-out').textContent=`${v} cm`;
    lab.querySelector('#camera-arm').style.width = (v/5)+'px';
    setOut(`摄像机与角色目标距离：${v} cm。实际引擎中墙体碰撞可能让距离变短。`);
  });
  const hp=lab.querySelector('#lab-current-hp');
  if(hp) hp.addEventListener('input',()=>{
    const v=Number(hp.value);
    setOut(`${v} / 100 HP`);
    lab.querySelector('#lab-health-fill').style.width=v+'%';
    setDetail(`Percent = ${v} ÷ 100 = ${(v/100).toFixed(2)}。进度条需要 0 ～ 1 范围内的小数。`);
  });
  const questions={
    'first-blueprint':{q:'BeginPlay 和 Print String 已连接，但运行后没有输出，最先检查什么？', options:['Actor 是否放进关卡','调整天空颜色','把变量改成 Integer'],right:0,why:'Actor 需要真正存在于运行关卡中，它的 BeginPlay 才会发生。'},
    'character-move':{q:'IA_Move 主要提供哪类数据？', options:['二维移动输入意图','碰撞盒尺寸','角色血量'],right:0,why:'IA_Move 的 Axis2D 通常是二维输入值，之后才转为实际世界方向。'},
    'camera-follow':{q:'要拉远第三人称镜头，应先改哪个参数？', options:['Jump Z Velocity','Target Arm Length','Max Walk Speed'],right:1,why:'Spring Arm 的 Target Arm Length 控制镜头与角色的目标距离。'},
    'character-jump':{q:'角色按下空格后，应该调用哪个角色函数？', options:['Stop Jumping','Set Percent','Jump'],right:2,why:'IA_Jump 的 Started 负责触发 Jump；Completed / Canceled 则结束输入。'},
    'character-sprint':{q:'松开 Shift 后最重要的处理是？', options:['销毁 Character','把 Max Walk Speed 恢复为 WalkSpeed','关闭输入系统'],right:1,why:'奔跑状态必须可恢复，否则松开键后还会维持高速。'},
    'health-variables':{q:'角色 10 HP 受到 25 点伤害，Clamp 后应该是多少？', options:['-15','25','0'],right:2,why:'CurrentHealth = Clamp(10 - 25, 0, 100) = 0。'},
    'health-ui':{q:'当前血量 50、最大血量 100，Progress Bar.Percent 应传什么？', options:['0.5','50','100'],right:0,why:'Progress Bar 的 Percent 取值为 0 到 1，所以 50 / 100 = 0.5。'},
    'door-interaction':{q:'不在门附近按 E 时，为避免空引用报错，先判断什么？', options:['角色等级','Is Valid(NearbyDoor)','窗口分辨率'],right:1,why:'先确认 NearbyDoor 有效，才可以调用门的 OpenDoor。'}
  };
  const q=questions[id];if(!q) return;
  const escape = s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  quiz.innerHTML=`<p class="quiz-question">${escape(q.q)}</p><div class="quiz-options">${q.options.map((v,i)=>`<button type="button" data-answer="${i}" class="quiz-option">${String.fromCharCode(65+i)}. ${escape(v)}</button>`).join('')}</div><p id="quiz-feedback" class="quiz-feedback" aria-live="polite">请选择一个答案，再看解析。</p>`;
  quiz.addEventListener('click',e=>{
    const button=e.target.closest('[data-answer]');if(!button)return;
    const chosen=Number(button.dataset.answer);const correct=chosen===q.right;
    quiz.querySelectorAll('[data-answer]').forEach(el=>{
      el.classList.remove('correct','incorrect');
      if(Number(el.dataset.answer)===q.right)el.classList.add('correct');
      if(el===button&&!correct)el.classList.add('incorrect');
    });
    quiz.querySelector('#quiz-feedback').textContent=`${correct?'回答正确 ✓':'还差一点。'} ${q.why}`;
  });
})();
