// === File: index.js ===
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "book-collection",
  password: "123456",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {

  try {
    const result = await db.query(`SELECT * FROM books ORDER BY id DESC`);
    res.render("index.ejs", { books: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading books");
  }
});

app.post("/add", async (req, res) => {
  let { title, author, rating, notes, date_read, cover_id } = req.body;

  try {
    if ((!cover_id || !author) && title) {
      const response = await axios.get(`https://openlibrary.org/search.json`, {
        params: { title: title },
      });

      const docs = response.data.docs;
      if (docs && docs.length > 0) {
        if (!cover_id && docs[0].cover_i) {
          cover_id = docs[0].cover_i.toString();
        }
        if (!author && docs[0].author_name && docs[0].author_name.length > 0) {
          author = docs[0].author_name[0];
        }
      } else {
        cover_id = null; // fallback if no book found
      }
    }

    await db.query(
      "INSERT INTO books (title, author, rating, notes, date_read, cover_id) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, author, rating, notes, date_read, cover_id]
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding book");
  }
});

app.post("/update", async (req, res) => {
  const { id, title, author, rating, notes, date_read } = req.body;
  try {
    await db.query(
      "UPDATE books SET title = $1, author = $2, rating = $3, notes = $4, date_read = $5 WHERE id = $6",
      [title, author, rating, notes, date_read, id]
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating book");
  }
});

app.post("/delete", async (req, res) => {
  const id  = req.body.id;
  try {
    await db.query("DELETE FROM books WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting book");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
