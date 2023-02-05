const route = require("express").Router();
const accounts = require("./accounts");
const employees = require("./employees");
const capitals = require("./capitals");
const rawMaterials = require("./rawMaterials");
const products = require("./products");
const purchases = require("./purchases");
const sales = require("./sales");
const expenses = require("./expenses");
const productions = require("./productions");
const attendance = require("./attendance");
const users = require("./users");

route.use("/accounts", accounts);
route.use("/employees", employees);
route.use("/capitals", capitals);
route.use("/users", users);
route.use("/attendance", attendance);
route.use("/productions", productions);
route.use("/expenses", expenses);
route.use("/sales", sales);
route.use("/purchases", purchases);
route.use("/products", products);
route.use("/rawMaterials", rawMaterials);

module.exports = route;
