const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "danaa",
  database: "EMarketplace",
  synchronize: false, // For migrations
  logging: false,
  entities: ["src/entities/*.js"],
  migrations: ["src/migrations/*.js"],
  subscribers: [],
});

module.exports = AppDataSource;
