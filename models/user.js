import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.checkPassword = async function(password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

UserSchema.statics.authenticate = async function(username, password, done) {
  try {
    const user = await this.findOne({ username });
    if (!user) {
      return done(null, false, { message: 'Invalid username' });
    }
    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return done(null, false, { message: 'Invalid password' });
    }
    return done(null, user);
  } catch (error) {
    done(error);
  }
};

const User = mongoose.model('User', UserSchema);

export default User;
