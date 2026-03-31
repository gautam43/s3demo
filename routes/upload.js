const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// AWS config
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
    };

    const data = await s3.upload(params).promise();

    res.json({
      message: 'File uploaded successfully',
      url: data.Location,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;