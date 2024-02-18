const mongoose = require('mongoose');

// Access MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI;

// Function to connect to MongoDB
async function connectToMongoDB() {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Export the function to be used in other modules or main file
module.exports = connectToMongoDB;
