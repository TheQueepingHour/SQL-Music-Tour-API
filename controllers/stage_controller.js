//DEPENDENCIES
const { Op } = require('sequelize')
const stages = require('express').Router()
const db = require('../models')
const { Stage } = db

//INDEX
stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll({
            where: {
                stage_name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
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
stages.put('/:id', async (req, res) => {
    try{
        const updatedStage = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStage} stage(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE
stages.delete('/:id', async (req, res) => {
    try{
        const deletedStage = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStage} stage(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = stages