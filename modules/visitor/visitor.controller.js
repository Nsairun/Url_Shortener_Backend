const { SuperfaceClient } = require("@superfaceai/one-sdk");
const VisitorService = require("./Visitor.service");

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

  async getUserLocation(req, res, visitor) {
    const profile = await sdk.getProfile("address");
    const result = await profile.getUseCase("IpGeolocation").perform(
      {
        ipAddress: visitor.ip_address,
      },
      {
        provider: "ipdata",
        security: {
          apikey: {
            apikey: "myapikeyblablabla",
          },
        },
      }
    );

    try {
      const data = result.unwrap();
      return data;
    } catch {
      throw new Error("AN_ERRO_OCCURED_WHILE_GETTING_INFO");
    }

    const ip = req.ip;
    res.send({ ip });
  }

  async createOneVisitor(req, res) {
    const visitor = {
      location: "Kamer-Ngola",
      ip_address: req.socket.remoteAddress || req.ip,
      time_clicked: new Date().toLocaleString(),
      browser: req.headers["user-agent"],
      UrlId: +req.body.url_id,
    };

    this.getUserLocation(req, res, visitor);

    return;

    this.visitorService
      .registerOneVisitor(visitor)
      .then((statusCode) => res.send(statusCode))
      .catch((err) => res.status(500).send(err.toLocaleString()));
  }

  async deleteOneVisitor(req, res) {
    this.visitorService
      .deleteOneVisitor(+req.params.id)
      .then((statusCode) => res.sendStatus(statusCode))
      .catch((err) => res.status(500).send(err.toLocaleString()));
  }
}

module.exports = VisitorController;
