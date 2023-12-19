const express = require('express')
const tutorialControllers = require('../controllers/tutorialControllers')

const router = express.Router()

router.post('/addNewTutorial', tutorialControllers.addNewTutorial)

router.get('/getAllTutorials', tutorialControllers.getAllTutorials)

router.get('/getSelectedTutorial/:id', tutorialControllers.getSelectedTutorial)

router.get('/getSelectedTutorials/category', tutorialControllers.getSelectedTutorials)

router.get('/getSearchedTutorials/category', tutorialControllers.getSearchedTutorials)

router.put('/updateTutorial/:id', tutorialControllers.updateTutorial)

router.delete('/deleteTutorial/:id', tutorialControllers.deleteTutorial)

router.post('/addReview', tutorialControllers.addReview)

module.exports = router;