const { Product } = require("../models/product.model");
const mongoose = require("mongoose");
module.exports = {
  addArticle: (req, res, next) => {
    const product = new Product(req.body);
    product.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        article: doc
      });
    });
  },
  getBrands: async (req, res, next) => {
    const brands = await Brand.find();
    res.send(brands);
  },

  getArticlesByIds: (req, res, next) => {
    let type = req.query.type;
    let items = req.query.id;
    if (type === "array") {
      let ids = req.query.id.split(",");
      items = [];
      items = ids.map(item => {
        return mongoose.Types.ObjectId(item);
      });
    }
    Product.find({ _id: { $in: items } })
      .populate("wood")
      .populate("brand")
      .exec((err, doc) => {
        return res.status(200).send(doc);
      });
  },

  articles: (req, res, next) => {
    let order = req.query.order ? req.query.order : "asc";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    let sortby = req.query.sortby ? req.query.sortby : "_id";
    Product.find()
      .populate("wood")
      .populate("brand")
      .sort([[sortby, order]])
      .limit(limit)
      .exec((err, articls) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(articls);
      });
  }
};
