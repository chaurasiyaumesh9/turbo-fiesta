import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  accountHolderName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  addressProof: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  idProof: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  photo: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  userType: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  }
});
UserSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// UserSchema.methods.validPassword = password => {
//   return bcrypt.compareSync(password, this.password);
// };
export = mongoose.model("User", UserSchema);
