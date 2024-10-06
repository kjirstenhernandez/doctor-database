const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const errorHandler = require('../utilities/index');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/', (req, res) => {
  res.send('main page - doc database');
});

router.use('/doctors', require('./doctors'));

module.exports = router;
