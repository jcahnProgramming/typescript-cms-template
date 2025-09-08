# 🌐 Modular Website Platform

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)
[![Tech](https://img.shields.io/badge/stack-React%20%7C%20Node.js%20%7C%20Supabase-ff69b4.svg)](#)

A **modular website platform** designed to be flexible, scalable, and extensible.  
It provides a **widget-based builder** with admin-controlled subdomains, permission management, and responsive layouts.  

---

## 🚀 Features

### 🔧 Core
- Modular component architecture
- Dynamic routing system
- Centralized theme & style management
- API-driven content flow

### 🧩 Widgets
- Top 50 most-used widgets (inspired by Squarespace, Wix, etc.)
- Hover-over resize selector:
  - **Small** → 1/3 screen width  
  - **Medium** → 1/2 screen width  
  - **Full** → 100% width
- Drag-and-drop placement

### 🛠 Admin Tools
- Create and assign **permissions**
- Group-specific **subdomains** with unique branding
- Role-based access control (RBAC)
- Admin dashboards for each group

### 🎨 User Experience
- Responsive grid layouts
- Subdomain-specific themes
- Smooth hover interactions
- Fast page load with lazy-loaded widgets

---

## 📂 Project Structure

```bash
/project-root
│
├── /src
│   ├── /components       # Reusable components & widgets
│   ├── /pages            # Page routing
│   ├── /styles           # Global & theme CSS
│   ├── /utils            # Helper functions
│   └── /admin            # Admin panel & permission mgmt
│
├── /public               # Static assets
├── /config               # Config files (env, settings)
│
├── package.json
├── README.md
└── LICENSE

```

## ⚡️ Getting Started

Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd project-root
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## 🛠 Tech Stack

| Layer      | Tech                                       |
| ---------- | ------------------------------------------ |
| Frontend   | [React](https://react.dev)                 |
| Styling    | Custom CSS (theme-based)                   |
| Backend    | Node.js / [Supabase](https://supabase.com) |
| Deployment | Vercel / Netlify                           |


## 🤝 Contributing

Contributions are always welcome! 🎉

Fork the repository

Create a feature branch:
```bash
git checkout -b feature/my-feature
```

Commit your changes

Push and submit a pull request


## 📜 License

This project is licensed under the MIT License.

### ✨ Built to be flexible, fast, and future-proof.

## Environment Variables

This project uses Supabase and Next.js. Environment variables should be defined in a `.env.local` file at the root of the repository.

Create a file called `.env.local` alongside `package.json` with the following contents:

```bash
# Supabase credentials (client‑side safe)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key

# Supabase service key (⚠️ server-side only, do not expose to client)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional: Supabase JWT secret (for custom auth policies)
SUPABASE_JWT_SECRET=your-jwt-secret

# Standard Next.js environment setting
NODE_ENV=development
```

### Notes

* Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.
* **Never commit real secrets.** Add `.env.local` to `.gitignore` (Next.js does this by default).
* For production (e.g., Vercel), add the same variables in the project’s dashboard under **Settings → Environment Variables**.
* You may commit an `.env.local.example` file (without secrets) to show required keys.

