const con = require('../connect');

const create = (req, res) => {
    const { telefone, nome, obs } = req.body;
    con.query('INSERT INTO telefones (telefone, nome, obs) VALUES(?,?,?)',
        [telefone, nome, obs], (err, result) => {
            if (err) {
                res.status(400).json({ erro: err });
            } else {
                res.status(201).json(result);
            }
        });
};

const read = (req, res) => {
    con.query('SELECT * FROM telefones', (err, result) => {
        if (err) {
            res.status(500).json({ erro: err });
        } else {
            res.json(result);
        }
    });
};

const update = (req, res) => {
    const id = req.params.id;
    const { telefone, nome, obs } = req.body;
    con.query('UPDATE telefones SET telefone = ?, nome = ?, obs = ? WHERE telefone_id = ?',
        [telefone, nome, obs, id ], (err, result) => {
            if (err) {
                res.status(400).json({ erro: err });
            } else {
                res.status(202).json(result);
            }
        });
};

const del = (req, res) => {
    const id = req.params.id;
    con.query('DELETE FROM telefones WHERE telefone_id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({ erro: err });
        } else {
            res.status(204).json(result);
        }
    });
};

module.exports = { create, read, update, del };