# Simulador de Banco Digital
Uma simulação de banco digital integrado com banco de dados. ( A simple Bank simulation with database integration.)


## Projeto
* Autenticação do Usuário utilizando jsonwebtoken (JWT)
* Criptografia de Senha utilizando bcrypt
* Geração automática de token
* Cadastro De Contas
* Cadastro de Transações
* Listagem de Transações
* Calculo de Saídas e Entradas de saldo da conta do Usuário
* Gerenciamento de Conta
* Gerenciamento de Transações

## Ferramentas e linguagens usadas
* Javascript
* Jsonwebtoken (JWT)
* Bcrypt (Criptografia)

## Endpoints
* POST /transacao - Cadastra transação do Usuário Logado
* GET /transacao/extrato - Simulação de um extrato de um banco, trazendo todas as transações do usuário logado
* POST /login - Realiza o Login de um Usuário
* GET /transacao/:id - Listar uma transação específica do usuario logado através do Id da transação
* GET /categorias - Lista todas as categorias que o banco possui
* GET /usuario - Retorna todos os dados do usuário logado
* GET /transacao - Retorna todas as transações do usuári logado
* PUT /transacao/:id - Atualiza a transação do usuário logado
* PUT /usuario - Atualiza os dados do usuário logado

## Como usar
```
git clone <urlDoProjeto>

npm install

npm run dev
```
