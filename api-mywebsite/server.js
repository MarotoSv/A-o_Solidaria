// Importar dependências
require('dotenv').config();  // Carregar variáveis de ambiente
const express = require('express');
const mysql = require('mysql2');

// Criar o app Express
const app = express();
const port = process.env.PORT || 3000;

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Exemplo: 'localhost'
  user: process.env.DB_USER, // Exemplo: 'root'
  password: process.env.DB_PASSWORD, // Exemplo: ''
  database: process.env.DB_NAME // Exemplo: 'sua_base_de_dados'
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

// Configuração do Express para aceitar requisições em JSON
app.use(express.json());

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
  console.log(`API rodando na porta ${port}`);
});
