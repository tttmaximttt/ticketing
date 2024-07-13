import mongoose from "mongoose";
import { Password } from "../utils/password";

interface UserAttrs {
  email: string;
  password: string;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
  toJSON: {
    versionKey: false,
    transform(doc: UserDoc, ret: any) {
      delete ret.password;

      ret.id = ret._id;
      delete ret._id;
    }
  }
});

userSchema.pre('save', async function (next) {
  if (this.isModified("password")) {
    const hashedPass = await Password.toHash(this.get('password'));
    this.set('password', hashedPass);
  }

  next();
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
