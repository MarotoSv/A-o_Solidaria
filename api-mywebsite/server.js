// Importar dependências
require('dotenv').config();  // Para carregar as variáveis de ambiente
const express = require('express');
const mysql = require('mysql2');

// Criar o app Express
const app = express();
const port = process.env.PORT || 3000;

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection(process.env.DATABASE_URL);

// Testar a conexão com o banco
connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL!');
    }
});

// Rota para buscar dados no banco de dados
app.get('/api/dados', (req, res) => {
    connection.query('SELECT * FROM sua_tabela', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log('API rodando na porta ${port}');
});

