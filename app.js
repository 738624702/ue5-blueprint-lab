/* Dynamic workbench. Keeps blueprintlab:v1:<courseId> and all original step indices. */
(() => {
'use strict';
const courses=window.BLUEPRINT_COURSES, page=document.body.dataset.page;
const totalSteps=courses.reduce((sum,course)=>sum+course.steps.length,0);
const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function read(k,f){try{return JSON.parse(localStorage.getItem(k)??JSON.stringify(f))}catch{return f}}
function write(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch{const el=$('#storage-feedback');el.hidden=false;el.textContent='浏览器无法保存记录，请及时导出备份。';return false}}
const key=id=>'blueprintlab:v1:'+id;
function completed(c){const a=read(key(c.id),[]);return c.steps.map((_,i)=>Array.isArray(a)&&a[i]===true)}
const count=c=>completed(c).filter(Boolean).length;
const total=()=>courses.reduce((n,c)=>n+count(c),0);
const card=c=>`<a class="course-card" href="lesson.html?id=${c.id}"><div class="course-identity"><span class="card-meta">${esc(c.module)} · ${esc(c.level)}</span><h3>${esc(c.title)}</h3><p>${esc(c.description)}</p></div><span class="course-state">${count(c)?`${count(c)} / ${c.steps.length} 步已确认`:`约 ${c.minutes} 分钟`}</span><span class="course-arrow" aria-hidden="true">→</span></a>`;
function renderHome(){
$('#home-courses').innerHTML=courses.map(card).join('');
const recent=read('blueprintlab:last-course:v1','');
const c=courses.find(c=>c.id===recent&&count(c)<c.steps.length)||courses.find(c=>count(c)>0&&count(c)<c.steps.length)||courses.find(c=>count(c)<c.steps.length)||courses[0];
$('#learning-return').innerHTML=`<section class="focus-lesson"><div class="focus-context"><span>${(total()||recent)?'继续上次的练习':'从第一条执行线开始'}</span><span>约 ${c.minutes} 分钟</span></div><h2>${esc(c.title)}</h2><p>${esc(c.outcome)}</p><div class="focus-bottom"><span>${count(c)} / ${c.steps.length} 步已确认</span><a class="btn btn-primary" href="lesson.html?id=${c.id}">${(total()||recent)?'继续学习':'开始学习'} →</a></div></section><section class="practice-record"><h2>我的学习记录</h2><div class="record-value">${total()}<small> / ${totalSteps} 个步骤已在 UE 中确认</small></div><progress value="${total()}" max="${totalSteps}" aria-label="已确认操作步骤"></progress><p>${courses.filter(c=>count(c)===c.steps.length).length} / ${courses.length} 节课程已完成。<br>在编辑器中做成功，再确认完成。</p><button class="text-button" type="button" data-open-backup>导出或恢复记录 →</button></section>`;
}
if(page==='home')renderHome();
if(page==='courses'){
const term=$('#course-search'),bar=$('#course-filters'),params=new URLSearchParams(location.search),modules=['全部',...new Set(courses.map(c=>c.module))];
let active=modules.includes(params.get('module'))?params.get('module'):'全部';term.value=params.get('q')||'';
function draw(){const q=term.value.trim().toLocaleLowerCase();bar.innerHTML=modules.map(m=>`<button class="filter ${active===m?'active':''}" type="button" data-module="${esc(m)}" aria-pressed="${active===m}">${esc(m)}</button>`).join('');const items=courses.filter(c=>(active==='全部'||c.module===active)&&[c.title,c.module,c.description,c.concept,...c.nodes.map(n=>n.label)].join(' ').toLocaleLowerCase().includes(q));$('#course-results').innerHTML=items.length?items.map(card).join(''):'<div class="empty-state">没有匹配的课程。试试“移动”“Clamp”或切回全部分类。</div>';$('#course-count').textContent=`找到 ${items.length} 节课程 · 当前分类：${active}`;const u=new URL(location.href);active==='全部'?u.searchParams.delete('module'):u.searchParams.set('module',active);q?u.searchParams.set('q',term.value.trim()):u.searchParams.delete('q');history.replaceState({},'',u.pathname+u.search)}
term.addEventListener('input',draw);bar.addEventListener('click',e=>{const b=e.target.closest('[data-module]');if(b){active=b.dataset.module;draw()}});draw();
}
let lesson,stepIndex=0;
if(page==='lesson'){
const params=new URLSearchParams(location.search);lesson=courses.find(c=>c.id===params.get('id'))||courses[0];document.title=lesson.title+' — Blueprint Lab';
const requested=params.has('step')?Number(params.get('step'))-1:read('blueprintlab:view:v1:'+lesson.id,0);stepIndex=Number.isInteger(requested)?Math.max(0,Math.min(lesson.steps.length-1,requested)):0;
write('blueprintlab:last-course:v1',lesson.id);
const material=window.BLUEPRINT_MATERIALS.materials.find(m=>m.courseId===lesson.id),next=courses[courses.indexOf(lesson)+1];
$('#lesson-content').innerHTML=`<div class="crumbs"><a href="courses.html">全部课程</a><span>›</span>${esc(lesson.module)}</div><section class="lesson-head"><p class="lesson-context">${esc(lesson.badge)}</p><h1>${esc(lesson.title)}</h1><p>${esc(lesson.outcome)}</p><div class="lesson-meta"><span>约 ${lesson.minutes} 分钟</span><span>${lesson.steps.length} 个步骤</span><span id="step-progress"></span></div></section>
<section class="step-workbench" aria-labelledby="active-step-title"><div class="step-navigation" aria-label="操作步骤">${lesson.steps.map((s,i)=>`<button type="button" data-step-nav="${i}" aria-label="第 ${i+1} 步：${esc(s.title)}"><span>${i+1}</span><span>${esc(s.title)}</span></button>`).join('')}</div><div class="active-step"><div class="step-counter-label" id="step-counter"></div><h2 id="active-step-title" tabindex="-1"></h2><p id="active-step-body"></p><p class="step-hint" id="active-step-help"></p><div class="step-actions"><label class="complete-control"><input type="checkbox" id="active-step-complete">我已在 UE5 中完成这一步</label><div class="step-pager"><button type="button" id="previous-step">上一步</button><button type="button" id="next-step">下一步 →</button></div></div></div></section>
<section class="workspace-panel"><div class="workspace-tabs" role="tablist" aria-label="本课学习材料">${[['graph','节点与实验'],['pins','逐引脚说明'],['media','截图任务'+(material?' · '+material.screenshots.length:'')],['paper','Paper2D 衔接']].map(([id,label],i)=>`<button type="button" role="tab" id="tab-${id}" aria-controls="panel-${id}" aria-selected="${i===0}" tabindex="${i===0?'0':'-1'}" data-tab="${id}">${label}</button>`).join('')}</div><div id="panel-graph" role="tabpanel" aria-labelledby="tab-graph"><div id="lesson-graph"></div><div class="experiment-heading"><h2>概念实验台</h2><span>输入改变，观察状态与节点反馈</span></div><div id="lesson-lab" class="lab-widget" aria-label="本课概念实验台"></div></div>${['pins','media','paper'].map(id=>`<div id="panel-${id}" role="tabpanel" aria-labelledby="tab-${id}" hidden></div>`).join('')}</section>
<section class="lesson-reference"><details><summary>准备条件、原理与关键参数</summary><p>${esc(lesson.premise)}</p><p>${esc(lesson.concept)}</p><div class="table-scroll"><table class="parameter-table"><thead><tr><th>名称</th><th>示例值</th><th>作用</th></tr></thead><tbody>${lesson.params.map(row=>`<tr>${row.map(cell=>`<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></details><details><summary>排查常见问题</summary>${lesson.pitfalls.map(p=>`<div class="faq-item"><strong>${esc(p[0])}</strong><p>${esc(p[1])}</p></div>`).join('')}</details></section>
<section class="notes-block"><div class="section-heading"><h2>本课笔记</h2><span id="notes-status" role="status">保存在当前浏览器</span></div><label class="sr-only" for="lesson-notes">本课学习笔记</label><textarea id="lesson-notes" maxlength="10000" rows="3" placeholder="记录在 UE5 中遇到的问题、参数或自己的理解…"></textarea></section><section class="lesson-block"><h2>一道自测题</h2><div id="lesson-quiz" class="quiz-widget"></div></section><div class="completion" id="completion"><div><h2>检查实际运行结果</h2><p>${esc(lesson.check)}</p></div><a class="btn btn-secondary" href="${next?'lesson.html?id='+next.id:'courses.html'}">${next?'下一节课 →':'返回课程目录 →'}</a></div>`;
function redraw(){
$('#lesson-sidebar').innerHTML=courses.map(c=>`<a class="sidebar-link ${c.id===lesson.id?'active':''}" ${c.id===lesson.id?'aria-current="page"':''} href="lesson.html?id=${c.id}"><small>${esc(c.module)} · ${count(c)} / ${c.steps.length} 步</small>${esc(c.title)}</a>`).join('');$('#step-progress').textContent=`已确认 ${count(lesson)} / ${lesson.steps.length}`;$('#total-progress-label').textContent=`学习进度：${total()} / ${totalSteps} 步`;$('#total-progress-fill').style.width=`${total()/totalSteps*100}%`;$('#completion').classList.toggle('done',count(lesson)===lesson.steps.length);document.querySelectorAll('[data-step-nav]').forEach(b=>{const i=Number(b.dataset.stepNav);b.classList.toggle('step-done',completed(lesson)[i]);b.classList.toggle('step-current',i===stepIndex);if(i===stepIndex)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});
}
function showStep(index,focus=false,persist=true){stepIndex=Math.max(0,Math.min(lesson.steps.length-1,index));const s=lesson.steps[stepIndex];$('#step-counter').textContent=`第 ${stepIndex+1} 步 / 共 ${lesson.steps.length} 步`;$('#active-step-title').textContent=s.title;$('#active-step-body').textContent=s.body;$('#active-step-help').textContent=s.help;$('#active-step-complete').checked=completed(lesson)[stepIndex];$('#previous-step').disabled=stepIndex===0;$('#next-step').disabled=stepIndex===lesson.steps.length-1;if(persist){write('blueprintlab:view:v1:'+lesson.id,stepIndex);const u=new URL(location.href);u.searchParams.set('id',lesson.id);u.searchParams.set('step',stepIndex+1);history.replaceState({},'',u.pathname+u.search)}redraw();if(focus)$('#active-step-title').focus({preventScroll:true})}
document.addEventListener('click',e=>{const b=e.target.closest('[data-step-nav]');if(b)showStep(Number(b.dataset.stepNav),true)});$('#previous-step').addEventListener('click',()=>showStep(stepIndex-1,true));$('#next-step').addEventListener('click',()=>showStep(stepIndex+1,true));$('#active-step-complete').addEventListener('change',e=>{const a=completed(lesson);a[stepIndex]=e.target.checked;write(key(lesson.id),a);redraw()});
const notes=$('#lesson-notes');notes.value=read('blueprintlab:notes:v1:'+lesson.id,'');notes.addEventListener('input',()=>{$('#notes-status').textContent=write('blueprintlab:notes:v1:'+lesson.id,notes.value)?'已保存到当前浏览器':'未能保存，请导出备份'});
const media=matchMedia('(min-width:961px)');$('.curriculum').open=media.matches;media.addEventListener('change',e=>{$('.curriculum').open=e.matches});showStep(stepIndex,false,false);
window.BlueprintLesson={lesson,material,showStep};
}
const dialog=$('#backup-dialog'),feedback=$('#backup-feedback');
document.addEventListener('click',e=>{if(e.target.closest('[data-open-backup]')){feedback.textContent='';dialog.showModal()}if(e.target.closest('[data-close-backup]'))dialog.close()});
$('#export-progress').addEventListener('click',()=>{const data={format:'blueprintlab-backup',version:1,exportedAt:new Date().toISOString(),lessons:courses.map(c=>({id:c.id,completed:completed(c),view:read('blueprintlab:view:v1:'+c.id,0),notes:read('blueprintlab:notes:v1:'+c.id,'')}))};const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='blueprint-lab-learning-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);feedback.textContent='备份已生成，请保存浏览器下载的 JSON 文件。'});

function restoreBackup(data){
 const updates=window.BlueprintBackup.prepareImport(data,courses,c=>({completed:completed(c),notes:read('blueprintlab:notes:v1:'+c.id,'')}));
 let saved=true;
 for(const row of updates){saved=write(key(row.course.id),row.completed)&&saved;saved=write('blueprintlab:notes:v1:'+row.course.id,row.notes)&&saved;saved=write('blueprintlab:view:v1:'+row.course.id,row.view)&&saved}
 if(!saved)throw Error('浏览器未能保存全部记录，请保留原备份。');
 feedback.textContent='已合并 '+updates.length+' 节课程的记录。';
 if(page==='home')renderHome();
 if(lesson){$('#lesson-notes').value=read('blueprintlab:notes:v1:'+lesson.id,'');window.BlueprintLesson.showStep(read('blueprintlab:view:v1:'+lesson.id,stepIndex))}
}
$('#import-progress').addEventListener('change',async e=>{
 const file=e.target.files[0];if(!file)return;
 try{if(file.size>200000)throw Error('文件超过 200 KB，请选择本站导出的备份。');restoreBackup(JSON.parse(await file.text()))}
 catch(error){feedback.textContent=error.message||'读取失败，请选择有效备份。'}
 e.target.value='';
});
$('#restore-pasted').addEventListener('click',()=>{
 try{restoreBackup(JSON.parse($('#backup-json').value))}
 catch(error){feedback.textContent=error instanceof SyntaxError?'JSON 不完整或格式有误，请粘贴完整备份。':error.message}
});
window.BlueprintUI={esc,read,write};
})();
