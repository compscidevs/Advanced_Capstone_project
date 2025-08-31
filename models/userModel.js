const db = require('./database.js');

class UserModel {
    // Get all users from the database
    static getAll(callback) {
        const sql = "SELECT * FROM users";
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    }

    // Get a single user by their ID
    static getById(id, callback) {
        const sql = "SELECT * FROM users WHERE id = ?";
        db.get(sql, [id], (err, row) => {
            if (err) {
                console.error(err.message);
                callback(err, null);
            } else {
                callback(null, row);
            }
        });
    }

    // Create a new user
    static create(name, phone, callback) {
        const sql = 'INSERT INTO users (name, phone) VALUES (?, ?)';
        db.run(sql, [name, phone], function(err) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, { lastID: this.lastID });
        })
    }
}

module.exports = UserModel;
