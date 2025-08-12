const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.users = data;
  },
};

const getAllEmployees = async (req, res) => {
  res.json(data.employees)
};

module.exports = {getAllEmployees}
//   const { firsName, lastName } = req.body;

//   employees.setUsers(newEmployeesData)
// if(!firsName || !lastName) return res.status(400).send({Error: `${firsName || "firsName"} and ${lastName || "lastName"} are required `})
// const newEmployeesData  =  {
//     firsname: firsName,
//     lastname: lastName
// }