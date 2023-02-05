const route = require("express").Router();

const employees = [
  {
    _id: "1",
    title: "Usama Rana",
    address: "Bahria Town",
    contact: "03004981726",
    email: "usama.rana@gmail.com",
    salary: "100000",
    cnic: "3810392736251",
    employeeType: "accounts",
  },
  {
    _id: "2",
    title: "Bilal Jan",
    address: "Shadiwal Chowk",
    contact: "03479283746",
    email: "bilal.jan@gmail.com",
    salary: "80000",
    cnic: "8293840291829",
    employeeType: "human resource",
  },
  {
    _id: "3",
    title: "Ali Raza",
    address: "Rawalpindi",
    contact: "03178273847",
    email: "ali.raza@gmail.com",
    salary: "40000",
    cnic: "3810392837261",
    employeeType: "sales",
  },
  {
    _id: "4",
    title: "Muhamed Rizwan",
    address: "Pine Chowk",
    contact: "03009284616",
    email: "m.rizwan@gmail.com",
    salary: "50000",
    cnic: "2938471528395",
    employeeType: "production",
  },
  {
    _id: "5",
    title: "Abdul Raheem",
    address: "Johar Town",
    contact: "03134386826",
    email: "arhexlabs@gmail.com",
    salary: "200000",
    cnic: "3810361753177",
    employeeType: "admin",
  },
  {
    _id: "6",
    title: "Abuzar",
    address: "Township",
    contact: "03008273615",
    email: "abuzar@gmail.com",
    salary: "40000",
    cnic: "92018374622765",
    employeeType: "procurement",
  },
  {
    _id: "7",
    title: "Zaid",
    address: "Kallur Kot",
    contact: "03008273515",
    salary: "10000",
    cnic: "3829271527399",
    employeeType: "labor",
  },
];

const setResponse = (res, message = null, data = null, status = 200) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

route.get("/", async (req, res) => {
  return setResponse(res, null, employees);
});

route.get("/:id", async (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < employees.length; i++) {
    if (employees[i]._id == id) return setResponse(res, null, employees[i]);
  }
  return setResponse(res, "Employee not found", null, 404);
});

route.post("/", async (req, res) => {
  const data = req.body;
  const id = (parseInt(employees[employees.length - 1]._id) + 1).toString();
  data._id = id;
  employees.push(data);
  return setResponse(res, "Employee created", data, 201);
});

module.exports = route;
