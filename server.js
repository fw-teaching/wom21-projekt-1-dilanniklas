const express = require('express');
const app = express();
const PORT = process.env.PORT || 3030;

// Testa att detta funkar, ersätt sedan med egen kod
app.get('/register', (req, res) => {
    res.json("Register funkar")
})


//Vi importerar Register route-modul 
const registerRouter = require('./routers/register')
app.use('/register', registerRouter)


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
