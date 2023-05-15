const IPGeolocationAPI = require("ip-geolocation-api-javascript-sdk");
const GeolocationParams = require("ip-geolocation-api-javascript-sdk/GeolocationParams");

const UrlRepository = require("../urls/url.repo");
const VisitorRepository = require("./visitor.repo");
const { IPGEOLOCATION_API_KEY } = require("../services/constant");

class VisitorService {
  constructor() {
    this.visitorRepo = new VisitorRepository();
    this.urlRepo = new UrlRepository();
  }

  async getAllVisitors() {
    const allVisitors = await this.visitorRepo.getAllVisitors();
    return allVisitors;
  }

  async getVisitorsByUrlIdOrshort(UrlIdOrShort) {
    let url = {};
    if (isNaN(UrlIdOrShort)) {
      // checking if UrlIdOrShort is not a number. atfirst i used this: if(!+new Number(UrlIdOrShort)) {...}
      url = await this.urlRepo.getUrlByShortUrl(UrlIdOrShort);
    } else url = await this.urlRepo.getUrlById(UrlIdOrShort);

    const visitors = (
      await this.visitorRepo.getVisitorsByUrlId(url.dataValues.id || url.id)
    ).map((visitor) => {
      const holder = visitor.dataValues || visitor;
      delete holder.ip_address;
      return holder;
    });

    return { visitors, url };
  }

  async registerOneVisitor(visitor) {
    try {
      await this.urlRepo.getUrlById(visitor.UrlId).then((url) => {
        const newUrl = url.dataValues || url;
        newUrl.clicks += 1;

        this.urlRepo.updateUrlClicks(newUrl, newUrl.id);
      });

      await this.visitorRepo.createOneVisitor(visitor);

      return 202;
    } catch {
      throw new Error("COULD_NOT_REGISTER_VISITOR");
    }
  }

  async deleteOneVisitor(id) {
    try {
      const visitor = await this.getOneVisitor(id);
      if (!visitor) return 404;

      await this.visitorRepo.dropOneVisitor(id);
      return 202;
    } catch {
      throw new Error("COULD_NOT_DELETE_VISITOR");
    }
  }

  getUserLocation(ip_address) {
    const ipgeolocationApi = new IPGeolocationAPI(IPGEOLOCATION_API_KEY, false);
    const geolocationParams = new GeolocationParams();
    geolocationParams.setIPAddress(ip_address);

    return new Promise((resolve) =>
      ipgeolocationApi.getGeolocation(resolve, geolocationParams)
    );
  }
}

module.exports = VisitorService;
