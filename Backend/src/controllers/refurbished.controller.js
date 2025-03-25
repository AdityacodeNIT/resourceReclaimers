import { Address } from "../models/address.models.js";
import { BuyProduct } from "../models/BuyProduct.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Add a new product
export const addBuyProduct = async (req, res) => {
  try {
    const { name, description, category, sellerDeclaredCondition } = req.body;
    
    if (!req.files || !req.files.originalPriceProof || !req.files.productImages) {
        return res.status(400).json({ message: "Price proof and product images are required." });
    }
    console.log(req.files);

    const originalPriceProofFile = req.files.originalPriceProof[0]; // Get the first file
    const originalPriceProofUrl = await uploadOnCloudinary(originalPriceProofFile.path); // Upload file path

    // **2. Upload Multiple Product Images to Cloudinary**
    const productImageUrls = await Promise.all(
        req.files.productImages.map(async (file) => {
            const uploadedImage = await uploadOnCloudinary(file.path);
            console.log(uploadedImage.url) // Upload file path
            return uploadedImage.url; // Extract the Cloudinary URL
        })
    );

    const address=await Address.find({userId:req.user.id})

   const pickupLocation = {
      streetAddress: address[0].streetAddress,
      city: address[0].city,
      state: address[0].state,
      country: address[0].country,
      postalCode: address[0].postalCode,
    };


    
    const newProduct = new BuyProduct({
      name,
      description,
      category,
      seller:req.user._id,
      sellerContact:address[0].phoneNumber,
      pickupLocation,
      sellerDeclaredCondition,
      originalPriceProof: originalPriceProofUrl.url,
      productImages:productImageUrls,

    });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: "Error adding product", details: error.message });
  }
};

// Get all products (admin view)
export const getProducts = async (req, res) => {
  try {
    const products = await BuyProduct.find({ seller: req.user._id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products", details: error.message });
  }
};

export const getAllBuyProducts = async (req, res) => {
  try {
    const products = await BuyProduct.find().sort({ createdAt: -1 });;
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products", details: error.message });
  }
};



// Get pending products for review
export const getPendingBuyProducts = async (req, res) => {
  try {
    const products = await BuyProduct.find({ evaluationStatus: "Pending" }).populate("seller", "username email");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching pending products", details: error.message });
  }
};

// Update product evaluation (admin updates price & status)
export const updateBuyProduct = async (req, res) => {
  try {
    const { evaluatedPrice, evaluationStatus } = req.body;
    const product = await BuyProduct.findById(req.params.id);
    
    if (!product) return res.status(404).json({ error: "Product not found" });
    
    product.evaluatedPrice = evaluatedPrice;
    product.evaluationStatus = evaluationStatus;
    await product.save();
    
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ error: "Error updating product", details: error.message });
  }
};

// Delete a product (admin control)
export const deleteBuyProduct = async (req, res) => {
  try {
    const product = await BuyProduct.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product", details: error.message });
  }
};
