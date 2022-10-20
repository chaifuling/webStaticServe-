const path = require('path');
const fs = require('fs');
const config = require('./config/config.js');
const template = require('art-template');
const templateHtml = fs.readFileSync(path.join(__dirname,'./view/dir.html')).toString();
const template404Html = fs.readFileSync(path.join(__dirname,'./view/404.html')).toString();
const mimeType = require('./config/mimetype');
const compress = require('./compress');
const cache = require('./cache');


module.exports = (req,res,filePath) =>{
    const encodingType =compress.getAcceptEncoding(req.headers['accept-encoding']);
    fs.stat(filePath,(err,stats) => {
        if(!err){
           if(stats.isDirectory()){
               fs.readdir(filePath,(err,files) =>{
                   if(!err){
                       res.statusCode = 200;
                       res.setHeader('Content-Type','text/html');
                       const htmlStr = template.render(templateHtml,{dirName:path.relative(config.root,filePath),files:files});
                       compress.compressStr(htmlStr,encodingType,res);
                    }else{
                        res.statusCode = 404;
                        res.setHeader('Content-Type','text/html');
                        compress.compressStr(template404Html,encodingType,res);
                    }
                });
           }else if(stats.isFile()){
               let contentType = mimeType.getMimeByPath(filePath);
               const fileExt = path.extname(filePath);
               if(contentType){
                   if(cache.isFresh(stats,req,res)){
                       res.statusCode = 304;
                       res.end();
                   }else{
                       res.statusCode = 200;
                       res.setHeader('Content-Type',contentType + ';charset=utf-8');
                       res.setHeader('Vary','Accept-Encoding');
                       const arw = fs.createReadStream(filePath);
                       if(config.compress.test(fileExt)){
                           compress.compressReadStream(arw,encodingType,res);
                        }else{
                            arw.pipe(res);
                        }
                    }
                }else{
                    res.statusCode = 404;
                    res.setHeader('Content-Type','text/html');
                    compress.compressStr(template404Html,encodingType,res);
                }
            }
        }else{
            res.statusCode = 404;
            res.setHeader('Content-Type','text/html');
            compress.compressStr(template404Html,encodingType,res);
        }
    });
}