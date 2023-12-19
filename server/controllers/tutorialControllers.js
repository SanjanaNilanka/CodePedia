const tutorialModel = require('../models/tutorialModel')

exports.addNewTutorial = (req, res) => {
    let newTutorial = new tutorialModel(req.body)

    newTutorial.save().then(() => {
        return res.status(200).json({
            success: 'Tutorial is created successfully'
        })
    }).catch((err) => {
        return res.status(400).json({
            error: err
        })
        console.log(err)
    })
}

exports.getAllTutorials = (req, res) => {
    tutorialModel.find().exec().then((results) => {
        return res.status(200).json({
            success: true,
            tutorials: results
        })
    }).catch((err) => {
        console.error(err)
    })
}

exports.getSelectedTutorial = (req, res) => {
    tutorialModel.findById(req.params.id).exec().then((results) => {
        return res.status(200).json({
            success: true,
            tutorials: results
        })
    }).catch((err) => {
        console.error(err)
    })
}

exports.getSelectedTutorials = (req, res) => {
    const categoryQuery = req.query.category

    tutorialModel.find({ tutorial_category: categoryQuery }).sort({ tutorial_priority: 1 }).then((results) => {
        return res.status(200).json({
            success: true,
            tutorials: results
        })
    }).catch((err) => {
        console.error(err)
    })
}

exports.getSearchedTutorials = (req, res) => {
    const categoryQuery = req.query.category
    const keyQuery = req.query.key
    const regex = new RegExp(keyQuery, 'i')

    tutorialModel.find({ $or: [{ tutorial_title: regex }, { tutorial_category: categoryQuery }] }).sort({ tutorial_priority: 1 }).then((results) => {
        return res.status(200).json({
            success: true,
            tutorials: results
        })
    }).catch((err) => {
        console.error(err)
    })
}

exports.updateTutorial = (req, res) => {
    const id = req.params.id
    const tutorial_title = req.body.tutorial_title
    const tutorial_category = req.body.tutorial_category
    const tutorial_about = req.body.tutorial_about
    const tutorial_sections_count = req.body.tutorial_sections_count
    const tutorial_section = req.body.tutorial_section
    const tutorial_exercises = req.body.tutorial_exercises
    const tutorial_estimated_time = req.body.tutorial_estimated_time

    tutorialModel.findByIdAndUpdate(id, {
        tutorial_title,
        tutorial_category,
        tutorial_about,
        tutorial_sections_count,
        tutorial_section,
        tutorial_exercises,
        tutorial_estimated_time
    }, { new: true }).then(() => {
        res.send("successfuly updated")
    }).catch((err) => {
        return res.status(500).send('Error orcurred')
    })
}

exports.deleteTutorial = (req, res) => {
    tutorialModel.findByIdAndDelete(req.params.id).then(() => {
        return res.status(200).json({
            success: true,

        })
    }).catch((err) => {
        return res.status(500).send(err)
    })
}

exports.addReview = async(req, res) => {
    const { documentId, newReview } = req.body; // Assuming you receive the document ID and new value from the client

    try {
        const document = await tutorialModel.findById(documentId);

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        // Add the new value to the array
        document.tutorial_reviews.push(newReview);

        // Save the updated document
        await document.save();

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}