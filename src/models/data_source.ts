import "reflect-metadata"
import { DataSource } from "typeorm"
import { Book } from "./Book"
import { Subject } from "./Subject"

export const MariaDBDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123",
    database: "db_library",
    synchronize: true,
    logging: false,
    entities: [Book, Subject],
    migrations: [],
    subscribers: [],
})




