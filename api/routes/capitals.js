const route = require("express").Router();

const capitals = [
  {
    _id: "1",
    title: "Fahad",
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
  return setResponse(res, null, capitals);
});

route.get("/:id", async (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < capitals.length; i++) {
    if (capitals[i]._id == id) return setResponse(res, null, capitals[i]);
  }
  return setResponse(res, "Capital not found", null, 404);
});

route.post("/", async (req, res) => {
  const data = req.body;
  const id = (parseInt(capitals[capitals.length - 1]._id) + 1).toString();
  data._id = id;
  capitals.push(data);
  return setResponse(res, "Capital created", data, 201);
});

route.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let index = -1;
  let found = false;
  console.log(id);
  for (let i = 0; i < capitals.length; i++) {
    if (capitals[i]._id == id) {
      index = i;
      found = true;
      break;
    }
  }
  if (!found) {
    return setResponse(res, "Capital not found", null, 404);
  }
  capitals.splice(index, 1);
  return setResponse(res, "Capital deleted", null, 200);
});

module.exports = route;
