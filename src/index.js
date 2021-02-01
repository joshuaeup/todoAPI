const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");

// MIDDLEWARE
// Allows public static files to be accessed anywhere
app.use(express.static(__dirname + "/public"));
// used to parse the data retrieved from the dom
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Post route for add
app.post("/add", (req, res) => {
    console.log(req.body);
    res.send("It works!");
});

// Listen on port
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
