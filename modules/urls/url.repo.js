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
}

module.exports = UrlRepository;
