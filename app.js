(() => {
  'use strict';
  const courses = window.BLUEPRINT_COURSES || [];
  const page = document.body.dataset.page;
  const $ = (selector,root=document) => root.querySelector(selector);
  const esc = (s) => String(s).replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function completed(id){ try{return JSON.parse(localStorage.getItem('blueprintlab:v1:'+id)||'[]')}catch{return []} }
  function save(id,arr){try{localStorage.setItem('blueprintlab:v1:'+id,JSON.stringify(arr))}catch{/* Browser storage is optional */}}
  function progress(course){const done=completed(course.id);return Math.round((done.filter((v)=>v===true).length/course.steps.length)*100)}
  function card(course){return `<a class="course-card" href="lesson.html?id=${encodeURIComponent(course.id)}"><div class="course-identity"><span class="card-meta">${esc(course.module)} · ${esc(course.level)}</span><h3>${esc(course.title)}</h3><p>${esc(course.description)}</p></div><span class="course-state">${progress(course)?'已学习 '+progress(course)+'%':'约 '+course.minutes+' 分钟'}</span><span class="course-arrow" aria-hidden="true">→</span></a>`}
  function homeSummary(lead,any,finished,doneSteps,totalSteps){return `<section class="focus-lesson"><div class="focus-context"><span>${any?'接着上次的练习':'从第一节实战开始'}</span><span>约 ${lead.minutes} 分钟</span></div><h2>${esc(lead.title)}</h2><p>${esc(lead.description)}</p><div class="execution-preview"><span>本课的节点与结果</span><ol>${lead.nodes.slice(0,3).map(n=>'<li><small>'+esc(n.type)+'</small><strong>'+esc(n.label)+'</strong></li>').join('')}</ol></div><div class="focus-bottom"><span>${lead.steps.length} 个操作步骤 · 课后自测</span><a class="btn btn-primary" href="lesson.html?id=${encodeURIComponent(lead.id)}">${any?'继续学习':'进入第一课'} <span aria-hidden="true">→</span></a></div></section><section class="practice-record"><h2>练习记录</h2><div class="record-value">${finished}<small> / ${courses.length} 节课程已完成</small></div><progress value="${doneSteps}" max="${totalSteps}" aria-label="已完成操作步骤"></progress><dl><div><dt>已确认操作步骤</dt><dd>${doneSteps}<small> / ${totalSteps}</small></dd></div><div><dt>正在练习的课程</dt><dd>${courses.filter(c=>progress(c)>0&&progress(c)<100).length}</dd></div></dl><p>进度保存在当前浏览器。<br>每一步都留待你在 UE 中确认。</p><a href="courses.html">查看全部课程 <span aria-hidden="true">→</span></a></section>`}
  if(page==='home'){
    const target=$('#home-courses');if(target) target.innerHTML=courses.map(card).join('');
    const summary=$('#learning-return');
    if(summary){
      const any=courses.some(c=>progress(c)>0),next=courses.find(c=>progress(c)>0&&progress(c)<100)||courses.find(c=>progress(c)<100)||courses[0];
      const finished=courses.filter(c=>progress(c)===100).length;
      const doneSteps=courses.reduce((s,c)=>s+c.steps.filter((_,i)=>completed(c.id)[i]===true).length,0);
      const totalSteps=courses.reduce((s,c)=>s+c.steps.length,0);
      summary.innerHTML=homeSummary(next,any,finished,doneSteps,totalSteps);
    }
  }
  if(page==='courses'){
    const term=$('#course-search'),target=$('#course-results'),bar=$('#course-filters'),count=$('#course-count');
    const params=new URLSearchParams(location.search);let active=params.get('module')||'全部';
    const modules=['全部',...new Set(courses.map(c=>c.module))];
    if(!modules.includes(active)) active='全部';
    function draw(){
      const q=term.value.trim().toLocaleLowerCase();
      bar.innerHTML=modules.map(m=>`<button class="filter ${active===m?'active':''}" type="button" data-module="${esc(m)}" aria-pressed="${active===m}">${esc(m)}</button>`).join('');
      const items=courses.filter(c=>(active==='全部'||c.module===active)&&[c.title,c.module,c.description,c.concept].join(' ').toLocaleLowerCase().includes(q));
      target.innerHTML=items.length?items.map(card).join(''):'<div class="empty-state" style="grid-column:1/-1">没有找到匹配课程，试着换一个关键词或分类。</div>';
      count.textContent=`共 ${items.length} 节课程 · 按基础到系统实践的顺序学习`;
    }
    term.addEventListener('input',draw);
    bar.addEventListener('click',(e)=>{const button=e.target.closest('[data-module]');if(!button)return;active=button.dataset.module;const u=new URL(location.href);if(active==='全部')u.searchParams.delete('module');else u.searchParams.set('module',active);history.replaceState({},'',u.pathname+u.search);draw()});
    draw();
  }
  if(page==='lesson'){
    const curriculum=$('.curriculum');
    if(curriculum){const desktop=window.matchMedia('(min-width:961px)');curriculum.open=desktop.matches;desktop.addEventListener('change',event=>{curriculum.open=event.matches})}
    const requested=new URLSearchParams(location.search).get('id')||'first-blueprint';
    const lesson=courses.find(c=>c.id===requested)||courses[0];
    if(!lesson) return;
    document.title=lesson.title+' — UE5 Blueprint Lab';
    const sidebar=$('#lesson-sidebar');
    sidebar.innerHTML=courses.map(c=>`<a class="sidebar-link ${lesson.id===c.id?'active':''}" href="lesson.html?id=${encodeURIComponent(c.id)}"><small>${esc(c.module)} · ${progress(c)}%</small>${esc(c.title)}</a>`).join('');
    const content=$('#lesson-content');
    const steps=completed(lesson.id);
    const next=courses[courses.findIndex(c=>c.id===lesson.id)+1];
    content.innerHTML=`<div class="crumbs"><a href="courses.html">全部课程</a><span>›</span>${esc(lesson.module)}<span>›</span>当前课程</div>
      <section class="lesson-head"><p class="lesson-context">${esc(lesson.module)} · ${esc(lesson.badge)}</p><h1>${esc(lesson.title)}</h1><p>${esc(lesson.description)}</p><div class="lesson-meta"><span class="pill">${esc(lesson.level)}</span><span>◷ 约 ${lesson.minutes} 分钟</span><span>·</span><span>${lesson.steps.length} 个操作步骤</span><span id="step-progress">· 完成 ${steps.filter(Boolean).length}/${lesson.steps.length}</span></div></section>
      <section class="lesson-block"><h2>这一课要做什么</h2><div class="note"><strong>验收目标：</strong>${esc(lesson.outcome)}<br><strong>准备工作：</strong>${esc(lesson.premise)}</div></section>
      <section class="lesson-block"><h2>先理解逻辑</h2><p>${esc(lesson.concept)}</p><div class="logic-canvas" style="margin-top:18px"><div class="logic-top"><span>蓝图执行路径</span><span class="desktop-flow-label">由左向右执行 →</span><span class="mobile-flow-label">由上向下执行 ↓</span></div><div class="logic-flow">${lesson.nodes.map((n,i)=>`${i?'<div class="logic-line" aria-hidden="true"></div>':''}<div class="logic-node"><div class="logic-node-head">${esc(n.type)}</div><strong>${esc(n.label)}</strong><p>${esc(n.desc)}</p></div>`).join('')}</div><div class="canvas-foot">提示：这是帮助理解的流程示意，不是 UE5 编辑器的逐引脚截图。请根据下方操作步骤实际连接节点。</div></div></section>
      <section class="lesson-block"><h2>手机逻辑实验台</h2><p>先点击模拟控件，理解输入、条件和输出会发生什么变化。</p><div class="lab-widget" id="lesson-lab" aria-label="可交互逻辑模拟"></div></section>
      <section class="lesson-block"><h2>跟着操作</h2><p style="margin:0 0 18px">每做完一步，勾选左侧方框。勾选状态保存在当前浏览器，不需要登录。</p><div class="step-list">${lesson.steps.map((s,i)=>`<div class="lesson-step ${steps[i]?'done':''}"><input class="step-check" type="checkbox" id="step-${i}" data-step="${i}" ${steps[i]?'checked':''} aria-label="完成步骤 ${i+1}：${esc(s.title)}"><div class="step-copy"><h3><label for="step-${i}">${i+1}. ${esc(s.title)}</label></h3><p>${esc(s.body)}</p><aside>${esc(s.help)}</aside></div></div>`).join('')}</div></section>
      <section class="lesson-block"><h2>关键参数</h2><div style="overflow-x:auto"><table class="parameter-table"><thead><tr><th>名称</th><th>示例值</th><th>作用</th></tr></thead><tbody>${lesson.params.map(row=>`<tr>${row.map(cell=>`<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>
      <section class="lesson-block"><h2>遇到问题怎么办</h2><div>${lesson.pitfalls.map(row=>`<div class="faq-item"><strong>Q：${esc(row[0])}</strong><p>A：${esc(row[1])}</p></div>`).join('')}</div></section>
      <section class="lesson-block"><h2>一道自测题</h2><div id="lesson-quiz" class="quiz-widget"></div></section>
      <div id="completion" class="completion"><div><h3>最后一步：检查效果</h3><p>${esc(lesson.check)}</p></div><a class="btn btn-secondary" href="${next?'lesson.html?id='+encodeURIComponent(next.id):'courses.html'}">${next?'下一节课 →':'返回课程目录 →'}</a></div>`;
    function redraw(){
      const values=completed(lesson.id);const num=values.filter(Boolean).length;const pct=Math.round(num/lesson.steps.length*100);
      $('#step-progress').textContent=`· 完成 ${num}/${lesson.steps.length}`;
      $('#completion').classList.toggle('done',num===lesson.steps.length);
      const doneAll=courses.reduce((s,c)=>s+completed(c.id).filter(Boolean).length,0);
      const stepAll=courses.reduce((s,c)=>s+c.steps.length,0);
      $('#total-progress-label').textContent=`学习进度：${doneAll}/${stepAll} 步`;
      $('#total-progress-fill').style.width=`${Math.round(doneAll/stepAll*100)}%`;
    }
    content.addEventListener('change',(e)=>{
      const input=e.target.closest('input[data-step]');if(!input)return;
      const list=completed(lesson.id);list[Number(input.dataset.step)]=input.checked;save(lesson.id,list);
      input.closest('.lesson-step').classList.toggle('done',input.checked);redraw();
    });
    redraw();
  }
})();

