const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const expressLayouts = require('express-ejs-layouts');
const utilities = require('../utilities');
const baseController = require('../controllers/base');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/', baseController.buildHome);

router.use('/doctors', require('./doctors'));
router.use('/auth', require('./auths'));
router.use('/profile', require('./profiles'));
router.use('/error', require('./errors'));

module.exports = router;
