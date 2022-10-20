const zlib = require('zlib');

function getAcceptEncoding(acceptEncoding){
    if(!acceptEncoding){
        return undefined;
    }else if(acceptEncoding.match(/\bgzip\b/)){
        return 'gzip';
    }else if(acceptEncoding.match(/\bdeflate\b/)){
        return 'deflate';
    }else if(acceptEncoding.match(/\bbr\b/)){
        return 'br';
    }else{
        return undefined;
    }
}

//针对字符串数据进行压缩
function compressStr(arwStr,type,res){
    switch(type){
        case 'gzip':
            zlib.gzip(arwStr,(err,buffer) => {
                if(!err){
                    res.setHeader('Content-Encoding','gzip');
                    res.write(buffer);
                    res.end();
                }else{
                    throw error('compress.js:以gzip方式压缩文件失败');
                }
            });
        break;
        case 'deflate':
            zlib.deflate(arwStr,(err,buffer) => {
                if(!err){
                    res.setHeader('Content-Encoding','deflate');
                    res.write(compressStr);
                    res.end();
                }else{
                    throw error('compress.js:以deflate方式压缩文件失败');
                }
            });
        break;
        case 'br':
            zlib.brotliCompress(arwStr,(err,buffer) =>{
                if(!err){
                    res.setHeader('Content-Encoding','br');
                    res.write(buffer);
                    res.end();
                }else{
                    throw error('compress.js:以br方式压缩文件失败');
                }
            });
        break;
        default:
            res.write(arwStr);
            res.end();
    }
}

//针对读文件流压缩
function compressReadStream(arw,type,res){
    switch(type){
        case 'gzip':
            res.setHeader('Content-Encoding','gzip');
            arw.pipe(zlib.createGzip()).pipe(res);
        break;
        case 'deflate':
            res.setHeader('Content-Encoding','deflate');
            arw.pipe(zlib.createDeflate()).pipe(res);
        break;
        case 'br':
            res.setHeader('Content-Encoding','br');
            arw.pipe(zlib.createBrotliCompress()).pipe(res);
        break;
        default:
            arw.pipe(res);
        break;
    }
}

module.exports = {
    getAcceptEncoding,compressReadStream,compressStr
}