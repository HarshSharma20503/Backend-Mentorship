import {
  getAnswers,
  getAnswerById,
  createAnswer,
  updateAnswer,
  deleteAnswer,
} from "../controllers/answersController.js";

const answersRoutes = (req, res) => {
  const urlParts = req.url.split("/");
  const id = parseInt(urlParts[2], 10);

  if (req.method === "GET" && req.url === "/answers") {
    getAnswers(req, res);
  } else if (req.method === "GET" && urlParts[1] === "answers" && !isNaN(id)) {
    getAnswerById(req, res, id);
  } else if (req.method === "POST" && req.url === "/answers") {
    createAnswer(req, res);
  } else if (req.method === "PUT" && urlParts[1] === "answers" && !isNaN(id)) {
    updateAnswer(req, res, id);
  } else if (
    req.method === "DELETE" &&
    urlParts[1] === "answers" &&
    !isNaN(id)
  ) {
    deleteAnswer(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
};

export default answersRoutes;
