import express from "express";
import axios from "axios";
import RegistryInterface, {
  ServicesInterface,
} from "../@types/registry.interface";
import fs from "fs";
import { apiAlreadyExist } from "../helper";

const registry: RegistryInterface = require("../registry.json");

const router = express.Router();

router.all("/:apiname/:path", async (req, res) => {
  const registryService: ServicesInterface =
    registry.services[req.params.apiname][0] ?? false;
  if (registryService) {
    console.log("=======================================");
    console.log(
      `URL => ${req.method} => ${registryService.url}${req.params.path}`
    );
    console.log(`BODY => ${JSON.stringify(req.body)}`);
    console.log(`HEADERS => ${JSON.stringify(req.headers)}`);
    console.log("=======================================");
    try {
      await axios({
        method: req.method,
        url: `${registryService.url}${req.params.path}`,
        headers: req.headers,
        data: req.body,
      })
        .then((response) => {
          console.log("===================response===================");
          console.log(response.data);
          console.log("===================response===================");
          res.send(response.data);
        })
        .catch((err) => {
          res.send(err);
        });
    } catch (err) {
      console.error(err);
    }
  } else res.send("API Name doesn't exist");
});

router.post("/register", (req, res) => {
  const registrationInfo: ServicesInterface = req.body;
  registrationInfo.url = `${registrationInfo.protocol}://${registrationInfo.host}:${registrationInfo.port}/`;
  if (apiAlreadyExist(registrationInfo, registry)) {
    res.send(
      `Configuration already exist for ${registrationInfo.apiname} at ${registrationInfo.host}:${registrationInfo.port} 🙃`
    );
  } else {
    registry.services[`${registrationInfo.apiname}`].push({
      ...registrationInfo,
    });
    fs.writeFile("./registry.json", JSON.stringify(registry), (err: any) => {
      if (err) res.send("Couldn't update the file");
      else res.send(`${registrationInfo.apiname} successfully register 🚀`);
    });
  }
});

export default router;
