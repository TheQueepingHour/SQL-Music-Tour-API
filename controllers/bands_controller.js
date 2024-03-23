//DEPENDENCIES
const { Op } = require('sequelize')
const bands = require('express').Router()
const db = require('../models')
const { Band, MeetGreets, Event, SetTime } = db

//INDEX
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [['available_start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            },
            limit: req.query.limit ? parseInt(req.query.limit) : 10
        })
        res.status(200).json(foundBands)
    } catch(error) {
        res.status(500).json(error)
    }
})

//SHOW
bands.get('/:name', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { name: req.params.name },
            include: [
                {
                    model: SetTime,
                    as: "set_time",
                    include: {
                        model: Event,
                        as: "event",
                        where: {
                            name: {[Op.iLike]: `%${req.query.event ? req.query.event : ''}%`}
                        },
                        attributes: {exclude: ['event_id']}
                    },
                    attributes: {exclude: ['band_id']}
                },
                {
                    model: MeetGreets,
                    as: "meet_greets",
                    include: {
                        model: Event,
                        as: "event",
                        where: {
                            name: {[Op.iLike]: `%${req.query.event ? req.query.event : ''}%`}
                        },
                        attributes: {exclude: ['event_id']}
                    },
                    attributes: {exclude: ['band_id', 'event_id']}
                }
            ],
            order: [
                [{model: MeetGreets, as: 'meet_greets'}, {model: Event, as: 'event'}, 'date', 'ASC'],
                [{model: SetTime, as: 'set_time'}, {model: Event, as: 'event'}, 'date', 'ASC']
            ]
        })
        res.status(200).json(foundBand)
    } catch(error) {
        res.status(500).json(error)
    }
})

//CREATE - POST
bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'Successfully created new band',
            data: newBand
        })
    } catch(error) {
        res.status(500).json(error)
    }
})

//UPDATE
bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band(s)`
        })
    } catch(error) {
        res.status(500).json(error)
    }
})

//DELETE
bands.delete('/:id', async (req, res) => {
    try {
        const deleteBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deleteBands} band(s)`
        })
    } catch(error) {
        res.status(500).json(error)
    }
})

module.exports = bands