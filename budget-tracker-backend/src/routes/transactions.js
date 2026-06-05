import express from 'express';
import authMiddleware from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import { 
  createTransaction, 
  getTransactions, 
  updateTransaction, 
  deleteTransaction 
} from '../controllers/transactions.js';

const router = express.Router();

router.use(authMiddleware); 

router.route('/')
  .get(getTransactions)
  .post((req, res, next) => {
    upload.single('image')(req, res, (err) => {
      if (err) {
        
        console.error("--- RAW CLOUDINARY/MULTER ERROR ---", err);
        
        return res.status(400).json({ 
          status: "Error",
          message: "Upload failed.",
          raw_error: err.message 
        });
      }
      next();
    });
  }, createTransaction);

router.route('/:id')
  .put(updateTransaction)
  .delete(deleteTransaction);

export default router;
