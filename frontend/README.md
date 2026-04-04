#  Penguin Tech Blog

A full-stack tech blog platform built with React, Node.js, Express, and MongoDB.

---

##  Project Overview

Penguin Tech Blog is a modern web application that allows users to browse and read technology-related blog posts. The system demonstrates full-stack development including frontend UI, backend APIs, and database integration.

---

##  Project Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/bi-bb/TechBlog.git
cd TechBlog
```

---

### 2. Setup Backend

```bash
cd backend
npm install
npm run dev
```

Create `.env` file in backend folder:

```env
PORT=5001
MONGO_URI=mongodb+srv://bi:bibi@bicluster.pndykmt.mongodb.net/techblogplatform?retryWrites=true&w=majority
```

---

### 3. Seed Database (Optional)

```bash
node seed.js
```

---

### 4. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Public URL

👉 **Frontend (Local):**
http://localhost:5001

👉 **Backend API:**
http://localhost:3000



---

##  Test Account (for Admin Dashboard Access)

admin:

* **Username:** admin@gmail.com
* **Password:** admin



---

##  Technologies Used

* Frontend: React.js
* Backend: Node.js, Express.js
* Database: MongoDB
* Version Control: GitHub

---

##  GitHub Version Control & Branching Strategy

This project uses a structured branching strategy:

* `main`: stable version
* `dev`: development
* `feature/*`: individual features

Workflow:
feature → dev → main

---

##  CI/CD Pipeline

A basic CI pipeline is implemented using GitHub Actions to ensure code builds successfully when pushed.

---

## 👩‍💻 Author

BI VO