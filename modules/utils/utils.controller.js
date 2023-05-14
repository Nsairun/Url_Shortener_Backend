const VisitorController = require("../visitor/visitor.controller");
const UtilService = require("./utils.service");
const MyCache = require("node-cache");
const urlCache = new MyCache({ stdTTL: 2400 }); // stdTTL === 40 minutes

class UtilController {
  constructor() {
    this.utilService = new UtilService();
    this.visitorController = new VisitorController();
  }

  async login(req, res) {
    const { email_address, password } = req.body;

    await this.utilService
      .loginWithEmailPassword(email_address, password)
      .then((result) => {
        let { user, token } = result;
        delete user.password;
        delete user.deletedAt;
        delete user.updatedAt;
        result.user = user;

        res.send({ user, token });
      })
      .catch((err) => res.status(401).send(err.toLocaleString()));
  }

  getCurrentUser(req, res) {
    let { user, userUrls } = req;
    delete user.password;
    delete user.deletedAt;
    delete user.updatedAt;

    res.status(200).send({ user, userUrls });
  }

  async redirectOneUrl(req, res) {
    if (urlCache.has(req.params.short_url)) {
      res.status(200).redirect(urlCache.get(req.params.short_url));
      await this.visitorController.createOneVisitor(req, req.params.short_url);
      return;
    }

   await this.utilService
      .getLongUrl(req.params.short_url)
      .then(({ statusCode, long_url }) => {
        urlCache.set(req.params.short_url, long_url);
        res.status(statusCode).redirect(long_url);
      })
      .then(
        async () =>
          await this.visitorController
            .createOneVisitor(req, req.params.short_url)
      )
      .catch((err) => res.status(404).send(err.toLocaleString()));
  }
}

module.exports = UtilController;
