const express = require('express');
const EventsController = require('../controllers/EventsController');
const protect = require('../middlewares/protect');

const router = express.Router();
router.use(protect);
router.route('/initialize').post(EventsController.createEvent);
router.route('/book').post(EventsController.bookEvent);
router.route('/cancel').post(EventsController.cancelEvent);

//router.route('/status/:id').get(EventsController.getUser);

module.exports = router;
