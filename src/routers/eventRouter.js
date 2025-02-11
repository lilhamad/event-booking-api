const express = require('express');
const EventsController = require('../controllers/EventsController');
//const authController = require('../controllers/authController');
//const protect = require('../middlewares/protect');

const router = express.Router();

//router.use(protect); //  protect all router which are comming after this middleware

//router.patch('/updatePassword', authController.updatePassword);

router.route('/').get(EventsController.getAllUsers)
router.route('/initialize').post(EventsController.createEvent);
router.route('/book').post(EventsController.createEvent);
router.route('/cancel').post(EventsController.createEvent);

router.route('/status/:id').get(EventsController.getUser).patch(EventsController.updateUser).delete(EventsController.deleteUser);

module.exports = router;
