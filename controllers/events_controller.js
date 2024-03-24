//DEPENDENCIES
const { Op } = require('sequelize')
const events = require('express').Router()
const db = require('../models')
const { Event, Stage, SetTime, MeetGreets } = db

//Index
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            where: {
                name: { [Op.like ]: `%${req.query.name ? req.query.name: ''}%`}
            },
            limit: req.query.limit ? parseInt(req.query.limit) : 10
        })
        res.status(200).json(foundEvents)
    } catch(error) {
        res.status(500).json(error)
    }
})

//Show
events.get('/:name', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { name: req.params.name },
            include: [
                {
                    model: Stage,
                    as: "stages",
                    include: [
                        {
                            model: SetTime,
                            as: 'set_time',
                            include: {
                                model: Event,
                                as: 'event',
                                attributes: {exclude: ['event_id']}
                            },
                            attributes: {exclude: ['stage_id']}
                        }
                    ]
                },
                {
                    model: MeetGreets,
                    as: "meet_greets",
                    include: {
                        model: Event,
                        as: 'event',
                        attributes: {exclude: ['event_id']}
                    },
                    attributes: {exclude: ['event_id', 'band_id']}
                }
            ],
            order: [
                [{model: Stage, as: 'stages'}, {model: SetTime, as: 'set_time'}, {model: Event, as: 'event'}, 'date', 'ASC'],
                [{model: MeetGreets, as: 'meet_greets'}, {model: Event, as: 'event'}, 'date', 'ASC']
            ]
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

//CREATE/POST
events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully created new event',
            data: newEvent
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE
events.put('/:id', async (req, res) => {
    try{
        const updatedEvent = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvent} event(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE
events.delete('/:id', async (req, res) => {
    try{
        const deletedEvent = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvent} event(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = events