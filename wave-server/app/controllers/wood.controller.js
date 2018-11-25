const { Wood } = require("../models/wood.model");
const statusCode = require("http-status-codes")
module.exports = {
  addWood: (req, res, next) => {
    try {
      const wood = new Wood(req.body);
      wood.save((err, doc) => {
        if (err)
          return res.status(statusCode.BAD_REQUEST).json({
            sucess: false,
            err
          });
        res.status(statusCode.OK).json({
          sucess: true,
          wood: doc
        });
      });
    } catch (error) {
      res.status(statusCode.BAD_REQUEST).json({
        sucess: false,
        error
      });
    }
  },
  getWoods: async (req, res, next) => {
    const woods = await Wood.find();
    res.send(woods);
  }
};
