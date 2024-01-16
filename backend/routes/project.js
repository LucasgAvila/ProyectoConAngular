var express = require('express')
var ProjectController = require('../controllers/project')

var router = express.Router();

var multiPart = require('connect-multiparty')
var multipartyMiddleware = multiPart({ uploadDir: './uploads' })

router.get('/home', ProjectController.home)
router.get('/project/:id?', ProjectController.getProject)
router.get('/projects', ProjectController.getProjects)
router.get('/get-image/:image', ProjectController.getImageFile
);
router.post('/test', ProjectController.test)
router.post('/save-project', ProjectController.saveProject)
router.post('/uploadImage/:id', multipartyMiddleware, ProjectController.uploadImage)
router.put('/project/:id', ProjectController.updateProject)
router.delete('/project/:id', ProjectController.deleteProject)
module.exports = router;
