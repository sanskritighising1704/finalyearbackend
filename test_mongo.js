import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => { console.log('SYNC_OK'); process.exit(0); })
  .catch(err => { console.error('SYNC_ERROR:', err.message); process.exit(1); });
