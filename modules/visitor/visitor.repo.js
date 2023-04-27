const Visitor = require("../../models/visitors");
const { Op } = require("sequelize");

class VisitorRepository {
  getAllVisitors() {
    return Visitor.findAll();
  }

  getAllByIpAndUrldId(ip_address, UrlId) {
    return Visitor.findAll({
      where: {
        [Op.and]: [{ ip_address }, { UrlId }],
      },
    });

    //this defaults to the above Visitor.findAll({ where: { ip_address, UrlId } });
  }

  getVisitorById(id) {
    return Visitor.findByPk(id);
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
