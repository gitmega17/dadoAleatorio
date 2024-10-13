const axios = require('axios');

const url = 'https://backend-clu7.onrender.com/inserir_dados_motores';
let intervaloEnvio;
let intervaloAtual = 300000; // Padrão: 5 minutos em milissegundos

// Função para enviar dados passados pelo front-end (não mais gerando aleatórios)
async function enviarDados(dados) {
    console.log(`Enviando dados para: ${url}`);
    try {
        const response = await axios.post(url, dados);
        console.log('Dados enviados com sucesso:', response.data);
        return 'Dados enviados com sucesso!';
    } catch (error) {
        console.error('Erro ao enviar dados:', error.response ? error.response.data : error.message);
        return 'Erro ao enviar dados!';
    }
}

// Função para iniciar envio periódico
function iniciarEnvio(dados) {
    intervaloEnvio = setInterval(async () => {
        const resultado = await enviarDados(dados); // Envia os dados recebidos do front-end
        console.log(resultado);
    }, intervaloAtual);
    console.log('Envio de dados ativado.');
}

// Função para parar o envio de dados
function pararEnvio() {
    clearInterval(intervaloEnvio);
    console.log('Envio de dados desativado.');
}

// Função para alterar o intervalo de envio
function setIntervaloEnvio(segundos, dados) {
    intervaloAtual = segundos * 1000; // Converte para milissegundos
    if (intervaloEnvio) {
        pararEnvio(); // Para o envio atual
        iniciarEnvio(dados); // Inicia novamente com o novo intervalo e dados
    }
}

module.exports = { iniciarEnvio, pararEnvio, setIntervaloEnvio };
