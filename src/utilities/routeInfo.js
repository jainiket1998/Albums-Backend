let routeJson = require('./routes.json');
let obj;
routeJson.resources.forEach((each)=>{
    if(each.method && each.name && each.url){
        obj = {Name : each.name,Method : each.method,URL:each.url.substring(each.url.indexOf('/'))}
        if(each.body.mimeType == 'application/json'){
            obj.mimeType = each.body.mimeType
            obj.body = JSON.stringify(JSON.parse(each.body.text));
        }
        if(each.body.mimeType == 'multipart/form-data'){
            obj.mimeType = each.body.mimeType
            obj.body = "Param Name : 'photo' --> Select Image File using FormData"
        }
    }
})