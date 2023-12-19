const Challenge = require('../models/challengesModel');

const challengeController = {
  // Create a new challenge
  createChallenge: async (req, res) => {
    try {
      const { title, description, criteria, timerDurationInMinutes, difficultyLevel } = req.body;

      const newChallenge = new Challenge({
        title,
        description,
        criteria,
        timerDurationInMinutes,
        difficultyLevel,
      });

      await newChallenge.save();

      res.status(201).json(newChallenge);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get a list of all challenges
  getAllChallenges: async (req, res) => {
    try {
      const challenges = await Challenge.find();
      res.status(200).json(challenges);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  //Get a challenge by it's id
  getChallengeById: async (req, res) => {
    try {
      const challenge = await Challenge.findOne({_id : req.params.challengeId});

      if (!challenge) {
        return res.status(404).json({ error: 'Challenge not found' });
      }
      res.status(200).json(challenge);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update an existing challenge
  updateChallenge: async (req, res) => {
    try {
      const { title, description, criteria, timerDurationInMinutes, difficultyLevel } = req.body;
      const { id } = req.params;

      const updatedChallenge = await Challenge.findByIdAndUpdate(
        id,
        {
          title,
          description,
          criteria,
          timerDurationInMinutes,
          difficultyLevel,
        },
        { new: true }
      );

      res.status(200).json(updatedChallenge);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Delete a challenge
  deleteChallenge: async (req, res) => {
    try {
      const { id } = req.params;
      await Challenge.findByIdAndDelete(id);
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = challengeController;