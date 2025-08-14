const express = require("express");
const app = express();
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const { logger } = require("./middleware/logEvents");

// initialise the port
const PORT = process.env.PORT || 3500;
// allow json
app.use(express.json());
// exporting plublic files
app.use("/", express.static(path.join(__dirname, "/public")));
//logs all request
app.use(logger);

// paths
app.use("/", require("./routes/root"));
app.use("/employees", require("./routes/api/employees")); //api similator
app.use("/register", require("./routes/register"));
// log 404s
app.all("/*splat", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ Error: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});
app.use(errorHandler);
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${PORT}`);
});
