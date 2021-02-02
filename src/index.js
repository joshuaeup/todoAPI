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
    password: "rockeT04",
    database: "todo",
});

try {
    connection.connect();
} catch (e) {
    console.log("Oops. connection to MySQL failed.");
    console.log(e);
}

// Get route
app.get("/tasks", (req, res) => {
    connection.query(
        "SELECT * FROM tasks ORDER BY created DESC",
        (error, results) => {
            if (error) return res.json({ error: error });

            // Stores all non completed items in todo and completed items in completed
            res.json(results);
        }
    );
});

// Post route for add
app.post("/tasks/add", (req, res) => {
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

                    res.json({
                        id: results[0]["LAST_INSERT_ID()"],
                        description: req.body.item,
                    });
                }
            );
        }
    );
});

app.post("/tasks/:id/update", (req, res) => {
    connection.query(
        "UPDATE tasks SET completed = ? WHERE id = ?",
        [req.body.completed, req.params.id],
        (error, results) => {
            if (error) return res.json({ error: error });

            res.json({});
        }
    );
});

app.post("/tasks/:id/remove", (req, res) => {
    connection.query(
        "DELETE FROM tasks WHERE id = ?",
        [req.params.id],
        (error, results) => {
            if (error) return res.json({ error: error });

            res.json({});
        }
    );
    console.log(req.params.id);
});

// Listen on port
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
