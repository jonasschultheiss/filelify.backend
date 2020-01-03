const validationErrorHandler = (err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    console.log('should');
    res.status(400).json({
      type: err.type,
      message: err.error.toString()
    });
  } else {
    console.log('should not');
    next(err);
  }
};

module.exports = validationErrorHandler;
