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
      const short_url = incoming.long_url.includes("https")
        ? incoming.long_url.split("https://").pop().split("/").shift()
        : incoming.long_url.split("http://").pop().split("/").shift();

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
}

module.exports = UrlService;
