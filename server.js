const express = require('express');
const { iniciarEnvio, pararEnvio, setIntervaloEnvio } = require('./monitoramento');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json()); // Permite que o Express trate JSON

// Rota para ativar o envio de dados
app.post('/iniciar_envio', (req, res) => {
    const dados = req.body; // Recebe os dados do front-end
    if (!dados || Object.keys(dados).length === 0) {
        return res.status(400).send('Dados não fornecidos.');
    }
    iniciarEnvio(dados); // Passa os dados para a função de iniciar envio
    res.send('Envio de dados ativado.');
});

// Rota para desativar o envio de dados
app.post('/parar_envio', (req, res) => {
    pararEnvio();
    res.send('Envio de dados desativado.');
});

// Rota para alterar o intervalo de envio
app.post('/set_intervalo', (req, res) => {
    const { intervalo, dados } = req.body; // Recebe o intervalo em segundos e os dados
    if (typeof intervalo !== 'number' || intervalo <= 0) {
        return res.status(400).send('Intervalo inválido. Deve ser um número positivo.');
    }
    setIntervaloEnvio(intervalo, dados); // Passa os dados para a função de alterar intervalo
    res.send(`Intervalo de envio alterado para ${intervalo} segundos.`);
});

// Rota para verificar o status do envio
app.get('/status_envio', (req, res) => {
    const status = (typeof intervaloEnvio !== 'undefined') ? 'Ativo' : 'Desativado';
    res.send(`Envio de dados está: ${status}`);
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
