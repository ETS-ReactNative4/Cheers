const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const config = require("config");
const { check, validationResult } = require("express-validator");
var mysqlPool = require("../../mysqlPool");
const moment = require("moment");

// @route   GET api/messages
// @desc    Get all messages
// @access  Private
router.get("/", async (req, res) => {
  try {
    mysqlPool.getConnection(function (err, mclient) {
      let sql = `SELECT * FROM messages ORDER BY time_posted DESC`;
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

// @route   POST api/messages
// @desc    Create announcement
// @access  Private

router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("content", "Content is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // If there is an error from express validator, return error code
    }

    let { title, content } = req.body;
    let user_name = req.user.id;
    try {
      mysqlPool.getConnection(function (err, mclient) {
        let newMessage = {
          title,
          content,
          user_name,
          time_posted: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        };
        let sql = `SELECT * FROM users WHERE user_name="${user_name}"`;
        mclient.query(sql, async (err, resp) => {
          if (err) {
            throw err;
          }
          if (resp.length === 0) {
            mclient.release();
            return res
              .status(400)
              .json({ errors: [{ msg: "User doesn't exist" }] });
          }
          if (resp[0].is_admin == 0) {
            mclient.release();
            return res
              .status(400)
              .json({ errors: [{ msg: "User is not an admin" }] });
          }
          // Create new message
          sql = `INSERT INTO messages SET ?`;
          mclient.query(sql, newMessage, (err, resp) => {
            if (err) {
              throw err;
            }
            mclient.release();
            res.json(resp);
          });
        });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
