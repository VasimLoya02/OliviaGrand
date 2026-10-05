const express = require('express');
const router = express.Router();
const { createTable, getTables, updateTableStatus } = require('../controllers/tableController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getTables);
router.post('/', protect, authorize('admin'), createTable);
router.patch('/:id/status', protect, authorize('admin', 'staff'), updateTableStatus);

module.exports = router;