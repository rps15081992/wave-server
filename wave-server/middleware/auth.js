const { User } = require("../app/models/user.model");
let Auth = (req, res, next) => {
  let token = req.cookies.w_auth;
  User.findByIdToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: false
      });
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { Auth };
