const mongoose = require('mongoose');

// MongoDB URI (replace with your own MongoDB URI)
const mongoURI = 'mongodb://localhost:27017/your-database-name'; // Use your MongoDB URI here

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectDB;
