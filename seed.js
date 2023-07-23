import mongoose from 'mongoose';
import User from './models/user.js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

function connectToMongoDB() {

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.edwk7gv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
.then(async () => {
  console.log('💿 Database connected to Mongo Db Atlas');

  // Check if user already exists
  const existingUser = await User.findOne({ username: 'boro' });

  // If the user does not exist, create a new one
  if (!existingUser) {
    const user = new User({ username: 'boro', password: '123' });
    user.save()
      .then(() => {
        console.log('User boro created');
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    console.log('User boro already exists');
  }
})
.catch(error => console.error(error));
}

export default connectToMongoDB;