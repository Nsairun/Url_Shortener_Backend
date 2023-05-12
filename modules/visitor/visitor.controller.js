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

  // function handleResponse(json) {
  //   // i prolly could still write a call back in ipgeolocationApi.getGeolocation(handleResponse, geolocationParams);
  //   const { country_name, city } = json;

  //   res = { country_name, city };

  //   console.log("\n this json", res, "\n");
  // }

  async getUserLocation(ip_address) {
    let res = {};

    const ipgeolocationApi = new IPGeolocationAPI(IPGEOLOCATION_API_KEY, false);

    const geolocationParams = new GeolocationParams();
    geolocationParams.setIPAddress(ip_address);

    ipgeolocationApi.getGeolocation((json) => {
      const { country_name, city } = json;

       res = { country_name, city };
    }, geolocationParams);

    return res;
  }

  async createOneVisitor(req, short_url) {
    try {
      await this.getUserLocation(req.socket.remoteAddress || req.ip).then(
        async ({ country_name, city }) => {
          console.log(3);
          await this.urlService
            .getUrlByShortUrl(short_url)
            .then(async (res) => {
              const url = res.dataValues || res;
              const visitor = {
                location:
                  (country_name || "Cameroon") + "-" + (city || "Yaounde"),
                ip_address: req.ip || req.socket.remoteAddress,
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
