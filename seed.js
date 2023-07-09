import mongoose from 'mongoose';
import User from './models/user.js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

function connectToMongoDB() {

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.edwk7gv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
  .then(() => {
    console.log('💿 Database connected to Mongo Db Atlas');
    // const user = new User({ username: 'alexboro', password: '746shs6as&sdasd+a' });
    const user = new User({ username: '12', password: '123' });

    // const userExists = await User.findOne({ username: 'alexboro' });
    // user.save()
    //   .then(() => {
    //     console.log('User created');
    //     mongoose.connection.close();
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     mongoose.connection.close();
    //   });
  })
  .catch(error => console.error(error));
}

export default connectToMongoDB;