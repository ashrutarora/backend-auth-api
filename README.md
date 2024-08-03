# User Authentication Backend

This repository contains the backend code for user authentication, including sign-up, login, and logout functionalities. The project uses Express, MongoDB, JWT, bcrypt, and cookies to ensure secure and efficient authentication processes. The code is clean, well-arranged, and uses environment variables for configuration.

## Features

- User Sign-Up
- User Login
- User Logout
- Password Hashing with bcrypt
- JWT Token Generation and Verification
- Cookie Management
- Environment Variables for Configuration

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- dotenv

## Project Structure

```
project-root
│
├── controllers
│   └── UserAuthController.js
├── lib
│   └── dbConnect.js
├── models
│   └── User.js
├── routes
│   └── UserAuthRouter.js
├── .env
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ashrutarora/backend-auth-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd backend-auth-api
   ```
3. Install dependencies:
   ```bash
   npm i
   ```

## Configuration

1. Create a `.env` file in the project root and add the following variables:
   ```plaintext
   PORT=your_port_number
   MONGODB_URI=your_mongodb_connection_string
   JWT_KEY=your_secret_jwt_key
   ```

## Running the Project

1. Start the server:
   ```bash
   nodemon
   ```
2. The server will run on the port specified in your `.env` file.

## API Endpoints

### Sign-Up
- **URL:** `/user/signup`
- **Method:** `POST`
- **Body:** `{ "username": "your_username", "email": "your_email", "password": "your_password" }`
- **Description:** Registers a new user.

### Login
- **URL:** `/user/login`
- **Method:** `POST`
- **Body:** `{ "email": "your_email", "password": "your_password" }`
- **Description:** Authenticates a user and returns a JWT token.

### Logout
- **URL:** `/user/logout`
- **Method:** `POST`
- **Description:** Logs out a user and clears the authentication cookie.

## Security

- Passwords are hashed using bcrypt before being stored in the database.
- JWT tokens are used for user sessions.
- Cookies are used to store and manage JWT tokens securely.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss what you would like to change.

## Acknowledgements

- Thanks to the creators of Node.js, Express.js, MongoDB, and all the other open-source projects used in this project.
