const UserModel = require('../models/userModel');

// Get all users
exports.getAllUsers = (req, res) => {
    UserModel.getAll((err, users) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.render('users', { users });
    });
};

// Get user by ID (API response)
exports.getUserById = (req, res) => {
    const id = req.params.id;
    UserModel.getById(id, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    });
};

// Show create user form
exports.showCreateForm = (req, res) => {
    res.render('create_user', { error: null });
};

// Create a new user
exports.createUser = (req, res) => {
    const { name, password, phone } = req.body;
    const phoneRegex = /^\+?\d{10,15}$/;
    if (!name || !phone) {
        return res.render('create_user', { error: 'Name and phone are required' });
    }
    if (!phoneRegex.test(phone)) {
        return res.render('create_user', { error: 'Invalid phone number format (e.g., 1234567890 or +1234567890)' });
    }
    UserModel.create(name, password, phone, (err, result) => {
        if (err) {
            return res.render('create_user', { error: 'Failed to create user: ' + err.message });
        }
        res.redirect('/login');
    });
};

// Show edit user form
exports.showEditForm = (req, res) => {
    const id = req.params.id;
    UserModel.getById(id, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.render('edit_user', { user, error: null });
    });
};

// Update a user
exports.updateUser = (req, res) => {
    const id = req.params.id;
    const { name, password, phone } = req.body;
    const phoneRegex = /^\+?\d{10,15}$/;
    if (!name || !phone) {
        return res.render('edit_user', { user: { id, name, password, phone }, error: 'Name and phone are required' });
    }
    if (!phoneRegex.test(phone)) {
        return res.render('edit_user', { user: { id, name, password, phone }, error: 'Invalid phone number format (e.g., 1234567890 or +1234567890)' });
    }
    UserModel.update(id, name, password, phone, (err, result) => {
        if (err) {
            return res.render('edit_user', { user: { id, name, password, phone }, error: 'Failed to update user: ' + err.message });
        }
        if (result.changes === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.redirect('/users');
    });
};

// Delete a user
exports.deleteUser = (req, res) => {
    const id = req.params.id;
    UserModel.delete(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.changes === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.redirect('/users');
    });
};