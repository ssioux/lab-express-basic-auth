const router = require("express").Router()
const User = require("../models/User.model.js")
const {isLoggedIn} = require("../middlewares/auth.js")



// GET "/profile"
router.get("/", isLoggedIn, async (req, res, next)=> {
    console.log("RES, ENTRANDO DESDE SESSION", req.session.userOnline)
    // const {userOnline} = req.session.userOnline
    try {

        const userOnId = await User.findById(req.session.userOnline._id)
        res.render("profile/my-profile.hbs", {
            userOnDetails: userOnId,
        })
    } catch (error) {
        next(error)
    }
    
    





    
})










module.exports = router