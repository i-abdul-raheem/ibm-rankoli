const route = require("express").Router();

const productions = [
  {
    _id: "1",
    product: {
      title: "Ran-U-786",
      amount: "4",
    },
    rawMaterials: [{ title: "PVC 5mm", quantity: "2", cost: "300" }],
    expenses: [{ title: "Freight Charges", cost: "500" }],
    finished: true
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
  return setResponse(res, null, productions);
});

route.get("/:id", async (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < productions.length; i++) {
    if (productions[i]._id == id) return setResponse(res, null, productions[i]);
  }
  return setResponse(res, "Production not found", null, 404);
});

route.post("/", async (req, res) => {
  const data = req.body;
  const id = (parseInt(productions[productions.length - 1]._id) + 1).toString();
  data._id = id;
  data.finished = false;
  productions.push(data);
  return setResponse(res, "Production created", data, 201);
});

route.put("/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  data.finished = false;
  let found = false;
  for(let i = 0; i < productions.length; i++){
    if(productions[i]._id == id){
        found = true;
        productions[i] = data;
        break;
    }
  }
  if(!found) return setResponse(res, "Production not found", null, 404);
  return setResponse(res, "Production updated", null, 200);
});

route.put("/:id/finish", async (req, res) => {
    const id = req.params.id;
    let found = false;
  for(let i = 0; i < productions.length; i++){
    if(productions[i]._id == id){
        found = true;
        productions[i].finished = true;
        break;
    }
  }
  if(!found) return setResponse(res, "Production not found", null, 404);
  return setResponse(res, "Production Finished", null, 200);
})

module.exports = route;
