exports.redirectToLogin = (req, res) => {
  res.redirect('/')
};

exports.filter = (req, res) => {
  if (req.user.admin > 4) {

  }
  res.render('index/layout');
};