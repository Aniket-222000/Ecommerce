// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { Product } from "../models/product.model.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import fs from "fs";

// const addProduct = asyncHandler(async (req, res) => {
//   const {
//     productName,
//     price,
//     description,
//     rating,
//     image,
//     category,
//     otherImages,
//   } = req.body;

//   if (
//     [productName, description, category, image].some(
//       (field) => field?.trim() === ""
//     )
//   ) {
//     throw new ApiError(400, "All fields are required");
//   }

//   const fileName = req.file.filename;
//   console.log(fileName);

//   const newProduct = await Product.create({
//     productName,
//     price,
//     description,
//     rating,
//     image: fileName,
//     category,
//     otherImages,
//   });
//   const addedProduct = await Product.findById(newProduct._id);
//   if (!addedProduct) {
//     throw new ApiError(500, "Something went wrong while adding product");
//   }

//   return res
//     .status(201)
//     .json(new ApiResponse(200, addedProduct, "Product Added Successfully"));
// });

// const getProductById = asyncHandler(async (req, res) => {
//   const productId = req.query._id;
//   if (!productId) {
//     throw new ApiError(400, "Product ID is required");
//   }
//   const foundProduct = await Product.findOne({ _id: productId });
//   if (!foundProduct) {
//     throw new ApiError(404, "Product not found");
//   }
//   return res
//     .status(201)
//     .json(new ApiResponse(200, foundProduct, "Product Fetched Successfully"));
// });

// const getProductByName = asyncHandler(async (req, res) => {
//   const Name = req.query.name;
//   if (!Name) {
//     throw new ApiError(400, "Product name is required");
//   }
//   const searchPattern = new RegExp(Name, "g");
//   const foundProduct = await Product.find({
//     productName: { $regex: searchPattern },
//   });
//   if (!foundProduct) {
//     throw new ApiError(404, "Product not found");
//   }
//   return res
//     .status(201)
//     .json(new ApiResponse(200, foundProduct, "Product Fetched Successfully"));
// });

// const getAllProducts = asyncHandler(async (req, res) => {
//   const foundProduct = await Product.find();
//   if (!foundProduct) {
//     throw new ApiError(404, "No Products Found");
//   }
//   return res
//     .status(201)
//     .json(new ApiResponse(200, foundProduct, "Products Fetched Successfully"));
// });

// const updateProduct = asyncHandler(async (req, res) => {
//   const { id, productName, category, price, description, rating, image } =
//     req.body;

//   if (!id || !productName || !price || !description || !category) {
//     throw new ApiError(400, "All fields are required");
//   }
//   const foundProduct = await Product.findOne({ _id: id });

//   try {
//     var filePath = `D:/Current-Repository/Shoes-E-Commerce/Backend/public/${foundProduct.image}`;
//     fs.unlinkSync(filePath);
//     console.log(`Image ${foundProduct.image} deleted successfully.`);
//   } catch (err) {
//     console.error(`Error deleting image: ${err}`);
//     // Handle errors appropriately (e.g., log the error or return an error response)
//   }
//   const fileName = req.file.filename;
//   const updatedProduct = await Product.findByIdAndUpdate(
//     id,
//     {
//       $set: {
//         productName: productName,
//         price: price,
//         description: description,
//         rating: rating ? rating : "4.9",
//         image: fileName,
//         category: category,
//         otherImages: null,
//       },
//     },
//     { new: true }
//   ).select();

//   return res
//     .status(200)
//     .json(
//       new ApiResponse(
//         200,
//         updatedProduct,
//         "product details updated successfully"
//       )
//     );
// });

// const deleteProduct = asyncHandler(async (req, res) => {
//   const { id } = req.body;

//   const foundProduct = await Product.findOne({ _id: id });
//   try {
//     var filePath = `D:/Current-Repository/Shoes-E-Commerce/Backend/public/${foundProduct.image}`;
//     fs.unlinkSync(filePath);
//   } catch (err) {
//     console.error(`Error deleting image: ${err}`);
//     // Handle errors appropriately (e.g., log the error or return an error response)
//   }
//   const product = await Product.findByIdAndDelete(id);
//   if (!product) {
//     throw new ApiError(404, "Product not found");
//   }
//   return res
//     .status(200)
//     .json(new ApiResponse(200, product, "product deleted successfully"));
// });

// const getProductByCategory = asyncHandler(async (req, res) => {
//   const Name = req.query.category;
//   if (!Name) {
//     throw new ApiError(400, "Product category is required");
//   }

//   const foundProduct = await Product.find({
//     category: Name,
//   });
//   if (!foundProduct) {
//     throw new ApiError(404, "Product not found");
//   }
//   return res
//     .status(201)
//     .json(new ApiResponse(200, foundProduct, "Product Fetched Successfully"));
// });

// export {
//   addProduct,
//   getProductById,
//   getAllProducts,
//   updateProduct,
//   deleteProduct,
//   getProductByName,
//   getProductByCategory,
// };


import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import fs from "fs";

const addProduct = asyncHandler(async (req, res) => {
  const { productName, price, description, rating, category, otherImages } = req.body;
  if ([productName,description,category].some(f=>!f||f.trim()==="")||!req.file)
    throw new ApiError(400, "All fields are required");

  const image = req.file.filename;
  const prod = await Product.create({ productName, price, description, rating, image, category, otherImages });
  res.status(201).json(new ApiResponse(200, prod, "Product added successfully"));
});

const getProductById = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new ApiError(400, "Product ID is required");
  const prod = await Product.findById(_id);
  if (!prod) throw new ApiError(404, "Product not found");
  res.status(200).json(new ApiResponse(200, prod, "Product fetched successfully"));
});

const getProductByName = asyncHandler(async (req, res) => {
  const { name } = req.query;
  if (!name) throw new ApiError(400, "Product name is required");
  const regex = new RegExp(name, "i");
  const prods = await Product.find({ productName: regex });
  res.status(200).json(new ApiResponse(200, prods, "Products fetched successfully"));
});

const getAllProducts = asyncHandler(async (req, res) => {
  const prods = await Product.find();
  res.status(200).json(new ApiResponse(200, prods, "Products fetched successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id, productName, price, description, rating, category, otherImages } = req.body;
  if (!id||!productName||!price||!description||!category)
    throw new ApiError(400, "All fields are required");

  const existing = await Product.findById(id);
  if (!existing) throw new ApiError(404, "Product not found");

  // delete old image
  try {
    fs.unlinkSync(`./public/${existing.image}`);
  } catch {};

  const image = req.file?.filename || existing.image;
  const updated = await Product.findByIdAndUpdate(id,
    { productName, price, description, rating, image, category, otherImages },
    { new: true }
  );
  res.status(200).json(new ApiResponse(200, updated, "Product updated successfully"));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) throw new ApiError(400, "Product ID is required");

  const existing = await Product.findById(id);
  if (!existing) throw new ApiError(404, "Product not found");

  // delete image
  try {
    fs.unlinkSync(`./public/${existing.image}`);
  } catch {};

  await Product.deleteOne({ _id: id });
  res.status(200).json(new ApiResponse(200, existing, "Product deleted successfully"));
});

const getProductByCategory = asyncHandler(async (req, res) => {
  const { category } = req.query;
  if (!category) throw new ApiError(400, "Category is required");
  const prods = await Product.find({ category });
  res.status(200).json(new ApiResponse(200, prods, "Products fetched successfully"));
});

export {
  addProduct,
  getProductById,
  getProductByName,
  getProductByCategory,
  getAllProducts,
  updateProduct,
  deleteProduct
};