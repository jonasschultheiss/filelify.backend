const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const config = require('../commons/config');

aws.config.update({
  accessKeyId: config.AWS.ACCESS_KEY_ID,
  secretAccessKey: config.AWS.SECRET_ACCESS_KEY
});

const spacesEndpoint = new aws.Endpoint(config.AWS.ENDPOINT);
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

const uploadFile = multer({
  storage: multerS3({
    s3,
    bucket: config.AWS.BUCKET_NAME,
    acl: 'bucket-owner-full-control',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const fullPath = `${req.params.id}/${file.originalname}`;
      cb(null, fullPath);
    }
  })
}).single('file');

const imageFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadProfilePicture = multer({
  storage: multerS3({
    s3,
    bucket: config.AWS.BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    fileFilter: imageFilter,
    limits: {
      fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
    },
    key: (req, file, cb) => {
      const fullPath = `_profilePictures/${req.params.id}`;
      cb(null, fullPath);
    }
  })
}).single('file');

const listFiles = async id => {
  const params = {
    Bucket: config.AWS.BUCKET_NAME,
    Delimiter: '/',
    Prefix: `${id}/`
  };

  return s3.listObjectsV2(params).promise();
};

const renameFile = async (id, key, newKey) => {
  const renamedKey = `${id}/${newKey}`;
  console.log({ key, renamedKey });
  return s3
    .copyObject({
      Bucket: config.AWS.BUCKET_NAME,
      CopySource: `${config.AWS.BUCKET_NAME}/${key}`,
      Key: renamedKey
    })
    .promise()
    .then(() => {
      s3.deleteObject({
        Bucket: config.AWS.BUCKET_NAME,
        Key: key
      }).promise();
    });
};

const removeFile = async key => {
  return s3
    .deleteObject({
      Bucket: config.AWS.BUCKET_NAME,
      Key: key
    })
    .promise();
};

const downloadFile = (key, res) => {
  s3.getObject({ Bucket: config.AWS.BUCKET_NAME, Key: key })
    .on('httpHeaders', function(statusCode, headers) {
      res.set('Content-Length', headers['content-length']);
      res.set('Content-Type', headers['content-type']);
      this.response.httpResponse.createUnbufferedStream().pipe(res);
    })
    .send();
};

// delete

module.exports = {
  uploadFile,
  uploadProfilePicture,
  listFiles,
  renameFile,
  removeFile,
  downloadFile
};
