const express = require('express');
const routes = express.Router();

const telefone = require('./controllers/telefone');

routes.get('/', (req, res) => {
    res.json({titulo: 'Agenda Super-Poderosa'});
});

routes.post('/telefone', telefone.create);
routes.get('/telefone', telefone.read);
routes.put('/telefone/:id', telefone.update);
routes.delete('/telefone/:id', telefone.del);


module.exports = routes;