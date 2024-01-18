const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ElectronicShop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Continue with your code here
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error);
  });





