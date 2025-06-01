import mongoose, { Schema, Document, models } from "mongoose";

export interface IUserDocument extends Document {
  userId: string;
  userImage: string;
  firstName: string;
  lastName?: string;
  address?: string;
  education?: string;
  about?: string;
  shop?: {
    name: string;
    description: string;
    location: string;
    verified: boolean;
  };
  backgroundPhoto?: string;
  posts?: { text: string; date: string }[];
}

const ShopSchema = new Schema(
  {
    name: String,
    description: String,
    location: String,
    verified: Boolean,
  },
  { _id: false }
);

const PostSchema = new Schema(
  {
    text: String,
    date: String,
  },
  { _id: false }
);

const UserSchema = new Schema<IUserDocument>(
  {
    userId: { type: String, required: true, unique: true },
    userImage: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    address: { type: String },
    education: { type: String },
    about: { type: String },
    shop: { type: ShopSchema },
    backgroundPhoto: { type: String },
    posts: { type: [PostSchema], default: [] },
  },
  { timestamps: true }
);

export const User = models.User || mongoose.model<IUserDocument>("User", UserSchema); 