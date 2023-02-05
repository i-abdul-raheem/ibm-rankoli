const route = require("express").Router();

const attendances = [
  {
    _id: "1",
    cnic: "3810361753177",
    checkIn: "10:54",
    checkOut: "18:02",
    date: "2023-02-05",
  },
];

const setResponse = (res, message = null, data = null, status = 200) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

const setMonth = (val) => {
  const temp = val.toString().split("");
  if (temp.length < 2) {
    return "0" + val.toString();
  }
  return val.toString();
};

const setDay = (val) => {
  const temp = val.toString().split("");
  if (temp.length < 2) {
    return "0" + val.toString();
  }
  return val.toString();
};

route.get("/", async (req, res) => {
  return setResponse(res, null, attendances);
});

route.get("/date/:date", async (req, res) => {
  const temp = [];
  for (let i = attendances.length - 1; i >= 0; i--) {
    if (attendances[i].date === req.params.date) {
      temp.push(attendances[i]);
    }
  }
  return setResponse(res, null, temp);
});

route.get("/:id", async (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < attendances.length; i++) {
    if (attendances[i]._id == id) return setResponse(res, null, attendances[i]);
  }
  return setResponse(res, "Attendance not found", null, 404);
});

route.post("/", async (req, res) => {
  const data = req.body;
  const id = (parseInt(attendances[attendances.length - 1]._id) + 1).toString();
  data._id = id;
  const date = new Date();
  const year = date.getFullYear();
  const month = setMonth(date.getMonth() + 1);
  const day = setDay(date.getDate());
  const today = `${year}-${month}-${day}`;
  data.date = today;
  const minute = date.getMinutes();
  const hour = date.getHours();
  const time = `${hour}:${minute}`;
  data.checkIn = time;
  data.checkOut = "";

  for (let i = attendances.length - 1; i >= 0; i--) {
    if (attendances[i].date !== today) {
      break;
    }
    if (
      attendances[i].cnic == data.cnic &&
      attendances[i].checkOut === "" &&
      attendances[i].date === today
    ) {
      return setResponse(res, "Already Checked In", null, 405);
    }
  }
  attendances.push(data);
  return setResponse(res, "Checkin Successfull", data, 201);
});

route.put("/", async (req, res) => {
  const data = req.body;
  const date = new Date();
  const year = date.getFullYear();
  const month = setMonth(date.getMonth() + 1);
  const day = setDay(date.getDate());
  const today = `${year}-${month}-${day}`;
  data.date = today;
  const minute = date.getMinutes();
  const hour = date.getHours();
  const time = `${hour}:${minute}`;
  data.checkIn = time;
  data.checkOut = "";

  for (let i = attendances.length - 1; i >= 0; i--) {
    if (attendances[i].date !== today) {
      return setResponse(res, "Not Checked In", null, 405);
    }
    if (
      attendances[i].cnic == data.cnic &&
      attendances[i].checkOut === "" &&
      attendances[i].date === today
    ) {
      attendances[i].checkOut = time;
      return setResponse(res, "Checkout Successfull", data, 201);
    }
  }
});

module.exports = route;
