// import { Router } from "express";
// import multer from "multer";
// import path from "path";
// import {
//   addProduct,
//   getProductById,
//   getAllProducts,
//   updateProduct,
//   deleteProduct,
//   getProductByName,
//   getProductByCategory,
// } from "../controllers/product.controller.js";
// const router = Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public"); // Save the image in the "public" folder of your backend project
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix + ext);
//   },
// });
// const upload = multer({ storage: storage });
// // product routes
// router.route("/addproduct").post(upload.single("image"), addProduct);
// router.route("/getproductbyid").get(getProductById);
// router.route("/getproductbyname").get(getProductByName);
// router.route("/getproductbycategory").get(getProductByCategory);
// router.route("/getallproducts").get(getAllProducts);
// router.route("/updateproduct").patch(upload.single("image"), updateProduct);
// router.route("/deleteproduct").patch(deleteProduct);
// export default router;


import { Router } from "express";
import multer from "multer";
import path from "path";
import {
  addProduct,
  getProductById,
  getProductByName,
  getProductByCategory,
  getAllProducts,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public"),
  filename:    (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  }
});
const upload = multer({ storage });

router.post(  "/addproduct",       upload.single("image"), addProduct);
router.get("/getproductbyid",   getProductById);
router.get(   "/getproductbyname", getProductByName);
router.get(   "/getproductbycategory", getProductByCategory);
router.get(   "/getallproducts",   getAllProducts);
router.patch( "/updateproduct",    upload.single("image"), updateProduct);
router.delete("/deleteproduct",    deleteProduct);

export default router;
