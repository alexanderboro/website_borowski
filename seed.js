import mongoose from 'mongoose';
import User from './models/user.js';

mongoose.connect('mongodb+srv://alexanderborowski:rlZbDr1lvxmUqNT7@cluster0.edwk7gv.mongodb.net/test?retryWrites=true&w=majority')
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

export default mongoose;