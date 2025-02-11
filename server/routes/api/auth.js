const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
var mysqlPool = require("../../mysqlPool");


// @route   GET api/auth
// @desc    Test route
// @access  Public (aka you don't need a token to access this route)
router.get('/', auth, async (req, res) => {
    // Getting user's data after receiving web token
    // Put in try catch because we are getting from database (async/await)
    try {
        // const user = await User.findById(req.user.id).select('-password');  // Find user by id without password
        mysqlPool.getConnection(function(err, mclient) {
            let sql = `SELECT * FROM users WHERE user_name="${req.user.id}"`;
            mclient.query(sql, async (err, resp) => {
                mclient.release();
                if (err) {
                    throw err;
                }
                res.json(resp);
            })
        });
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});
// ^ by audding the auth middleware function as second parameter,
// will make this route protected

// @route   POST api/auth
// @desc    Authenticate user & get token (Login)
// @access  Public

router.post('/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required')
            .exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }) // If there is an error from express validator, return error code
        }

        const { email, password } = req.body

        try {
            // See if user doesn't exist
            mysqlPool.getConnection(function(err, mclient) {
                let sql = `SELECT * FROM users WHERE email="${email}"`;
                mclient.query(sql, async (err, resp) => {
                    mclient.release();
                    if (err) {
                        throw err;
                    }
                    if (resp.length === 0) {
                        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });  // When there is no user with that email/password combination
                    }
                    if (resp.length > 1) {
                        return res.status(400).json({ errors: [{ msg: 'CHECK: 2 USERS WITH THIS EMAIL' }] });
                    }
                    let user = resp[0];
                    // takes a plain text password and an encrypted password and tells if they match
                    const isMatch = await bcrypt.compare(password, user.password);

                    if (!isMatch) {
                        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] }); 
                    }

                    // Jsonwebtoken stuff
                    const payload = {
                        user: {
                            id: user.user_name
                        }
                    }
                    // Sign the token
                    jwt.sign(
                        payload, 
                        config.get('jwtSecret'),
                        { expiresIn: 360000 }, 
                        (err, token) => {
                            if (err) throw err;
                            res.json({ token });
                        });
                })
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    });

module.exports = router;
