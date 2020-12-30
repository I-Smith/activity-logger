const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const challengeService = require('./challenge.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:challengeId', authorize(), getById);
router.post('/', authorize(Role.Admin), createSchema, create);
router.put('/:challengeId', authorize(Role.Admin), updateSchema, update);
router.delete('/:challengeId', authorize(Role.Admin), _delete);

module.exports = router;

function getAll(req, res, next) {
    challengeService.getAll()
        .then(challenges => res.json(challenges))
        .catch(next);
}

function getById(req, res, next) {
    challengeService.getById(req.params.challengeId)
        .then(challenge => challenge ? res.json(challenge) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
		name: Joi.string().required(),
		startDate: Joi.date().required(),
		endDate: Joi.date().required(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    challengeService.create(req.body)
        .then(challenge => res.json(challenge))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
		name: Joi.string(),
		startDate: Joi.date(),
		endDate: Joi.date(),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    // Restricted to admins
    if (req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    challengeService.update(req.params.challengeId, req.body)
        .then(challenge => res.json(challenge))
        .catch(next);
}

function _delete(req, res, next) {
    // Restricted to admins
    if (req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    challengeService.delete(req.params.challengeId)
        .then(() => res.json({ message: 'Log event deleted successfully' }))
        .catch(next);
}