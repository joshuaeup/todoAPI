const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    console.log(req);
    res.send("Hello World");
});

// Listen on port
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
