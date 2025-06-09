# Task & Project Management API

## Installation

1. Clone the repo: `git clone ... && cd project-directory`
2. Set environment variables in `.env` (see `.env.example` for keys).
3. Install dependencies: `npm install`.
4. **Database:** Ensure a PostgreSQL database is running. You can use Docker:

   ```bash
   docker run --name pg -e POSTGRES_USER=user -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=mydb -p 5432:5432 -d postgres
Run database migrations: npx prisma migrate dev --name init.
Start the server: npm run start.
API Documentation
Once running, navigate to http://localhost:3000/api for the Swagger UI.
Authentication
Register with POST /auth/register.
Login with POST /auth/login to receive a JWT token.
Include Authorization: Bearer <token> in headers for protected endpoints.
Endpoints Overview
Auth:
POST /auth/register, POST /auth/login.
Users (admin only for listing):
GET /users, GET /users/:id, GET /users/:id/tasks, GET /users/:id/projects, GET /users/:id/comments.
Projects:
GET/POST /projects, GET/PATCH/DELETE /projects/:id.
Tasks:
GET/POST /tasks, GET/PATCH/DELETE /tasks/:id, GET /tasks/:id/comments.
Comments:
POST /comments, PATCH /comments/:id, DELETE /comments/:id.
Refer to Swagger UI for detailed request/response schemas.