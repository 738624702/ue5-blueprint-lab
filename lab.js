/* Browser concept simulations only. No Unreal Engine runtime or real physics is implied. */
(() => {
'use strict';
if(!window.BlueprintLesson)return;
const {lesson}=window.BlueprintLesson,{esc}=window.BlueprintUI,id=lesson.id,lab=document.querySelector('#lesson-lab');
const button=(action,label)=>`<button type="button" class="lab-btn" data-action="${action}">${label}</button>`;
const avatar='<span class="demo-avatar" aria-hidden="true"><svg viewBox="0 0 40 64" fill="none"><circle cx="20" cy="12" r="8" stroke="currentColor" stroke-width="2"/><path d="M9 33c0-15 22-15 22 0v15H9zM14 48v12m12-12v12" stroke="currentColor" stroke-width="2"/></svg></span>';
const scenes={
'first-blueprint':`<div class="demo-console"><span>运行输出</span><strong id="console-text">等待 BeginPlay</strong><span class="console-caret" aria-hidden="true">▌</span></div><div class="lab-controls">${button('run','运行 BeginPlay')}${button('reset','清空输出')}</div>`,
'character-move':`<div class="movement-layout"><div class="move-preview" aria-label="水平移动示意">${avatar}<span class="heading-arrow" aria-hidden="true">↑</span><span class="scene-caption">水平面 · 世界方向示意</span></div><div class="lab-pad"><span></span>${button('w','W · 前')}<span></span>${button('a','A · 左')}${button('neutral','停止')}${button('d','D · 右')}<span></span>${button('s','S · 后')}<span></span></div></div><label class="range-label" for="move-yaw">控制器 Yaw <output id="move-yaw-out">0°</output></label><input id="move-yaw" type="range" min="0" max="360" step="90" value="0">`,
'camera-follow':`<div class="camera-demo">${avatar}<span class="camera-link" aria-hidden="true"></span><svg class="demo-camera" viewBox="0 0 32 24" fill="none" aria-hidden="true"><rect x="2" y="4" width="18" height="16" rx="3" stroke="currentColor" stroke-width="2"/><path d="M20 9l10-5v16l-10-5z" stroke="currentColor" stroke-width="2"/></svg><span class="scene-caption">角色与跟随镜头的目标距离</span></div><label class="range-label" for="camera-length">Target Arm Length <output id="camera-length-out">350 cm</output></label><input id="camera-length" type="range" min="150" max="500" step="50" value="350">`,
'character-jump':`<div class="jump-demo">${avatar}<span class="ground-line" aria-hidden="true"></span><span class="scene-caption">手动模拟起跳与落地</span></div><div class="lab-controls">${button('jump','空格 · Jump')}${button('jump-stop','松开 · Stop Jumping')}${button('land','模拟落地')}</div>`,
'character-sprint':`<div class="speed-gauge"><span>Max Walk Speed</span><div class="speed-track"><i id="speed-fill"></i></div><div class="speed-scale"><span>0</span><span>300</span><span>600 cm/s</span></div></div><div class="lab-controls">${button('sprint-on','Shift · Started')}${button('sprint-off','松开 · Completed')}${button('sprint-cancel','取消 · Canceled')}</div>`,
'health-variables':`<div class="health-preview"><div class="lab-meter"><div id="lab-health-fill"></div></div><span id="health-math">100 − 25 → 75</span></div><div class="lab-controls">${button('damage','受到 25 点伤害')}${button('low-health','设为 20 HP')}${button('reset','重置生命')}</div>`,
'health-ui':`<div class="health-preview"><div class="lab-meter"><div id="lab-health-fill"></div></div><span id="health-math">Percent = 0.75</span></div><div class="hp-inputs"><label for="lab-current-hp">CurrentHealth<input id="lab-current-hp" type="number" min="0" max="200" step="5" value="75"></label><label for="lab-max-hp">MaxHealth<input id="lab-max-hp" type="number" min="0" max="200" step="5" value="100"></label></div><div class="lab-controls">${button('damage','受到 25 点伤害')}${button('zero-max','测试 Max = 0')}${button('reset','重置示例')}</div>`,
'door-interaction':`<div class="door-demo">${avatar}<span class="interaction-zone" aria-hidden="true"></span><span class="door-hinge" aria-hidden="true"><i class="door-leaf"></i></span><span class="scene-caption">范围与开门示意 · 交互物保持自身状态</span></div><div class="lab-controls">${button('approach','走近门')}${button('open','E · 开门')}${button('leave','离开范围')}${button('reset','重置')}</div>`
};
lab.innerHTML=`<div class="lab-status"><span>当前模拟状态</span><strong id="lab-output" role="status" aria-live="polite"></strong></div>${scenes[id]}<p class="lab-detail" id="lab-detail"></p><p class="lab-disclaimer">这是浏览器概念模拟，不运行 UE5。按钮与数值反馈不代表蓝图已在编辑器中通过测试。</p>`;
let state={hp:100,max:100,grounded:true,holding:false,speed:300,near:false,opened:false,yaw:0,x:0,y:0,camera:350,started:false};
if(id==='health-ui')state.hp=75;
const $=s=>lab.querySelector(s),clamp=(v,min,max)=>Math.min(max,Math.max(min,v));
function publish(node,message){$('#lab-detail').textContent=message;window.dispatchEvent(new CustomEvent('blueprint:lab',{detail:{node,message}}))}
function healthRender(){const ratio=state.max>0?clamp(state.hp/state.max,0,1):0;$('#lab-health-fill').style.transform=`scaleX(${ratio})`;$('#lab-output').textContent=`${state.hp} / ${state.max} HP`;$('#health-math').textContent=state.max>0?`Percent = ${state.hp} ÷ ${state.max} = ${ratio.toFixed(2)}`:'MaxHealth ≤ 0 → 跳过除法，Percent = 0';if(id==='health-ui'){$('#lab-current-hp').value=state.hp;$('#lab-max-hp').value=state.max}}
function render(){
if(id==='first-blueprint'){$('#lab-output').textContent=state.started?'BeginPlay 已触发':'等待运行';$('#console-text').textContent=state.started?'Hello Blueprint!':'等待 BeginPlay'}
if(id==='character-move'){const yaw=state.yaw*Math.PI/180,wx=state.y*Math.cos(yaw)-state.x*Math.sin(yaw),wy=state.y*Math.sin(yaw)+state.x*Math.cos(yaw);$('#lab-output').textContent=`X=${state.x}，Y=${state.y} → 世界方向 (${wx.toFixed(1)}, ${wy.toFixed(1)}, 0)`;$('#move-yaw-out').value=state.yaw+'°';$('.heading-arrow').style.transform=`rotate(${state.yaw}deg)`;$('.demo-avatar').style.transform=`translate(${wx*26}px, ${-wy*14}px)`}
if(id==='camera-follow'){$('#lab-output').textContent=`目标镜头距离：${state.camera} cm`;$('#camera-length-out').value=state.camera+' cm';$('.camera-demo').style.setProperty('--arm',state.camera*0.34+'px')}
if(id==='character-jump'){$('#lab-output').textContent=state.grounded?'Walking · 已落地':`Falling · ${state.holding?'保持跳跃输入':'已结束跳跃输入'}`;$('.jump-demo').classList.toggle('is-jumping',!state.grounded)}
if(id==='character-sprint'){$('#lab-output').textContent=`${state.speed} cm/s · ${state.speed===600?'奔跑上限':'普通步行上限'}`;$('#speed-fill').style.transform=`scaleX(${state.speed/600})`}
if(id==='health-variables'||id==='health-ui')healthRender();
if(id==='door-interaction'){$('#lab-output').textContent=`NearbyDoor = ${state.near?'BP_Door':'None'} · ${state.opened?'门已打开':'门未打开'}`;$('.door-demo').classList.toggle('is-near',state.near);$('.door-demo').classList.toggle('is-open',state.opened)}
}
lab.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b)return;const action=b.dataset.action;
if(['w','a','s','d','neutral'].includes(action)){[state.x,state.y]=({w:[0,1],a:[-1,0],s:[0,-1],d:[1,0],neutral:[0,0]})[action];publish('move','二维输入按控制器的水平 Yaw 转为世界方向；坐标是方向向量，不是角色速度。')}
if(action==='run'){state.started=true;publish('print','BeginPlay 的执行信号传给 Print String，输出 Hello Blueprint!。')}
if(action==='jump'){if(state.grounded){state.grounded=false;state.holding=true;publish('jump','Jump 请求起跳，CharacterMovement 负责空中状态。')}else publish('fall','当前已在空中；这个概念示例不允许二段跳。')}
if(action==='jump-stop'){state.holding=false;publish('stop','Stop Jumping 结束按键保持；角色仍可处于 Falling，不会直接回到地面。')}
if(action==='land'){state.grounded=true;state.holding=false;publish('fall','模拟落地：Walking。实际项目需读取 CharacterMovement 的状态。')}
if(action.startsWith('sprint-')){state.speed=action==='sprint-on'?600:300;publish(action==='sprint-on'?'fast':'walk',action==='sprint-cancel'?'Canceled 恢复 WalkSpeed=300。此按钮直接模拟取消出口；UE5 中的取消复现条件见逐引脚说明。':action==='sprint-on'?'Started 把组件速度上限设为 600；没有移动输入就不会自动产生位移。':'Completed 把组件速度上限恢复为 300。')}
if(action==='damage'){const before=state.hp;state.hp=clamp(state.hp-25,0,Math.max(0,state.max));publish(id==='health-ui'?'update':'set',`${before} − 25，经 Clamp 保存为 ${state.hp}。${id==='health-ui'?'随后调用 UpdateHP。':'先保存，再由 UI 课刷新界面。'}`)}
if(action==='low-health'){state.hp=20;publish('subtract','测试初值设为 20；下一次 25 伤害应得到 0，而不是负数。')}
if(action==='zero-max'){state.max=0;publish('ratio','MaxHealth=0，直接走空血条分支，不执行除法。此按钮用于异常输入演示。')}
if(action==='approach'){state.near=true;publish('reference','进入范围：门把 Self 写到角色的 NearbyDoor。')}
if(action==='open'){if(state.near){state.opened=true;publish('open','引用有效，调用门的 OpenDoor；重复调用仍设置为 90°。')}else publish('valid','NearbyDoor=None，判断为 False；不调用 OpenDoor，也不访问空引用。')}
if(action==='leave'){state.near=false;publish('reference','离开范围后清空 NearbyDoor。清空引用不会把已打开的门关上。')}
if(action==='reset'){state={...state,hp:id==='health-ui'?75:100,max:100,near:false,opened:false,started:false};publish(id==='first-blueprint'?'event':id==='door-interaction'?'reference':'set','已重置本页概念示例。')}
render();
});
const yaw=$('#move-yaw');if(yaw)yaw.addEventListener('input',()=>{state.yaw=Number(yaw.value);render();publish('yaw','只取控制器 Yaw。试着切换到 90°，再按 W，世界前进方向将改变。')});
const camera=$('#camera-length');if(camera)camera.addEventListener('input',()=>{state.camera=Number(camera.value);render();publish('arm','修改弹簧臂目标长度；真实引擎中的墙体碰撞还可能缩短实际距离。')});
if(id==='health-ui')for(const [selector,field] of [['#lab-current-hp','hp'],['#lab-max-hp','max']])$(selector).addEventListener('input',e=>{state[field]=clamp(Number(e.target.value)||0,0,200);healthRender();publish('percent','角色主动传入血量；Max>0 时计算并限制到 0～1，否则显示空血条。')});
render();$('#lab-detail').textContent=lesson.concept;
const questions={
'first-blueprint':['BeginPlay 已连接但运行时没有输出，先检查什么？',['Actor 是否放入关卡','天空颜色','窗口大小'],0,'Actor 必须真实存在于运行关卡中才会触发。'],
'character-move':['IA_Move 主要提供哪类数据？',['二维移动输入意图','碰撞盒尺寸','血量'],0,'Axis2D 提供二维输入，之后才转换成世界方向。'],
'camera-follow':['拉远第三人称镜头应该改哪个参数？',['Jump Z Velocity','Target Arm Length','Max Walk Speed'],1,'Target Arm Length 是弹簧臂目标距离。'],
'character-jump':['空格 Started 应调用哪个角色函数？',['Stop Jumping','Set Percent','Jump'],2,'Jump 请求起跳，结束输入时调用 Stop Jumping。'],
'character-sprint':['松开 Shift 后应该怎么做？',['销毁角色','恢复 WalkSpeed','关闭输入'],1,'Completed 与 Canceled 都应有恢复分支。'],
'health-variables':['20 HP 受到 25 伤害，Clamp 后是多少？',['-5','25','0'],2,'Clamp(20−25,0,100)=0。'],
'door-interaction':['调用 OpenDoor 前先判断什么？',['角色等级','Is Valid(NearbyDoor)','窗口分辨率'],1,'先验证目标引用，避免访问 None。'],
'health-ui':['75/100 的 Progress Bar.Percent 应是多少？',['0.75','75','100'],0,'Progress Bar 使用 0～1 的比例。']};
const q=questions[id],quiz=document.querySelector('#lesson-quiz');quiz.innerHTML=`<p class="quiz-question">${esc(q[0])}</p><div class="quiz-options">${q[1].map((v,i)=>`<button type="button" class="quiz-option" data-answer="${i}">${String.fromCharCode(65+i)}. ${esc(v)}</button>`).join('')}</div><p class="quiz-feedback" role="status" aria-live="polite">选择答案查看解析；自测不会自动确认 UE5 实作。</p>`;
quiz.addEventListener('click',e=>{const b=e.target.closest('[data-answer]');if(!b)return;quiz.querySelectorAll('[data-answer]').forEach(el=>{el.classList.toggle('correct',Number(el.dataset.answer)===q[2]);el.classList.toggle('incorrect',el===b&&Number(b.dataset.answer)!==q[2])});quiz.querySelector('.quiz-feedback').textContent=`${Number(b.dataset.answer)===q[2]?'回答正确。':'还差一点。'}${q[3]}`});
})();
