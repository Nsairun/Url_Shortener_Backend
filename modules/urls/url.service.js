const UrlRepository = require("./url.repo");
const shortid = require("shortid");
const crypto = require("crypto");
const validUrl = require("valid-url");

class UrlService {
  constructor() {
    this.urlRepo = new UrlRepository(); // i've put all my sequelize functions in urlRepository().. things like findByPk(), findOne(), create(), update(), destroy()...
  }

  async getAllUrls() {
    const allUrls = await this.urlRepo.getAllUrls();
    return allUrls;
  }

  async getOneUrl(id) {
    const url = await this.urlRepo.getUrlById(id);
    return url;
  }

  async registerUrl(incoming) {
    if (!validUrl.isUri(incoming.long_url)) {
      throw new Error("NOT_A_VALID_URL");
    }

    try {
      const short_url = shortid.generate();
      // const short_url = crypto.randomBytes(Math.floor(Math.random() * 4) + 1).toString('hex');

      const newUrl = await this.urlRepo.createUrl({
        ...incoming,
        short_url,
      });

      return newUrl;
    } catch {
      throw new Error("COULD_NOT_REGISTER_URL");
    }
  }

  async deleteOneUrl(id) {
    try {
      const url = await this.getOneUrl(id);
      if (!url) return 404;

      await this.urlRepo.dropUrl(id);
      return 202;
    } catch {
      throw new Error("COULD_NOT_DELETE_URL");
    }
  }

  async getLongUrl(short) {
    try {
      const { long_url } = await this.urlRepo.getByShortUrl(short);

      if (!long_url) throw new Error("NO_URL");

      return long_url;
    } catch {
      throw new Error("COULD_NOT_REDIRECT");
    }
  }
}

module.exports = UrlService;
