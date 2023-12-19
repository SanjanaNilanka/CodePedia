const express = require('express')
const challengeController = require('../controllers/challengesControllers')

const router = express.Router();

// Create a new challenge
router.post('/create', challengeController.createChallenge);

// Get a list of all challenges
router.get('/getAll', challengeController.getAllChallenges);

// Get a challenges by it's id
router.get('/getById/:challengeId', challengeController.getChallengeById);

// Update an existing challenge
router.put('/:id', challengeController.updateChallenge);

// Delete a challenge
router.delete('/:id', challengeController.deleteChallenge);

module.exports = router;