const usecases = require('../usecases');

const { logger, logLevels } = require('../commons/logging');

const signUp = async (req, res) => {
  try {
    const jwt = await usecases.signUp(req.body);
    res.status(201);
    res.json({ token: jwt });
  } catch (err) {
    logger.log({
      level: logLevels.ERROR,
      message: 'exception at authController:signUp',
      err
    });

    if (err.message === 'Name or Email already exist.') {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).send();
    }
  }
};

const signIn = async (req, res) => {
  try {
    const jwt = await usecases.signIn(req.body);
    res.status(200);
    res.json({ token: jwt });
  } catch (err) {
    logger.log({
      level: logLevels.ERROR,
      message: 'exception at authController:signIn',
      err
    });
    if (err.message === 'User not found.') {
      res.status(400).json({ message: err.message });
    } else if (err.message === 'Password not correct.') {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).send();
    }
  }
};

const refresh = async (req, res) => {
  try {
    const jwt = await usecases.refresh(req.body);
    res.status(200);
    res.json({ token: jwt });
  } catch (err) {
    logger.log({
      level: logLevels.ERROR,
      message: 'exception at authController:refresh',
      err
    });

    if (err.message === 'Token not provided.') {
      res.status(400).json({ message: err.message });
    } else if (err.message === 'Token not valid.') {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).send();
    }
  }
};

module.exports = {
  signUp,
  signIn,
  refresh
};
