
import Transaction from '../models/Transaction.js';


export const createTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;
    
   
    if (!title || !amount || !type || !category) {
      return res.status(400).json({ message: "Please fill out all required fields: title, amount, type, category." });
    }

    
    const imageUrl = req.file ? req.file.path : null;

    const newTransaction = await Transaction.create({
      userId: req.userId, 
      title, 
      amount: Number(amount),
      type: type.toLowerCase().trim(), 
      category, 
      date: date || new Date(),
      image: imageUrl 
    });
    
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Failed to save transaction.' });
  }
};


export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId }).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch items.' });
  }
};


export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
   
    const itemExists = await Transaction.findOne({ _id: id, userId: req.userId });
    if (!itemExists) return res.status(404).json({ message: 'Item not found or unauthorized.' });

    const updatedData = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update item.' });
  }
};


export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const itemDeleted = await Transaction.findOneAndDelete({ _id: id, userId: req.userId });
    if (!itemDeleted) return res.status(404).json({ message: 'Item not found or unauthorized.' });

    res.status(200).json({ message: 'Transaction successfully removed.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove item.' });
  }
};
