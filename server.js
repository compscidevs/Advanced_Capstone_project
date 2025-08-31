const app = require('./app.js');
const HTTP_PORT = 3000;

// Start the server
app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
});
