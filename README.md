# LevelUp.dev

A full-stack online learning platform where students can browse, enroll in, and learn from structured courses — complete with progress tracking, interactive lessons, and a dedicated admin panel for content management.

---

## About the Project

**LevelUp.dev** is built to deliver a modern, self-paced learning experience. Students sign up, explore a catalog of courses, enroll with a single click, and work through multi-module curricula that include articles, quizzes, assignments, and coding exercises. Every completed lesson is tracked so learners always know where they left off.

The platform is split into three independent apps that share a single backend API:

| App | Purpose | Port |
|---|---|---|
| **Client** | Student-facing SPA (React + Vite) | `5173` |
| **Admin** | Course & user management panel (React + Vite) | `5200` |
| **Server** | REST API (Express + MongoDB) | `5000` |

---

## Core Features

### Authentication & Email Verification
JWT-based authentication with registration, login, and session restore. New accounts can verify their email through a one-time password (OTP) flow — unverified users see a prompt inside the dashboard until verification is complete.

### Course Catalog & Enrollment
A searchable, filterable course catalog where students can view course details (instructor, duration, level, tags, price) and enroll instantly. Enrollment links the course to the user's profile and unlocks the learning interface.

### Structured Learning Experience
Each course is organized into ordered **modules**, and each module contains **lessons** of four types:

- **Article** — markdown-rendered reading content
- **Quiz** — multiple-choice questions with explanations
- **Assignment** — brief + requirements with a deadline
- **Coding** — problem statement, starter code, and test cases

Progress is saved per-lesson, and users can resume where they left off from the dashboard.

### Student Dashboard & Profile
A personalized dashboard showing enrolled courses, progress stats, recent activity, and email verification status. The full profile section lets users manage personal info, professional details (LinkedIn, GitHub, skills), and submitted projects.

### Admin Panel
A separate admin application for platform operators to:

- **Manage Courses** — create, edit, and publish/draft courses with image uploads
- **Build Modules & Lessons** — add modules to any course and fill them with articles, quizzes, assignments, or coding problems
- **Manage Users** — view all registered users, check verification status, activate/deactivate accounts
- **View Contact Submissions** — read and manage inquiries from the contact form
- **Control Settings** — toggle registration open/closed and maintenance mode
- **Send Announcements** — broadcast announcements visible to students
- **Track Enrollments** — see which students are enrolled in which courses

### Maintenance Mode & Route Guards
The platform supports a global maintenance mode (toggled from admin settings) that shows a branded maintenance page to students. Route guards protect private pages from unauthenticated users and redirect logged-in users away from login/register.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, Framer Motion, Lucide Icons, React Router v7 |
| **Backend** | Node.js, Express, Mongoose (MongoDB), JWT, Bcrypt, Nodemailer, Multer |
| **Admin** | React, Vite, Tailwind CSS |

---

## Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** (local instance or Atlas connection string)

### Installation

```bash
# Clone the repo
git clone <repo-url>
cd SCS

# Install dependencies for each app
cd client && npm install
cd ../admin && npm install
cd ../server && npm install
```

### Environment Variables

Create a `.env` file inside `server/` with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
```

### Running Locally

```bash
# Terminal 1 — Start the API server
cd server
npm run dev

# Terminal 2 — Start the client
cd client
npm run dev

# Terminal 3 — Start the admin panel
cd admin
npm run dev
```

The client opens at `http://localhost:5173`, the admin at `http://localhost:5200`, and the API at `http://localhost:5000`.

---

## Project Structure

```
SCS/
├── client/          # Student-facing React app
│   └── src/
│       ├── pages/         # Home, Dashboard, Courses, Course, Profile, Login, Register, Contact …
│       ├── components/    # Shared layout & UI components
│       ├── context/       # AuthContext (global auth state)
│       ├── routes/        # Route definitions & guards
│       └── sections/      # Landing page sections (Hero, CTA, WhoWeServe)
│
├── admin/           # Admin panel React app
│   └── src/
│       └── pages/         # Dashboard, Courses, Modules, Users, Contacts, Settings …
│
└── server/          # Express REST API
    ├── models/            # Mongoose schemas (User, Course, CourseModule, Contact, …)
    ├── routes/            # API route handlers (auth, admin, contact)
    └── utils/             # Helper utilities
```

---

## License

This project is private and not licensed for redistribution.
