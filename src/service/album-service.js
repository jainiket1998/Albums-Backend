const { albumModel } = require("../model/dbModel");
const generator = require("../utilities/LicenceKeyGenerator");
const UserService = require("./user-service");
const STATUS_SUCCESSFULL = 200;
const STATUS_UNSUCCESSFULL = 500;

let AlbumService = {};

AlbumService.getAlbum = async (albumId) => {
    let result = {
        status: STATUS_UNSUCCESSFULL,
        data: "",
    };
    let albumDetail = await albumModel.findOne({ albumId: albumId }, {__v: 0, createdAt: 0, updatedAt: 0 ,userDetail:0});
    if (albumDetail) {
        result.status = STATUS_SUCCESSFULL;
        result.data = albumDetail;
    }
    return result;
};

AlbumService.createAlbum = async (AlbumData) => {
    let result = {
        status: STATUS_UNSUCCESSFULL,
        data: "",
    };
    AlbumData.albumId = generator.generateKey();
    let userData = await UserService.getUser(AlbumData.userId);
    let userDetail = JSON.parse(JSON.stringify(userData));
    AlbumData.userDetail = userDetail.data._id;
    let insertionStatus = await albumModel.create(AlbumData);
    if (insertionStatus) {
        result.status = STATUS_SUCCESSFULL;
        result.data = insertionStatus;
    }
    return result;
};

AlbumService.updateAlbum = async (albumId, albumData) => {
    let result = {
        status: STATUS_UNSUCCESSFULL,
        data: "",
    };
    albumData.lastUpdatedDate = new Date().toISOString();
    let updationStatus = await albumModel.updateOne({ albumId: albumId }, albumData);
    if (updationStatus) {
        result.status = STATUS_SUCCESSFULL;
        result.data = updationStatus;
    }
    return result;
};

AlbumService.removeAlbum = async (albumId) => {
    let result = {
        status: STATUS_UNSUCCESSFULL,
        data: "",
    };
    let deletionStatus = await albumModel.deleteOne({ albumId: albumId }, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 });
    if (deletionStatus) {
        result.status = STATUS_SUCCESSFULL;
        result.data = deletionStatus;
    }
    return result;
};

AlbumService.getAllAlbum = async () => {
    let result = {
        status: STATUS_UNSUCCESSFULL,
        data: "",
    };
    let albumDetail = await albumModel.find({}, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 });
    if (albumDetail) {
        result.status = STATUS_SUCCESSFULL;
        result.data = albumDetail;
    }
    return result;
};

AlbumService.getAllAlbumByUserId = async (userId) => {
    let result = {
        status: STATUS_UNSUCCESSFULL,
        data: "",
    };
    let albumDetail = await albumModel.find({ userId: userId }, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }).populate('userDetail');
    if (albumDetail) {
        result.status = STATUS_SUCCESSFULL;
        result.data = albumDetail;
    }
    return result;
};
module.exports = AlbumService;
