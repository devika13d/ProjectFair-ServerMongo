
//path to resolve each client request
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const jwtMiddleware = require('../middleWares/jwtMiddleware')
const multerConfig = require('../middleWares/multerMiddleware')

//-import express
const express = require('express');

//-craete an object for the class router in express
const router = new express.Router()

//-define paths
//syntax
// router.http request method('Path to resolve',()=>{
// how to resolve the request(controller function)
// })

//user registration
router.post('/user/register', userController.register)

//user login
router.post('/user/login', userController.login)

//add new project
router.post('/project/add', jwtMiddleware, multerConfig.single('projectimage'), projectController.addProject)

//get project from home page
router.get('/project/home-project', projectController.getHomeProject)

//get all projects
router.get('/project/all-project', jwtMiddleware, projectController.getAllProject)

//get user project
router.get('/project/user-project', jwtMiddleware, projectController.getUserProject)

//edit user project
router.put('/project/edit/:id', jwtMiddleware, multerConfig.single('projectimage'),projectController.editUserproject)

//delete project
router.delete('/project/remove/:id',jwtMiddleware,projectController.deleteUserProject)




//-export router
module.exports = router;