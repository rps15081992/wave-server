const Product = require("../models/product.model");
module.exports = {
  addProduct: (req, res, next) => {
    let body = new Product({
      name: req.body.name
    });
    body.save();
    res.send(body);
  },
  getProducts: async (req, res, next) => {
    const products = await Product.find();
    res.send(products);
  }
};
