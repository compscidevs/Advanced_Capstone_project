const db = require('./database');

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

    // Get a single user by their phone
    static getByPhone(phone, callback) {
        const sql = "SELECT * FROM users WHERE phone = ?";
        db.get(sql, [phone], (err, row) => {
            if (err) {
                console.error(err.message);
                callback(err, null);
            } else {
                callback(null, row);
            }
        });
    }

    // Create a new user
    static create(name, password, phone, callback) {
        const sql = 'INSERT INTO users (name, password, phone) VALUES (?, ?, ?)';
        db.run(sql, [name, password, phone], function(err) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, { lastID: this.lastID });
        });
    }

    // Update a user
    static update(id, name, password, phone, callback) {
        const sql = 'UPDATE users SET name = ?, password = ?, phone = ? WHERE id = ?';
        db.run(sql, [name, password, phone, id], function(err) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, { changes: this.changes });
        });
    }

    // Delete a user
    static delete(id, callback) {
        const sql = 'DELETE FROM users WHERE id = ?';
        db.run(sql, [id], function(err) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, { changes: this.changes });
        });
    }
}

module.exports = UserModel;