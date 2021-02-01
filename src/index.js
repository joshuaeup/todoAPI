const express = require("express");

const app = express();
const PORT = 3000;

// MIDDLEWARE
app.use(express.static(__dirname + "/public"));
// app.use((req, res, next) => {
//     console.log("Hello");
//     next();
// });

// Route
// app.get("/", (req, res) => {
//     console.log(req);
//     res.send("Hello World");
// });

// Listen on port
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
