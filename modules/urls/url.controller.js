const URL = require('../../models/urlModel');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const Url = require('../../models/urlModel');

const getAllUrl = async (_, res) => {
  const urls = await URL.findAll();
  res.status(200).send(urls);
}

const createOneUrl = async (req, res) => {
  const {long_url} = req.body;

  if(!long_url) return res.status(406).send('{ no url }');

  // const shortUrl =  function_to_shorten_url(long_url);

  // res.status(202).send(shortUrl);
}

const deleteOneUrl = async (req, res) => {
  await Url.destroy({ where: { id: +req.params.id } });

  return res.sendStatus(202);
}