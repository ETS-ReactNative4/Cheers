const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const config = require("config");
const { check, validationResult } = require("express-validator");
var mysqlPool = require("../../mysqlPool");
const mysql = require("mysql");
const moment = require("moment");

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    mysqlPool.getConnection(function (err, mclient) {
      let sql = `SELECT * FROM posts ORDER BY post_date ASC`;
      mclient.query(sql, async (err, resp) => {
        if (err) {
          throw err;
        }
        mclient.release();
        res.json(resp);
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/my
// @desc    Get my posts
// @access  Private
router.get("/my", auth, async (req, res) => {
  try {
    mysqlPool.getConnection(function (err, mclient) {
      let sql = `SELECT posts.post_id, posts.star_num, posts.post_date, posts.title, posts.user_name, 
      recipes.recipe_id, recipes.instructions, drink_category.category_name
      FROM posts,recipes,drink_category
      WHERE posts.post_id = recipes.post_id
      AND drink_category.id = recipes.category_id
      AND posts.user_name = "${req.user.id}"
      ORDER BY post_date ASC`;
      mclient.query(sql, async (err, resp) => {
        if (err) {
          throw err;
        }
        mclient.release();
        res.json(resp);
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/all
// @desc    Get all posts with recipe and ingredient data joined
// @access  Public
router.get("/all", async (req, res) => {
  try {
    mysqlPool.getConnection(function (err, mclient) {
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
        // Must release the connection as the pool only allows a total of 50 live connections.
        // mclient.release() frees one of the connections.
        mclient.release();
        res.json(resp);
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/:id
// @desc    Get my post with id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    mysqlPool.getConnection(function (err, mclient) {
      let sql = `SELECT posts.post_id, posts.star_num, posts.post_date, posts.title, posts.user_name, 
      recipes.recipe_id, recipes.instructions, drink_category.category_name, drink_category.id
      FROM posts,recipes,drink_category
      WHERE posts.post_id = recipes.post_id
      AND drink_category.id = recipes.category_id
      AND posts.post_id = "${req.params.id}"
      ORDER BY post_date ASC`;
      mclient.query(sql, async (err, resp) => {
        if (err) {
          throw err;
        }
        mclient.release();
        res.json(resp[0]);
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/posts
// @desc    Create a recipe post
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("instructions", "Instructions are required").not().isEmpty(),
      check("category", "Category is required").not().isEmpty(),
      check("user", "User is required").not().isEmpty(),
      check("star_num", "Rating is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }

    let {
      title,
      instructions,
      category,
      user,
      star_num,
      date,
      ingredients,
    } = req.body;

    try {
      let newPost = {
        star_num: star_num,
        post_date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        title,
        user_name: user,
      };

      const connection = mysql.createConnection(config.get("mysql"));
      connection.connect(function (err) {
        if (err) {
          console.error("error connecting: " + err.stack);
          return;
        }
      });

      /* Begin transaction */
      connection.beginTransaction(function (err) {
        if (err) {
          throw err;
        }
        console.log("Beginning of Transaction");
        // console.log(newPost)
        // `INSERT INTO posts(star_num, post_date, title, user_name) values (${star_num}, ${date}, ${title}, ${user})`,
        connection.query(
          `INSERT INTO posts SET ?`,
          newPost,
          async function (err, result) {
            if (err) {
              connection.rollback(function () {
                throw err;
              });
            }

            const log = result.insertId;
            // console.log(log);

            let newRecipe = {
              instructions,
              category_id: category,
              user_name: user,
              post_id: log,
            };
            // console.log(newRecipe)
            connection.query(
              "INSERT INTO recipes SET ?",
              newRecipe,
              async function (err, result) {
                if (err) {
                  connection.rollback(function () {
                    throw err;
                  });
                }
                let recipeId = result.insertId;
                console.log("recipeId", recipeId);
                console.log(ingredients);
                // insert ingredients one at a time; at each successful iteration, get insertId and add to list of uses{recipeId, ingredient_id} to query later
                // If not successful, get ingredient id using ingredient name and add to list of uses{recipeId, ingredient_id} to query later
                let uses = [];
                ingredients.forEach((ingredient, index) => {
                  // console.log([[ingredient]])
                  connection.query(
                    "INSERT INTO ingredients(ingredient_name) VALUES ?",
                    [[ingredient]],
                    function (err, result) {
                      if (err) {
                        if (err.code === "ER_DUP_ENTRY") {
                          // Duplicate entry
                          console.log(
                            "DUPLICATE ENTRY-finding existing ingredient id"
                          );
                          connection.query(
                            `SELECT ingredients.id from ingredients WHERE ingredients.ingredient_name = "${ingredient[0]}"`,
                            function (err, result) {
                              if (err) {
                                console.log("ERROR");
                                connection.rollback(function () {
                                  throw err;
                                });
                              }
                              uses.push([recipeId, result[0].id]);
                              console.log(uses);
                              // Insert into uses
                              connection.query(
                                "INSERT INTO uses SET ?",
                                {
                                  recipe_id: recipeId,
                                  ingredient_id: result[0].id,
                                },
                                function (err, result) {
                                  if (err) {
                                    connection.rollback(function () {
                                      throw err;
                                    });
                                  }
                                  console.log("successful insert into uses");
                                  if (index === ingredients.length - 1) {
                                    connection.commit(function (err) {
                                      if (err) {
                                        connection.rollback(function () {
                                          throw err;
                                        });
                                      }
                                      console.log(
                                        "Transaction Completed Successfully."
                                      );
                                      connection.end();
                                      res.json(result);
                                    });
                                  }
                                }
                              );
                            }
                          );
                        } else {
                          connection.rollback(function () {
                            throw err;
                          });
                        }
                      } else {
                        console.log("new ingredient - getting last insert id");
                        let lastInsertId = result.insertId;
                        uses.push([recipeId, lastInsertId]);
                        console.log(uses);
                        connection.query(
                          "INSERT INTO uses SET ?",
                          {
                            recipe_id: recipeId,
                            ingredient_id: lastInsertId,
                          },
                          function (err, result) {
                            if (err) {
                              connection.rollback(function () {
                                throw err;
                              });
                            }
                            console.log("successful insert into uses");
                            if (index === ingredients.length - 1) {
                              connection.commit(function (err) {
                                if (err) {
                                  connection.rollback(function () {
                                    throw err;
                                  });
                                }
                                console.log(
                                  "Transaction Completed Successfully."
                                );
                                connection.end();
                                res.json(result);
                              });
                            }
                          }
                        );
                      }
                    }
                  );
                });
              }
            );
          }
        );
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/posts/:id
// @desc    Edit post with id
// @access  Private
router.put(
  "/:id",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("instructions", "Instructions are required").not().isEmpty(),
      check("category", "Category is required").not().isEmpty(),
      check("star_num", "Rating is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }

    let {
      title,
      instructions,
      category,
      star_num,
      ingredients,
      post_id,
      recipe_id,
    } = req.body;

    try {
      let editedPost = {
        star_num,
        title,
      };

      const connection = mysql.createConnection(config.get("mysql"));
      connection.connect(function (err) {
        if (err) {
          console.error("error connecting: " + err.stack);
          return;
        }
      });

      /* Begin transaction */
      connection.beginTransaction(function (err) {
        if (err) {
          throw err;
        }
        console.log("Beginning of UPDATE Transaction");

        connection.query(
          `UPDATE posts SET ? WHERE post_id = ?`,
          [editedPost, req.params.id],
          async function (err, result) {
            if (err) {
              connection.rollback(function () {
                throw err;
              });
            }
            console.log("updated post OK");

            let editedRecipe = {
              instructions,
              category_id: category,
            };
            connection.query(
              `UPDATE recipes SET ? WHERE recipe_id = ?`,
              [editedRecipe, recipe_id],
              async function (err, result) {
                if (err) {
                  connection.rollback(function () {
                    throw err;
                  });
                }
                console.log("updated recipe  OK");

                // Delete all uses for this recipe and then re-insert
                connection.query(
                  `DELETE FROM uses WHERE recipe_id = "${recipe_id}"`,
                  async function (err, result) {
                    if (err) {
                      console.log(err);
                      connection.rollback(function () {
                        throw err;
                      });
                    }
                    console.log("deleted uses OK");
                    // insert ingredients one at a time; at each successful iteration, get insertId and add to list of uses{recipeId, ingredient_id} to query later
                    // If not successful, get ingredient id using ingredient name and add to list of uses{recipeId, ingredient_id} to query
                    let uses = [];
                    ingredients.forEach((ingredient, index) => {
                      // console.log([[ingredient]])
                      connection.query(
                        "INSERT INTO ingredients(ingredient_name) VALUES ?",
                        [[ingredient]],
                        function (err, result) {
                          if (err) {
                            if (err.code === "ER_DUP_ENTRY") {
                              // Duplicate entry
                              console.log(
                                "DUPLICATE ENTRY-finding existing ingredient id"
                              );
                              connection.query(
                                `SELECT ingredients.id from ingredients WHERE ingredients.ingredient_name = "${ingredient[0]}"`,
                                function (err, result) {
                                  if (err) {
                                    console.log("ERROR");
                                    connection.rollback(function () {
                                      throw err;
                                    });
                                  }
                                  uses.push([recipe_id, result[0].id]);
                                  console.log(uses);
                                  // Insert into uses
                                  connection.query(
                                    "INSERT INTO uses SET ?",
                                    {
                                      recipe_id: recipe_id,
                                      ingredient_id: result[0].id,
                                    },
                                    function (err, result) {
                                      if (err) {
                                        connection.rollback(function () {
                                          throw err;
                                        });
                                      }
                                      console.log(
                                        "successful insert into uses"
                                      );
                                      if (index === ingredients.length - 1) {
                                        connection.commit(function (err) {
                                          if (err) {
                                            connection.rollback(function () {
                                              throw err;
                                            });
                                          }
                                          console.log(
                                            "Transaction Completed Successfully."
                                          );
                                          connection.end();
                                          res.json(result);
                                        });
                                      }
                                    }
                                  );
                                }
                              );
                            } else {
                              connection.rollback(function () {
                                throw err;
                              });
                            }
                          } else {
                            console.log(
                              "new ingredient - getting last insert id"
                            );
                            let lastInsertId = result.insertId;
                            uses.push([recipe_id, lastInsertId]);
                            console.log(uses);
                            connection.query(
                              "INSERT INTO uses SET ?",
                              {
                                recipe_id: recipe_id,
                                ingredient_id: lastInsertId,
                              },
                              function (err, result) {
                                if (err) {
                                  connection.rollback(function () {
                                    throw err;
                                  });
                                }
                                console.log("successful insert into uses");
                                if (index === ingredients.length - 1) {
                                  connection.commit(function (err) {
                                    if (err) {
                                      connection.rollback(function () {
                                        throw err;
                                      });
                                    }
                                    console.log(
                                      "Transaction Completed Successfully."
                                    );
                                    connection.end();
                                    res.json(result);
                                  });
                                }
                              }
                            );
                          }
                        }
                      );
                    });
                  }
                );
              }
            );
          }
        );
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post with id
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // Get user from auth middleware which returned the user's user_name and make sure they are admin or post creator
    mysqlPool.getConnection(function (err, mclient) {
      let sql = `SELECT users.user_name, users.is_admin, posts.post_id, posts.user_name, recipes.recipe_id
      FROM users,posts, recipes
      WHERE users.user_name="${req.user.id}"
      AND posts.post_id=${req.params.id}
      AND recipes.post_id="${req.params.id}"`;
      mclient.query(sql, async (err, resp) => {
        if (err) {
          throw err;
        }
        if (resp.length === 0) {
          mclient.release();
          return res
            .status(400)
            .json({ errors: [{ msg: "User/Post combination doesn't exist" }] });
        }
        let recipeId = resp[0].recipe_id;

        // Delete uses with recipe id
        sql = `DELETE FROM uses
        WHERE uses.recipe_id = "${recipeId}"`;
        mclient.query(sql, async (err, resp) => {
          if (err) {
            throw err;
          }
          // Delete recipe with recipe id
          sql = `DELETE FROM recipes
        WHERE recipes.recipe_id = "${recipeId}"`;
          mclient.query(sql, async (err, resp) => {
            if (err) {
              throw err;
            }
            // Delete post with post id
            sql = `DELETE FROM posts
        WHERE posts.post_id = "${req.params.id}"`;
            mclient.query(sql, async (err, resp) => {
              if (err) {
                throw err;
              }
              mclient.release();
              return res.json(resp);
            });
          });
        });
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
