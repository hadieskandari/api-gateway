export default interface RegistryInterface {
    services: {
        [key: string]: ServicesInterface[]
    }
}


export interface ServicesInterface {
    "apiname": String,
    "protocol": "http" | "https",
    "host": String,
    "port": String,
    "url": String
}