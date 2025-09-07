const agreementModel = require('../models/agreementModel');
const path = require('path');

// Method to get a list of all agreements and render the view
exports.getAgreements = (req, res) => {
    agreementModel.getAllAgreements((err, agreements) => {
        if (err) {
            console.error('Error fetching agreements:', err.message);
            res.status(500).send('Error fetching agreements');
            return;
        }
        res.render(path.join(__dirname, '../views/agreements.ejs'), { agreements: agreements });
    });
};

// Method to render the new agreement creation form
exports.showCreateAgreementForm = (req, res) => {
    res.render(path.join(__dirname, '../views/createAgreement.ejs'));
};

// Method to create a new agreement from the form data, now using phone numbers and created_by
exports.createAgreement = (req, res) => {
    const { title, content, partyA_phone, partyB_phone } = req.body; // extracted from the form
    const created_by = req.user ? req.user.id : 'anonymous'; // user creating the agreement
    if (!title || !content || !partyA_phone || !partyB_phone) {
        res.status(400).send('Title, content, Party A\'s phone, and Party B\'s phone are required.');
        return;
    }

    agreementModel.createAgreement(title, content, partyA_phone, partyB_phone, created_by, (err, result) => {
        if (err) {
            console.error('Error creating agreement:', err.message);
            res.status(500).send('Error creating agreement');
            return;
        }
        console.log(`Agreement created with ID: ${result.lastID}`);
        res.redirect('/agreements');
    });
};

// Method to edit an agreement
exports.editAgreement = (req, res) => {
    const { id } = req.params;
    const { title, content, partyA_phone, partyB_phone } = req.body;
    const user = req.user ? req.user.id : 'anonymous';

    agreementModel.editAgreement(id, title, content, partyA_phone, partyB_phone, user, (err, result) => {
        if (err) {
            res.status(400).send(err.message);
            return;
        }
        res.redirect('/agreements/');
    });
};

// Method to get a single agreement and render the edit form
exports.showEditAgreementForm = (req, res) => {
    const { id } = req.params;
    agreementModel.getAgreementById(id, (err, agreement) => {
        if (err || !agreement) {
            res.status(404).send('Agreement not found');
            return;
        }
        res.render(path.join(__dirname, '../views/editAgreement.ejs'), { agreement });
    });
};

// Method to delete an agreement
exports.deleteAgreement = (req, res) => {
    const { id } = req.params;
    const user = req.user ? req.user.id : 'anonymous'; // current user

    agreementModel.deleteAgreement(id, user, (err, result) => {
        if (err) {
            res.status(400).send(err.message);
            return;
        }
        res.redirect('/agreements');
    });
};