const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};
// get all employees
const getAllEmployees = (req, res) => {
  res.json(data.employees);
  console.log("get");
};
// add new employees
const createNewEmployee = (req, res) => {
  const { firstName, lastName } = req.body;
  const currentEmployees = data.employees;
  let newEmployeeID =
    currentEmployees.map((employee) => employee.id).at(-1) || 0;
  if (!firstName & !lastName) {
    return res
      .status(400)
      .json({ error: "Must provide a firstName and a lastName" });
  }

  const newEmployee = {
    id: newEmployeeID + 1,
    firstName: firstName,
    lastName: lastName,
  };
  const updatedEmployees = [...currentEmployees, newEmployee];
  data.setEmployees(updatedEmployees);
  console.log("Post");
  res.json(data.employees);
};

// update the employee
const updateEmployee = (req, res) => {
  const { firstName, lastName, id } = req.body;
  let empID = id;
  const currentEmployees = data.employees;
  const selectedEmployee = currentEmployees.find((emp) => emp.id == empID);
  const empIndex = currentEmployees.findIndex((emp) => emp.id === empID);
  if (!empID)
    return res
      .status(400)
      .json({ error: "Must provide the employee ID to update" });
  if (!selectedEmployee)
    return res.status(404).json({ error: "Employee ID does not exist" });

  let newEmp = currentEmployees.map((emp, index) => {
    if (index === empIndex) {
      emp.firstname = firstName;
      emp.lastname = lastName;
    }
    return emp;
  });

  // console.log(newEmp);
  data.setEmployees(newEmp);
  res.json(data.employees);
  console.log("put");
};
const deleteEmployee = (req, res) => {
  const currentEmployees = data.employees;
  const { id } = req.body;
  let selectedID = id;
  const empIndex = currentEmployees.findIndex((emp) => emp.id === selectedID);
  const newEmployee = currentEmployees.map((emp, index) => {
    if (index === empIndex) delete emp[empIndex];

    return emp;
  });

  // console.log(newEmployee);
  res.json();
  console.log("delete");
};
const getEmployeeById = (req, res) => {
  res.json({ id: req.params.id });
};
module.exports = {
  getAllEmployees,
  updateEmployee,
  createNewEmployee,
  deleteEmployee,
  getEmployeeById,
};