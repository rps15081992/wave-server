const { Brand } = require("../models/brand.model");

module.exports = {
  addBrand: (req, res, next) => {
    try {
      const brand = new Brand(req.body);
      brand.save((err, doc) => {
        if (err)
          return res.status(400).json({
            sucess: false,
            err
          });
        res.status(200).json({
          sucess: true,
          brand: doc
        });
      });
    } catch (error) {
      res.status(400).json({
        sucess: false,
        error
      });
    }
  },
  getBrands: async (req, res, next) => {
    const brands = await Brand.find();
    res.send(brands);
  }
};
