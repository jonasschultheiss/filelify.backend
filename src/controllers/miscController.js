const ping = async (req, res) => {
  res.send('system is up and running.');
};

const test = async (req, res) => {
  res.status(500);
  res.send('test route');
};

module.exports = {
  ping,
  test
};
