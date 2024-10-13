const baseController = {};

baseController.buildHome = (req, res) => {
  res.render('index', { title: 'Home' });
};

module.exports = baseController;
