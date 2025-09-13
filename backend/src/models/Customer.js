import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: String,
    company: String,
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

customerSchema.index({ name: 'text', email: 'text' });

export default mongoose.model('Customer', customerSchema);
