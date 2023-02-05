const route = require("express").Router();
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const users = [
  {
    _id: "1",
    username: "3810392736251",
    password: "12345678",
    status: false,
    role: {
      finishedGoods: false,
      inventory: false,
      manageAccount: true,
      manageAttendance: false,
      manageCapital: true,
      manageEmployee: false,
      managePayments: true,
      manageExpense: true,
      manageProduct: false,
      manageProduction: false,
      managePurchase: false,
      manageRawMaterial: false,
      manageSalary: false,
      manageSale: false,
      manageUsers: false,
    },
  },
  {
    _id: "2",
    username: "3810361753177",
    email: "arhexlabs@gmail.com",
    _id: "2",
    status: true,
    password: "12345678",
    role: {
      finishedGoods: false,
      inventory: false,
      manageAccount: false,
      manageAttendance: false,
      manageCapital: false,
      manageEmployee: false,
      managePayments: false,
      manageExpense: false,
      manageProduct: true,
      manageProduction: false,
      managePurchase: false,
      manageRawMaterial: true,
      manageSalary: false,
      manageSale: false,
      manageUsers: true,
    },
  },
];

const setResponse = (res, message = null, data = null, status = 200) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

const generatePassword = () => {
  const chars = "arhexARHEX12390@".split("");
  const password = [];
  for (let i = 0; i < 8; i++) {
    password.push(chars[Math.floor(Math.random() * (chars.length - 1))]);
  }
  return password.join("");
};

route.get("/", async (req, res) => {
  return setResponse(res, null, users);
});

route.get("/:id", async (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < users.length; i++) {
    if (users[i]._id == id) return setResponse(res, null, users[i]);
  }
  return setResponse(res, "User not found", null, 404);
});

route.get("/cnic/:username", async (req, res) => {
  const username = req.params.username;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username) return setResponse(res, null, users[i]);
  }
  return setResponse(res, "User not found", null, 404);
});

route.post("/", async (req, res) => {
  const data = req.body;
  const id = (parseInt(users[users.length - 1]._id) + 1).toString();
  data._id = id;
  data.status = false;
  data.password = generatePassword();
  data.role = {
    finishedGoods: false,
    inventory: false,
    manageAccount: false,
    manageAttendance: false,
    manageCapital: false,
    manageEmployee: false,
    managePayments: false,
    manageExpense: false,
    manageProduct: false,
    manageProduction: false,
    managePurchase: false,
    manageRawMaterial: false,
    manageSalary: false,
    manageSale: false,
    manageUsers: false,
  };
  users.push(data);
  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.REACT_APP_EMAIL,
        pass: process.env.REACT_APP_PASSWORD,
      },
    })
  );
  var mailOptions = {
    from: process.env.REACT_APP_EMAIL,
    to: req.body.email,
    subject: "Rankoli IBM Account Created",
    text: `Username: ${data.username}\nPassword: ${data.password}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return setResponse(res, "User created", data, 201);
});

route.put("/activate/:cnic", async (req, res) => {
  const cnic = req.params.cnic;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == cnic) {
      users[i].status = true;
      return setResponse(res, "User Activated", users[i]);
    }
  }
  return setResponse(res, "User not found", null, 404);
});

route.put("/deactivate/:cnic", async (req, res) => {
  const cnic = req.params.cnic;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == cnic) {
      users[i].status = false;
      return setResponse(res, "User Deactivated", users[i]);
    }
  }
  return setResponse(res, "User not found", null, 404);
});

route.put("/role/:cnic", async (req, res) => {
  const cnic = req.params.cnic;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == cnic) {
      users[i].role = req.body.role;
      return setResponse(res, "User Role Updated", users[i]);
    }
  }
  return setResponse(res, "User not found", null, 404);
});

route.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username && users[i].password == password) {
      const role = users[i].role;
      return setResponse(res, "Login Successful", role);
    }
  }
  return setResponse(res, "Invalid Username/Password", null, 404);
});

module.exports = route;
