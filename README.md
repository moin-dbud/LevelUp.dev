# LevelUp.dev 🚀

An enterprise-grade, full-stack online learning and course management platform. **LevelUp.dev** provides learners with a modern, interactive learning environment featuring video streaming, markdown articles, quizzes, assignments, and hands-on coding challenges — coupled with automated progress tracking, course leaderboards, email verification, and a comprehensive admin management suite.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.1-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8.4-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

## 📌 Architecture Overview

LevelUp.dev is structured as a decoupled tri-application architecture sharing a unified RESTful Express API and MongoDB database:

```text
                        ┌─────────────────────────┐
                        │      Client SPA         │
                        │    (React 19 + Vite)    │
                        │     Port: 5173          │
                        └───────────┬─────────────┘
                                    │
                                    │  HTTP / REST
                                    ▼
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│       Admin SPA         ├────►│    Express API Server   │◄────┤     MongoDB Database    │
│    (React 19 + Vite)    │     │   (Node.js + Mongoose)  │     │       (User/Course)     │
│     Port: 5200          │     │        Port: 5000       │     └─────────────────────────┘
└─────────────────────────┘     └───────────┬─────────────┘
                                            │
                                ┌───────────┴───────────┐
                                │                       │
                                ▼                       ▼
                     ┌────────────────────┐   ┌────────────────────┐
                     │ Static Media Store │   │ Zoho SMTP Service  │
                     │  (/server/uploads) │   │ (Nodemailer Trans) │
                     └────────────────────┘   └────────────────────┘
```

| Application | Role / Description | Default Port |
|---|---|---|
| **Client App** | Student-facing learning platform, course catalog, interactive curriculum viewer, profile management, & dashboard | `5173` |
| **Admin Panel** | Management panel for operators to build curricula, upload media, manage users, monitor inquiries, & configure settings | `5200` |
| **Backend API** | Central REST API server providing authentication, content management, static asset streaming, & email notifications | `5000` |

---

## ✨ Key Features

### 🔑 Authentication & Email OTP Verification
- **JWT Session Management**: Secure user authentication flow supporting registration, login, and bearer token verification.
- **Email Verification (OTP)**: Integrated Nodemailer service utilizing Zoho SMTP to dispatch 6-digit OTP codes.
- **Security Protections**: Rate-limited resend windows (60s) and 10-minute code expiration with password hashing via `bcryptjs`.
- **Status Banners**: Prominent dashboard prompt guiding unverified users to complete verification.

### 📚 5-in-1 Interactive Learning Interface
Courses are partitioned into ordered **Modules**, which contain 5 specialized lesson types:
1. 🎥 **Video Lessons**: Built-in HTML5 video streaming player supporting custom playback controls, fullscreen mode, playback speed adjustment, and direct MP4/WebM uploading up to 200MB.
2. 📄 **Article Lessons**: Markdown-rendered reading material with custom styled headings, formatted blockquotes, bullet points, and inline code blocks.
3. ❓ **Quiz Lessons**: Interactive multiple-choice engine with real-time score calculation, option validation, and detailed explanations.
4. 📋 **Assignment Lessons**: Project briefs, requirement checklists, submission requirements, and automated deadline tracking.
5. 💻 **Coding Challenges**: Problem statements, pre-populated starter code, language selection, and interactive test-case validation.

### 📊 Dashboard, Progress & Leaderboards
- **Student Dashboard**: Real-time overview of enrolled courses, completed lesson metrics, percentage progress bars, and announcement broadcasts.
- **Automated Progress Pruning**: Backend recalculation engine that automatically prunes deleted or stale lesson IDs to maintain exact progress accuracy.
- **Course Leaderboards**: Public endpoint (`/api/admin/courses/public/:id/leaderboard`) ranking enrolled learners by completion rate and total lessons finished.

### 💼 Student Portfolio & Project Showcase
- **Project Submissions**: Learners can submit personal projects specifying project title, description, tech stack tags, GitHub URL, and live preview links.
- **Approval Workflow**: Submissions undergo review with state tracking (`pending`, `approved`, `rejected`).

### 🛡️ Admin Management Panel
- **Curriculum Builder**: Drag-and-drop ordered module creation with asset dropzone supporting images (up to 5MB) and videos (up to 200MB).
- **Course Lifecycle**: Control draft vs. live status, pricing, categories, tags, difficulty levels, instructor details, and custom badge styling.
- **User Auditing**: View user lists, inspect email verification flags, and toggle account activation (`active` / `inactive`).
- **Contact Inquiries**: Review and filter student messages submitted via the public contact form.
- **Broadcast Announcements**: Publish platform announcements visible directly on student dashboards.
- **Global Platform Controls**: Toggle Maintenance Mode and enable/disable new user registrations.

### ⚙️ Maintenance Guard & Route Protection
- **Maintenance Mode**: Global toggle showing a custom animated maintenance screen to learners. Frontend client polls settings every 15 seconds.
- **Route Guards**:
  - `PrivateRoute`: Guards authenticated student routes.
  - `ActiveRoute`: Restricts deactivated/inactive accounts to the dashboard.
  - `GuestRoute`: Redirects authenticated users away from auth pages to their dashboard.

---

## 🛠️ Technology Stack

### Frontend (Client & Admin)
- **Framework**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 7 (`vite`, `@vitejs/plugin-react`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`, `clsx`), Custom CSS Tokens
- **Animations**: Framer Motion 12 (`framer-motion`)
- **Icons**: Lucide React (`lucide-react`)
- **Routing**: React Router v7 (`react-router-dom`)
- **Notifications**: React Hot Toast (`react-hot-toast`)

### Backend (Server)
- **Runtime**: Node.js (v18+)
- **Framework**: Express 4 (`express`)
- **Database ORM**: Mongoose 8 (`mongoose`) for MongoDB
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) & Bcrypt (`bcryptjs`)
- **File Handling**: Multer (`multer`) for disk storage uploads (Images & Videos)
- **Email Service**: Nodemailer (`nodemailer`) configured with Zoho SMTP (`smtp.zoho.in`)
- **CORS & Environment**: `cors`, `dotenv`
- **Development Tooling**: `nodemon`

---

## 📁 Project Structure

```text
LevelUp.dev/
├── client/                     # Student-facing React Application
│   ├── src/
│   │   ├── components/         # Navbar, Layout, and Shared components
│   │   ├── context/            # AuthContext (global user state & token storage)
│   │   ├── pages/              # Home, Dashboard, Courses, Course, Profile, Login, Register, Contact, About, Blogs...
│   │   ├── routes/             # AppRoutes, PrivateRoute, ActiveRoute, GuestRoute, MaintenanceGuard
│   │   └── sections/           # Hero, CTA, WhoWeServe landing page sections
│   ├── package.json
│   └── vite.config.js
│
├── admin/                      # Admin Panel React Application
│   ├── src/
│   │   ├── components/         # Admin Layout & Header components
│   │   ├── context/            # Admin auth state
│   │   └── pages/              # AdminDashboard, AdminCourses, AdminCourseModules, AdminUsers, AdminContacts, AdminSettings...
│   ├── package.json
│   └── vite.config.js
│
└── server/                     # Express REST API Server
    ├── models/                 # Mongoose Schemas (User, Course, CourseModule, Contact, Project, Setting, Announcement)
    ├── routes/                 # API Routes (auth.js, admin.js, contact.js)
    ├── utils/                  # Email transporter & HTML template generators (email.js, emailTemplates.js)
    ├── uploads/                # Static file storage directory (Images & Videos)
    ├── index.js                # Server entry point, Multer config, database connection, & seeding
    ├── package.json
    └── .env.example            # Environment configuration template
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Local MongoDB instance (`mongodb://localhost:27017`) or MongoDB Atlas connection string

### 1. Clone the Repository
```bash
git clone https://github.com/moin-dbud/LevelUp.dev.git
cd LevelUp.dev
```

### 2. Install Dependencies
Install dependencies for each service:

```bash
# Install Server dependencies
cd server && npm install

# Install Client dependencies
cd ../client && npm install

# Install Admin dependencies
cd ../admin && npm install
```

### 3. Environment Setup
Create a `.env` file inside the `server/` directory using the provided template:

```bash
cd ../server
cp .env.example .env
```

Configure your environment variables inside `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/levelup_db
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Email configuration (Nodemailer / Zoho SMTP)
EMAIL_USER=your_zoho_email@example.com
EMAIL_PASS=your_zoho_app_password
ADMIN_EMAIL=admin@example.com
```

### 4. Running the Application

Open 3 separate terminal sessions to run all services concurrently:

```bash
# Terminal 1 — Start Backend API Server
cd server
npm run dev
# Running on http://localhost:5000

# Terminal 2 — Start Student Client App
cd client
npm run dev
# Running on http://localhost:5173

# Terminal 3 — Start Admin Management Panel
cd admin
npm run dev
# Running on http://localhost:5200
```

---

## 🌐 API Route Reference

### Public & Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/register` | Register new student account | Public |
| `POST` | `/login` | Authenticate user & receive JWT | Public |
| `GET` | `/me` | Get current logged-in user profile | Authenticated |
| `POST` | `/send-otp` | Generate & dispatch email verification OTP | Authenticated |
| `POST` | `/verify-otp` | Verify 6-digit OTP code | Authenticated |
| `PUT` | `/profile/basic` | Update basic user info (name, bio, contact) | Authenticated |
| `PUT` | `/profile/professional` | Update professional details (skills, links) | Authenticated |
| `GET` | `/enrolled` | Fetch enrolled courses list | Authenticated |
| `POST` | `/enroll` | Enroll student into a course | Authenticated |
| `GET` | `/lesson-progress/:courseId` | Get completed lesson IDs & percentage | Authenticated |
| `POST` | `/complete-lesson` | Toggle lesson complete & update progress | Authenticated |
| `GET` | `/projects` | Get user submitted portfolio projects | Authenticated |
| `POST` | `/projects` | Submit new portfolio project | Authenticated |
| `DELETE` | `/projects/:id` | Delete submitted portfolio project | Authenticated |

### Public & Admin Routes (`/api/admin`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/courses/public` | Fetch all live published courses | Public |
| `GET` | `/courses/public/:id` | Get course details & module structure | Public |
| `GET` | `/courses/public/:id/leaderboard` | Get top students leaderboard for course | Public |
| `POST` | `/upload` | Upload image asset (up to 5MB) | Admin |
| `POST` | `/upload-video` | Upload video asset (up to 200MB) | Admin |
| `GET` | `/users` | List all registered users | Admin |
| `PUT` | `/users/:id/status` | Toggle user status (`active` / `inactive`) | Admin |
| `GET` | `/courses` | List all courses (drafts + live) | Admin |
| `POST` | `/courses` | Create new course | Admin |
| `PUT` | `/courses/:id` | Update course details & status | Admin |
| `DELETE` | `/courses/:id` | Delete course | Admin |
| `POST` | `/courses/:id/modules` | Add module to course | Admin |
| `PUT` | `/modules/:id` | Update module title & order | Admin |
| `DELETE` | `/modules/:id` | Delete module | Admin |
| `POST` | `/modules/:id/lessons` | Add lesson (Video/Article/Quiz/Assignment/Coding) | Admin |
| `PUT` | `/modules/:id/lessons/:lessonId` | Edit lesson details | Admin |
| `DELETE` | `/modules/:id/lessons/:lessonId` | Delete lesson | Admin |

### Contact Routes (`/api/contact`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/` | Submit inquiry form & dispatch confirmation email | Public |

---

## 🔒 Security Best Practices

- All authentication routes use `bcryptjs` with salt rounds set to 12 for password storage.
- JWT tokens are signed using high-entropy secrets and verified on protected endpoints.
- Upload endpoints perform strict MIME type validation for images (`jpeg`, `png`, `webp`, `gif`) and videos (`mp4`, `webm`, `mov`, `avi`, `mkv`).
- File uploads are capped at 5MB for images and 200MB for video assets.
- Sensitive environment files (`.env`) are strictly excluded via `.gitignore`.

---

## 📄 License

This repository is private and maintained for the **LevelUp.dev** platform. All rights reserved.

---

## 📧 Contact & Support

For support, feedback, or inquiries, reach out via:
- **Website**: [LevelUp.dev](http://localhost:5173)
- **Support Email**: [hello@moinsheikh.in](mailto:hello@moinsheikh.in)
