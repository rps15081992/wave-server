const home = require("../app/controllers/home");
const product = require("../app/controllers/product.controller");
const User = require("../app/controllers/user.controller");
//you can include all your controllers

module.exports = function(app, passport) {
  app.get("/login", home.login);
  app.get("/signup", home.signup);

  app.get("/", home.loggedIn, home.home); //home
  app.get("/home", home.loggedIn, home.home); //home

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/home", // redirect to the secure profile section
      failureRedirect: "/signup", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );
  // process the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/home", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );
};

module.exports = function(app) {
  app.get("/api/products", product.getProducts);
  app.post("/api/product", product.addProduct);
  app.post("/api/register", User.register);
};
