# 🛡️ Insurance Policy Management API

A **RESTful Backend API** built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)** that enables full CRUD (Create, Read, Update, Delete) operations on insurance policies. This project follows a clean, industry-standard **MVC (Model-View-Controller)** architecture, making it modular, scalable, and easy to maintain.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Architecture (MVC Pattern)](#-architecture-mvc-pattern)
- [API Endpoints](#-api-endpoints)
- [Data Model](#-data-model)
- [Middleware](#-middleware)
- [Error Handling](#-error-handling)
- [Getting Started](#-getting-started)
- [Usage Examples](#-usage-examples)

---

## 🔍 Overview

This project is a backend REST API designed to manage insurance policies stored in a MongoDB database. It allows clients (e.g., a frontend app, Postman, or another service) to:

- **Retrieve** all insurance policies
- **Create** a new insurance policy
- **Update** an existing policy by ID
- **Delete** a policy by ID

All incoming requests are logged to the console via a custom middleware layer, and all responses are formatted as JSON.

---

## 🛠️ Tech Stack

| Technology      | Purpose                                      |
|-----------------|----------------------------------------------|
| **Node.js**     | JavaScript runtime environment               |
| **Express.js**  | Web framework for building the REST API (v5) |
| **MongoDB**     | NoSQL database for storing policy data       |
| **Mongoose**    | ODM (Object Data Modeling) library for MongoDB |
| **Nodemon**     | Dev tool for auto-restarting the server      |

---

## 📁 Project Structure

```
FullStackProjects-main/
│
├── server.js                  # Entry point – initialises Express app & MongoDB connection
│
├── routes/
│   └── policyRoutes.js        # Defines all API route paths for /policies
│
├── controllers/
│   └── policyController.js    # Business logic – handles each route's request/response
│
├── models/
│   └── Policy.js              # Mongoose schema & model definition for a Policy
│
├── middleware/
│   └── logger.js              # Custom middleware to log HTTP method and URL
│
├── package.json               # Project metadata and dependencies
└── README.md                  # Project documentation
```

---

## 🏗️ Architecture (MVC Pattern)

This project is structured using the **MVC (Model-View-Controller)** design pattern, which separates concerns into three distinct layers:

```
  Client Request
       │
       ▼
  ┌─────────────┐
  │   server.js  │  ← App entry point, Express setup, DB connection
  └──────┬──────┘
         │
         ▼
  ┌─────────────────┐
  │  Routes Layer    │  ← policyRoutes.js maps URLs to controllers
  └──────┬──────────┘
         │
         ▼
  ┌──────────────────────┐
  │  Controller Layer     │  ← policyController.js handles business logic
  └──────┬───────────────┘
         │
         ▼
  ┌─────────────┐
  │ Model Layer  │  ← Policy.js defines the MongoDB schema via Mongoose
  └─────────────┘
         │
         ▼
     MongoDB
```

| Layer          | File                          | Role                                                    |
|----------------|-------------------------------|---------------------------------------------------------|
| **Server**     | `server.js`                   | Bootstraps Express, connects to MongoDB, registers routes |
| **Routes**     | `routes/policyRoutes.js`      | Maps HTTP methods & paths to controller functions       |
| **Controller** | `controllers/policyController.js` | Contains logic for each CRUD operation             |
| **Model**      | `models/Policy.js`            | Defines the data shape (schema) for a Policy document   |
| **Middleware** | `middleware/logger.js`        | Logs every incoming request's method and URL            |

---

## 📡 API Endpoints

Base URL: `http://localhost:5000`

| Method   | Endpoint           | Description                       |
|----------|--------------------|-----------------------------------|
| `GET`    | `/policies`        | Fetch all insurance policies       |
| `POST`   | `/policies`        | Create a new insurance policy      |
| `PUT`    | `/policies/:id`    | Update an existing policy by ID    |
| `DELETE` | `/policies/:id`    | Delete a policy by ID              |

> `:id` refers to the MongoDB `_id` of the policy document.

---

## 🗄️ Data Model

Each **Policy** document stored in MongoDB has the following structure:

```js
// models/Policy.js
{
  name:    String,   // Name of the policy holder or policy name
  type:    String,   // Type of insurance (e.g., "Health", "Life", "Auto")
  premium: Number    // Monthly/annual premium amount
}
```

**Example MongoDB document:**
```json
{
  "_id": "64f3a2b1c2e4d5f6a7b8c9d0",
  "name": "John Doe",
  "type": "Health",
  "premium": 299.99
}
```

---

## 🔧 Middleware

### `logger.js` – Request Logger

A simple custom Express middleware that logs every incoming HTTP request to the console before passing control to the next handler.

```js
function logger(req, res, next) {
    console.log(req.method + " " + req.url);
    next();
}
```

**Console output example:**
```
GET /policies
POST /policies
PUT /policies/64f3a2b1c2e4d5f6a7b8c9d0
DELETE /policies/64f3a2b1c2e4d5f6a7b8c9d0
```

---

## ⚠️ Error Handling

The API has two global error handlers registered in `server.js`:

1. **404 Handler** – Catches any request to a route that doesn't exist and returns:
   ```json
   { "error": "Route not found" }
   ```

2. **500 Global Error Handler** – Catches any unhandled errors thrown during request processing and returns:
   ```json
   { "error": "Internal Server Error" }
   ```

Controller-level errors (e.g., invalid data on create/update) are caught individually and return descriptive `400` responses with `{ "error": "..." }`.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally on port `27017`)

### 1. Clone the Repository

```bash
git clone https://github.com/ajaysundarsai/FullStackProjects-main.git
cd FullStackProjects-main
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start MongoDB

Make sure your local MongoDB service is running:
```bash
# On Windows, start MongoDB service via Services or:
mongod
```

### 4. Run the Server

**Development (with auto-reload via Nodemon):**
```bash
npx nodemon server.js
```

**Production:**
```bash
npm start
```

### 5. Server Running

```
Server.js started
MongoDB Connected
Server running on port 5000
```

The API is now live at: **`http://localhost:5000`**

---

## 💡 Usage Examples

You can use [Postman](https://www.postman.com/) or `curl` to test the API.

### ➕ Create a Policy (POST)
```bash
curl -X POST http://localhost:5000/policies \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Smith", "type": "Life", "premium": 150}'
```

### 📄 Get All Policies (GET)
```bash
curl http://localhost:5000/policies
```

### ✏️ Update a Policy (PUT)
```bash
curl -X PUT http://localhost:5000/policies/<id> \
  -H "Content-Type: application/json" \
  -d '{"premium": 200}'
```

### 🗑️ Delete a Policy (DELETE)
```bash
curl -X DELETE http://localhost:5000/policies/<id>
```

---

## 📌 Key Concepts Demonstrated

- ✅ **RESTful API Design** – Clear HTTP verb usage (GET, POST, PUT, DELETE)
- ✅ **MVC Architecture** – Separation of routes, controllers, and models
- ✅ **Mongoose ODM** – Schema-based modeling for MongoDB
- ✅ **Custom Middleware** – Request logging with `next()` chaining
- ✅ **Async/Await** – Modern JavaScript for handling asynchronous DB operations
- ✅ **Global Error Handling** – Centralized 404 and 500 error responses
- ✅ **Express Router** – Modular route management

---

## 👨‍💻 Author

**Ajay Sundar**  


---

> _Built as part of a fullstack development learning journey, demonstrating backend API development with Node.js, Express, and MongoDB._
