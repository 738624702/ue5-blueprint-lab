const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const root=__dirname,port=Number(process.env.PORT)||4289;
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.json':'application/json; charset=utf-8','.md':'text/plain; charset=utf-8'};
const server=http.createServer((req,res)=>{try{const p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.resolve(root,'.'+(p==='/'?'/index.html':p));if(!file.startsWith(root+path.sep)||p.split('/').some(part=>part.startsWith('.'))){res.writeHead(403);res.end('Forbidden');return}if(!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end('Not found');return}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res)}catch{res.writeHead(400);res.end('Bad request')}});
server.on('error',err=>{console.error(err.code==='EADDRINUSE'?`Port ${port} is in use. Set PORT to another port.`:err.message);process.exitCode=1});
server.listen(port,'127.0.0.1',()=>console.log(`Local: http://localhost:${port}`));
