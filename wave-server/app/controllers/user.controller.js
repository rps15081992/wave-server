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
        user.generateToken((err, token) => {});
      });
    });
  }
};
