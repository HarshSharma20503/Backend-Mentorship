# Quora-like App Backend

## Description

A simplified version of a question-answer platform similar to Quora built using Node.js. The application includes a manual HTTP server and basic CRUD (Create, Read, Update, Delete) APIs for managing questions and answers with integrated logging for monitoring and debugging.

## Project Structure

Task1-Quora-Like-App/<br>
├── controllers/<br>
│ ├── answersController.js<br>
│ └── questionsController.js<br>
├── data/<br>
│ ├── answers.json<br>
│ └── questions.json<br>
├── logs/<br>
│ └── app.log<br>
├── routes/<br>
│ ├── answersRoutes.js<br>
│ └── questionsRoutes.js<br>
├── utils/<br>
│ ├── fileOperations.js<br>
│ └── logger.js<br>
├── server.js<br>
└── README.md

## API Endpoints

### Questions

- POST /questions: Create a new question.
  Request body: { "title": "Question title", "content": "Question content" }

- GET /questions: Retrieve a list of all questions.

- GET /questions/:id: Retrieve a specific question by its ID.

- PUT /questions/:id: Update a specific question by its ID.
  Request body: { "title": "Updated title", "content": "Updated content" }

- DELETE /questions/:id: Delete a specific question by its ID.

### Answers

- POST /answers: Create a new answer.
  Request body: { "questionId": 1, "content": "Answer content" }

- GET /answers: Retrieve a list of all answers.

- GET /answers/:id: Retrieve a specific answer by its ID.

- PUT /answers/:id: Update a specific answer by its ID.
  Request body: { "content": "Updated content" }

- DELETE /answers/:id: Delete a specific answer by its ID.

## Logging

Logs are generated using the winston library and stored in the logs/app.log file.

Logs include:

- HTTP requests (method, URL)
- API endpoint hits
- Error messages and stack traces
- Application events (server start, file operations)
- Error Handling

Basic error handling is implemented to catch and respond to errors gracefully, ensuring proper error messages are logged with appropriate log levels.
