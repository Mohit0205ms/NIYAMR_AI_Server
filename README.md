This is the server side of the NiyamrAI project, a PDF checker API builed with Node.js and Express.

## Getting Started

First, instal the dependencies:

```bash
npm install
```

Then, run the server:

```bash
npm run dev
```

The server will start at http://localhost:4000 by default.

## API Endpoints

The server provide several API endpoints for handling PDFs and AI services:

- GET /: Welcome message "NiyamR AI PDF Checker API"
- POST /api/evaluate-pdf: Upload a PDF file and evaluate it against provided rules

## Services

- pdfService.js: Handles PDF evaluation logic
- aiService.js: Manages interaction with AI APIs
- upload.js: Middleware for file upload

## Config

Configuration is stored in config/config.js, including API settings. Uses dotenv for enviroment variables.

## Dependencies

The project uses the following main dependencies: express, cors, multer, pdf-parse, axios, dotenv.

## Deploy

To deploy the server, ensure all dependencies is installed and the enviroment variables are set correctly.

For more details, check the main projects documentation.

<video src="https://github.com/user-attachments/assets/f18b9d5b-b15f-4d8c-948f-93a435b1aa53" width=300 />
