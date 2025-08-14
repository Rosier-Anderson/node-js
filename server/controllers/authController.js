const bcrypt = require("bcrypt");
const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogin = async (req, res) => {
  const { user, pswd } = req.body;
  if (!user || !pswd)
    return res
      .status(400)
      .json({ message: "username and password are required " });
  const foundUser = userDB.users.find((person) => person.username === user);
  if (!foundUser) return res.sendStatus(401); // unothorized user

  const matchUser = await bcrypt.compare(pswd, foundUser.password);
  if (matchUser) {
    res.json({ Success: ` User ${user} is logged in ` });
  } else {
    res.sendStatus(401); // unothorized user
  }
};

module.exports = { handleLogin };
