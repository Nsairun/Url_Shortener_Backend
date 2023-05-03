const { where } = require("sequelize");
const Url = require("../../models/urlModel");

class UrlRepository {
  getAllUrls() {
    return Url.findAll();
  }

  getUrlById(id) {
    return Url.findByPk(id);
  }

  createUrl(url) {
    return Url.create(url);
  }

  dropUrl(id) {
    return Url.destroy({ where: { id } });
  }

  getByShortUrl(short_url) {
    return Url.findOne({ where: { short_url } })
  }
}

module.exports = UrlRepository;
