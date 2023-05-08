const { SuperfaceClient, err } = require("@superfaceai/one-sdk");
const VisitorService = require("./Visitor.service");
const { IPGEOLOCATION_API_KEY } = require("../services/constant");

const sdk = new SuperfaceClient();

class VisitorController {
  constructor() {
    this.visitorService = new VisitorService();
  }

  async getAllVistors(_, res) {
    const allVisitors = await this.visitorService.getAllVisitors();

    if (allVisitors.length <= 0) return res.sendStatus(404);

    res.status(200).send(allVisitors);
  }

  async getOneVistor(req, res) {
    const visitor = await this.visitorService.getOneVisitor(+req.params.id);

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

  async createOneVisitor(req, res) {
    await this.getUserLocation(req.socket.remoteAddress || req.ip)
      .then(({ addressCountry, addressLocality }) => {
        const visitor = {
          location: addressCountry + "-" + addressLocality,
          ip_address: req.socket.remoteAddress || req.ip,
          time_clicked: new Date().toLocaleString(),
          browser: req.headers["user-agent"],
          UrlId: +req.body.url_id,
        };

        this.visitorService
          .registerOneVisitor(visitor)
          .then((statusCode) => res.send(statusCode))
          .catch((err) => res.status(500).send(err.toLocaleString()));
      })
      .catch((err) => res.send(err.toLocaleString()));
  }

  async deleteOneVisitor(req, res) {
    this.visitorService
      .deleteOneVisitor(+req.params.id)
      .then((statusCode) => res.sendStatus(statusCode))
      .catch((err) => res.status(500).send(err.toLocaleString()));
  }
}

module.exports = VisitorController;
