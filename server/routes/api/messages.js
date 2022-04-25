const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const config = require("config");
const { check, validationResult } = require("express-validator");
var mysqlPool = require("../../mysqlPool");

// @route   GET api/messages
// @desc    Get all messages
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    mysqlPool.getConnection(function (err, mclient) {
      let sql = `SELECT * FROM messages`;
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

module.exports = router;
