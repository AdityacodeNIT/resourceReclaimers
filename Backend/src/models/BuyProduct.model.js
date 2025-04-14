import mongoose, { Schema } from "mongoose";

const BuyProductSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        category: {
            type: String,
            enum: [
                "Electronics",        // Smartphones, Laptops, Tablets, E-Waste
                "Furniture",          // Chairs, Desks, Cabinets
                "Appliances",         // Refrigerators, Washing Machines, Air Conditioners
                "AutomotiveParts",    // Used Car Parts, Batteries, Tires
                "HomeDecor",          // Lamps, Mirrors, Frames
                "OfficeEquipment",    // Printers, Scanners, Projectors
                "SportsEquipment",    // Gym Equipment, Bicycles, Treadmills
                "ClothingAndAccessories", // Shoes, Bags, Watches
                "BooksAndStationery", // Used Books, Notebooks, Recycled Paper
                "Miscellaneous"       // Any other category that doesn’t fit the above
            ],
            required: true,
        },
        productImages: [{ type: String }],

        // **Seller Information**
        seller: { type: Schema.Types.ObjectId, ref: "user", required: true },
        sellerContact: { type: String,  },
        pickupLocation: [
            {
              streetAddress: { type: String, required: true },
              city: { type: String, required: true },
              state: { type: String, required: true },
              country: { type: String, required: true },
              postalCode: { type: String, required: true },
            },
        ],
        pickupScheduledDate: { type: Date },

        // **Product Condition & Verification**
        sellerDeclaredCondition: {
            type: String,
            enum: ["New", "Like New", "Used", "Damaged"],
            required: true,
        },
        verifiedCondition: { type: String, enum: ["Like New", "Good", "Fair", "Needs Repair"] },
        inspectionStatus: { type: String, enum: ["Pending", "Completed", "Rejected"], default: "Pending",required:true },
        repairNeeded: { type: Boolean, default: false },
        repairCostEstimate: { type: Number },

      
        originalPriceProof: { type: String }, 
        evaluatedPrice: { type: Number,default:0,required:true }, 
        evaluationStatus: { type: String, enum: ["Pending", "Under Review", "Completed"], default: "Pending",required:true },
        evaluationRemarks: { type: String, default: "Pending" },
        evaluationDate: { type: Date },

        // **Logistics & Tracking**
        pickupAgent: { type: Schema.Types.ObjectId, ref: "user" }, // Agent handling pickup
        pickupStatus: { type: String, enum: ["Scheduled", "In Transit", "Completed"], default: "Scheduled" },

    },
    { timestamps: true }
);

export const BuyProduct = mongoose.model("BuyProduct", BuyProductSchema);
