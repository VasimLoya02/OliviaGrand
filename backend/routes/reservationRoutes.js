const express = require('express');
const router = express.Router();
const {
  checkAvailability, createReservation, getReservations, updateReservationStatus,
} = require('../controllers/reservationController');
const { protect, authorize } = require('../middleware/auth');

router.get('/availability', checkAvailability);
router.use(protect);

router.post('/', createReservation);
router.get('/', getReservations);
router.patch('/:id/status', authorize('admin', 'staff'), updateReservationStatus);

module.exports = router;