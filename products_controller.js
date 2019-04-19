module.exports = {
  create(req, res, next) {
    const db = req.app.get("db"); //client sends in param, query, or body (how do I pass params for creating new? <input> ?
    const { name, description, price, image_url } = req.body;

    db.create_product([name, description, price, image_url])
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  getOne(req, res, next) {
    const db = req.app.get("db");
    const { id } = req.params;
    db.read_product([id])
      .then(product => {
        res.status(200).send(product);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  getAll: (req, res, next) => {
    const dbInstance = req.app.get("db");

    dbInstance
      .read_products()
      .then(products => res.status(200).send(products))
      .catch(err => {
        res.status(500).send({
          errorMessage:
            "Oops! Something went wrong. Our engineers have been informed!"
        });
        console.log(err);
      });
  },
  update(req, res, next) {
    const db = req.app.get("db");
    const { params, query } = req;
    db.update_product([params.id, query.desc]) //? how do I get description value ...from user in <input> ?
      .then(product => {
        res.status(200).send(product);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  delete(req, res, next) {
    const db = req.app.get("db");
    const { id } = req.params;
    db.delete_product([id])
      .then(product => {
        res.status(200).send(product);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  }
};
