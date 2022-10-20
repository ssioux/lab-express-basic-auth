const isLoggedIn = (req, res, next) => {
    if(req.session.userOnline === undefined){

        res.redirect("/auth/login")     // redireccion cuando no hay session
    }
    next()  
}


module.exports = {
    isLoggedIn
}