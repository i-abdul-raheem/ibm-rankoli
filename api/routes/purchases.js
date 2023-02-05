const route = require("express").Router();

const purchasers = [
  {
    _id: "1",
    vendor: {
      title: "Nafees",
      amount: 500,
    },
    rawMaterials: [{ title: "PVC 5mm", quantity: "2", cost: "300" }],
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
  return setResponse(res, null, purchasers);
});

route.get("/:id", async (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < purchasers.length; i++) {
    if (purchasers[i]._id == id) return setResponse(res, null, purchasers[i]);
  }
  return setResponse(res, "Purchaser not found", null, 404);
});

route.post("/", async (req, res) => {
  const data = req.body;
  const id = (parseInt(purchasers[purchasers.length - 1]._id) + 1).toString();
  data._id = id;
  purchasers.push(data);
  return setResponse(res, "Purchaser created", data, 201);
});

route.put("/payment/:id", async (req, res) => {
  const id = req.params.id;
  for(let i = 0; i < purchasers.length; i++){
    if(purchasers[i]._id == id) {
      purchasers[i].vendor.amount = (parseInt(purchasers[i].vendor.amount) + parseInt(req.body.amount)).toString();
      return setResponse(res, "Payment updated", null, 200);
    }
  }
  return setResponse(res, "Purchase not found", null, 404);
});

module.exports = route;
