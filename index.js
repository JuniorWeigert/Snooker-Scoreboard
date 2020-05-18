const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const Routes = require('./routes/app')

const app = express();
const APP_PORT= process.env.APP_PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(Routes);

app.use(express.static(__dirname + "/public"))
app.set("views", "./public/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.listen(APP_PORT, ()=>{
  console.log(`Listening on port: ${APP_PORT}`)
})