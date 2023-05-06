const { where } = require("sequelize");
const Url = require("../../models/urlModel");

class UrlRepository {
  getAllUrls() {
    return Url.findAll();
  }

  getUrlById(id) {
    return Url.findByPk(id);
  }

  getUrlByUserId(userId) {
    return Url.findAll({ where: { userId } });
  }

  createUrl(url) {
    return Url.create(url);
  }

  dropUrl(id) {
    return Url.destroy({ where: { id } });
  }
}

module.exports = UrlRepository;
