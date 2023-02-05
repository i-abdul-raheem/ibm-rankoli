const route = require("express").Router();

const rawMaterials = [
  {
    _id: "1",
    title: "PVC 5mm",
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
  return setResponse(res, null, rawMaterials);
});

route.get("/:id", async (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < rawMaterials.length; i++) {
    if (rawMaterials[i]._id == id) return setResponse(res, null, rawMaterials[i]);
  }
  return setResponse(res, "Raw Material not found", null, 404);
});

route.post("/", async (req, res) => {
  const data = req.body;
  const id = (parseInt(rawMaterials[rawMaterials.length - 1]._id) + 1).toString();
  data._id = id;
  rawMaterials.push(data);
  return setResponse(res, "Raw Material created", data, 201);
});

route.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let index = -1;
  let found = false;
  console.log(id);
  for (let i = 0; i < rawMaterials.length; i++) {
    if (rawMaterials[i]._id == id) {
      index = i;
      found = true;
      break;
    }
  }
  if (!found) {
    return setResponse(res, "Raw Material not found", null, 404);
  }
  rawMaterials.splice(index, 1);
  return setResponse(res, "Raw Material deleted", null, 200);
});

module.exports = route;
