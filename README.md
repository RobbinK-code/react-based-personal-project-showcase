# Coffee R Us - Admin Portal

A React-based Single Page Application (SPA) designed as an administrator portal for an e-commerce coffee shop. Built to demonstrate advanced React concepts including custom hooks, state management, client-side routing, and CRUD operations.

## Features
* **Client-Side Routing:** Navigation between Home, Dashboard, and Add Product pages using `react-router-dom`.
* **Custom Hooks:** Uses a `useProducts` hook to fetch, add, and update data.
* **Simulated Backend:** Uses `json-server` to persist data via a `db.json` file.
* **Search Functionality:** Dynamically filters products on the dashboard.
* **Testing:** Component rendering tested using Vitest and React Testing Library.

## How to Run

1. **Install Dependencies:**
   ```bash
   npm install