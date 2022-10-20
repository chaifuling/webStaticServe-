const path = require('path');

const mimeTypes = {
    '.avi':'video/x-msvideo',
    '.bmp':'image/bmp',
    '.css':'text/css',
    '.doc':'application/msword',
    '.docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.gif':'image/gif',
    '.htm':'text/html',
    '.html':'text/html',
    '.ico':'image/vnd.microsoft.icon',
    '.jpeg':'image/jpeg',
    '.jpg':'image/jpeg',
    '.js':'text/javascript',
    '.json':'application/json',
    '.mp3':'audio/mpeg',
    '.mpeg':'video/mpeg',
    '.png':'image/png',
    '.pdf':'application/pdf',
    '.ppt':'application/vnd.ms-powerpoint',
    '.pptx':'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    '.rar':'application/x-rar-compressed',
    '.svg':'image/svg+xml',
    '.swf':'application/x-shockwave-flash',
    '.ttf':'font/ttf',
    '.txt':'text/plain',
    '.wav':'audio/wav',
    '.weba':'audio/webm',
    '.webm':'video/webm',
    '.webp':'image/webp',
    '.woff':'font/woff',
    '.woff2':'font/woff2',
    '.xhtml':'application/xhtml+xml',
    '.xls':'application/vnd.ms-excel',
    '.xlsx':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.xml':'text/xml',
    '.zip':'application/zip'
}

function getMimeByPath(filePath){
    return mimeTypes[path.extname(filePath).toLowerCase()];
}

module.exports = {
    mimeTypes,getMimeByPath
}