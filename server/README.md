To run the server:

Ensure you have all dependencies by running `npm install` while in the `server/` directory

Then, go to server/config/default.json and in the "mysql" object, insert the hostname, user, and password in order for the server to have the credentials
to connect to your local mysql instance of cheers_db.

Finally, run `npm run dev`. The server should start up and print "Listening on port 5000" as well as "SQL Connected!". It should also print
a test SQL statement found in server.js on line 7, which is `SELECT user_name FROM users`.

If trouble with permissions:

ALTER USER 'root'@'localhost' IDENTIFIED BY 'your new password'; 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your new password';