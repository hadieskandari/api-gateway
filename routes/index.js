"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const helper_1 = require("../helper");
const registry = require('../registry.json');
const router = express_1.default.Router();
router.all('/:apiname/:path', (req, res) => {
    const registryService = registry.services[req.params.apiname][0];
    if (registryService) {
        (0, axios_1.default)({
            method: req.method,
            url: `${registryService.url}${req.params.path}`,
            headers: req.headers,
            data: req.body
        }).then((response) => {
            res.send(response.data);
        });
    }
    else
        res.send("API Name dosen't exist");
});
router.post('/register', (req, res) => {
    const registrationInfo = req.body;
    registrationInfo.url = `${registrationInfo.protocol}://${registrationInfo.host}:${registrationInfo.port}/`;
    if ((0, helper_1.apiAlreadyExist)(registrationInfo, registry)) {
        res.send(`Configuration already exist for ${registrationInfo.apiname} at ${registrationInfo.host}:${registrationInfo.port} 🙃`);
    }
    else {
        registry.services[`${registrationInfo.apiname}`].push({ ...registrationInfo });
        fs_1.default.writeFile('./registry.json', JSON.stringify(registry), (err) => {
            if (err)
                res.send("Couldn't update the file");
            else
                res.send(`${registrationInfo.apiname} successfully register 🚀`);
        });
    }
});
exports.default = router;
//# sourceMappingURL=index.js.map