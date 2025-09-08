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



⚡️ Getting Started

Clone the repo and install dependencies:

git clone <repo-url>
cd project-root
npm install
