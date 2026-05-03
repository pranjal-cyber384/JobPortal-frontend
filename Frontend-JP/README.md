# 🚀 Job Portal Frontend (React)

A modern, full-featured frontend for a Job Portal web application built with React.js.  
This platform supports **Users, Recruiters, and Admin roles**, offering a complete job hiring ecosystem with advanced features like filtering, pagination, and role-based workflows.

---

## 🧠 Project Overview

This application simulates a real-world job portal where:

- Users can search, filter, and apply for jobs
- Recruiters can manage job postings and applicants
- Admin controls the entire system

The frontend is fully integrated with backend APIs and designed with a clean, responsive UI.

---

## ⚙️ Tech Stack

- React.js (Vite)
- Bootstrap
- React Router DOM
- Axios
- Context API (State Management)

---

## 📌 Features

### 👤 User Features

- 🔐 Register & Login (JWT Authentication)
- 🔍 Browse all jobs
- 🎯 Advanced job search (keyword + location + type)
- 📄 View detailed job descriptions
- 📨 Apply to jobs
- 📂 Upload resume (job-specific)
- 📊 View applied jobs
- 👤 Profile management (update info, resume)

---

### 🏢 Recruiter Features

- 📝 Post new jobs
- 📋 View all posted jobs
- ✏️ Edit / Update job listings
- ❌ Delete jobs
- 👥 View applicants for each job
- ✅ Approve / Reject applications
- 📊 Manage recruitment workflow

---

### 🛠 Admin Features

- 👥 View all users
- 🏢 Manage recruiters (approve/reject requests)
- 📋 View all jobs
- ❌ Delete users and jobs
- 📊 Admin dashboard:
  - Total Users
  - Total Recruiters
  - Total Jobs
  - Total Applications

---

## 🔍 Advanced Features

- 🔎 Search jobs by keyword, location and type
- 📄 Pagination for job listings
- 🔐 Role-based UI rendering
- 🔁 Dynamic navbar
- 📦 Separate dashboards for each role
- 📎 Multiple resume uploads (per job application)

---

## 🔗Live Link

https://jobportal-18c720.netlify.app/

---


## 📂 Folder Structure

```
src/
│
├── components/ # Reusable UI components
├── pages/ # All pages (Home, Login, Dashboard, etc.)
├── context/ # Global state (Auth, Jobs, Application etc.)
├── services/ # API calls (Axios setup)
├── App.css
├── App.jsx
└── main.jsx

```

---

## 🔌 Environment Variables

Create a `.env` file in root:
VITE_API_BASE_URL=http://localhost:3000

👉 Production (Netlify):
VITE_API_BASE_URL=https://your-backend.onrender.com


---


## 📸 Screenshots

<p align="center">
  <img src="./public/screenshots/Screenshot 2026-05-04 000736.png" width="45%" />
  <img src="./public/screenshots/Screenshot 2026-05-04 000834.png" width="45%" />
  <img src="./public/screenshots/Screenshot 2026-05-04 002011.png" width="45%" />
  <img src="./public/screenshots/Screenshot 2026-05-04 002038.png" width="45%" />
  <img src="./public/screenshots/Screenshot 2026-05-04 002109.png" width="45%" />
  <img src="./public/screenshots/Screenshot 2026-05-04 002206.png" width="45%" />
  <img src="./public/screenshots/Screenshot 2026-05-04 002308.png" width="45%" />
  <img src="./public/screenshots/Screenshot 2026-05-04 002400.png" width="45%" />
  <img src="./public/screenshots/Screenshot 2026-05-04 002501.png" width="45%" />
</p>

## 🚀 Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/job-portal.git
cd client

npm install
npm run dev

🔗 API Integration

This frontend connects to backend APIs such as:

/api/auth
/api/jobs
/api/applications
/api/admin

Make sure backend is running before starting the frontend.

🚧 Future Improvements
🤖 AI-based job recommendations
📄 Resume-maker
🔔 Notifications (email / in-app)
🌙 Dark mode UI

