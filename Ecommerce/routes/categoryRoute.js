import express from "express";
import { isAdmin, requireSignIn } from "../middleware/SignInRequrie.js";
import { createProductController } from "../controllers/productController.js";


const router = express.Router()




//routes
// create category
router.post(
    "/create-category",
    requireSignIn,
    createProductController,
);






// update category
router.put(
    "/update-category/:id",
    requireSignIn,
    isAdmin,
    
);


//getALl category
router.get("/get-category", categoryControlller);



//delete category
router.delete("/delete-category/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryController
)



export default router;