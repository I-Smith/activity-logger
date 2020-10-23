const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const logEventService = require('./logEvent.service');

// routes
router.get('/', authorize(Role.Admin), getAll);
router.get('/:eventId', authorize(Role.Admin), getById);
router.post('/', authorize(Role.Admin), createSchema, create);
router.put('/:eventId', authorize(Role.Admin), updateSchema, update);
router.delete('/:eventId', authorize(Role.Admin), _delete);

module.exports = router;

function getAll(req, res, next) {
    logEventService.getAll()
        .then(logEvents => res.json(logEvents))
        .catch(next);
}

function getById(req, res, next) {
    // Restricted to admins
    if (req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    logEventService.getById(req.params.eventId)
        .then(logEvent => logEvent ? res.json(logEvent) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        accountId: Joi.string().required(),
        date: Joi.date().required(),
        isWorkout: Joi.boolean(),
        challenge: Joi.string(),
        activity: Joi.object({
			duration: Joi.object({
				hours: Joi.string(),
				minutes: Joi.string(),
				seconds: Joi.string(),
			}),
		}),
        distance: Joi.number(),
        couponWeight: Joi.number(),
		ruckWeight: Joi.number(),
		notes: Joi.string(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    logEventService.create(req.body)
        .then(logEvent => res.json(logEvent))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schemaRules = {
		accountId: Joi.string(),
        date: Joi.date(),
        isWorkout: Joi.boolean(),
        challenge: Joi.string(),
        activity: Joi.object({
			duration: Joi.object({
				hours: Joi.string(),
				minutes: Joi.string(),
				seconds: Joi.string(),
			}),
		}),
        distance: Joi.number(),
        couponWeight: Joi.number(),
		ruckWeight: Joi.number(),
		notes: Joi.string(),
    };
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    // Restricted to admins
    if (eq.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    logEventService.update(req.params.eventId, req.body)
        .then(logEvent => res.json(logEvent))
        .catch(next);
}

function _delete(req, res, next) {
    // Restricted to admins
    if (req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    logEventService.delete(req.params.eventId)
        .then(() => res.json({ message: 'Log event deleted successfully' }))
        .catch(next);
}