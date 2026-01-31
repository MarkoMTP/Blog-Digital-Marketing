🧩 Blog Platform — Backend API

The backend API for a full-stack blog platform supporting multiple frontends (public users and creators/admins).

This service is responsible for authentication, authorization, content management, and data persistence, and is designed to be consumed by different clients through a clean REST architecture.

🚀 Live Usage

This backend powers:

📰 Public User Frontend (read-only blog experience)

🛠 Admin / Creator Dashboard (content management)

👉 Repository: https://github.com/MarkoMTP/Blog-Digital-Marketing

✨ Features

RESTful API architecture

Multi-role authentication (users / creators)

JWT-based authentication

Session-based authentication with Passport.js

Blog post CRUD operations

Comment system

Protected routes and authorization logic

PostgreSQL relational data modeling

Centralized error handling

Secure environment configuration

🛠 Tech Stack
Backend

Node.js

Express.js

Prisma ORM

PostgreSQL

REST API

Authentication

JWT (token-based authentication)

Passport.js (session-based authentication)

Testing

Vitest

Supertest — API integration testing

🧱 Architecture Overview

The backend is structured to support multiple frontends consuming the same API:

Public users can fetch and read published posts

Authenticated creators can manage content through protected routes

Shared business logic lives exclusively in the backend

Frontends remain thin and API-driven

This separation ensures:

consistent data rules

reusable logic

scalability across different clients

🧩 Project Focus

This backend was built to focus on:

Designing scalable REST APIs

Managing relational data with Prisma and PostgreSQL

Implementing secure authentication flows

Supporting multiple frontends with different access levels

Writing predictable and maintainable backend code

Treating the backend as the source of truth

📚 What I Learned

Structuring Express applications for real-world use

Designing APIs for multiple client applications

Handling authentication and protected routes

Modeling relational data effectively with Prisma

Writing integration tests for backend endpoints

Debugging and deploying backend services

📦 Getting Started Locally
git clone https://github.com/MarkoMTP/Blog-Digital-Marketing.git
cd Blog-Digital-Marketing
npm install
npm run dev


⚠️ Requires a PostgreSQL database and environment variables for authentication and database connection.

🔮 Possible Improvements

Pagination and filtering

Rate limiting

Role-based permissions

Richer validation

API documentation (OpenAPI / Swagger)

👤 Author

Marko Matković
Full-stack developer & software engineering student
📍 Padova, Italy

GitHub: https://github.com/MarkoMTP
