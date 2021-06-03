import express, { json } from "express";
import router from "./routes/router.js";
// const cors = require('cors')
const port = 8080;

const app = express();
// app.use(cors())

app.use(json());

app.use(router);

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
