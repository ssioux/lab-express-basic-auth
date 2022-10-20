const router = require("express").Router();
const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");

// GET "/auth/signup" => Renderiza Formulario con registro de usuario
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

// POST "/auth/signup" => Crear nuevo usuario (Recoge data del body y crea usuario en BD)
router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username);

  try {
    const userLogged = await User.findOne({ username: username });
    console.log(userLogged);

    if (userLogged !== null) {
      res.render("auth/signup.hbs", {
        messageError: "This User is used, choose another",
      });

      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    // const hashPass = bcrypt.hash(password, 12); // segundo argumento el salt

    await User.create({
      username: username,
      password: hashPass,
    });

    res.redirect("/auth/login");
  } catch (error) {
    next(error);
  }
});

// GET "/auth/login" => Renderiza Formulario para acceso perfil.
router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});

// POST "/auth/login" => Acceso Perfil(Recoge info de hbs yaccede al perfil)
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    // 1. User Exist
    const userLogged = await User.findOne({ username: username });
    if (userLogged === null) {
      res.render("auth/login.hbs", {
        messageError: "Wrong Credentials",
      });

      return;
    }
    // 2. Password Compare
    const isPasswordValid = await bcrypt.compare(password, userLogged.password);
    if (isPasswordValid === false) {
      res.render("auth/login.hbs", {
        messageError: "Wrong Credentials",
      });
      return;
    }

    req.session.userOnline = userLogged; // importante para conectar el usuario logeado con el flujo de sesiones de perfil
    res.redirect("/");
    req.session.save(() => {
      res.redirect("/profile"); // se guarda la sesion y se redirecciona
    });
  } catch (error) {
    next(error);
  }
});

// * GET "/auth/logout" => Cerrar Sesion
router.get("/logout", (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
module.exports = router;
