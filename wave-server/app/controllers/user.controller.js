const { User } = require("../models/user.model");

module.exports = {
  register: async (req, res, next) => {
    try {
      const user = new User(req.body);
      user.save((err, doc) => {
        if (err) return res.status(400).json({ sucess: false, err });
        res.status(201).json({
          userData: doc,
          sucess: true,
          message: `sucessfully fetched records`
        });
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  login: async (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        return res.json({
          loginSucess: false,
          message: "user email doesn't found"
        });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.status(400).json({
            loginSucess: false,
            message: "wrong password"
          });
        }
        user.generateToken((err, user) => {
          if (err) {
            return res.status(400).send(err);
          }
          res
            .cookie("w_auth", user.token)
            .status(200)
            .json({ loginSucess: true });
        });
      });
    });
  },

  auth: (req, res, next) => {
    res.status(200).json({
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      cart: req.user.cart,
      history: req.user.history
    });
  },

  logout: (req, res, next) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
      if (err) return res.json({ sucess: false, err });
      res.status(200).send({
        sucess: true
      });
    });
  }
};
