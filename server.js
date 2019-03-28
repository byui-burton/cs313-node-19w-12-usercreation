const express = require("express");
const app = express();
const {Pool} = require("pg");
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/register", handleRegister);

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});

///////// Below here in a separate file... /////
/////// controller.js ///////
function handleRegister(request, response) {
    const username = request.body.username;
    const password = request.body.password;

    console.log(`Registering new user: ${username}:${password}`);

    createUser(username, password, function(error, data) {
        response.redirect("home.html");
    });
}

////////  model.js here //////
const dbConnectionString = process.env.DATABASE_URL;
console.log(`DB connection: ${dbConnectionString}`);
const myPool = Pool({connectionString: dbConnectionString});

function createUser(username, password, callback) {

    const sql = "INSERT INTO users (username, password) VALUES($1, $2) RETURNING  id";
    const params = [username, password];

    myPool.query(sql, params, function(error, result) {
        if (error) {
            console.log("An error occurred in the DB");
            console.log(error);

            callback(error, null);
        } else {
            console.log("DB Query finished");
            console.log(result.rows);
            callback(null, result.rows);
        }

    });
}