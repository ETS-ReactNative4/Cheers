# How to start the Cheers Application
To start the Cheers Application, you will have to start 2 separate npm projects - one for the React front end and one for the Node back end that connects to the local MYSQL Database.

First, make sure you import the SQL file that was submitted with the project files into your local MYSQL server - as a result, you should have the entire cheers_db schema with sample data - a database in your MYSQL Server named `cheers_db` with tables `drink_category, ingredients, messages, posts, recipes, users, uses`. Also, ensure your local MYSQL Server is running.

### Running the user interface:
In the same directory as this README file, run the following commands:
1. `npm install`
2. `npm start`


### Running the server:
In a separate terminal from the one that is running the user interface (React front end), Perform the following tasks:
1. `cd server/`
2. `npm install`
3. Edit config/default.json so that the "password" field in the "mysql" object contains the password to the local MYSQL user specified in "user". If you do not wish to log in as your local machine's root user, you will have to change the "user" field as well - make sure the password corresponds to whichever user you specify. 
4. `npm run dev`

<!-- Ensure you have all dependencies by running npm install while in the server/ directory

Then, go to server/config/default.json and in the "mysql" object, insert the hostname, user, and password in order for the server to have the credentials to connect to your local mysql instance of cheers_db.

Finally, run npm run dev. The server should start up and print "Listening on port 5000" as well as "SQL Connected!". It should also print a test SQL statement found in server.js on line 7, which is SELECT user_name FROM users. -->

If trouble with permissions when using root user, in a new terminal, go into the MYSQL Command-Line Client and run the following commands:

ALTER USER 'root'@'localhost' IDENTIFIED BY 'your new password'; ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your new password';

![image](https://user-images.githubusercontent.com/48611641/170758437-4827743f-9c4a-4d47-8752-93e3adac9be6.png)

![image](https://user-images.githubusercontent.com/48611641/170759709-93d5bc8f-d218-447a-857d-45a1cb27b43c.png)

![image](https://user-images.githubusercontent.com/48611641/170760093-aae051d8-eae8-44ca-b599-4d8a1358fca8.png)


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
