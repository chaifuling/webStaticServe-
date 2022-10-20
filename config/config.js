module.exports={
   root:process.cwd(),
   hostname:'127.0.0.1',
   post:8899,
   compress:/\.(html|js|css)/,
   cache:{maxAge:60,cacheControl:true,expires:true,lastModified:true,etag:true}
}