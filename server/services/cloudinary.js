// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true


// Require the dotenv library
require('dotenv').config();

// Configure cloudinary using environment variables
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});

// Log the configuration
console.log(cloudinary.config());


/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imageBuffer) => {
    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
        asset_folder: 'aarambh',
        format: 'avif',
        quality: 'auto:good',
        fetch_format: 'auto', // Auto-deliver best format per browser
        flags: 'progressive', // Progressive JPEG loading
    };

    try {
        // Upload the image using upload_stream for buffer data
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                options,
                (error, result) => {
                    if (error) {
                        console.error(error);
                        reject(error);
                    } else {
                        console.log(result);
                        resolve(result);
                    }
                }
            ).end(imageBuffer);
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = {
    uploadImage
}

