const express = require('express');
const bodyParser = require('body-parser');

// Connect database
// var mysqlPool = require("./mysqlPool");
// mysqlPool.getConnection(function(err, mclient) {
//     if (err) {
//       throw err;
//     }
//     let sql = "SELECT user_name FROM users";
//     mclient.query(sql, (err, resp) => {
//         if (err) {
//             throw err;
//         }
//         console.log(resp);
//     })
// });


const app = express();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hi there');
});

// Define Routes
app.use('/api/users', require('./routes/api/users'));   // makes /api/users pertain to '/' in users.js
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/drink_categories', require('./routes/api/drink_categories'));
app.use('/api/recipes', require('./routes/api/recipes'));
app.use('/api/messages', require('./routes/api/messages'));
app.use('/api/ingredients', require('./routes/api/ingredients'));
app.use('/api/uses', require('./routes/api/uses'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});

// mysql://ba1eb85c79ea5f:f85ccbfe@us-cdbr-east-05.cleardb.net/heroku_8cc1c05f95fd889?reconnect=true