const express = require('express');
const app = express();
const PORT = process.env.PORT || 3030;

// Testa att detta funkar, ersätt sedan med egen kod
app.get('/test', (req, res) => res.json("Det funkar!"));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
