const UrlRepository = require("./url.repo");

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

    try {
      const newUrl = await this.urlRepo.createUrl({
        ...incoming
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
      const { long_url } = await this.urlRepo.getShortUrl(short);

      if (!long_url) throw new Error("NO_URL");

      return { statusCode: 200, long_url };
    } catch {
      throw new Error("COULD_NOT_REDIRECT");
    }
  }
}

module.exports = UrlService;
