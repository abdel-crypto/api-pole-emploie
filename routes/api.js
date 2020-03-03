const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const router = express.Router();

// mongoose.Promise = global.Promise;
const courseController = require('../Controllers/course')
const userController = require('../Controllers/user')
const subjectController = require('../Controllers/subject')
const chapterController = require('../Controllers/chapter')

mongoose.connect("mongodb+srv://abdel-crypto:0001687156Az@cluster0-g8dls.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true ,useUnifiedTopology: true}, function(err){
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')      
    }
});

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

// User Actions
router.get('/users',userController.getAllUsers)
router.get('/users/:id',userController.getUser)
router.post('/users/register', userController.registerUser)
router.post('/users/login', userController.userLogIn)
router.delete('/users/delete/:id', userController.deleteUser)
router.put('/users/update/:id', userController.updateUser)

// Subject Action
router.post('/subjects/add', subjectController.addSubject)
router.get('/subjects/', subjectController.getAllSubject)
router.get('/subjects/:id', subjectController.getSubject)
router.put('/subjects/update/:id', subjectController.updateSubject)
router.delete('/subjects/delete/:id', subjectController.deleteSubject)

// Course Actions 
router.post('/courses/add', courseController.addCourse)
router.get('/courses/', courseController.getAllCourse)
router.get('/courses/:id', courseController.getCourse)
router.put('/courses/update/:id', courseController.updateCourse)
router.delete('/courses/delete/:id', courseController.deleteCourse)

// Chapter Actions
router.post('/chapters/add', chapterController.addChapter)
router.get('/chapters/', chapterController.getAllChapter)
router.get('/chapters/:id', chapterController.getchapter)
router.put('/chapters/update/:id', chapterController.updateChapter)
router.delete('/chapters/delete/:id', chapterController.deleteChapter)


module.exports = router;