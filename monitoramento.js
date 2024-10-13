const axios = require('axios');

// URL de envio
const url = 'https://backend-clu7.onrender.com/inserir_dados_motores';

// Função para gerar dados realistas dos motores
function gerarDadosReais() {
    return {
        dados_sensores_motores: {
            Motor01: {
                Temperatura: Math.floor(Math.random() * (60 - 30 + 1)) + 30,
                Frequencia: Math.floor(Math.random() * (55 - 45 + 1)) + 45,
                Corrente: (Math.random() * (5 - 3) + 3).toFixed(2),
                Vibracao: "ok",
                Pressao: (Math.random() * (1.5 - 1) + 1).toFixed(2)
            },
            Motor02: {
                Temperatura: Math.floor(Math.random() * (60 - 30 + 1)) + 30,
                Frequencia: Math.floor(Math.random() * (55 - 45 + 1)) + 45,
                Corrente: (Math.random() * (5 - 3) + 3).toFixed(2),
                Vibracao: "ok",
                Pressao: (Math.random() * (1.5 - 1) + 1).toFixed(2)
            }
        }
    };
}

// Função para enviar dados
async function enviarDados() {
    const dados = gerarDadosReais();
    console.log(`Enviando dados para: ${url}`);
    try {
        const response = await axios.post(url, dados);
        console.log('Dados enviados com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao enviar dados:', error.response ? error.response.data : error.message);
    }
}

let intervaloEnvio;

// Função para iniciar o envio de dados
function iniciarEnvio() {
    intervaloEnvio = setInterval(enviarDados, 300000); // A cada 5 minutos
    console.log('Envio de dados ativado.');
}

// Função para parar o envio de dados
function pararEnvio() {
    clearInterval(intervaloEnvio);
    console.log('Envio de dados desativado.');
}

module.exports = { iniciarEnvio, pararEnvio };
