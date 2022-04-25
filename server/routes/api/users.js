const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
var mysqlPool = require("../../mysqlPool");

// @route   POST api/users
// @desc    Register user
// @access  Public (aka you don't need a token to access this route)

router.post(
  "/",
  [
    check("user_name", "username is required").not().isEmpty(),
    check("first_name", "first_name is required").not().isEmpty(),
    check("last_name", "last_name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({
      min: 6,
    }),
    check("is_admin", "is_admin is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // If there is an error from express validator, return error code
    }

    let {
      user_name,
      first_name,
      last_name,
      email,
      password,
      is_admin,
    } = req.body;

    try {
      // See if user exists
      mysqlPool.getConnection(function (err, mclient) {
        let sql = `SELECT * FROM users WHERE email="${email}" OR user_name="${user_name}"`;
        mclient.query(sql, async (err, resp) => {
          if (err) {
            throw err;
          }
          if (resp.length > 0) {
            return res
              .status(400)
              .json({ errors: [{ msg: "User already exists" }] });
          }

          // Encrypt password
          const salt = await bcrypt.genSalt(10);

          password = await bcrypt.hash(password, salt); // Creates a hash for the user's password

          // await user.save();  // Anything that uses a Promise, put await before it
          mysqlPool.getConnection(function (err, mclient) {
            let newUser = {
              user_name,
              first_name,
              last_name,
              email,
              password,
              is_admin,
            };
            let sql = `INSERT INTO users SET ?`;
            mclient.query(sql, newUser, (err, resp) => {
              if (err) {
                throw err;
              }
            });
          });

          // Jsonwebtoken stuff
          const payload = {
            user: {
              id: user_name,
            },
          };
          // Sign the token
          jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   PUT api/users
// @desc    Change user password
// @access  Private
router.put(
  "/",
  [
    auth,
    [
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({
        min: 6,
      }),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // If there is an error from express validator, return error code
      }
      // Get user from auth middleware which returned the user's user_name
      mysqlPool.getConnection(function (err, mclient) {
        let sql = `SELECT * FROM users WHERE user_name="${req.user.id}"`;
        mclient.query(sql, async (err, resp) => {
          if (err) {
            throw err;
          }
          if (resp.length === 0) {
            return res
              .status(400)
              .json({ errors: [{ msg: "User doesn't exist" }] });
          }
          // Encrypt password
          let { password } = req.body;
          const salt = await bcrypt.genSalt(10);
          password = await bcrypt.hash(password, salt); // Creates a hash for the user's password

          sql = `UPDATE users SET password = "${password}" WHERE user_name = "${req.user.id}"`;
          mclient.query(sql, async (err, resp) => {
            if (err) {
              throw err;
            }
            mclient.release();
            return res.json(resp)
          });
        });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
