const express = require('express');
const rotas = express();
const auth = require('./middlewares/authentication');
const { cadastrar } = require('./controllers/cadastro');
const { login } = require('./controllers/login');
const { listarUser } = require('./controllers/dadosUser');
const { atualizarUser } = require('./controllers/updateUser');
const { listarCategorias } = require('./controllers/listarCategorias');
const { listarTransacoes } = require('./controllers/listarTransacoes');
const { listarTransacoesUser } = require('./controllers/listarTransacoesUser');
const { cadastro } = require('./controllers/cadastrarTransacao');
const { atualizarTransacao } = require('./controllers/atualizarTransacao');
const { deletarTransacao } = require('./controllers/removerTransacoes')
const { obterExtrato } = require('./controllers/obterExtratoTransacao')

rotas.post('/usuario', cadastrar);
rotas.post('/login', login);

rotas.use(auth);

rotas.get('/usuario', listarUser)
rotas.put('/usuario', atualizarUser)
rotas.get('/categorias', listarCategorias)
rotas.get('/transacao', listarTransacoes)
rotas.get('/transacao/extrato', obterExtrato)
rotas.get('/transacao/:id', listarTransacoesUser)
rotas.post('/transacao', cadastro)
rotas.put('/transacao/:id', atualizarTransacao)
rotas.delete('/transacao/:id', deletarTransacao)

module.exports = rotas;