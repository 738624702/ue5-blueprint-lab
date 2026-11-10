const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),read=n=>fs.readFileSync(path.join(root,n),'utf8'),context=vm.createContext({window:{}});
vm.runInContext(read('data.js'),context);const old=JSON.stringify(context.window.BLUEPRINT_COURSES),baseline=JSON.parse(old);
assert.equal(baseline.length,8);assert.equal(baseline.reduce((n,c)=>n+c.steps.length,0),34);
vm.runInContext(read('season-data.js'),context);vm.runInContext(read('backup.js'),context);
const courses=context.window.BLUEPRINT_COURSES,project=context.window.SEASON_PROJECT,course=courses.at(-1);
assert.equal(courses.length,9);assert.equal(JSON.stringify(courses.slice(0,8)),old);assert.equal(course.steps.length,8);
assert.equal(project.chapters.reduce((n,ch)=>n+ch.walk.steps.length,0),38);assert.ok(context.window.BLUEPRINT_GRAPH_MODELS[course.id]);
for(const [i,chapter]of project.chapters.entries()){assert.equal(chapter.title,course.steps[i].title);for(const k of chapter.nodeKeys)assert.ok(project.nodeSpecs[k]);for(const step of chapter.walk.steps)assert.ok(step.action&&step.see&&step.tip)}
// Old 8-course backups merge without resetting existing progress or appending a false.
const saved={format:'blueprintlab-backup',version:1,lessons:baseline.map(c=>({id:c.id,completed:c.steps.map((_,i)=>i===0),view:0,notes:'原备份笔记'}))};
const rows=context.window.BlueprintBackup.prepareImport(saved,courses,c=>({completed:c.steps.map((_,i)=>i===1),notes:'现有笔记'}));
assert.equal(rows.length,8);for(const row of rows){assert.equal(row.completed[0],true);assert.equal(row.completed[1],true);assert.ok(row.notes.includes('原备份笔记')&&row.notes.includes('现有笔记'))}
saved.lessons.push({id:course.id,completed:course.steps.map((_,i)=>i===0),view:7,notes:'新工程课笔记'});
assert.equal(context.window.BlueprintBackup.prepareImport(saved,courses,c=>({completed:c.steps.map(()=>false),notes:''})).length,9);
for(const file of ['index.html','courses.html','lesson.html']){const s=read(file);assert.ok(s.indexOf('season-data.js')<s.indexOf('app.js'));assert.ok(s.includes('season-project.js')&&s.includes('season.css'))}
assert.ok(read('lesson.html').indexOf('season-project.js')<read('lesson.html').indexOf('lab.js'));
for(const info of [project.download,project.download.sourceArt]){const bytes=fs.readFileSync(path.join(root,'downloads',info.file));assert.equal(bytes.length,info.bytes);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),info.sha256)}
for(const file of ['standard.png','tablet.png','wide.png','reward-permission.png','reward-appearance.png'])assert.ok(fs.statSync(path.join(root,'season-assets',file)).size>1000);
assert.ok(!read('season-data.js').includes('C:/Users/'));assert.equal(project.verification.staticChecks.passed,2042);
console.log('PASS: original 8 courses/34 steps unchanged; new 8 chapters/38 microsteps; old/new backup merge; script order; actual download hashes.');
