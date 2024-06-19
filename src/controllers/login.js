const pool = require('../database/conexao.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = require('../../key/publickey.js')
const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await pool.query(`
    select * from usuarios where email = $1`, [email])
    if (usuario.rowCount < 1) {
      return res.status(400).json({ mensagem: 'Usuário e/ou senha inválido(s).' })
    }
    const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha);
    if (!senhaValida) {
      return res.status(400).json({ mensagem: 'Usuário e/ou senha inválido(s).' })
    }
    const token = jwt.sign({ id: usuario.rows[0].id }, secretKey, { expiresIn: '8h' });
    const { senha: _, ...usuarioLogado } = usuario.rows[0];
    return res.status(200).json({ usuario: usuarioLogado, token })
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

module.exports = {
  login
}