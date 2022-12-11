const mongoose = require('mongoose');
mongoose.set('strictQuery',true);

let user = {
    "userId":{
        required:[true,'Required Field'],
        type:String,
        unique:true
    },
    "firstName" : {
        required:[true,'Required Field'],
        type:String
    },
    "lastName" : {
        required:[true,'Required Field'],
        type:String
    },
    "phoneNumber":{
        required:[true,'Required Field'],
        type:String
    }
}

let album = {
    "albumId":{
        required:[true,'Required Field'],
        type:String,
        unique:true
    },
    "userId" : {
        required:[true,'Required Field'],
        type:String
    },
    "name" : {
        required:[true,'Required Field'],
        type:String
    },
    "lastUpdatedDate" : {
        required:[true,'Required Field'],
        type:String,
        default:new Date().toISOString()
    },
    "userDetail":{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}

let photos = {
    "photoId":{
        required:[true,'Required Field'],
        type:String,
        unique:true
    },
    "albumId":{
        required:[true,'Required Field'],
        type:String
    },
    "userId" : {
        required:[true,'Required Field'],
        type:String
    },
    "name" : {
        required:[true,'Required Field'],
        type:String
    },
    "imageURI" : {
        required:[true,'Required Field'],
        type:String
    },
    "userDetail":{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    "albumDetail":{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Albums"
    }
}
let dbModel = {};

let userSchema = mongoose.Schema(user,{collection:'User'});
dbModel.userModel = mongoose.model('User',userSchema);

let albumSchema = mongoose.Schema(album,{collection:'Albums'});
dbModel.albumModel = mongoose.model('Albums',albumSchema);

let photoSchema = mongoose.Schema(photos,{collection:'Photos'});
dbModel.photoModel = mongoose.model('Photos',photoSchema);


mongoose.connect('mongodb://localhost:27017/AlbumsAppDB',()=>{
    console.log("*************Database Connected***************");
})

module.exports = dbModel;