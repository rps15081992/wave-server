const { User } = require("../models/user.model");

module.exports = {
  register: async (req, res, next) => {
    try {
      const user = new User(req.body);
      user.save((err, doc) => {
        if (err) return res.status(400).json({ sucess: false, err });
        res
          .status(201)
          .json({
            userData: doc,
            sucess: true,
            message: `sucessfully fetched records`
          });
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
};
