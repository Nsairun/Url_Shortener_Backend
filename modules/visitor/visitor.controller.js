const IPGeolocationAPI = require("ip-geolocation-api-javascript-sdk");
const GeolocationParams = require("ip-geolocation-api-javascript-sdk/GeolocationParams");

const VisitorService = require("./Visitor.service");
const UrlService = require("../urls/url.service");
const { IPGEOLOCATION_API_KEY } = require("../services/constant");

class VisitorController {
  constructor() {
    this.visitorService = new VisitorService();
    this.urlService = new UrlService();
  }

  async getAllVistors(_, res) {
    const allVisitors = await this.visitorService.getAllVisitors();

    if (allVisitors.length <= 0) return res.sendStatus(404);

    res.status(200).send(allVisitors);
  }

  async getVisitorsByUrlId(req, res) {
    const visitor = await this.visitorService.getVisitorsByUrlId(
      +req.params.id
    );

    if (!visitor) return res.sendStatus(404);

    res.status(200).send(visitor);
  }

  async getUserLocation(ip_address) {
    function handleResponse(json) {
      // i prolly could still write a call back in ipgeolocatinApi.getGeolocation(handleResponse, geolocationParams);
      if (!(country_name && city)) {
        res.country_name = "Unkown";
        res.city = "unkown";
        return;
      }

      res = json;
    }
    let res = {};

    const ipgeolocatinApi = new IPGeolocationAPI(IPGEOLOCATION_API_KEY, false);

    const geolocationParams = new GeolocationParams();
    geolocationParams.setIPAddress(ip_address);

    ipgeolocatinApi.getGeolocation(handleResponse, geolocationParams);

    return res;
  }

  async createOneVisitor(req, short_url) {
    try {
      await this.getUserLocation(req.socket.remoteAddress || req.ip).then(
        async ({ country_name, city }) => {
          await this.urlService
            .getUrlByShortUrl(short_url)
            .then(async (res) => {
              const url = res.dataValues || res;
              const visitor = {
                location: country_name + "-" + city,
                ip_address: req.socket.remoteAddress || req.ip,
                time_clicked: new Date().toLocaleString(),
                browser: req.headers["user-agent"],
                UrlId: url.id,
              };

              await this.visitorService.registerOneVisitor(visitor);
            });
        }
      );
    } catch (err) {
      throw err;
    }
  }

  async deleteOneVisitor(req, res) {
    this.visitorService
      .deleteOneVisitor(+req.params.id)
      .then((statusCode) => res.sendStatus(statusCode))
      .catch((err) => res.status(500).send(err.toLocaleString()));
  }
}

module.exports = VisitorController;
