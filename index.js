const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Add logging middleware
app.use((req, res, next) => {
    console.log(req.path);
    next();
})

app.get('/', (req, res) => {
    res.render('register', { username: 'bstanton'});
});

// Import the function from the routes module
const initRoutes = require('./src/routes');
// Execute the function with the app as an argument
initRoutes(app);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
