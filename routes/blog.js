const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const Vlog = require('../models/blog');
const Comment = require('../models/comment');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const uploadPath = path.resolve('./public/uploads');
        cb(null, uploadPath);
        // cb(null, path.resolve(`./public/uploads/${req.user._id}`));
    },
    filename: function(req, file, cb){
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

router.get('/add-new',(req,res)=>{
    return res.render("addBlog", {
        user: req.user,
    });
});

router.post("/",upload.single('coverImage'), async (req,res)=>{
    try{
    const { title, body } = req.body;
    const blog = await Vlog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`
    });
    return res.redirect(`/blog/${blog._id}`);
}
catch(error){
    console.log(error);
    res.status(500).send("Interval Server Error");
}
});

router.get('/:id', async(req,res)=>{
    const blog = await Vlog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
    return res.render('blog', {
        blog,
        comments,
        user: req.user,
    });
});

router.post('/comment/:blogId',async (req,res)=>{
    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;