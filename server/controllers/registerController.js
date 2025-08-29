const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const handleNewUser = async (req, res) => {
  const { user, pswd } = req.body;
  if (!user || !pswd)
    return res
      .status(400)
      .json({ message: `username and password is requiered` });
  const duplicateUser = userDB.users.find((person) => person.username === user);
  if (duplicateUser) return res.sendStatus(409);
  try {
    const hashPWD = await bcrypt.hash(pswd, 10);
    const newUser = {
      username: user,
      roles: {
        User: 2004,
      },

      password: hashPWD,
    };
    userDB.setUsers([...userDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    res.status(201).json({ success: `New ${user} created` });
  } catch (err) {
    res.status(500).json({ messageS: err.message });
  }
};
module.exports = { handleNewUser };
