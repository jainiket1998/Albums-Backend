const express = require('express');
const router = express.Router();
const AlbumService = require('../service/album-service');

router.get('/getAlbum/albumId/:albumId',async (request, response) => {
    try {
        let albumId = request.params.albumId;
        let albumData = await AlbumService.getAlbum(albumId);
        response.json(albumData)
    } catch (error) {
        response.status(500).json({ errorMessage: error });
    }
});

router.post('/createAlbum/userId/:userId',async(request, response) => {
    try {
        request.body.userId = request.params.userId;
        let isInserted = await AlbumService.createAlbum(request.body);
        if (isInserted.status == "200") {
            response.send(isInserted);
        }
    } catch (error) {
        response.status(500).json(error);
    }
});

router.put('/updateAlbum/albumId/:albumId', async(request, response) => {
    try {
        let albumId = request.params.albumId;
        let albumData = await AlbumService.updateAlbum(albumId,request.body);
        response.json(albumData);
    } catch (error) {
        response.status(500).json({ errorMessage: error });
    }
});

router.delete('/removeAlbum/albumId/:albumId', async(request, response) => {
    try {
        let albumId = request.params.albumId;
        let albumData = await AlbumService.removeAlbum(albumId);
        response.json(albumData);
    } catch (error) {
        response.status(500).json({ errorMessage: error });
    }
});

router.get('/getAllAlbums', async(request, response) => {
    try {
        let albumData = await AlbumService.getAllAlbum();
        response.json(albumData);
    } catch (error) {
        response.status(500).json({ errorMessage: error });
    }
});

router.get('/getAllAlbums/userId/:userId', async(request, response) => {
    try {
        let userId = request.params.userId;
        let albumData = await AlbumService.getAllAlbumByUserId(userId);
        response.json(albumData);
    } catch (error) {
        response.status(500).json({ errorMessage: error });
    }
});
module.exports = router;