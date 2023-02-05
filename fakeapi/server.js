const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const HOST = "localhost";
const PORT = 3002;

app.use(express.json());
app.use(cors());

app.get("/fakeapi", (req, res, next) => {
  console.log(req);
  return res.send("hello from fake api");
});

app.post("/bogusapi", (req, res, next) => {
  res.send("hello from bogus api");
});

app.listen(PORT, () => {
  // axios({
  //     method: "POST",
  //     url: "http://localhost:3000/register",
  //     headers: { "Content-Type": "application/json" },
  //     data: {
  //         apiname: "test",
  //         protocol: "http",
  //         host: HOST,
  //         port: PORT,
  //     }

  // })
  console.log("fake server listen on " + PORT);
});
