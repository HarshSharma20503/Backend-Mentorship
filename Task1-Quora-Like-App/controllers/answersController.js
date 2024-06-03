import { readData, writeData } from "../utils/fileOperations.js";
import logger from "../utils/logger.js";

const answersFile = "answers.json";

/**
 * GET /answers
 * Retrieves all answers.
 *
 * Response:
 *   200: A JSON array of all answers.
 *   500: Internal Server Error.
 */
export const getAnswers = async (req, res) => {
  try {
    const answers = await readData(answersFile);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(answers));
    logger.info("GET /answers");
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * GET /answers/:id
 * Retrieves a specific answer by ID.
 *
 * Parameters:
 *   id (string): The ID of the answer to retrieve.
 *
 * Response:
 *   200: A JSON object of the answer if found.
 *   404: Answer not found.
 *   500: Internal Server Error.
 */
export const getAnswerById = async (req, res, id) => {
  try {
    const answers = await readData(answersFile);
    const answer = answers.find((a) => a.id === id);
    if (answer) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(answer));
      logger.info(`GET /answers/${id}`);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Answer not found" }));
      logger.error(`GET /answers/${id} - Answer not found`);
    }
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * POST /answers
 * Creates a new answer.
 *
 * Request Body:
 *   JSON object containing the answer details.
 *
 * Response:
 *   201: A JSON object of the created answer.
 *   500: Internal Server Error.
 */
export const createAnswer = async (req, res) => {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const newAnswer = JSON.parse(body);
      const answers = await readData(answersFile);
      newAnswer.id = answers.length ? answers[answers.length - 1].id + 1 : 1;
      answers.push(newAnswer);
      await writeData(answersFile, answers);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newAnswer));
      logger.info("POST /answers");
    });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * PUT /answers/:id
 * Updates a specific answer by ID.
 *
 * Parameters:
 *   id (string): The ID of the answer to update.
 *
 * Request Body:
 *   JSON object containing the updated answer details.
 *
 * Response:
 *   200: A JSON object of the updated answer.
 *   404: Answer not found.
 *   500: Internal Server Error.
 */
export const updateAnswer = async (req, res, id) => {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const updatedAnswer = JSON.parse(body);
      const answers = await readData(answersFile);
      const index = answers.findIndex((a) => a.id === id);
      if (index !== -1) {
        answers[index] = { ...answers[index], ...updatedAnswer };
        await writeData(answersFile, answers);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(answers[index]));
        logger.info(`PUT /answers/${id}`);
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Answer not found" }));
        logger.error(`PUT /answers/${id} - Answer not found`);
      }
    });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * DELETE /answers/:id
 * Deletes a specific answer by ID.
 *
 * Parameters:
 *   id (string): The ID of the answer to delete.
 *
 * Response:
 *   200: A JSON object of the deleted answer.
 *   404: Answer not found.
 *   500: Internal Server Error.
 */
export const deleteAnswer = async (req, res, id) => {
  try {
    const answers = await readData(answersFile);
    const index = answers.findIndex((a) => a.id === id);
    if (index !== -1) {
      const deletedAnswer = answers.splice(index, 1);
      await writeData(answersFile, answers);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(deletedAnswer[0]));
      logger.info(`DELETE /answers/${id}`);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Answer not found" }));
      logger.error(`DELETE /answers/${id} - Answer not found`);
    }
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Helper function to handle errors.
 *
 * Parameters:
 *   res (object): The response object.
 *   error (object): The error object.
 *
 * Response:
 *   500: Internal Server Error.
 */
const handleError = (res, error) => {
  res.writeHead(500, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: error.message }));
  logger.error(error.message);
};
