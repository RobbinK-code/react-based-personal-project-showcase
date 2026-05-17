# ☕ Coffee R Us - Admin Portal

> A personal project showcase application built with React to demonstrate modern frontend development practices.

## 📖 Overview

This Single Page Application (SPA) serves as an administrator portal for an e-commerce website ("Coffee R Us"). It allows store administrators to view the current product inventory, dynamically search for specific products, update product pricing, and seamlessly add new products to the catalog. 

This project was built to demonstrate proficiency in advanced React concepts, including state management, custom hooks, client-side routing, and testing.

## ✨ Key Features

- **Client-Side Routing:** Utilizes `react-router-dom` for seamless navigation between the Landing Page, Dashboard, and Add Product form without page reloads.
- **Simulated Backend:** Implements `json-server` to maintain data persistence across sessions via a local `db.json` file.
- **Complete CRUD Operations:** - **Read:** Fetches and displays the current product inventory.
  - **Create:** Allows administrators to post new products via a controlled form.
  - **Update:** Enables patching of existing product prices directly from the dashboard.
- **Custom Hooks:** Abstracts data fetching and API logic into a reusable `useProducts` hook.
- **Dynamic Search:** Includes real-time filtering of products using local state (`useState`).
- **Comprehensive Testing:** Features a testing suite built with **Vitest** and **React Testing Library** to ensure component reliability.

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 (via Vite)
- **Routing:** React Router v7
- **Backend Simulation:** JSON Server
- **Testing:** Vitest, React Testing Library, jsdom
- **Version Control:** Git & GitHub

## 📂 Project Structure

```text
react-based-personal-project-showcase/
├── e-commerce-admin/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── ProductDashboard.jsx # Search, view, and update products
│   │   │   └── AddProductForm.jsx   # Form to add new products
│   │   ├── hooks/
│   │   │   └── useProducts.js       # Custom hook for API interactions
│   │   ├── tests/
│   │   │   └── App.test.jsx         # Vitest component testing suite
│   │   ├── App.jsx                  # Main routing configuration
│   │   └── main.jsx                 # App entry point
│   ├── db.json                      # Simulated backend database
│   ├── package.json                 # Project dependencies & scripts
│   └── vite.config.js               # Vite & Vitest configuration
└── README.md                        # Project documentation