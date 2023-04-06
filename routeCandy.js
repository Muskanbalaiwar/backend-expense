const express = require('express');

const adminController = require('../controllers/candyController');

const router = express.Router();

router.post('/candy/post',adminController.postData)

router.get('/candy/getData',adminController.getAll);

router.patch('/candy/put1/:id',adminController.put1)


module.exports=router;