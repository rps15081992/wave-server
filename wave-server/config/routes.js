const home = require("../app/controllers/home");
const brand = require("../app/controllers/brand.controller");
const User = require("../app/controllers/user.controller");
const { Auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");
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
  app.get("/api/product/brands", Auth, brand.getBrands);
  app.post("/api/product/brand", Auth, admin, brand.addBrand);
  app.post("/api/register", User.register);
  app.post("/api/login", User.login);
  app.get("/api/auth", Auth, User.auth);
  app.get("/api/logout", Auth, User.logout);
};
