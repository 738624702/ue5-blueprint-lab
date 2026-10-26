/* Validate the complete import before writing; merging never clears a completed step. */
(() => {
'use strict';
function prepareImport(data,courses,current){
 if(!data||data.format!=='blueprintlab-backup'||data.version!==1||!Array.isArray(data.lessons)||data.lessons.length<1||data.lessons.length>courses.length)throw Error('文件不是有效的 Blueprint Lab 备份。');
 const seen=new Set();
 return data.lessons.map(row=>{
  const course=row&&courses.find(c=>c.id===row.id);
  if(!course||seen.has(row.id)||!Array.isArray(row.completed)||row.completed.length!==course.steps.length||row.completed.some(v=>typeof v!=='boolean')||typeof row.notes!=='string'||row.notes.length>10000||!Number.isInteger(row.view)||row.view<0||row.view>=course.steps.length)throw Error('课程、步骤或笔记格式不正确，未导入。');
  seen.add(row.id);
  const old=current(course);
  const notes=old.notes&&row.notes&&old.notes!==row.notes&&!old.notes.includes(row.notes)?old.notes+'\n\n[导入的笔记]\n'+row.notes:old.notes||row.notes;
  if(notes.length>10000)throw Error('合并后笔记超过 10000 字，请整理后再导入。');
  return {course,notes,view:row.view,completed:old.completed.map((v,i)=>v||row.completed[i])};
 });
}
window.BlueprintBackup={prepareImport};
})();
