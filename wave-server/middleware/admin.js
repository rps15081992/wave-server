let admin = (req, res, next) => {
  if (req.user.role === 0) {
    return res.status(400).send("Sorry! You don't have permission to add.");
  }
  next();
};

module.exports = { admin };
