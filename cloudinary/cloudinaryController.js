const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your cloud name, API key, and API secret
cloudinary.config({
  cloud_name: 'notesprofile',
  api_key: '856458821284876',
  api_secret: 'gPVB-y1tMv7Zg-PPHmOPqF-brdk',
});

// Controller function for uploading an image to Cloudinary
const uploadImage = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    // Upload the image to Cloudinary
    const image = req.files.image;

    const result = await cloudinary.uploader.upload(image.tempFilePath);

    // Send the Cloudinary image URL as a response
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ message: 'Image upload failed' });
  }
};

module.exports = {
  uploadImage,
};
