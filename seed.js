import mongoose from 'mongoose';
import User from './models/user.js';

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const user = new User({ username: 'alexboro', password: '746shs6as&sdasd+a' });
    user.save()
      .then(() => {
        console.log('User created');
        mongoose.connection.close();
      })
      .catch(error => {
        console.error(error);
        mongoose.connection.close();
      });
  })
  .catch(error => console.error(error));