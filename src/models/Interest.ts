import { Schema, model } from 'mongoose';

const InterestSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // store image URL or file path
      // required: true,
      default: null,
    },
    status: {
      type: Boolean,
      default: true, // active/inactive
    },
  },
  {
    timestamps: true, // ✅ createdAt & updatedAt auto
  }
);

export const Interest = model('Interest', InterestSchema);