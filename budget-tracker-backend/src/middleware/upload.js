import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// Setup parameters for incoming transaction images
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'budget_tracker_receipts', // Name of the folder that will appear in Cloudinary
    resource_type: 'auto'
  },
});

const upload = multer({ storage: storage });

export default upload;
