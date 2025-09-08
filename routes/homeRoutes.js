const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.showHome); // List all users
router.get('/login', homeController.showLogin); // Login
router.get('/logout', homeController.Logout); // Logout
router.post('/login', homeController.checkLogin); // Check Login
router.get('/register', homeController.showRegister); // Register all users
router.get('/dashboard', homeController.showDashboard); // Register all users

module.exports = router;