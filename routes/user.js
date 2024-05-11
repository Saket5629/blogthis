const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/signin',(req,res)=>{
    res.render('signin');
});

router.get('/signup',(req,res)=>{
    res.render('signup');
});

router.post('/signin',async (req,res)=>{
    const { email, password } = req.body; // we have to use a virtual function for matching this password with db password, in model user.js
    try{
        const token = await User.matchPasswordAndGenerateToken(email,password);

    return res.cookie('token', token).redirect('/');
    } catch (error) {
        res.render('signin', {error: "Incorrect Email or Password",})
    }
});

router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect('/');
});

router.post('/signup', async (req,res)=>{
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    res.redirect('/');
});

module.exports = router;