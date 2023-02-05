const route = require("express").Router();

const accounts = [
  {
    _id: "1",
    title: "Fahad",
    address: "XYZ",
    contact: "03094873902",
    email: "fahadrana9444@gmail.com",
    accountType: "investor",
  },
  {
    _id: "2",
    title: "Usama",
    address: "ABC",
    contact: "03093749892",
    email: "usrajput.alluwali@gmail.com",
    accountType: "customer",
  },
  {
    _id: "3",
    title: "Nafees",
    address: "QWE",
    contact: "03029182736",
    email: "nafeesrana123@gmail.com",
    accountType: "vendor",
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
  return setResponse(res, null, accounts);
});

route.get("/:id", async (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i]._id == id) return setResponse(res, null, accounts[i]);
  }
  return setResponse(res, "Account not found", null, 404);
});

route.post("/", async (req, res) => {
  const data = req.body;
  const id = (parseInt(accounts[accounts.length - 1]._id) + 1).toString();
  data._id = id;
  accounts.push(data);
  return setResponse(res, "Account created", data, 201);
});

module.exports = route;
