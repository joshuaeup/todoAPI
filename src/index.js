// Requires
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

// Variables
const app = express();
const PORT = 3000;

// MIDDLEWARE
// Allows public static files to be accessed anywhere
app.use(express.static(__dirname + "/public"));
// used to parse the data retrieved from the dom
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Establish connection and pass credentials
const connection = mysql.createConnection({
    host: "localhost",
    user: "devuser",
    password: "",
    database: "todo",
});

try {
    connection.connect();
} catch (e) {
    console.log("Oops. connection to MySQL failed.");
    console.log(e);
}

// Post route for add
app.post("/add", (req, res) => {
    console.log(req.body);
    connection.query(
        "INSERT INTO tasks (description) VALUES (?)", // Insert statement with ? as parameter
        [req.body.item], // Values passed into parameter (?)
        (error, result) => {
            // check for error
            if (error) return res.json({ error: error });

            // if no error run this query
            connection.query(
                "SELECT LAST_INSERT_ID() FROM tasks", // Select statement to return last element inserted
                (error, results) => {
                    // Check for error
                    if (error) return res.json({ error: error });

                    console.log(results[0]);
                }
            );
        }
    );
});

// Listen on port
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
