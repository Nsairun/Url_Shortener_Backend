const UrlRepository = require("../urls/url.repo");
const VisitorRepository = require("./visitor.repo");

class VisitorService {
  constructor() {
    this.visitorRepo = new VisitorRepository();
    this.urlRepo = new UrlRepository();
  }

  async getAllVisitors() {
    const allVisitors = await this.visitorRepo.getAllVisitors();
    return allVisitors;
  }

  async getVisitorsByUrlId(UrlId) {
    const visitor = await this.visitorRepo.getVisitorByUrlId(UrlId);
    return visitor;
  }

  async registerOneVisitor(visitor) {
    try {
      // const duplicateVisit = await this.visitorRepo.getOneByIpAndUrldId(
      //   visitor.ip_address,
      //   visitor.UrlId
      // );

      await this.urlRepo.getUrlById(visitor.UrlId).then((url) => {
        const newUrl = url.dataValues || url;
        newUrl.clicks += 1;

        this.urlRepo.updateUrlClicks(newUrl, newUrl.id);
      });

      // if (duplicateVisit.location && duplicateVisit.time_clicked) {
      //   await this.visitorRepo.updateVisitor(visitor, duplicateVisit.id);
      //   return 208;
      // }

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
}

module.exports = VisitorService;
