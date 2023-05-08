const { SuperfaceClient, err } = require("@superfaceai/one-sdk");
const VisitorService = require("./Visitor.service");
const UrlService = require("../urls/url.service");

const sdk = new SuperfaceClient();

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
    const profile = await sdk.getProfile("address/ip-geolocation");

    const result = await profile
      .getUseCase("IpGeolocation")
      .perform({ ip_address });

    try {
      const data = result.unwrap();
      return data;
    } catch (error) {
      return { addressCountry: "unkown", addressLocality: "unkown" };
    }
  }

  async createOneVisitor(req, short_url) {
    try {
      await this.getUserLocation(req.socket.remoteAddress || req.ip).then(
        async ({ addressCountry, addressLocality }) => {
          await this.urlService
            .getUrlByShortUrl(short_url)
            .then(async (res) => {
              const url = res.dataValues || res;
              const visitor = {
                location: addressCountry + "-" + addressLocality,
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
      throw err
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
