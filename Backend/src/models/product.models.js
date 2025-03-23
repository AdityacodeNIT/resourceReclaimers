import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String },
        ProductImage: { type: String, required: true },
        Category: {
            type: String,
            enum: [
                "Writing",        // Pens, Markers, Stylus
                "Paper",          // Notebooks, Sticky Notes, Recycled Paper
                "DeskSupplies",   // Calculators, Digital Notepads, Pen Holders
                "Filing",         // Folders, Binders, Files
                "Reusable",       // Smart Notebooks, Erasable Pens
                "TechStationery", // Digital writing pads, Smart Pens, E-Ink Tablets
            ],
            required: true,
        },
        stocks: { type: Number, required: true },

        // **Physical Attributes**
        length: { type: Number }, 
        breadth: { type: Number }, 
        height: { type: Number }, 
        weight: { type: Number }, 

        // **Tech-Related Attributes**
        memory: { type: String }, // Example: "16GB"
        batteryLife: { type: String }, // Example: "10 hours"
        screenSize: { type: String }, // Example: "7-inch"
        connectivity: { type: String }, // Example: "Bluetooth, USB-C"
        material: { type: String }, // Example: "Plastic, Metal, Recycled Paper"

        // **Writing-Specific Attributes**
        inkColor: { type: String }, // Example: "Blue, Black"
        refillable: { type: Boolean }, // Example: true/false
    
    seller:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
},
    { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
