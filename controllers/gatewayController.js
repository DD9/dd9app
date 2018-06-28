exports.filter = (req, res) => {
  if (req.user.admin > 4) {

  }
  res.render('index/sample', {user: req.user});
};