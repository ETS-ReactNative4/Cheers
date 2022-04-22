const express = require('express');
const bodyParser = require('body-parser');

// Connect database
var mysqlPool = require("./mysqlPool");
mysqlPool.getConnection(function(err, mclient) {
    let sql = "SELECT user_name FROM users";
    mclient.query(sql, (err, resp) => {
        if (err) {
            throw err;
        }
        console.log(resp);
    })
});


const app = express();

// Init Middleware
app.use(express.json( { extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hi there');
});

// Define Routes
app.use('/api/users', require('./routes/api/users'));   // makes /api/users pertain to '/' in users.js
app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/research', require('./routes/api/researchPosts'));
// app.use('/api/publication', require('./routes/api/publicationPosts'));
// app.use('/api/about', require('./routes/api/aboutPosts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
