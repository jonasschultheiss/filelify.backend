const express = require('express');
const validator = require('express-joi-validation').createValidator({});
const Joi = require('@hapi/joi');

const {
  uploadFile,
  uploadProfilePicture,
  listFiles,
  renameFile,
  removeFile,
  downloadFile
} = require('../usecases/files');
const makeSecureRoute = require('../middleware/makeSecureRoute');
const db = require('../db');
const jwtVerify = require('../middleware/jwtVerify');
const { id } = require('./../schemas');

const fileRouter = express.Router();
// const fileController = require('../controllers/fileController');

const idAndKeyValidation = Joi.object({
  id: Joi.number()
    .min(1)
    .required(),
  key: Joi.string()
    .min(1)
    .required()
});

fileRouter.post(
  '/:id/files/upload',
  validator.params(id),
  jwtVerify,
  makeSecureRoute(false),
  uploadFile,
  (req, res) =>
    res
      .status(200)
      .json({ message: `successfully uploaded ${req.file.originalname}!` })
);

fileRouter.post(
  '/:id/profilePicture',
  validator.params(id),
  jwtVerify,
  makeSecureRoute(false),
  uploadProfilePicture,
  (req, res) => {
    db.users.patchProfilePicturePath(req.params.id, req.file.location);
    res
      .status(200)
      .json({ message: `successfully uploaded ${req.file.originalname}!` });
  }
);

fileRouter.delete(
  '/:id/files/:key',
  validator.params(idAndKeyValidation),
  jwtVerify,
  makeSecureRoute(false),
  async (req, res) => {
    await removeFile(decodeURI(req.params.key));
    res.status(204).send();
  }
);

fileRouter.patch(
  '/:id/files/:oldKey/:newKey',
  validator.params(
    Joi.object({
      oldKey: Joi.string()
        .min(1)
        .required(),
      newKey: Joi.string()
        .min(1)
        .required(),
      id: Joi.string()
        .min(1)
        .required()
    })
  ),
  jwtVerify,
  makeSecureRoute(false),
  async (req, res) => {
    await renameFile(
      req.params.id,
      decodeURI(req.params.oldKey),
      decodeURI(req.params.newKey)
    );
    res.status(204).send();
  }
);

fileRouter.get(
  '/:id/files',
  validator.params(id),
  jwtVerify,
  makeSecureRoute(false),
  async (req, res) => {
    const data = await listFiles(30);
    res.status(200).json(data);
  }
);

fileRouter.get(
  '/:id/files/:key',
  validator.params(idAndKeyValidation),
  jwtVerify,
  makeSecureRoute(false),
  async (req, res) => {
    downloadFile(decodeURI(req.params.key), res);
  }
);

module.exports = fileRouter;
