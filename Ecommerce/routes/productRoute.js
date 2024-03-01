import express from "express";


import { requireSignIn } from "../middleware/SignInRequrie.js";
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryBaseController, productFiltersController, updateProductController } from "../controllers/productController.js";
import braintree from "braintree";


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


// ..............filter...........
router.post("/filter-product", productFiltersController);

// .............product category base........
router.get("/category-base-product/:slug",productCategoryBaseController );



// ..............payment braintree TokenExpiredError........
router.get("/braintree/token", braintreeTokenController);

// ....................payment  ................
router.post("braintree/payment", requireSignIn ,braintreePaymentController);

export default router;