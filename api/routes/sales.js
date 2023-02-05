const route = require("express").Router();

const sales = [
  {
    _id: "1",
    customer: {
      title: "Usama",
      amount: 0,
    },
    products: [{ title: "Ran-U-786", quantity: "2", cost: "300" }],
    expenses: [{ title: "Freight Charges", cost: "500" }],
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
  return setResponse(res, null, sales);
});

route.get("/:id", async (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < sales.length; i++) {
    if (sales[i]._id == id) return setResponse(res, null, sales[i]);
  }
  return setResponse(res, "Sale not found", null, 404);
});

route.post("/", async (req, res) => {
  const data = req.body;
  const id = (parseInt(sales[sales.length - 1]._id) + 1).toString();
  data._id = id;
  sales.push(data);
  return setResponse(res, "Sale created", data, 201);
});

route.put("/payment/:id", async (req, res) => {
  const id = req.params.id;
  for(let i = 0; i < sales.length; i++){
    if(sales[i]._id == id) {
      sales[i].customer.amount = (parseInt(sales[i].customer.amount) + parseInt(req.body.amount)).toString();
      return setResponse(res, "Payment updated", null, 200);
    }
  }
  return setResponse(res, "Sale not found", null, 404);
});

module.exports = route;
