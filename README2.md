# 📚 MongoDB Data Layer Fundamentals and Advanced Techniques – Week 1 Assignment

## 🚀 Project Overview

This project demonstrates the fundamentals of **MongoDB** using a `plp_bookstore` database. It includes:

* Database and collection setup
* Basic CRUD operations
* Advanced queries with filtering, projection, and sorting
* Aggregation pipelines for analysis
* Indexing for performance optimization

---

## 🛠️ Setup Instructions

### 1. Prerequisites

Ensure the following are installed:

* [Node.js](https://nodejs.org/) (v14 or higher recommended)
* [MongoDB Community Edition](https://www.mongodb.com/try/download/community) OR MongoDB Atlas account
* [VS Code](https://code.visualstudio.com/) or another editor

---

### 2. Clone the Repository

```bash
git clone <your-repo-url>
cd mongodb-data-layer-fundamentals-and-advanced-techniques-Thuocecilia
```

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Start MongoDB Server

For local MongoDB:

```bash
mongod
```

For MongoDB Atlas:
Update the connection string in `insert_books.js` and `queries.js` with your Atlas URI.

---

## 📂 Project Files

* **insert_books.js** → Script to insert initial documents
* **queries.js** → Script containing all queries (CRUD, advanced, aggregation, indexing)
* **screenshot.png** → Proof of execution
* **README.md** → Setup and run instructions

---

## ▶️ How to Run

### Step 1: Insert Sample Data

Run the insert script:

```bash
node insert_books.js
```

✅ Expected output:
“12 books were successfully inserted into the database”

---

### Step 2: Run Queries

Run the queries script:

```bash
node queries.js
```

### What the script covers:

1. **Basic CRUD**

   * Count total documents
   * Find all books by George Orwell
   * Find books published before 1950
   * Find books in stock
   * Update a book (`1984 → in_stock: false`)
   * Delete a book (`Moby Dick`)

2. **Advanced Queries**

   * Find all books in a specific genre (`Fiction`)
   * Find books published after 2000
   * Find books both in stock and published after 2010
   * Projection: return only `title`, `author`, `price`
   * Sorting: by price (ascending and descending)
   * Pagination: limit 5 books per page, skip to next page

3. **Aggregation Pipelines**

   * Average price of books by genre
   * Author with the most books
   * Group books by publication decade and count them

4. **Indexing**

   * Create index on `title`
   * Create compound index on `author` + `published_year`
   * Use `.explain("executionStats")` to compare performance

---

## 📸 Verification in Mongo Shell (Optional)

Open Mongo Shell:

```bash
mongosh
```

Switch to the database:

```bash
use plp_bookstore
```

Check inserted books:

```bash
db.books.find().pretty()
```

---

## 📸 Screenshot

See `screenshot.png` for terminal proof of running `queries.js`.

---

## ✅ Deliverables

* [x] `insert_books.js` – sample data insert
* [x] `queries.js` – CRUD, advanced queries, aggregation, indexing
* [x] `screenshot.png` – proof of execution
* [x] `README.md` – instructions

