const VisitorService = require("./Visitor.service");
const UrlService = require("../urls/url.service");

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

  async getVisitorsByUrlIdOrshort(req, res) {
    const data = await this.visitorService.getVisitorsByUrlIdOrshort(
      req.params.id
    );

    if (!(data.visitors && data.url)) return res.sendStatus(404);

    res.status(200).send(data);
  }

  async createOneVisitor(req, short_url) {
    return this.visitorService
      .getUserLocation(req.socket.remoteAddress || req.ip)
      .then(async ({ country_name, city }) => {
        await this.urlService.getUrlByShortUrl(short_url).then(async (res) => {
          const url = res.dataValues || res;
          const visitor = {
            location: (country_name || "Unknown") + " - " + (city || "unknown"),
            ip_address: req.ip || req.socket.remoteAddress,
            time_clicked: new Date().toLocaleString(),
            browser: req.headers["user-agent"] || "unknown-browser",
            UrlId: url.id,
          };

          await this.visitorService.registerOneVisitor(visitor);
          return visitor;
        });
      });
  }

  async deleteOneVisitor(req, res) {
    this.visitorService
      .deleteOneVisitor(+req.params.id)
      .then((statusCode) => res.sendStatus(statusCode))
      .catch((err) => res.status(500).send(err.toLocaleString()));
  }
}

module.exports = VisitorController;
