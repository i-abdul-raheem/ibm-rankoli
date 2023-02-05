const route = require("express").Router();

const products = [
  {
    _id: "1",
    title: "Ran-U-786",
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
  return setResponse(res, null, products);
});

route.get("/:id", async (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < products.length; i++) {
    if (products[i]._id == id) return setResponse(res, null, products[i]);
  }
  return setResponse(res, "Raw Material not found", null, 404);
});

route.post("/", async (req, res) => {
  const data = req.body;
  const id = (parseInt(products[products.length - 1]._id) + 1).toString();
  data._id = id;
  products.push(data);
  return setResponse(res, "Raw Material created", data, 201);
});

route.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let index = -1;
  let found = false;
  console.log(id);
  for (let i = 0; i < products.length; i++) {
    if (products[i]._id == id) {
      index = i;
      found = true;
      break;
    }
  }
  if (!found) {
    return setResponse(res, "Raw Material not found", null, 404);
  }
  products.splice(index, 1);
  return setResponse(res, "Raw Material deleted", null, 200);
});

module.exports = route;
