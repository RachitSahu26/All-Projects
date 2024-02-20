import express from "express";


// import formidable from "express-formidable";
import { requireSignIn } from "../middleware/SignInRequrie.js";

// import productCo/ntroller from "../controllers/productController.js";
import creatProductController, { deleteProductController, getProductController, updateProductController } from "../controllers/productController.js";

const router = express.Router();

// .............CreateRoutes..........
router.post(
    "/create-product",
    requireSignIn,
   creatProductController
);



// .............UpdataRoutes..........
router.put(
    "/update-product/:pid",
    requireSignIn,
    updateProductController
);

// .............Get All Product Routes..........
router.get("/get-product",getProductController)


// //single product
// router.get("/get-product/:slug", getSingleProductController);


//delete product
router.delete("/product/:pid", deleteProductController);

export default router;