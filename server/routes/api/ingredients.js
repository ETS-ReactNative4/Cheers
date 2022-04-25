const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');
var mysqlPool = require("../../mysqlPool");

// @route   GET api/ingredients
// @desc    Get all ingredients
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
    //   const posts = await Post.find().sort({ date: -1 }); // -1 is sort by most recent
      mysqlPool.getConnection(function(err, mclient) {
        let sql = `SELECT * FROM ingredients`;
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

// @route   GET api/ingredients/:id
// @desc    Get all ingredients used in a recipe
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    // console.log(req.params.id)
    mysqlPool.getConnection(function(err, mclient) {
      let sql = `SELECT ingredients.ingredient_name, uses.recipe_id
      FROM ingredients,uses
      WHERE ingredients.id = uses.ingredient_id
      AND uses.recipe_id = ${req.params.id}`;
      mclient.query(sql, async (err, resp) => {
          if (err) {
              throw err;
          }
          let ingredients = resp.map(ingredient => ingredient.ingredient_name)
          mclient.release();
          res.json(ingredients);
      })
  });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
