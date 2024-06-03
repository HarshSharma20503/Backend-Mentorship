import http from "http";
import questionsRoutes from "./routes/questionsRoutes.js";
import answersRoutes from "./routes/answersRoutes.js";
import logger from "./utils/logger.js";
import dotenv from "dotenv";

dotenv.config();

const server = http.createServer((req, res) => {
  try {
    logger.info(`${req.method} ${req.url}`);

    if (req.url.startsWith("/questions")) {
      questionsRoutes(req, res);
    } else if (req.url.startsWith("/answers")) {
      answersRoutes(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not found" }));
      logger.warn(`Route not found: ${req.method} ${req.url}`);
    }
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
