# ⚛️ Project-2: React Habit Tracker

A single-page **React** app built with **Vite**, designed to help users track habits like water intake, exercise, and more. Fully deployed to **GitHub Pages**, featuring a clean UI and modular architecture.

## 🌟 Features

- ⚛️ Built with **React** and **Vite**  
- 🔀 Uses **React Router** for client-side navigation  
- 🔧 **Axios** for API requests  
- 🗃️ **JSON Server** used as a mock backend during development  
- 🚀 Deployed on **GitHub Pages**
  
## 🔗 Live Demo

👉 [Visit the Habit Tracker site](https://oliviaelder.github.io/Project-2/)

## ⚠️ Live Demo Limitations

GitHub Pages only supports static file hosting and cannot run servers like JSON Server.  
Any API calls to `http://localhost:3030` (or similar) **will not work** in the live demo.

## 💻 Local Development

To run the project with full functionality (including API calls):

```bash
npm install
npm run dev
json-server --watch db.json --port 3030

