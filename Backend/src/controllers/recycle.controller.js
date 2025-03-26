import { Recycling } from "../models/recycle.model.js";

// Create a new recycling record
export const createRecycling = async (req, res) => {
  try {
    const recycling = new Recycling(req.body);
    await recycling.save();
    res.status(200).json(recycling);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all recycling records
export const getAllRecycling = async (req, res) => {
  try {
    const records = await Recycling.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single recycling record
export const getRecyclingById = async (req, res) => {
  try {
    const record = await Recycling.findById(req.params.id);
    if (!record) return res.status(404).json({ error: 'Record not found' });
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a recycling record
export const updateRecycling = async (req, res) => {
  try {
    const updatedRecord = await Recycling.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecord) return res.status(404).json({ error: 'Record not found' });
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a recycling record
export const deleteRecycling = async (req, res) => {
  try {
    const deletedRecord = await Recycling.findByIdAndDelete(req.params.id);
    if (!deletedRecord) return res.status(404).json({ error: 'Record not found' });
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
