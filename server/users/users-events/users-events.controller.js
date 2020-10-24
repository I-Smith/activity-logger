const express = require('express');
const router = express.Router({ mergeParams: true });
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const userLogEventService = require('./users-event.service');

// routes (/users/:userId/log-events/...)
router.get('/', authorize(), getAll);
router.get('/:eventId', authorize(), getById);
router.post('/', authorize(), createSchema, create);
router.put('/:eventId', authorize(), updateSchema, update);
router.delete('/:eventId', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
	// users can update their own user and admins can update any user
	if (req.params.userId !== req.user.id && req.user.role !== Role.Admin) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
		
    userLogEventService.getAll(req.params.userId)
        .then(logEvents => res.json(logEvents))
        .catch(next);
}

function getById(req, res, next) {
	// users can update their own user and admins can update any user
	if (req.params.userId !== req.user.id && req.user.role !== Role.Admin) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

    userLogEventService.getById(req.params.userId, req.params.eventId)
        .then(logEvent => logEvent ? res.json(logEvent) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        date: Joi.date().required(),
        isWorkout: Joi.boolean(),
        challenge: Joi.string(),
        activity: Joi.object({
			duration: Joi.object({
				hours: Joi.string(),
				minutes: Joi.string(),
				seconds: Joi.string(),
			}),
			distance: Joi.number(),
			couponWeight: Joi.number(),
			ruckWeight: Joi.number(),
			notes: Joi.string(),
		}),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
	// users can update their own user and admins can update any user
	if (req.params.userId !== req.user.id && req.user.role !== Role.Admin) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

    userLogEventService.create(req.params.userId, req.body)
        .then(logEvent => res.json(logEvent))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        date: Joi.date(),
        isWorkout: Joi.boolean(),
        challenge: Joi.string(),
        activity: Joi.object({
			duration: Joi.object({
				hours: Joi.string(),
				minutes: Joi.string(),
				seconds: Joi.string(),
			}),
			distance: Joi.number(),
			couponWeight: Joi.number(),
			ruckWeight: Joi.number(),
			notes: Joi.string(),
		}),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
	// users can update their own user and admins can update any user
	if (req.params.userId !== req.user.id && req.user.role !== Role.Admin) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

    userLogEventService.update(req.params.userId, req.params.eventId, req.body)
        .then(logEvent => res.json(logEvent))
        .catch(next);
}

function _delete(req, res, next) {
	// users can update their own user and admins can update any user
	if (req.params.userId !== req.user.id && req.user.role !== Role.Admin) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

    userLogEventService.delete(req.params.userId, req.params.eventId)
        .then(() => res.json({ message: 'Log event deleted successfully' }))
        .catch(next);
}