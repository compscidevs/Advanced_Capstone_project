const UserModel = require('../models/userModel');

const userController = {
    // Controller method to get all users
    getAllUsers: (req, res) => {
        UserModel.getAll((err, users) => {
            if (err) {
                res.status(500).json({ "error": err.message });
                return;
            }
            // show the list of users
            res.json(users);
        });
    },
    
    // Controller method to get a single user by ID
    getSingleUser: (req, res) => {
        const id = req.params.id;
        UserModel.getById(id, (err, user) => {
            if (err) {
                res.status(500).json({ "error": err.message });
                return;
            }
            if (!user) {
                res.status(404).json({ "message": "User not found" });
                return;
            }
            res.json(user);
        });
    },
    
    // Controller method to get a single user by ID
    createUser: (req, res) => {
        const { name, phone } = req.body;
        if (!name || !phone) {
            res.status(400).send('Name and phone number are required.');
            return;
        }

        UserModel.create(name, phone, (err, result) => {
            if (err) {
                console.error('Error creating user:', err.message);
                res.status(500).send('Error creating user');
                return;
            }
            console.log(`User created with ID: ${result.lastID}`);
            // Redirect the user back to the list of users after successful creation
            res.redirect('/users');
        });    
    }
};

module.exports = userController;
