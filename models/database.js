const sqlite3 = require('sqlite3').verbose();
const DB_SOURCE = "db.sqlite";

// Create a new database connection
let db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        // Create the 'users' table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            password text, 
            phone text UNIQUE, 
            CONSTRAINT phone_unique UNIQUE (phone)
        )`,
        (err) => {
            if (err) {
                // Table already created
            } else {
                // insert some initial data
                const insert = 'INSERT OR IGNORE INTO users (name, password, phone) VALUES (?,?,?)';
                db.run(insert, ["Alice", "pass", "2565555565"]);
                db.run(insert, ["Bob", "pass", "2567778778"]);
            }
        });  
    }
});

module.exports = db;
