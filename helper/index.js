"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiAlreadyExist = exports.readJSONFile = void 0;
const fs = require('fs');
function readJSONFile(filename, callback) {
    fs.readFile(filename, function (err, data) {
        if (err) {
            callback(err);
            return;
        }
        try {
            callback(null, JSON.parse(data));
        }
        catch (exception) {
            callback(exception);
        }
    });
}
exports.readJSONFile = readJSONFile;
function apiAlreadyExist(registrationInfo, registry) {
    let exist = false;
    registry.services[`${registrationInfo.apiname}`]?.forEach((instance) => {
        if (instance.url == registrationInfo.url)
            exist = true;
    });
    return exist;
}
exports.apiAlreadyExist = apiAlreadyExist;
//# sourceMappingURL=index.js.map