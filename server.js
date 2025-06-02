import app from './app.js';
import AppDataSource from "./data-source.js";
const PORT = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source initialized");
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
   
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });