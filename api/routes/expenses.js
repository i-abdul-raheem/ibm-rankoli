const route = require("express").Router();

const expenses = [
  {
    _id: "1",
    title: "Electricity Bill",
    amount: 40000,
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
  return setResponse(res, null, expenses);
});

route.get("/:id", async (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i]._id == id) return setResponse(res, null, expenses[i]);
  }
  return setResponse(res, "Expense not found", null, 404);
});

route.post("/", async (req, res) => {
  const data = req.body;
  const id = (parseInt(expenses[expenses.length - 1]._id) + 1).toString();
  data._id = id;
  expenses.push(data);
  return setResponse(res, "Expense created", data, 201);
});

route.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let index = -1;
  let found = false;
  console.log(id);
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i]._id == id) {
      index = i;
      found = true;
      break;
    }
  }
  if (!found) {
    return setResponse(res, "Expense not found", null, 404);
  }
  expenses.splice(index, 1);
  return setResponse(res, "Expense deleted", null, 200);
});

module.exports = route;
