const router = require("express").Router();

// GET "/auth/signup" => Formulario con registro de usuario
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

module.exports = router;
