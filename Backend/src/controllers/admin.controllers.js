import { User } from "../models/user.model.js";
import { Product } from "../models/product.models.js";
import { Order } from "../models/order.models.js";
import { response } from "express";

const orderlist = async (req, res) => {
        try {
                const orders = await Order.aggregate([
                        { $unwind: "$items" },
                        {
                                $lookup: {
                                        from: "products", // Collection name for Product
                                        localField: "items.productId", // Field in Order referencing Product
                                        foreignField: "_id",
                                        as: "productDetails",
                                },
                        },
                        { $unwind: "$productDetails" },
                        {
                                $lookup: {
                                        from: "users",
                                        localField: "userId", // Field in Order referencing User
                                        foreignField: "_id",
                                        as: "userDetails",
                                },
                        },
                        { $unwind: "$userDetails" },
                        {
                                $group: {
                                        _id: "$status",
                                        orders: {
                                                $push: {
                                                        productName:
                                                                "$productDetails.name",
                                                        productPrice:
                                                                "$productDetails.price",
                                                        productImage:
                                                                "$productDetails.ProductImage",
                                                        quantity: "$items.quantity",
                                                        username: "$userDetails.username",
                                                        email: "$userDetails.email",
                                                },
                                        },
                                        totalOrders: { $sum: 1 },
                                        totalAmount: {
                                                $sum: {
                                                        $multiply: [
                                                                "$items.quantity",
                                                                "$productDetails.price",
                                                        ],
                                                },
                                        },
                                },
                        },
                ]);
                res.status(200).json(orders);
        } catch (error) {
                res.status(500).json({ error: error.message });
        }
};

const userlist = async (req, res) => {
        try {
                const order = await User.aggregate([
                        {
                                $project: {
                                        username: 1,
                                        fullName: 1,
                                        email: 1,
                                        role:1,
                                },
                        },
                ]);
                res.status(200).json(order);
        } catch (error) {
                response.status(500).json({ error: error.message });
        }
};

const productList = async (req, res) => {
        try {
                const products = await Product.aggregate([
                        {
                                $project: {
                                        name: 1,
                                        price: 1,
                                        Category: 1,
                                        stocks: 1,
                                },
                        },
                ]);
                res.status(200).json(products);
        } catch (error) {
                throw error;
        }
};

export const deleteUser = async (req, res) => {
        try {
            const userId = req.params.id;
    
            // Find the user first
            const userToDelete = await User.findById(userId);
    
            if (!userToDelete) {
                return res.status(404).json({ message: "User not found" });
            }
    
            // Prevent deletion if the user is a superadmin
            if (userToDelete.role === "superadmin") {
                return res.status(403).json({ message: "Cannot delete a superadmin" });
            }
    
            // Delete the user
            const deletedUser = await User.findByIdAndDelete(userId);
    
            res.status(200).json({ message: "User deleted successfully", deletedUser });
    
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
    
    export const updateUserRole = async (req, res) => {
        try {
                const userId=req.params.id;
                const newRole=req.body.role;
     
    
            if (!["customer", "seller", "admin", "superadmin"].includes(newRole)) {
                return res.status(400).json({ error: "Invalid role" });
            }
    
            const user = await User.findByIdAndUpdate(userId, { role: newRole }, { new: true });
    
            if (!user) return res.status(404).json({ error: "User not found" });
    
            res.json({ message: `User promoted to ${newRole}`, user });
        } catch (error) {
            res.status(500).json({ error: "Role update failed" });
        }
    };

    export const manageOrders = async (req, res) => {
        try {
            const orders = await Order.find();
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    };


    export const getProducts = async (req, res) => {
        try {
            let filter = req.user.role === "seller" ? { seller: req.user._id } : {}; 
            const products = await Product.find(filter);
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: "Error fetching products" });
        }
    };
    

    


    
    

export { orderlist, userlist, productList};
