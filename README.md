my_book_collection

This is a full-stack web application that allows you to manage your personal book collection. You can:

- Add new books with title, author, rating, cover ID, date read, and notes
- View all added books
- Update book details
- Delete books from the list

🛠️ Tech Stack

Frontend:
EJS Templates
HTML5
CSS3

Backend:
Node.js
Express.js

Database:
PostgreSQL

API Integration:
Open Library Covers API

⚙️ Installation & Setup

1. Clone the repository

git clone (https://github.com/Nikhilnath07/my_book_collection.git)

2. Install dependencies

npm install


3. Set up PostgreSQL database

CREATE DATABASE my_book_collection;
\c my_book_collection
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    year INT,
    notes TEXT
);


4. Configure environment variables
Create a .env file in the root directory:

DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=my_book_collection


5. Run the app

npm start

The app will run at: http://localhost:3000



