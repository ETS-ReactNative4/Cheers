const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');
var mysqlPool = require("../../mysqlPool");

// @route   GET api/recipes
// @desc    Get all recipes
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
    //   const posts = await Post.find().sort({ date: -1 }); // -1 is sort by most recent
      mysqlPool.getConnection(function(err, mclient) {
        let sql = `SELECT * FROM recipes`;
        mclient.query(sql, async (err, resp) => {
            if (err) {
                throw err;
            }
            res.json(resp);
        })
    });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
});

module.exports = router;
