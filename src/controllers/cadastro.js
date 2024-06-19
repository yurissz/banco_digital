const pool = require('../database/conexao');
const bcrypt = require('bcrypt');

const cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;
  const senhaCriptografada = await bcrypt.hash(senha, 10);

  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: "Preencha todos os campos para realizar o cadastro." })
  }
  try {
    const novoUsuario = await pool.query(`
    insert into usuarios (nome,email,senha)
    values($1, $2, $3) returning*`, [nome, email, senhaCriptografada]);

    const usuarioCadastrado = {
      id: novoUsuario.rows[0].id,
      nome: novoUsuario.rows[0].nome,
      email: novoUsuario.rows[0].email
    }

    return res.status(201).json(usuarioCadastrado);

  } catch (error) {
    if (error.constraints === 'usuarios_email_key') {
      return res.status(400).json({ mensagem: "Já existe usuário cadastrado com o e-mail informado." })
    }
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

module.exports = {
  cadastrar
}