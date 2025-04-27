// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     fullName: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },
//     otpCode: {
//       type: Number,
//       minlength: 6,
//     },
//     otpExpires: { type: Date },
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);

// export default User;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    imageUrl: {
      type: String,
      default: "", // Optional: set default empty string if user doesn't upload
    },
    otpCode: {
      type: Number,
      minlength: 6,
    },
    otpExpires: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
