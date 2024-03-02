
import categoryModel from '../models/categoryModel.js';
import productModel from '../models/productModel.js';
import slugify from 'slugify';
import braintree from 'braintree';
import orderModel from '../models/orderModel.js';
import dotenv from "dotenv";
// import gateway from 'path/to/braintree';


dotenv.config();


// ......................payment gateway.........

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId:process.env.BRAINTREE_MERCHANT_ID ,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });










// .......................create product..........
export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping,imageUrl } = req.body;
        console.log(res.body);
        // Validation
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        if (!description) {
            return res.status(400).json({ error: "Description is required" });
        }
        if (!price) {
            return res.status(400).json({ error: "Price is required" });
        }
        if (!category) {
            return res.status(400).json({ error: "Category is required" });
        }
        if (!quantity) {
            return res.status(400).json({ error: "Quantity is required" });
        }
        if (!shipping) {
            return res.status(400).json({ error: "Shipping is required" });
        } if (!imageUrl) {
            return res.status(400).json({ error: "Image URL is required" });
            console.log(imageUrl)
        }

        const newProduct = new productModel({ ...req.body, slug: slugify(name) });
        await newProduct.save();

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: newProduct,
        });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({
            success: false,
            message: "Error creating product",
            error: error.message,
        });
    }
};













// .............updateProduct...........
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.body;

        //alidation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case !shipping:
                return res.status(500).send({ error: "shipping is Required" });

        }

        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.body, slug: slugify(name) },
            { new: true }
        );

        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Updte product",
        });
    }
}










// ................delete controller...............
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid);
        res.status(200).send({
            success: true,
            message: "Product Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error,
        });
    }
};





// ............get all products...........
export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({})

        res.status(200).send({
            success: true,

            message: "ALlProducts ",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in getting products",
            error: error.message,
        });
    }
};


// ............get single products...........

export const getSingleProductController = async (req, res) => {


    try {
        const product = await productModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror while getitng single product",
            error,
        });


    }
}




// .....................Filter..........
export const productFiltersController = async (req, res) => {
    try {
        const { category, radio } = req.body; // Change checked to category
        let args = {};
        if (category && category.length > 0) args.category = { $in: category }; // Use $in operator for multiple categories
        if (radio && radio.length === 2) {
            args.price = { $gte: radio[0], $lte: radio[1] }; // Ensure radio is an array with two elements
        }
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while filtering products",
            error,
        });
    }
};








// get prdocyst by catgory
export const productCategoryBaseController = async (req, res) => {
    try {

        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category }).populate("category");
        res.status(200).send({
            success: true,
            category,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: "Error While Getting products",
        });
    }
};





// Briantree Token Controller
export const braintreeTokenController = (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });
    } catch (error) {
        console.log(error);
    }
}




export const braintreePaymentController = async (req, res) => {
    try {
        const { nonce, cartItem } = req.body;
        let total = 0;
        cartItem.forEach((item) => {
            total += item.price;
        });

        // Check if req.user exists and contains the buyer's ID
        if (!req.user || !req.user._id) {
            return res.status(400).json({ error: 'Buyer information not available' });
        }

        // Perform the transaction
        gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },
            async (error, result) => {
              
                if (error) {
                    return res.status(500).send(error);
                }

                try {
                    // Save the order to the database
                    const order = new orderModel({
                        products: cartItem,
                        payment: result,
                        buyer: req.user._id,
                    });
                    await order.save();
                    return res.json({ ok: true });
                } catch (saveError) {
                    console.log(saveError);
                    return res.status(500).send(saveError);
                }
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};
