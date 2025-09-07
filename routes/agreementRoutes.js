const express = require('express');
const router = express.Router();
const agreementController = require('../controllers/agreementController');

// Route to get a list of all agreements
router.get('/', agreementController.getAgreements);

// Route to show the new agreement creation form
router.get('/create', agreementController.showCreateAgreementForm);

// Route to handle the form submission for creating a new agreement
router.post('/create', agreementController.createAgreement);

// router.get('/:id', agreementController.getAgreements); // Get user by ID (API)
router.get('/:id/edit', agreementController.showEditAgreementForm); // Show edit user form
router.post('/:id/edit', agreementController.editAgreement); // Handle update user form submission
router.get('/:id/delete', agreementController.deleteAgreement); // Delete user (using GET for simplicity; use POST in production)

module.exports = router;
