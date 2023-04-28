const { head } = require("../../routes/visitors");
const VisitorService = require("./Visitor.service");

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

  async createOneVisitor(req, res) {
    const visitor = {
      location: "Kamer-Ngola",
      ip_address: req.socket.remoteAddress || req.ip,
      time_clicked: new Date().toLocaleString(),
      browser: req.headers["user-agent"],
      UrlId: +req.body.url_id,
    };

    this.visitorService
      .registerOneVisitor(visitor)
      .then((statusCode) => res.sendStatus(statusCode))
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
