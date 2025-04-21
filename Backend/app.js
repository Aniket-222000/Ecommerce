// import express from "express";
// import cors from "cors";
import userRouter from "./src/routes/user.routes.js";
import productRouter from "./src/routes/product.routes.js";
import orderHistoryRouter from "./src/routes/orderHistory.routes.js";

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.static('public'));

// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/products", productRouter);
// app.use("/api/v1/orders", orderHistoryRouter);

// export { app };
import express from "express";
import cors from "cors";
// import userRouter from "./routes/user.routes.js";
// import productRouter from "./routes/product.routes.js";
// import orderHistoryRouter from "./routes/orderHistory.routes.js";
import { errorHandler } from "./src/middleware/errorHandler.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/v1/users",    userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders",   orderHistoryRouter);

// global error handler
app.use(errorHandler);

export { app };