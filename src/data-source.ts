import "reflect-metadata"
import { DataSource } from "typeorm"
// import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "Zohra0786#",
    database: "BLOG_DB",
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: [],
})
