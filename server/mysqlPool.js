const config = require('config');
// Connect database
var mysql = require('mysql');
var pool = mysql.createPool(config.get("mysql"))

exports.getConnection = function(callback) {
    pool.getConnection(function(err, conn) {
      if(err) {
        return callback(err);
      }
      callback(err, conn);
    });
};
