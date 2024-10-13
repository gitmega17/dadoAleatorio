const express = require('express');
const { iniciarEnvio, pararEnvio } = require('./monitoramento');
const app = express();
const port = process.env.PORT || 3000;

// Servir o front-end estático da pasta public
app.use(express.static('public'));

// Rota para ativar o envio de dados
app.post('/iniciar_envio', (req, res) => {
    iniciarEnvio();
    res.send('Envio de dados ativado.');
});

// Rota para desativar o envio de dados
app.post('/parar_envio', (req, res) => {
    pararEnvio();
    res.send('Envio de dados desativado.');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
