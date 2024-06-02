
const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.route('/')
  .get(async (req, res, next) => {
    try {
      const posts = await Post.findAll();
      res.header("Access-Control-Allow-Origin", "*"); //CORS문제 해결
      res.json(posts[posts.length-1]);  //제일 마지막 행만 반환
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      console.log(req);
      const posts = await Post.create({
        location: req.body.location,
        isOpen: req.body.isOpen,
        brightness:req.body.brightness,
        checkDate:String(new Date()),
        temp:req.body.temp,
        humidity:req.body.humidity
    });
      res.status(200).json(posts);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
  

  

module.exports = router;
