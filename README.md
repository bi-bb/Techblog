# 🧠 Tech Blog Platform

A full-stack web application built with Node.js, Express, MongoDB, and React.  
This project allows users to read blog posts, register/login, and enables admin to manage posts.

---

## 🚀 Live Demo

Backend URL:  
http://54.206.30.33

*(Note: Running on AWS EC2 instance)*

---

##  Test Account

Use the following account to access the system:

Email: admin@gmail.com  
Password: admin 



---

## ⚙️ Tech Stack

- Backend: Node.js + Express.js
- Database: MongoDB (Atlas)
- Frontend: React.js
- Deployment: AWS EC2 + PM2
- CI/CD: GitHub Actions

---

##  Project Setup
## Clone the Repository
    git clone https://github.com/bi-bb/Techblog.git
    cd Techblog
 ## Setup Backend
    cd backend
    npm install
## Create a .env

        ```env
        PORT=5001
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        CLIENT_URL=http://localhost:3000
        EMAIL_USER=your_email
        EMAIL_PASS=your_app_password
        ADMIN_EMAIL=your_admin_email
        ADMIN_PASSWORD=your_admin_password
        run : npm start
        
## Set up frontend
    cd frontend
    npm install
    npm run dev
## Run application
     Start backend, then frontend

## Features
    User registration
    User login
    JWT authentication
    Forgot/reset password
    View blog posts
    Admin dashboard
    Admin CRUD for blog posts
### Notes
    Make sure MongoDB is connected before running the backend.
    Ensure both frontend and backend are running at the same time for full functionality.
    If deployment is used, update API URLs accordingly in the frontend.
