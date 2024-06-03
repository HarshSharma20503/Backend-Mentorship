import { readData, writeData } from "../utils/fileOperations.js";
import logger from "../utils/logger.js";

const questionsFile = "questions.json";

/**
 * GET /questions
 * Retrieves all questions.
 *
 * Responses:
 *   200: Success, returns an array of questions.
 *   500: Internal Server Error.
 */
export const getQuestions = async (req, res) => {
  try {
    const questions = await readData(questionsFile);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(questions));
    logger.info("GET /questions");
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * GET /questions/:id
 * Retrieves a specific question by ID.
 *
 * Params:
 *   id (string): The ID of the question to retrieve.
 *
 * Responses:
 *   200: Success, returns the question object.
 *   404: Question not found.
 *   500: Internal Server Error.
 */
export const getQuestionById = async (req, res, id) => {
  try {
    const questions = await readData(questionsFile);
    const question = questions.find((q) => q.id === id);
    if (question) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(question));
      logger.info(`GET /questions/${id}`);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Question not found" }));
      logger.error(`GET /questions/${id} - Question not found`);
    }
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * POST /questions
 * Creates a new question.
 *
 * Request Body:
 *   JSON object with the new question details.
 *
 * Responses:
 *   201: Created, returns the created question object.
 *   500: Internal Server Error.
 */
export const createQuestion = async (req, res) => {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const newQuestion = JSON.parse(body);
      const questions = await readData(questionsFile);
      newQuestion.id = questions.length
        ? questions[questions.length - 1].id + 1
        : 1;
      questions.push(newQuestion);
      await writeData(questionsFile, questions);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newQuestion));
      logger.info("POST /questions");
    });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * PUT /questions/:id
 * Updates a specific question by ID.
 *
 * Params:
 *   id (string): The ID of the question to update.
 *
 * Request Body:
 *   JSON object with the updated question details.
 *
 * Responses:
 *   200: Success, returns the updated question object.
 *   404: Question not found.
 *   500: Internal Server Error.
 */
export const updateQuestion = async (req, res, id) => {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const updatedQuestion = JSON.parse(body);
      const questions = await readData(questionsFile);
      const index = questions.findIndex((q) => q.id === id);
      if (index !== -1) {
        questions[index] = { ...questions[index], ...updatedQuestion };
        await writeData(questionsFile, questions);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(questions[index]));
        logger.info(`PUT /questions/${id}`);
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Question not found" }));
        logger.error(`PUT /questions/${id} - Question not found`);
      }
    });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * DELETE /questions/:id
 * Deletes a specific question by ID.
 *
 * Params:
 *   id (string): The ID of the question to delete.
 *
 * Responses:
 *   200: Success, returns the deleted question object.
 *   404: Question not found.
 *   500: Internal Server Error.
 */
export const deleteQuestion = async (req, res, id) => {
  try {
    const questions = await readData(questionsFile);
    const index = questions.findIndex((q) => q.id === id);
    if (index !== -1) {
      const deletedQuestion = questions.splice(index, 1);
      await writeData(questionsFile, questions);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(deletedQuestion[0]));
      logger.info(`DELETE /questions/${id}`);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Question not found" }));
      logger.error(`DELETE /questions/${id} - Question not found`);
    }
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Helper function to handle errors.
 *
 * Params:
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
