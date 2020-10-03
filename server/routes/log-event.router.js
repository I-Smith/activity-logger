const express = require('express');
const logEventController = require('../controllers/log-event.controller');

const router = express.Router();

router.post('/log-event', logEventController.createLogEvent);
router.put('/log-event/:id', logEventController.updateLogEvent);
router.delete('/log-event/:id', logEventController.deleteLogEvent);
router.get('/log-event/:id', logEventController.getLogEventById);
router.get('/log-events', logEventController.getLogEvents);

module.exports = router;