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
  res.send('signIn');
};

module.exports = {
  signUp,
  signIn
};
