const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt
  const foundUser = userDB.users.find((person) => person.refreshToken === refreshToken)
  if(!foundUser) {
    res.clearCookie("jwt", {httpOnly: true})
    res.sendStatus(204)
  }
  const otherUsers = userDB.users.filter((person) => person.refreshToken === foundUser.refreshToken)
  const currentUser = {...foundUser, refreshToken: ""}
  console.log(userDB.users)
  userDB.setUsers([...otherUsers, currentUser])
await  fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    res.clearCookie("jwt", {httpOnly: true, secure: true})

  res.sendStatus(204)
};


module.exports = {handleLogout}