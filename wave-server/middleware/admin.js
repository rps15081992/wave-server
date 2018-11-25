const statusCode = require("http-status-codes");

let admin = (req, res, next) => {
  if (req.user.role === 0) {
    return res.status(statusCode.BAD_REQUEST).send("Sorry! You don't have permission to add.");
  }
  next();
};

module.exports = { admin };
