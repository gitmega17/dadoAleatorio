const express = require('express');
const { iniciarEnvio, pararEnvio, setIntervaloEnvio } = require('./monitoramento');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json()); // Adicione esta linha para permitir que o Express trate JSON

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

// Rota para alterar o intervalo de envio
app.post('/set_intervalo', (req, res) => {
    const { intervalo } = req.body; // Recebe o intervalo em segundos
    setIntervaloEnvio(intervalo);
    res.send(`Intervalo de envio alterado para ${intervalo} segundos.`);
});

// Rota para verificar o status do envio
app.get('/status_envio', (req, res) => {
    const status = intervaloEnvio ? 'Ativo' : 'Desativado';
    res.send(`Envio de dados está: ${status}`);
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
