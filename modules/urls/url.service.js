const UrlRepository = require("./url.repo");
const uuid = require("uuid");

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

  async registerUrl(long_url) {
    try {
      const short_url = uuid.v4();
      const newUrl = await this.urlRepo.createUrl({
        long_url,
        short_url,
      });

      return newUrl;
    } catch (err) {
      throw new Error("COULD_NOT_REGISTER_URL");
    }
  }

  async deleteOneUrl(id) {
    try {
      await this.urlRepo.dropUrl(id);
    } catch {
      throw new Error("COULD_NOT_DELETE_URL");
    }
  }
}

module.exports = UrlService;
