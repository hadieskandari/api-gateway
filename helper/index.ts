import RegistryInterface, { ServicesInterface } from "../@types/registry.interface";

const fs = require('fs');

export function readJSONFile(filename: any, callback: any) {
    fs.readFile(filename, function (err: any, data: any) {
        if (err) {
            callback(err);
            return;
        }
        try {
            callback(null, JSON.parse(data));
        } catch (exception) {
            callback(exception);
        }
    });
}

export function apiAlreadyExist(registrationInfo: ServicesInterface, registry: RegistryInterface): boolean {
    let exist = false
    registry.services[`${registrationInfo.apiname}`]?.forEach((instance) => {
        if (instance.url == registrationInfo.url) exist = true
    })
    return exist
}