module.exports.loginRequire= function(req,res,next){
    if(!req.cookies.userId){
        res.redirect('/auth/login')
        return
    }
    next()
}