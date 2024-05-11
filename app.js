const express = require('express');
require('dotenv').config();
const path = require('path');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Blog = require('./models/blog');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

mongoose.connect("mongodb+srv://saket1333be22:7amadmin@saketcluster.re397ba.mongodb.net/blog?retryWrites=true&w=majority&appName=saketCluster").then(()=>{
    console.log("mongodb connected");
}).catch(()=>{
    console.log('mongodb not connected');
});

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(path.resolve('./public')
));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.set('view engine','ejs');
app.set("views",path.resolve("./views")); //So in layman's terms, this line is telling the server: "Hey, when you need to render a view, look in the views folder that's in the same place as this file."

app.get('/',async (req,res)=>{
    const allBlogs = await Blog.find({});
    res.render('home',{
        user: req.user,
        blogs: allBlogs,
    });
});

app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }
    else{
    console.log(`Server started at http://localhost:${PORT}`);
    }
})