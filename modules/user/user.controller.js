const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const getAllUsers = async (_, res) => {
  const users = await User.findAll();
  res.status(200).send(users);
}

const createOneUser = async (req, res) => {
  const {user_name, password, email_address} = req.body;

  if(!(user_name && password && email_address)) return res.status(406).send('{ Missing User Info }');

  const duplicateUser = await User.findOne({ where : { email_address } });

  if(duplicateUser) return res.status(409).send('{ user already exits }');

  bcrypt.hash(password, +process.env.SALT_ROUNDS, async (err, hash) => {
    if (err) return res.status(500).send(err);

    const newUser = await User.create({
      user_name,
      email_address,
      password: hash,
      api_key: uuid.v4(),
    });

    res.status(201).send(newUser);
  });
}

const patchOneUser = async (req, res) => {
  const user = await User.findOne({ where: { id: +req.params.id } });

  if(!user) return res.status(401).send('{ user does not exist }');

  await User.update(req.body, { where: { id: +req.params.id } });

  const updatedUser = await User.findOne({ where: { id: req.params.id } });

  res.status(202).send(updatedUser);
}

const deleteOneUser = async (req, res) => {
  await User.destroy({ where: { id: +req.params.id } });

  return res.sendStatus(202);
}
