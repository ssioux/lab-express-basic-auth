const router = require("express").Router();
const { findById } = require("../models/User.model.js");
const User = require("../models/User.model.js");

// GET "/auth/signup" => Renderiza Formulario con registro de usuario
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

// POST "/auth/signup" => Crear nuevo usuario (Recoge data del body y crea usuario en BD)
router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);

  await User.create({
    username: username,
    password: password,
  });

  res.redirect("/auth/login");
});

// GET "/auth/login" => Renderiza Formulario para acceso perfil.
router.get("/login", (req,res,next) => {

    res.render("auth/login.hbs")
})

// POST "/auth/login" => Acceso Perfil(Recoge info de hbs yaccede al perfil)
router.post("/login", async(req, res, next)=>{
    const {username, password} = req.body
    console.log(req.body)
    // await User.findById()
    res.redirect("/")

})

module.exports = router;
