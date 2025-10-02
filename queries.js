// queries.js
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    // ------------------------------
    // Task 2: Basic CRUD Operations
    // ------------------------------

    // 1. Find all books in a specific genre
    const fictionBooks = await books.find({ genre: "Fiction" }).toArray();
    console.log("\n📚 Fiction Books:", fictionBooks);

    // 2. Find books published after a certain year
    const recentBooks = await books.find({ published_year: { $gt: 2000 } }).toArray();
    console.log("\n📚 Books published after 2000:", recentBooks);

    // 3. Find books by a specific author
    const orwellBooks = await books.find({ author: "George Orwell" }).toArray();
    console.log("\n📚 Books by George Orwell:", orwellBooks);

    // 4. Update the price of a specific book
    await books.updateOne({ title: "1984" }, { $set: { price: 15.99 } });
    console.log("\n✅ Updated price for 1984");

    // 5. Delete a book by its title
    await books.deleteOne({ title: "Moby Dick" });
    console.log("\n❌ Deleted Moby Dick");

    // ------------------------------
    // Task 3: Advanced Queries
    // ------------------------------

    // 1. Books that are in stock AND published after 2010
    const newStock = await books.find({
      in_stock: true,
      published_year: { $gt: 2010 }
    }).toArray();
    console.log("\n🆕 In-stock books after 2010:", newStock);

    // 2. Projection (title, author, price only)
    const projBooks = await books.find({}, {
      projection: { title: 1, author: 1, price: 1, _id: 0 }
    }).toArray();
    console.log("\n📝 Projection (title, author, price):", projBooks);

    // 3. Sort books by price ascending
    const ascPrice = await books.find().sort({ price: 1 }).toArray();
    console.log("\n⬆️ Books sorted by price (low → high):", ascPrice);

    // 4. Sort books by price descending
    const descPrice = await books.find().sort({ price: -1 }).toArray();
    console.log("\n⬇️ Books sorted by price (high → low):", descPrice);

    // 5. Pagination example: Page 1 (5 books)
    const page1 = await books.find().limit(5).toArray();
    console.log("\n📄 Page 1 (first 5 books):", page1);

    // 6. Pagination example: Page 2 (next 5 books)
    const page2 = await books.find().skip(5).limit(5).toArray();
    console.log("\n📄 Page 2 (next 5 books):", page2);

    // ------------------------------
    // Task 4: Aggregation Pipelines
    // ------------------------------

    // 1. Average price of books by genre
    const avgPriceByGenre = await books.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
    ]).toArray();
    console.log("\n💰 Average price by genre:", avgPriceByGenre);

    // 2. Author with the most books
    const topAuthor = await books.aggregate([
      { $group: { _id: "$author", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log("\n👑 Author with the most books:", topAuthor);

    // 3. Group books by decade
    const booksByDecade = await books.aggregate([
      { $addFields: { decade: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } } },
      { $group: { _id: "$decade", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log("\n📅 Books grouped by decade:", booksByDecade);

    // ------------------------------
    // Task 5: Indexing
    // ------------------------------

    // 1. Index on title
    await books.createIndex({ title: 1 });
    console.log("\n⚡ Created index on title");

    // 2. Compound index on author + published_year
    await books.createIndex({ author: 1, published_year: -1 });
    console.log("⚡ Created compound index on author + published_year");

    // 3. Use explain() to show query plan
    const explainQuery = await books.find({ title: "1984" }).explain("executionStats");
    console.log("\n📊 Query explain plan for { title: '1984' }:");
    console.log(JSON.stringify(explainQuery.executionStats, null, 2));

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("\n🔒 Connection closed");
  }
}

run();
