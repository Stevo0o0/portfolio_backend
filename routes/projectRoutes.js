const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/projectController');

router.get('/', ctrl.getAll);
router.post('/', ctrl.create);
// ... add remaining routes per assignment table
module.exports = router;
