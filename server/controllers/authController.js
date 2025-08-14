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

const handleLogin = async (req, res) => {};
