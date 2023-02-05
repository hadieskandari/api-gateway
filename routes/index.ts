import express from 'express';
import axios from 'axios';
import RegistryInterface, { ServicesInterface } from '../@types/registry.interface';
import fs from 'fs';
import { apiAlreadyExist } from '../helper';

const registry: RegistryInterface = require('../registry.json')

const router = express.Router()

router.all('/:apiname/:path', (req, res) => {
    const registryService: ServicesInterface = registry.services[req.params.apiname][0]
    if (registryService) {
        axios({
            method: req.method,
            url: `${registryService.url}${req.params.path}`,
            headers: req.headers,
            data: req.body
        }).then((response) => {
            res.send(response.data)
        })
    } else res.send("API Name dosen't exist")
})

router.post('/register', (req, res) => {
    const registrationInfo: ServicesInterface = req.body
    registrationInfo.url = `${registrationInfo.protocol}://${registrationInfo.host}:${registrationInfo.port}/`
    if (apiAlreadyExist(registrationInfo, registry)) {
        res.send(`Configuration already exist for ${registrationInfo.apiname} at ${registrationInfo.host}:${registrationInfo.port} 🙃`)
    } else {
        registry.services[`${registrationInfo.apiname}`].push({ ...registrationInfo })
        fs.writeFile('./registry.json', JSON.stringify(registry), (err: any) => {
            if (err) res.send("Couldn't update the file")
            else res.send(`${registrationInfo.apiname} successfully register 🚀`)
        })
    }
})

export default router;