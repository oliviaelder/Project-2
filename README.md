#  Project 2: React Habit Tracker
Challenge: Build a habit tracker web application.

Context: For the habit tracker project, I designed a simple application that allows users to track their daily habits. The goal was to have an easy way for users to log their habits and view progress over time.

Action:  I created models for users, habits, and habit logs. I used a SQL Server database to store the users' habit data, and each user could have multiple habits. The system would track whether each habit was completed daily. I incorporated a system for users to view the statistics of their habits over different date ranges.

Results: The most challenging part was integrating the habit tracking functionality with date filters. Initially, I had trouble calculating the habit streaks correctly, but after refining my queries and adjusting the date filtering logic, I was able to implement the feature successfully.

Refelction: I enjoyed learning about how to structure and visualize a tracking system. Designing the API and managing the dates helped me improve my problem-solving skills.

<img src="https://github.com/oliviaelder/Project-2/raw/main/EditClient.png" alt="Add/Edit a Client" style="max-width: 100%; height: auto;">
  
## Live Demo

 [Visit the Habit Tracker site](https://oliviaelder.github.io/Project-2/)

## Live Demo Limitations

GitHub Pages only supports static file hosting and cannot run servers like JSON Server.  
Any API calls to `http://localhost:3030` (or similar) **will not work** in the live demo.

To run the project with full functionality (including API calls):

```bash
npm install
npm run dev
json-server --watch db.json --port 3030

