const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/', (req, res) => {
  res.send('main page - doc database');
});

router.use('/doctors', require('./doctors'));
router.use('/auth', require('./auths'));

module.exports = router;
