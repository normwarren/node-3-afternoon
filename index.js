require("dotenv").config();
const express = require("express");
const massive = require("massive");
const prodCtrl = require("./products_controller");

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive(CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

app.use(express.json());

app.get("/api/products", prodCtrl.getAll);
app.get("/api/products/:id", prodCtrl.getOne);
app.put("/api/products/:id", prodCtrl.update); //desc=''
app.post("/api/products", prodCtrl.create);
app.delete("/api/products/:id", prodCtrl.delete);

app.listen(SERVER_PORT, () => {
  console.log(`Listening to port: ${SERVER_PORT}`);
});
