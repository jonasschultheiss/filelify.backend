const ping = async (req, res) => {
  res.send('system is up and running.');
};

module.exports = { ping };
