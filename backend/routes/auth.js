const auth = require('express').Router();

const passport = require('passport')

auth.get("/login/success",(req,res)=>{
    if(req.user){
        res.status(200).json({
            error:false,
            message: "Successfully Loged In",
            user: req.user
        })
    }else{
        res.status(401).json({error: true,message:"Not Authorised"})
    }
});
auth.get("/login/failed",(req,res)=>{
    res.status(401).json({
        error:true,
        message:"Log in failed"
    })
});
auth.get("/google",passport.authenticate("google",["profile","email"]));

auth.get("/google/callback",passport.authenticate("google",{
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed"
}));

auth.get("/logout",(req,res)=>{
    req.logout();
    res.redirect(process.env.CLIENT_URL)
})

module.exports = auth