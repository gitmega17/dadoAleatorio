const axios = require('axios');

const url = 'https://backend-clu7.onrender.com/inserir_dados_motores';
let intervaloEnvio;
let intervaloAtual = 300000; // Padrão: 5 minutos em milissegundos

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

async function enviarDados() {
    const dados = gerarDadosReais();
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

function iniciarEnvio() {
    intervaloEnvio = setInterval(async () => {
        const resultado = await enviarDados();
        console.log(resultado);
    }, intervaloAtual);
    console.log('Envio de dados ativado.');
}

function pararEnvio() {
    clearInterval(intervaloEnvio);
    console.log('Envio de dados desativado.');
}

// Nova função para alterar o intervalo de envio
function setIntervaloEnvio(segundos) {
    intervaloAtual = segundos * 1000; // Converte para milissegundos
    if (intervaloEnvio) {
        pararEnvio(); // Para o envio atual
        iniciarEnvio(); // Inicia novamente com o novo intervalo
    }
}

module.exports = { iniciarEnvio, pararEnvio, setIntervaloEnvio };
