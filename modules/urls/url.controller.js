const UrlService = require("./url.service");

class UrlController {
  constructor() {
    this.urlService = new UrlService(); // all the methods using this.urlService are methods from the urlService class
  }

  async getAllUrls(_, res) {
    const allUrls = await this.urlService.getAllUrls();

    if (allUrls.length <= 0) return res.sendStatus(404);

    res.status(200).send(allUrls);
  }

  async getOneUrl(req, res) {
    const url = await this.urlService.getOneUrl(+req.params.id);

    if (!url) return res.sendStatus(404);

    res.status(200).send(url);
  }

  async getUrlByUserId(req, res) {
    const userUrls = await this.urlService.getUrlByUserId(+req.params.UserId);

    if (userUrls.length <= 0) return res.sendStatus(404);

    res.status(200).send(userUrls);
  }

  createOneUrl(req, res) {
    const { long_url, short_url, UserId } = req.body;

    if (!long_url || !short_url) {
      return res.sendStatus(406); // not acceptable
    }

    this.urlService
      .registerUrl({ long_url, short_url, UserId })
      .then((url) => res.status(201).send(url))
      .catch((err) => res.status(500).send(err.toLocaleString()));
  }

  deleteOneUrl(req, res) {
    this.urlService
      .deleteOneUrl(+req.params.id)
      .then((statusCode) => res.sendStatus(statusCode))
      .catch((err) => res.status(500).send(err.toLocaleString()));
  }
}

module.exports = UrlController;
