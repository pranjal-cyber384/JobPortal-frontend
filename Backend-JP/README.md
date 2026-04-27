# 🚀 Job Portal Backend API

A robust backend API for a Job Portal application built using Node.js and Express.js.  
This system supports **User, Recruiter, and Admin roles** with authentication, job management, and application workflows.

---

## 🌐 Base URL

http://localhost:3000 

---

## 🧠 Overview

This backend powers a full-featured job portal where:

- Users can browse and apply for jobs
- Recruiters can post and manage jobs
- Admin controls users, recruiters, and platform data

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (for file uploads)
- bcrypt.js (password hashing)

---

## 🔐 Authentication & Roles

- JWT-based authentication
- Role-based access control:
  - 👤 User
  - 🏢 Recruiter
  - 🛠 Admin

---

## 📌 Core Features

### 👤 User
- Register / Login
- Browse & search jobs
- Apply to jobs
- Upload resume (per job)
- View applied jobs
- Profile management

---

### 🏢 Recruiter
- Post jobs
- View own jobs
- Edit / Delete jobs
- View applicants
- Approve / Reject applications

---

### 🛠 Admin
- View all users
- Approve recruiter requests
- Manage jobs
- Delete users/jobs
- Dashboard statistics

---

## 📂 Project Structure

server/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── uploads/ # resumes / files
├── config/
│
├── server.js
└── package.json


---

## 🔌 Environment Variables

Create a `.env` file:
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/job-portal-backend.git
cd server
npm install
npm run dev

🔗 API Endpoints (Sample)
🔐 Auth
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
PUT  /api/auth/profile
💼 Jobs
POST /api/jobs (Recruiter)
GET /api/jobs/jobs
GET /api/jobs/recruiter/my-jobs
GET /api/jobs/jobs/:id  (Get Single Job)
PUT /api/jobs/jobs/:id  (Update Jobs)
DELETE /api/jobs/jobs/:id
📨 Applications
POST /api/applications/:jobId/apply
GET /api/applications/my-applications 
GET /api/applications//job/:jobId (Get Applicants)
PUT /api/applications//:id/status
👥 Recruiter
POST /api/recruiter/recruiter/apply
PATCH /api/recruiter//request/:id
GET  /api/recruiter//requests
🛠 Admin
GET /api/admin/users
DELETE /api/admin/user/:id
GET /api/admin/stats

📎 File Uploads
Resume upload using Multer
Stored in /uploads
Each application can have a separate resume

🧪 Testing

Use tools like:

Postman
Thunder Client

🚧 Future Improvements
🤖 AI-based resume screening
📄 Resume parsing
🔔 Email notifications
🔐 Rate limiting & security enhancements
📊 Advanced analytics dashboard