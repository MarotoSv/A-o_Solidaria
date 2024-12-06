// Importar dependências
require('dotenv').config();  // Carregar variáveis de ambiente
const express = require('express');
const mysql = require('mysql2');

// Criar o app Express
const app = express();
const port = process.env.PORT || 3000;

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Testar a conexão com o banco
connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);  // Caso a conexão falhe, o servidor deve ser encerrado
  } else {
    console.log('Conectado ao banco de dados MySQL!');
  }
});

// Middleware para aceitar JSON no corpo das requisições
app.use(express.json());

// Rota para cadastrar voluntários
app.post('/api/volunteers', (req, res) => {
  const { name, email, phone, message } = req.body;

  // Insira o voluntário no banco de dados MySQL
  connection.query('INSERT INTO volunteers (name, email, phone, message) VALUES (?, ?, ?, ?)', [name, email, phone, message], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Retornar uma resposta positiva para o frontend
    res.status(201).json({ success: true, message: 'Voluntário cadastrado com sucesso!' });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});

