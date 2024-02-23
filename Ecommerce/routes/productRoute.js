import express from "express";


import { requireSignIn } from "../middleware/SignInRequrie.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, updateProductController } from "../controllers/productController.js";


const router = express.Router();

// .............CreateRoutes..........
router.post(
    "/create-product",
    requireSignIn,
   createProductController
);



// .............UpdataRoutes..........
router.put(
    "/update-product/:pid",
    requireSignIn,
    updateProductController
);

// .............Get All Product Routes..........
router.get("/get-product",getProductController)


//single product
router.get("/get-product/:slug", getSingleProductController);


//delete product
router.delete("/delete-product/:pid", deleteProductController);

export default router;