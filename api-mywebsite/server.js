// Importar dependências
require('dotenv').config();  // Para carregar as variáveis de ambiente
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');  // Para processar dados JSON no corpo da requisição

// Criar o app Express
const app = express();
const port = process.env.PORT || 3000;

// Configuração do bodyParser para aceitar JSON
app.use(bodyParser.json());  // Permite receber JSON no corpo das requisições

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

// Rota para cadastrar voluntário no banco de dados
app.post('/api/volunteers', (req, res) => {
    const { name, email, phone, address } = req.body;  // Desestruturando o corpo da requisição

    // Verifica se todos os dados necessários foram enviados
    if (!name || !email || !phone || !address) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Query para inserir os dados no banco
    const query = 'INSERT INTO volunteers (name, email, phone, address) VALUES (?, ?, ?, ?)';
    const values = [name, email, phone, address];

    connection.query(query, values, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({
                message: 'Voluntário cadastrado com sucesso!',
                data: { id: results.insertId, name, email, phone, address }
            });
        }
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
});


// Iniciar o servidor
app.listen(port, () => {
    console.log('API rodando na porta ${port}');
});

