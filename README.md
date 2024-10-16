# Healthcare Services API

This is a simple RESTful API for managing healthcare services using Node.js, Express, and MongoDB. It allows you to create, read, update, and delete healthcare services.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/healthcare-services-api.git
   cd healthcare-services-api
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file by copying the example:
   ```bash
   cp .env.example .env
   ```
4. Fill in the environment variables in the `.env` file.

5. Start your MongoDB instance (make sure MongoDB is running on your local machine).

6. Start the server:
   ```bash
   npm run dev
   ```

## Usage
You can test the API endpoints using Postman or any other API testing tool. The server will run on `http://localhost:3000`.

## API Endpoints

1. **Add a New Service**
   - **Endpoint:** `POST /api/v1/services`
   - **Request Body:**
   ```json
   {
       "name": "Service Name",
       "description": "Service Description",
       "price": 100
   }
   ```

2. **Get All Services**
   - **Endpoint:** `GET /api/v1/services`

3. **Update a Service**
   - **Endpoint:** `PUT /api/v1/services/:id`
   - **Request Body:**
   ```json
   {
       "name": "Updated Service Name",
       "description": "Updated Service Description",
       "price": 150
   }
   ```

4. **Delete a Service**
   - **Endpoint:** `DELETE /api/v1/services/:id`

## Environment Variables
You need to create a `.env` file with the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/healthcare
```

### Example `.env.example`
```plaintext
# The port your server will run on
PORT=3000

# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/healthcare
```
=