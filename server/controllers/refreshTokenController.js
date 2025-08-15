const jwt = require("jsonwebtoken");
require("dotenv").config();
const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const handleRefreshToken = (req, res) => {
  const cookies = req.cooikies;
  if (!cookies?.jwt) return res.status(401);
  const refreshToken = cookies.jwt;
  const foundUser = userDB.users(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) return res.status(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403);
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};
module.exports = { handleRefreshToken };
