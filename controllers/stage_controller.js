//DEPENDENCIES
const { Op } = require('sequelize')
const stages = require('express').Router()
const db = require('../models')
const Stage = db

//INDEX
stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll({
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            }
        })
        console.log("Found Stages:", foundStages)
        res.status(200).json(foundStages)
    } catch (error) {
        console.error("Error in retrieving stages:", error.message || error)
        res.status(500).json({ error: "Internal server error" })
    }
})

//SHOW
stages.get('/:id', async (req, res) => {
    try{
        const foundStage = await Stage.findOne({
            where: { stage_id: req.params.id }
        })
        res.status(200).json(foundStage)
    } catch (error) {
        res.status(500).json(error)
    }
})

//CREATE / POST
stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: `Successfully created ${newStage} stage(s)`,
            data: newStage
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE
// stages.put('/', async (req.res) => {
//     try {

//     }
// })

module.exports = stages