# Project-2

A single-page React app built with Vite and deployed to GitHub Pages. 
The project is fully deployed to GitHub Pages, showcasing responsive design and component-based architecture.
*Note:  This

## Features
- Built with React and Vite
- Uses React Router for client-side routing
- Axios for API requests
- JSON Server for mock backend during development
- Deployed on GitHub Pages

## Getting Started
This project uses db.json with JSON Server to simulate a backend API during local development.

However, GitHub Pages only supports static file hosting and cannot run servers like JSON Server. This means any API calls to http://localhost:3030 (or similar) will not work in the live demo.

To test the full functionality of this project, including data fetching and API interactions, please run the project locally using:

npm install
npm run dev
json-server --watch db.json --port 3030


