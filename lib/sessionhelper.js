'use static';

exports.adminCheck = (req, res, next) => {
  if (req.session.user_id && req.session.isadmin) {
    next();
  } else {
    res.redirect('/api/v1/login');
  }
}

exports.loginCheck = (req, res, next) => {
  if (req.session.user_id) {
    next();
  } else {
    res.redirect('/api/v1/login');
  }
}
