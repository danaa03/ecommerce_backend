import  { DataSource } from "typeorm";

const  AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "danaa",
  database: "EMarketplace",
  synchronize: false, // For migrations
  logging: false,
  entities: ["src/db/entities/*.js"],
  migrations: ["src/db/migrations/*.js"],
  subscribers: [],
});

export default AppDataSource;
