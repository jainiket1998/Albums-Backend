const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const PhotoService = require('../service/photo-service');
const storage = multer.diskStorage({
    destination: './src/assets',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.mimetype.split('/')[1]);
    }
})
const upload = multer({ storage: storage });

router.get('/getPhoto/photoId/:photoId', async (request, response) => {
    try {
        let photoId = request.params.photoId;
        let photoData = await PhotoService.getPhoto(photoId);
        response.json(photoData)
    } catch (error) {
        response.status(500).json({ errorMessage: error });
    }
});

router.post('/createPhoto/userId/:userId/albumId/:albumId', upload.single('photo'), async (request, response) => {
    try {
        request.body.userId = request.params.userId;
        request.body.albumId = request.params.albumId;
        request.body.imageURI = request.file.destination + "/" + request.file.filename;
        request.body.name = request.file.filename;
        let isInserted = await PhotoService.createPhoto(request.body);
        if (isInserted.status == "200") {
            response.send(isInserted);
        }
    } catch (error) {
        response.status(500).json(error);
    }
});

router.put('/updatePhoto/photoId/:photoId', upload.single('photo'), async (request, response) => {
    try {
        let photoId = request.params.photoId;
        let photoDetails = await PhotoService.getPhoto(photoId);
        request.body.imageURI = request.file.destination + "/" + request.file.filename;
        fs.unlink(photoDetails.data.imageURI, async () => {
            let photoData = await PhotoService.updatePhoto(photoId, request.body);
            response.json(photoData);
        });

    } catch (error) {
        response.status(500).json({ errorMessage: error });
    }
});

router.delete('/removePhoto/photoId/:photoId', async (request, response) => {
    try {
        let photoId = request.params.photoId;
        let photoDetails = await PhotoService.getPhoto(photoId);
        fs.unlink(photoDetails.data.imageURI, async () => {
            let photoData = await PhotoService.removePhoto(photoId);
            response.json(photoData);
        });
    } catch (error) {
        response.status(500).json({ errorMessage: error });
    }
});

router.get('/getAllPhotos', async (request, response) => {
    try {
        let photoData = await PhotoService.getAllPhotos();
        response.json(photoData);
    } catch (error) {
        response.status(500).json({ errorMessage: error });
    }
});

router.get('/getAllPhotos/userId/:userId', async(request, response) => {
    try {
        let userId = request.params.userId;
        let albumData = await PhotoService.getAllPhotosByUserId(userId);
        response.json(albumData);
    } catch (error) {
        response.status(500).json({ errorMessage: error });
    }
});

router.get('/getAllPhotos/albumId/:albumId', async(request, response) => {
    try {
        let albumId = request.params.albumId;
        let albumData = await PhotoService.getAllPhotosByAlbumId(albumId);
        response.json(albumData);
    } catch (error) {
        response.status(500).json({ errorMessage: error });
    }
});

module.exports = router;