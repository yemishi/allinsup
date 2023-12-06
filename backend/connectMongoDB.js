const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose.connect(process.env.MONGODB_CONNECT_URL)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.error(`Connection failed: ${error.message}`);
  });
};

module.exports = connectDB;