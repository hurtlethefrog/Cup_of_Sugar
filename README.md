# Cup of Sugar

## Project Overview
Cup of sugar is a social platform that allows users to connect with other members who live close by. 

User can add notices, build events and add items they have to share or would like to borrow. 
Users can add their own attendance to an event, see others who are attending and add and view comments. 

## Motivation

The project was built by Duncan Haran, Jess Noriega-Lessard and Nelly Main over 10 days as a final project for the 12 weeks Lighthouse Labs Web Development Bootcamp. 

## Screenshots
1. Main page with all unfiltered articles

![main page](https://github.com/hurtlethefrog/Cup_of_Sugar/blob/master/project_planning/Screenshot%20-%20Main%20Full%20Page.png)

2. Filtered notices page in responsive mobile size

![responsive notices](https://github.com/hurtlethefrog/Cup_of_Sugar/blob/master/project_planning/Screenshot%20-%20Notices%20Responsive.png)

3. Registration page

![registration page](https://github.com/hurtlethefrog/Cup_of_Sugar/blob/master/project_planning/Screenshot%20-%20Registration.png)

## Tech/Framework
The backend was built was Ruby on Rails and the Front End predominately with React as well as Javascript, HTML, and SASS. 

## Installation

The project is divided into a frontend under the client folder and a backend. 

#### To start the backend:

Within the project directory - backend

Run "bundle install" to install all dependencies.

Run "rails db:reset" to reset and seed the database. 

Run "bin/rails s -p 3001 -b 0.0.0.0" to start. 

#### To start the frontend: 

Within the project directory - client

Run "npm install" to install all dependencies.

Run "npm start" to start. 

The app will automatically start in the browser or else open http://localhost:3001/ 

The page will reload if you make edits.

The registation used Google Maps API to pre-fill the user address on registration and show a rough outline of the community border. Without signing up and registering with the Google Maps API you can just enter the address manually at registration. 

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

