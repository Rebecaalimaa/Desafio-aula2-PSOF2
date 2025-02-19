const express = require('express');
const cors = require('cors');
const app = express();

const rotas = require('./src/routes.js');

app.use(cors());
app.use(express.json());
app.use(rotas);

app.listen(4000, () => {
    console.log('Servidor rodando em http://localhost:4000');
});