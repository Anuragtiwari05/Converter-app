import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

// ✅ Explicitly set _id type to Types.ObjectId
export interface UserDocument extends IUser, Document {
  _id: Types.ObjectId;
}

const UserSchema: Schema<UserDocument> = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 10,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: 6,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const User: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default User;
