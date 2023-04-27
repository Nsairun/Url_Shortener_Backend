const VisitorRepository = require("./visitor.repo");

class VisitorService {
  constructor() {
    this.visitorRepo = new VisitorRepository();
  }

  async getAllVisitors() {
    const allVisitors = await this.visitorRepo.getAllVisitors();
    return allVisitors;
  }

  async getOneVisitor(id) {
    const visitor = await this.visitorRepo.getVisitorById(id);
    return visitor;
  }

  async registerOneVisitor(visitor) {
    try {
      const duplicateVisitor = await this.visitorRepo.getAllByIp(visitor.ip_address, visitor.UrlId);

      if (duplicateVisitor.length > 0) {
        console.log('\n this duplicateVisitor \n', duplicateVisitor[0].dataValues)

        await this.visitorRepo.updateVisitor(visitor, duplicateVisitor[0].id);
        return 208;
      }

      await this.visitorRepo.createOneVisitor(visitor);

      return 202;
    } catch (e) {
      return e;
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
