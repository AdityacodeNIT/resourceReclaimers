import { authenticate, getHeaders, createOrder } from "../utils/ShipRocket.js";
import { Product } from "../models/product.models.js";
import { Address } from "../models/address.models.js";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

// Authenticatication



const generateSKU = (name) => {
    return name.toLowerCase() // Convert to lowercase
        .replace(/\s+/g, "_") // Replace spaces with underscores
        .replace(/[^a-z0-9_]/g, "") // Remove special characters
        .slice(0, 15) + "_" + Math.floor(1000 + Math.random() * 9000); // Add random 4-digit number
};




// Authentication
authenticate().catch((err) => console.error(err.message));

export const createOrderController = async (req, res) => {
    try {
        const { items } = req.body;
      

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "No items provided" });
        }

        const orders = [];
        const groupedOrders = {};

        for (const item of items) {
            const { productId, quantity, Address_id } = item;
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ error: `Product with ID ${productId} not found` });
            }

            await Product.updateOne(
                { _id: productId },
                [
                  { $set: { bought: { $add: ["$bought", 1] } } } // Increment 'bought' by 1
                ]
              );

            if (!groupedOrders[Address_id]) {
                const address = await Address.findById(Address_id);

                if (!address) {
                    return res.status(404).json({ error: "Address not found" });
                }

                groupedOrders[Address_id] = {
                    order_id: uuidv4(),
                    order_date: new Date().toISOString(),

                    billing_customer_name: address.firstName,
                    billing_last_name: address.lastName,
                    billing_address: address.streetAddress,
                    billing_city: address.city,
                    billing_pincode: address.postalCode,
                    billing_state: address.state,
                    billing_country: address.country,
                    billing_email: req.user?.email,
                    billing_phone: address.phoneNumber,
                    shipping_is_billing: true,

                    order_items: [],
                    payment_method: "Prepaid",
                    sub_total: 0,
                    length: 10, // Default values for now
                    breadth: 10,
                    height: 10,
                    weight: 1,
                };
            }

            groupedOrders[Address_id].order_items.push({
                name: product.name,
                sku: generateSKU(product.name),
                units: quantity,
                selling_price: product.price,
                discount: 0,
                tax: product.price * 0.18,
            });

            groupedOrders[Address_id].sub_total += product.price * quantity;
        }
      

        const result = await createOrder(groupedOrders);


        res.status(201).json({
            data: result,
            message: "Order created successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getAllOrdersController = async (req, res) => {
    
    
        try {
            // Ensure req.user is defined
            if (!req.user) {
                console.error('User not authenticated');
                return res.status(401).json({ error: 'User not authenticated' });
            }
    
            const headers = await getHeaders();
    
            // Fetch orders from Shiprocket
         
    
            let orders;
            try {
                const response = await axios.get(
                    "https://apiv2.shiprocket.in/v1/external/orders",
                    headers,
                );
                orders = response.data;
            } catch (shiprocketError) {
                console.error('Error fetching orders from Shiprocket:', shiprocketError);
    
                // Check if Shiprocket provided a response
                if (shiprocketError.response) {
                    // Shiprocket responded with an error status code
                    const statusCode = shiprocketError.response.status || 502; // Use 502 Bad Gateway if status code is not provided
                    const shiprocketMessage = shiprocketError.response.data.message || 'Error from Shiprocket API';
    
                    return res.status(statusCode).json({
                        error: `Shiprocket API error: ${shiprocketMessage}`,
                    });
                } else if (shiprocketError.request) {
                    // No response received from Shiprocket
                    return res.status(504).json({
                        error: 'No response from Shiprocket API (Gateway Timeout)',
                    });
                } else {
                    // Other errors
                    return res.status(500).json({
                        error: `Error while communicating with Shiprocket API: ${shiprocketError.message}`,
                    });
                }
            }
    
            // Continue processing orders
            if (!orders.data || !Array.isArray(orders.data)) {
              
                return res.status(500).json({ error: 'Invalid response from Shiprocket API' });
            }
    
            if (req.user.role === 'customer') {

             
                const filteredOrders = orders.data.filter(order => {
                 
              
                    return order.others.billing_email=== req.user?.email;
                });
                orders.data = filteredOrders;
            } else {
                console.log("Admin user detected. Returning all orders...");
            }
    
            res.status(200).json({
                data: orders,
                message: "Orders fetched successfully",
            });
        } catch (err) {
            // Handle any other errors that may occur
            console.error('Error in getAllOrdersController:', err);
            res.status(500).json({
                success: false,
                error: err.response?.data || err.message || "An unknown error occurred",
                hint: "Ensure the order ID is valid and headers contain correct authorization",
                troubleshooting: {
                    possibleCauses: [
                        "Invalid Shiprocket API URL or incorrect endpoint",
                        "Missing or incorrect headers",
                        "API request rate limit exceeded",
                        "Order ID not found"
                    ]
                }
            });
        }
    };
export const getOrder = async (req, res) => {
      
    
        try {
            const headers = await getHeaders();
            const id = req.params.id;
    
          
    
            // Make the API request to Shiprocket
            const response = await axios.get(
                `https://apiv2.shiprocket.in/v1/external/orders/show/${id}`,
                headers
            );
    
    
            // Return successful response
            res.status(200).json({
                success: true,
                data: response.data,
                message: `Order ${id} fetched successfully`
            });
    
        } catch (err) {
            // Log different error types for better debugging
            console.error("Error fetching orders:", err.message || err);
    
            if (err.response) {
                console.error("Error Response Status:", err.response.status);
                console.error("Error Response Data:", err.response.data);
            } else if (err.request) {
                console.error("No Response Received. Request Details:", err.request);
            } else {
                console.error("Request Error:", err.message);
            }
    
            // Return a descriptive error response
            res.status(500).json({
                success: false,
                error: err.response?.data || err.message || "An unknown error occurred",
                hint: "Ensure the order ID is valid and headers contain correct authorization",
                troubleshooting: {
                    possibleCauses: [
                        "Invalid Shiprocket API URL or incorrect endpoint",
                        "Missing or incorrect headers",
                        "API request rate limit exceeded",
                        "Order ID not found"
                    ]
                }
            });
        }
    };


export const cancelOrder = async (req, res) => {
    try {
        const headers = await getHeaders(); // Ensure this returns a valid object with Authorization token
        const orderId = req.params.id; // Get order ID from URL parameters

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: "Order ID is required for cancellation",
            });
        }

        // Prepare the correct API payload
        const payload = {
            ids: [orderId], // Shiprocket expects an array
        };

        // Make API request to cancel the order
        const response = await axios.post(
            "https://apiv2.shiprocket.in/v1/external/orders/cancel",
            payload,
            headers  // Pass headers correctly
        );

        // Return successful response
        res.status(200).json({
            success: true,
            data: response.data,
            message: `Order ${orderId} cancelled successfully`,
        });

    } catch (err) {
        console.error("Error cancelling order:", err.message || err);

        if (err.response) {
            console.error("Error Response Status:", err.response.status);
            console.error("Error Response Data:", err.response.data);
        } else if (err.request) {
            console.error("No Response Received. Request Details:", err.request);
        } else {
            console.error("Request Error:", err.message);
        }

        // Return an error response
        res.status(500).json({
            success: false,
            error: err.response?.data || err.message || "An unknown error occurred",
            hint: "Ensure the order ID is valid and headers contain correct authorization",
            troubleshooting: {
                possibleCauses: [
                    "Invalid Shiprocket API URL or incorrect endpoint",
                    "Missing or incorrect headers",
                    "API request rate limit exceeded",
                    "Order ID not found"
                ]
            }
        });
    }
};

