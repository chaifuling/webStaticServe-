const http = require('http');
const path = require('path');
const config = require('./config/config.js');
const route = require('./route');

const sever = http.createServer((req,res)=>{
    const filePath=path.join(config.root,req.url.split('?')[0]);
    route(req,res,filePath);
});
sever.listen(config.post,config.hostname,()=>{
    console.log(`Server http://${config.hostname}:${config.post} create successfully.`);
});