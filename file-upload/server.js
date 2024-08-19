const express = require('express');
const app = express();

app.use(express.static('public'));

// Import statements for path, mime-type, and multer
const path = require('path');
const mime = require('mime-types');
const multer = require('multer');

// Define allowed image MIME types
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

// Use multer to support file upload feature
const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the destination
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

// File filter function to check for image files only
const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Invalid file type. Only images are allowed.'), false); // Reject file
    }
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

// File upload route
app.post('/uploads', upload.single('myFile'), (req, res) => {
    if (req.file) {
        // File uploaded successfully
        res.sendFile(path.join(__dirname, 'file-uploaded.html'));
    } else {
        // This should never be reached because fileFilter should handle invalid files
        res.status(400).json({ error: 'Invalid file type. Only images are allowed.' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err) {
        if (err instanceof multer.MulterError) {
            // Multer-specific error
            res.status(400).json({ error: err.message });
        } else {
            // Generic error
            res.status(400).json({ error: 'An error occurred: ' + err.message });
        }
    } else {
        next();
    }
});

app.get('/file-upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'file-upload.html'));
});

app.listen(3010, () => console.log('Listening on Port 3005'));
