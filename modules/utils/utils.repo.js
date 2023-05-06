const Url = require("../../models/urlModel");

class UtilRepository {
  getShortUrl(short_url) {
    return Url.findOne({ where: { short_url } });
  }
}

module.exports = UtilRepository;