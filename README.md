#  Project 2: React Habit Tracker
Challenge: Build a Habit Tracker Web Application.

Context: For the Habit Tracker Project, I designed a React single page application with API Integration that allows users to track their daily habits. The goal was to have an easy way for users to log their habits and view progress over time.

Action:  I created a react-based SPA that communicates with a local API to display and manipulate data, reading from and writing to a db.json file.  This application allows the user to maintain users, habits, and habit logs. The system would track whether each habit was completed daily. I incorporated a system for users to view the statistics of their habits over different date ranges.

Results: The most challenging part was integrating the habit tracking functionality with date filters. Initially, I had trouble calculating the habit streaks correctly, but after refining my queries and adjusting the date filtering logic, I was able to implement the feature successfully.

Reflection: I enjoyed learning about how to structure and visualize a tracking system. Designing the API and managing the dates helped me improve my problem-solving skills.

<hr>
  <img src="https://github.com/oliviaelder/Project-2/raw/main/MaintainClientandHabit.png" alt="Client and Habit Functions" style="max-width: 100%; height: auto;">
<hr>
<br>
  <img src="https://github.com/oliviaelder/Project-2/raw/main/AddHabit.png" alt="Add Habit Function" style="max-width: 100%; height: auto;">
<br>

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

