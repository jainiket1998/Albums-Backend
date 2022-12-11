const express = require('express');
const router = express.Router();
const UserService = require('../service/user-service');

router.get('/getUser/userId/:userId',async (request, response) => {
    try {
        let userId = request.params.userId;
        let userData = await UserService.getUser(userId);
        response.json(userData)
    } catch (error) {
        response.status(500).json({ errorMessage: error });
    }
});

router.post('/createUser',async(request, response) => {
    try {
        let isInserted = await UserService.createUser(request.body);
        if (isInserted.status == "200") {
            response.status(500).send(isInserted);
        }
    } catch (error) {
        response.json(error);
    }
});

router.put('/updateUser/userId/:userId', async(request, response) => {
    try {
        let userId = request.params.userId;
        let userData = await UserService.updateUser(userId,request.body);
        response.json(userData);
    } catch (error) {
        response.status(500).json({ errorMessage: error });
    }
});

router.delete('/removeUser/userId/:userId', async(request, response) => {
    try {
        let userId = request.params.userId;
        let userData = await UserService.removeUser(userId);
        response.json(userData);
    } catch (error) {
        response.status(500).json({ errorMessage: error });
    }
});

router.get('/getAllUser', async(request, response) => {
    try {
        let userData = await UserService.getAllUser();
        response.json(userData);
    } catch (error) {
        response.status(500).json({ errorMessage: error });
    }
});
module.exports = router;