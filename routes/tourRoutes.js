const express = require('express');

const router = express.Router();
const tourController = require(`${__dirname}/../controllers/tourController`);

// router.param('id', tourController.checkID);

router.route('/top-5-tours').get(tourController.alias, tourController.getAllTours);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;