const express = require("express");
const server = express();
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const { logger } = require("./middleware/logEvents");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");

// initialise the port
const PORT = process.env.PORT || 3500;
// allow json
server.use(express.json());
// exporting plublic files
server.use("/", express.static(path.join(__dirname, "/public")));
//cookies
server.use(cookieParser());
//logs all request and errors
server.use(logger);

// routes
server.use("/", require("./routes/root"));

server.use("/register", require("./routes/register")); // handle users data
server.use("/auth", require("./routes/auth")); //handle users login
server.use("/refresh", require("./routes/refresh"));
server.use("/logout", require("./routes/logout"));
server.use(verifyJWT);
server.use("/employees", require("./routes/api/employees")); //api similator

//  404s
server.all("/*splat", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ Error: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});
server.use(errorHandler);
server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${PORT}`);
});
