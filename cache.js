const config = require('./config/config');

function refreshRes(stats,res){
    if(config.cache.cacheControl){
        res.setHeader('Cache-Control',`max-age=${config.cache.maxAge}`);
    }

    if(config.cache.expires){
        res.setHeader('Expires',(new Date(Date.now() + config.cache.maxAge * 60)).toGMTString());
    }

    if(config.cache.lastModified){
        res.setHeader('Last-Modified',stats.mtime.toGMTString());
    }

    if(config.cache.etag){
        res.setHeader('Etag',`${stats.size}-${stats.mtime}`);
    }
}

function isFresh(stats,req,res){
    refreshRes(stats,res);

    const if_modified_since = req.headers['if-modified-since'];
    const if_none_match = req.headers['if-none-match'];

    if(!if_modified_since && !if_none_match){
        return false;
    }

    if(if_modified_since && if_modified_since !== res.getHeader('Last-Modified')){
        return false;
    }

    if(if_none_match && if_none_match !== res.getHeader('Etag')){
        return false;
    }

    return true;
}

module.exports = {
    isFresh,refreshRes
}