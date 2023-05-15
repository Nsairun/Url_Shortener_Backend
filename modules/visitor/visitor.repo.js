const Visitor = require("../../models/visitors");
const { Op } = require("sequelize");

class VisitorRepository {
  getAllVisitors() {
    return Visitor.findAll();
  }

  getOneByIpAndUrldId(ip_address, UrlId, browser) {
    return Visitor.findOne({
      where: {
        [Op.and]: [{ ip_address }, { UrlId }, { browser }],
      },
    });

    //this defaults to the above Visitor.findOne({ where: { ip_address, UrlId } });
  }

  getVisitorsByUrlId(UrlId) {
    return Visitor.findAll({ where: { UrlId } });
  }

  updateVisitor(visitor, id) {
    return Visitor.update(visitor, { where: { id } });
  }

  createOneVisitor(visitor) {
    return Visitor.create(visitor);
  }

  dropOneVisitor(id) {
    return Visitor.destroy({ where: { id } });
  }
}

module.exports = VisitorRepository;
