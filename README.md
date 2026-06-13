# 🔐 Full Stack MERN Authentication System

![Tech Stack](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

---

## Why Authentication Matters

Every application that handles user data needs a way to answer one fundamental question: **who is this person, and are they allowed to be here?**

Without authentication, anyone could access anyone else's data. There would be no accounts, no privacy, no personalisation — just an open system where everything is visible to everyone. Authentication is what makes modern web applications trustworthy and usable at scale.

This project was built to understand and implement that system from scratch, rather than relying on third-party auth services. Building it manually gives a real understanding of what happens behind the scenes every time a user logs into any application — from banking apps to social media platforms.

---

## Why JWT (JSON Web Tokens)?

Traditional session-based authentication stores user data on the server. Every time a user makes a request, the server has to look up that session in a database — which creates load and doesn't scale well.

JWT takes a different approach. When a user logs in, the server creates a **signed token** containing the user's identity and sends it to the client. The client stores it and sends it back with every request. The server just **verifies the signature** — no database lookup needed.

This makes JWT:
- **Stateless** — the server doesn't need to remember anything
- **Scalable** — works across multiple servers without shared session storage
- **Secure** — tokens are cryptographically signed and can't be tampered with

---

## Why bcrypt for Passwords?

Storing passwords as plain text is one of the most dangerous things an application can do. If the database is ever compromised, every user's password is immediately exposed.

bcrypt solves this by **hashing** passwords — converting them into a fixed-length string that cannot be reversed. It also adds a **salt** (random data) before hashing, meaning even if two users have the same password, their stored hashes will be completely different. This protects against rainbow table attacks.

---

## What This Project Does

This is a complete authentication system where users can:

- Register with their name, email, and password
- Log in and receive a JWT token
- Access a protected dashboard that only authenticated users can reach
- Have their profile fetched from a protected API endpoint using their token

The frontend and backend are completely separate — they communicate only through REST API calls, which mirrors how real production applications are structured.

---

## ✨ Features

- 🔒 JWT-based login with 7-day token expiry
- 🔑 Password hashing with bcrypt and salt rounds
- 🛡️ Protected routes on both frontend and backend
- 📋 User registration with duplicate email validation
- 👤 Protected profile API endpoint
- ✅ Form validation on client and server side
- 📱 Fully responsive UI

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router DOM, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JSON Web Tokens (JWT), bcryptjs |
| Styling | CSS3, Custom CSS Variables |
| Dev Tools | Vite, Nodemon, Postman |

---

## 📁 Project Structure

```
mern-auth/
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT verification middleware
│   ├── models/
│   │   └── User.js             # Mongoose user schema
│   ├── routes/
│   │   └── auth.js             # Auth API routes
│   └── server.js               # Express server entry point
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Navbar.jsx       # Navigation with auth state
        │   └── PrivateRoute.jsx # Protected route wrapper
        ├── pages/
        │   ├── Login.jsx        # Login page
        │   ├── Register.jsx     # Registration page
        │   └── Dashboard.jsx    # Protected dashboard
        └── App.jsx              # Routes configuration
```

---

## 📡 API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and receive JWT |
| GET | `/api/auth/profile` | Private | Get logged-in user profile |

---

## 🔐 How It Works

```
1. User registers → password hashed with bcrypt → saved to MongoDB
2. User logs in → password verified → JWT token generated and returned
3. Token stored in localStorage on the frontend
4. Protected pages check for token via PrivateRoute component
5. API calls send token in the Authorization header
6. Backend middleware verifies the token before allowing access
```

---

## 👨‍💻 Author

**Vikas Reddy**
Graduate Full Stack Developer | MERN Stack | MSc Advanced Computer Science

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vikas-reddy-95444a273)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Vikaskatha)
