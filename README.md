# Just Tech News

## Description

The backend for a new Tech Blog.  We will use Sequelize along with Express and Node.js to create the server and database for a new tech blog.  Another team will create the client side.   

## Table of Contents 

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

Copy down the entire repository to a local folder and run "npm install".   All the dependencies will be installed.  You will have to log into the MySQL shell as root to create the new just_tech_news_db database by running "source ./db/schema.sql".  You may also want to grant privileges on the new database and tables to another user while you are there.   Make sure the credentials for that user are in the .env file to be used by the server on startup to connect to the database.  When you run "npm start" to start the server, Sequelizer will create the tables. 



## Usage

Run "npm start" from the command line in the root of your application folder to start the server.   This will make the database available to your front end on the api routes.  You can use Insomnia to test these routes; /api/users, /api/posts, /api/comments.   There are routes for GET all, GET one on the id, POST, PUT on the id, and DELETE on the id.   



## Credits

Mark Elliott  https://github.com/melliott7264

This was the exercise for the Module 13 lesson on ORM/Sequelize

## License

Copyright (c) 2022 Mark Elliott

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---
