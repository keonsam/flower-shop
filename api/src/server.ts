import app from "./app";
import config from "./config";
import logger from "./middleware/logger";

const { port } = config;

app.listen(port, () => {
  logger.info(`Flower API listening on port ${port}`);
});
