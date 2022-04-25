const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');
var mysqlPool = require("../../mysqlPool");

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
    //   const posts = await Post.find().sort({ date: -1 }); // -1 is sort by most recent
      mysqlPool.getConnection(function(err, mclient) {
        let sql = `SELECT * FROM posts ORDER BY post_date ASC`;
        mclient.query(sql, async (err, resp) => {
            if (err) {
                throw err;
            }
            mclient.release();
            res.json(resp);
        })
    });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
});

// @route   GET api/posts/all
// @desc    Get all posts with recipe and ingredient data joined
// @access  Private
router.get("/all", auth, async (req, res) => {
  try {
  //   const posts = await Post.find().sort({ date: -1 }); // -1 is sort by most recent
    mysqlPool.getConnection(function(err, mclient) {
      let sql = `SELECT posts.post_id, posts.star_num, posts.post_date, posts.title, posts.user_name, 
      recipes.recipe_id, recipes.instructions, drink_category.category_name
      FROM posts,recipes,drink_category
      WHERE posts.post_id = recipes.post_id
      AND drink_category.id = recipes.category_id
      ORDER BY post_date ASC`;
      mclient.query(sql, async (err, resp) => {
          if (err) {
              throw err;
          }
          // Must release the connection as the pool only allows a total of 10 live connections.
          // mclient.release() frees one of the 10 connections.
          mclient.release();
          res.json(resp);
      })
  });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

