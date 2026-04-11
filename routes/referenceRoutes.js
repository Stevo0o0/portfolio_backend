const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/referenceController');
const auth = require('../middleware/authMiddleware');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getByID);
router.post('/', ctrl.create);
router.post('/', auth, ctrl.create);
router.put('/:id', ctrl.update);
router.put('/:id', auth, ctrl.update);
router.delete('/:id', ctrl.delete);
router.delete('/:id', auth, ctrl.delete);

module.exports = router;
