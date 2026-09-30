const router = require('express').Router();
const controller = require('../controllers/itemController');
const { validateFull, validateItemial } = require('../middlewares/validateItem');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validateFull, controller.create);
router.put('/:id', validateFull, controller.update);
router.patch('/:id', validateItemial, controller.patch);
router.delete('/:id', controller.remove);

module.exports = router;
