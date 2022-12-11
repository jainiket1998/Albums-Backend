const {photoModel} = require("../model/dbModel");
const generator = require("../utilities/LicenceKeyGenerator");
const AlbumService = require("./album-service");
const STATUS_SUCCESSFULL = 200;
const STATUS_UNSUCCESSFULL = 500;

let PhotoService = {};

PhotoService.getPhoto = async (photoId) => {
    let result = {
        status: STATUS_UNSUCCESSFULL,
        data: "",
    };
    let photoDetail = await photoModel.findOne({ photoId: photoId }, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 ,userDetail:0,albumDetail:0});
    if (photoDetail) {
        result.status = STATUS_SUCCESSFULL;
        result.data = photoDetail;
    }
    return result;
};

PhotoService.createPhoto = async (photoData) => {
    let result = {
        status: STATUS_UNSUCCESSFULL,
        data: "",
    };
    photoData.photoId = generator.generateKey();
    let albumData = await AlbumService.getAlbum(photoData.albumId);
    let albumDetail = JSON.parse(JSON.stringify(albumData));
    photoData.userDetail = albumDetail.data.userDetail;
    photoData.albumDetail = albumDetail.data._id
    let insertionStatus = await photoModel.create(photoData);
    if (insertionStatus) {
        result.status = STATUS_SUCCESSFULL;
        result.data = insertionStatus;
    }
    return result;
};

PhotoService.updatePhoto = async (photoId, photoData) => {
    let result = {
        status: STATUS_UNSUCCESSFULL,
        data: "",
    };
    let updationStatus = await photoModel.updateOne({photoId:photoId},photoData);
    if (updationStatus) {
        result.status = STATUS_SUCCESSFULL;
        result.data = updationStatus;
    }
    return result;
};

PhotoService.removePhoto = async (photoId) => {
    let result = {
        status: STATUS_UNSUCCESSFULL,
        data: "",
    };
    let photoData = await PhotoService.getPhoto(photoId);
    let photoDetail = JSON.parse(JSON.stringify(photoData));
    await AlbumService.updateAlbum(photoDetail.data.albumId,{});
    let deletionStatus = await photoModel.deleteOne({ photoId: photoId }, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 });
    if (deletionStatus) {
        result.status = STATUS_SUCCESSFULL;
        result.data = deletionStatus;
    }
    return result;
};

PhotoService.getAllPhotos = async () => {
    let result = {
        status: STATUS_UNSUCCESSFULL,
        data: "",
    };
    let photoDetail = await photoModel.find({}, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 ,userDetail:0,albumDetail:0});
    if (photoDetail) {
        result.status = STATUS_SUCCESSFULL;
        result.data = photoDetail;
    }
    return result;
};

PhotoService.getAllPhotosByUserId = async (userId) => {
    let result = {
        status: STATUS_UNSUCCESSFULL,
        data: "",
    };
    let photoDetail = await photoModel.find({ userId: userId }, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }).populate('userDetail');
    if (photoDetail) {
        result.status = STATUS_SUCCESSFULL;
        result.data = photoDetail;
    }
    return result;
};

PhotoService.getAllPhotosByAlbumId = async (albumId) => {
    let result = {
        status: STATUS_UNSUCCESSFULL,
        data: "",
    };
    let photoDetail = await photoModel.find({ albumId: albumId }, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }).populate('userDetail').populate('albumDetail');
    if (photoDetail) {
        result.status = STATUS_SUCCESSFULL;
        result.data = photoDetail;
    }
    return result;
};

module.exports = PhotoService;
