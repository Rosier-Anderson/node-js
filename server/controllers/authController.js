const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { user, pswd } = req.body;
  if (!user || !pswd)
    return res
      .status(400)
      .json({ message: "username and password are required " });
  const foundUser = userDB.users.find((person) => person.username === user);
  if (!foundUser) return res.sendStatus(401); // unothorized user

  const matchPswd = await bcrypt.compare(pswd, foundUser.password);
  if (matchPswd) {
    //create tokens
    const accesToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30s",
      }
    );
    const refershToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    //filters users
    const otherUsers = userDB.users.filter(
      (person) => person.username !== foundUser.username
    );
    const currentUser = { ...foundUser, refershToken };
    //update userDb
    userDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    res.cookie("jwt", refershToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ accesToken });
  } else {
    res.sendStatus(401); // Forbidden
  }
};

module.exports = { handleLogin };
