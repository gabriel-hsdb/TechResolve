const express = require('express');
const { Chamado } = require('./models');

const router = express.Router();

router.get('/chamados', async (req, res) => {
    const chamados = await Chamado.findAll();
    res.json(chamados);
});

router.post('/chamados', async (req, res) => {
    const chamado = await Chamado.create(req.body);
    res.json(chamado);
});

router.put('/chamados/:id', async (req, res) => {
    await Chamado.update(req.body, {
        where: { id: req.params.id }
    });

    res.json({ mensagem: 'Chamado atualizado' });
});

router.delete('/chamados/:id', async (req, res) => {
    await Chamado.destroy({
        where: { id: req.params.id }
    });

    res.json({ mensagem: 'Chamado excluído' });
});

module.exports = router;
