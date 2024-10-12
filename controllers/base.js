const baseController = {};

baseController.buildHome = () => {
  res.render('index', { title: 'Home' });
};

module.exports = baseController;
