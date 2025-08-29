const express = require("express");
const app = express();
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const { logger } = require("./middleware/logEvents");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");

// initialise the port
const PORT = process.env.PORT || 3500;
// allow json
app.use(express.json());
// exporting plublic files
app.use("/", express.static(path.join(__dirname, "/public")));
//cookies
app.use(cookieParser());
//logs all request and errors
app.use(logger);

// routes
app.use("/", require("./routes/root"));

app.use("/register", require("./routes/register")); // handle users data
app.use("/auth", require("./routes/auth")); //handle users login
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees")); //api similator

//  404s
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
  console.log(`app is running on port ${PORT}`);
});
