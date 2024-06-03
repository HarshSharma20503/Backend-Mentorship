import {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questionsController.js";

const questionsRoutes = (req, res) => {
  const urlParts = req.url.split("/");
  const id = parseInt(urlParts[2], 10);

  if (req.method === "GET" && req.url === "/questions") {
    getQuestions(req, res);
  } else if (
    req.method === "GET" &&
    urlParts[1] === "questions" &&
    !isNaN(id)
  ) {
    getQuestionById(req, res, id);
  } else if (req.method === "POST" && req.url === "/questions") {
    createQuestion(req, res);
  } else if (
    req.method === "PUT" &&
    urlParts[1] === "questions" &&
    !isNaN(id)
  ) {
    updateQuestion(req, res, id);
  } else if (
    req.method === "DELETE" &&
    urlParts[1] === "questions" &&
    !isNaN(id)
  ) {
    deleteQuestion(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
};

export default questionsRoutes;
