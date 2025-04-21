// import { Router } from "express";
// const router = Router();
// import {
//   getUserOrders,
//   addOrderHistory,
// } from "../controllers/orderHistory.controller.js";
// // order routes
// router.route("/getuserorders").get(getUserOrders);
// router.route("/addorderhistory").post(addOrderHistory);
// export default router;

import { Router } from "express";
import { getUserOrders, addOrderHistory } from "../controllers/orderHistory.controller.js";

const router = Router();
router.get("/getuserorders", getUserOrders);
router.post("/addorderhistory", addOrderHistory);

export default router;
