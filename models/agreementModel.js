const db = require('./database');

/**
 * Creates a new agreements table in the database if it doesn't exist.
 * Now includes Party A and Party B phone numbers, status, and created_by.
 */
function createAgreementsTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS agreements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            partyA_phone TEXT NOT NULL,
            partyB_phone TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            created_by TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
    db.run(sql, (err) => {
        if (err) {
            console.error('Error creating agreements table:', err.message);
        } else {
            console.log('Agreements table ready.');
        }
    });
}

// Ensure the agreements table is created when the model is loaded.
createAgreementsTable();

/**
 * Inserts a new agreement into the database, including the two parties' phone numbers, status, and created_by.
 * @param {string} title
 * @param {string} content
 * @param {string} partyA_phone
 * @param {string} partyB_phone
 * @param {string} created_by
 * @param {function} callback
 */
exports.createAgreement = (title, content, partyA_phone, partyB_phone, created_by, callback) => {
    const sql = 'INSERT INTO agreements (title, content, partyA_phone, partyB_phone, created_by) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [title, content, partyA_phone, partyB_phone, created_by], function(err) {
        callback(err, { lastID: this.lastID });
    });
};



/**
 * Retrieves all agreements from the database.
 * @param {function} callback
 */
exports.getAllAgreements = (callback) => {
    const sql = 'SELECT id, title, content, partyA_phone, partyB_phone, status, created_by, created_at FROM agreements ORDER BY created_at DESC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, rows);
    });
};

/**
 * Edit an agreement if status is not 'confirmed' and user is the creator.
 * @param {number} id
 * @param {string} title
 * @param {string} content
 * @param {string} partyA_phone
 * @param {string} partyB_phone
 * @param {string} user
 * @param {function} callback
 */
exports.editAgreement = (id, title, content, partyA_phone, partyB_phone, user, callback) => {
    // Check status and created_by
    const checkSql = 'SELECT status, created_by FROM agreements WHERE id = ?';
    db.get(checkSql, [id], (err, row) => {
        if (err) return callback(err);
        if (!row) return callback(new Error('Agreement not found'));
        if (row.status === 'confirmed') return callback(new Error('Agreement is confirmed and cannot be edited'));
        if (row.created_by !== user) return callback(new Error('Only the creator can edit this agreement'));

        const updateSql = `
            UPDATE agreements
            SET title = ?, content = ?, partyA_phone = ?, partyB_phone = ?
            WHERE id = ?`;
        db.run(updateSql, [title, content, partyA_phone, partyB_phone, id], function(err) {
            if (err) return callback(err);
            callback(null, { changes: this.changes });
        });
    });
};

/**
 * Retrieves a single agreement by ID.
 * @param {number} id
 * @param {function} callback
 */
exports.getAgreementById = (id, callback) => {
    const sql = 'SELECT * FROM agreements WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) return callback(err, null);
        callback(null, row);
    });
};

/**
 * Delete an agreement if status is not 'confirmed' and user is the creator.
 * @param {number} id
 * @param {string} user
 * @param {function} callback
 */
exports.deleteAgreement = (id, user, callback) => {
    // Check status and created_by
    const checkSql = 'SELECT status, created_by FROM agreements WHERE id = ?';
    db.get(checkSql, [id], (err, row) => {
        if (err) return callback(err);
        if (!row) return callback(new Error('Agreement not found'));
        // checking if the agreement has been confirmed
        if (row.status === 'confirmed') return callback(new Error('Agreement is confirmed and cannot be deleted'));
        // checking if the current user is the creator of the agreement
        if (row.created_by !== user) return callback(new Error('Only the creator can delete this agreement'));

        const deleteSql = 'DELETE FROM agreements WHERE id = ?';
        db.run(deleteSql, [id], function(err) {
            if (err) return callback(err);
            callback(null, { changes: this.changes });
        });
    });
};

/**
 * Get all agreements created by a specific user (by userId).
 * @param {string|number} userId
 * @param {function} callback
 */
exports.getAgreementsByCreator = (userPhone, callback) => {
    const sql = `
        SELECT id, title, content, partyA_phone, partyB_phone, status, created_by, created_at
        FROM agreements
        WHERE created_by = ?
        ORDER BY created_at DESC
    `;
    db.all(sql, [userPhone], (err, rows) => {
        if (err) return callback(err, null);
        callback(null, rows);
    });
};

/**
 * Get all agreements where the user is tagged as partyB (by phone),
 * but is NOT the creator.
 * @param {string} phone
 * @param {function} callback
 */
exports.getAgreementsWhereTagged = (phone, callback) => {
    const sql = `
        SELECT id, title, content, partyA_phone, partyB_phone, status, created_by, created_at
        FROM agreements
        WHERE partyB_phone = ?
        AND created_by != ?
        ORDER BY created_at DESC
    `;
    db.all(sql, [phone, phone], (err, rows) => {
        if (err) return callback(err, null);
        callback(null, rows);
    });
};

exports.updateAgreementStatus = (id, status, callback) => {
    const sql = 'UPDATE agreements SET status = ? WHERE id = ?';
    db.run(sql, [status, id], function(err) {
        callback(err);
    });
};