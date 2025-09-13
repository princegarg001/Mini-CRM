# MERN Mini CRM (Complete ZIP)

This archive contains a complete MERN mini-CRM project (backend + frontend) with:
- JWT auth (register/login)
- Customer CRUD with pagination + search
- Nested Leads per customer (CRUD + status filter)
- Role-based access (admin/user)
- Joi request validation
- Simple reporting endpoint (/api/reports/leads-by-status)
- Frontend with React, Redux Toolkit & RTK Query, React Router, Recharts

## Quick start (backend)
cd backend
cp .env.example .env
# set MONGO_URI and JWT_SECRET
npm install
npm run dev

## Quick start (frontend)
cd frontend
cp .env.example .env
# set VITE_API_URL to backend e.g. http://localhost:4000/api
npm install
npm run dev

