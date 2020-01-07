const usecases = require('../usecases');

const getUser = async (req, res) => {
  const user = await usecases.getUser(req.params);
  res.status(200).json(user);
};

const listUsers = async (req, res) => {
  res.status(501);
  res.send('not implemented yet');
};

const patchUser = async (req, res) => {
  try {
    await usecases.patchUser(req.params, req.body);
    res.send(204).send();
  } catch (err) {
    res.status(500).send();
  }
};

const getPermissions = async (req, res) => {
  res.status(501);
  res.send('not implemented yet');
};

const patchPermissions = async (req, res) => {
  res.status(501);
  res.send('not implemented yet');
};

const deleteUser = async (req, res) => {
  res.status(501);
  res.send('not implemented yet');
};

module.exports = {
  getUser,
  listUsers,
  patchUser,
  getPermissions,
  patchPermissions,
  deleteUser
};
