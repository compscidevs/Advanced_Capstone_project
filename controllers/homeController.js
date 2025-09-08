const userModel = require('../models/userModel');
const agreementModel = require('../models/agreementModel');

// Show the home page
exports.showHome = (req, res) => {
    res.render('home');
};

// Show the login page
exports.showLogin = (req, res) => {
    res.render('login');
};

// Logout the user and redirect to login page
exports.Logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out.');
        }
        res.redirect('/login');
    });
};

// Show the register page
exports.showRegister = (req, res) => {
    res.render('create_user');
};

// check login credentials
exports.checkLogin = (req, res) => {
    const { phone, password } = req.body;
    userModel.getByPhone(phone, (err, user) => {
        if (err || !user) {
            return res.render('login', { error: 'Invalid phone or password.' });
        }
        // Replace with your password check logic
        if (user.password !== password) {
            return res.render('login', { error: 'Invalid phone or password.' });
        }
        // Set session or cookie as needed
        req.session.user = user;
        res.redirect('/dashboard');
    });
};

// Show the dashboard page
exports.showDashboard = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const user = req.session.user;

    // Fetch agreements created by the user
    agreementModel.getAgreementsByCreator(user.phone, (err, createdAgreements) => {
        if (err) createdAgreements = [];
        // Fetch agreements where user is tagged (partyA or partyB)
        agreementModel.getAgreementsWhereTagged(user.phone, (err2, taggedAgreements) => {
            if (err2) taggedAgreements = [];
            res.render('dashboard', {
                user,
                createdAgreements,
                taggedAgreements
            });
        });
    });
};