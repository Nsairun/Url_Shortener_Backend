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

  async getUrlByShortUrl(short_url) {
    const url = await this.urlRepo.getUrlByShortUrl(short_url);
    return url;
  }

  async getUrlByUserId(id) {
    const userUls = await this.urlRepo.getUrlByUserId(id);
    return userUls;
  }

  async registerUrl(incoming) {
    try {
      const newUrl = await this.urlRepo.createUrl({
        ...incoming,
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
}

module.exports = UrlService;
