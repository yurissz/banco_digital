const jwt = require('jsonwebtoken');
const pool = require('../database/conexao');
const privateKey = require('../../key/publickey');

const auth = async (req, res, next) => {
  const { authorization } = req.headers
  const usuarioID = req.usuarioID
  if (!authorization) {
    return res.status(401).json({ mensagem: 'Não autorizado!' })
  }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, privateKey);
    req.usuarioID = id
    const { rows, rowsCount } = await pool.query(
      `select * from usuarios where id = $1`, [id]
    )
    if (rowsCount < 1) {
      return res.status(401).json({ mensagem: 'Não autorizado!' });
    }
    const { senha, ...usuario } = rows[0];

    req.usuario = usuario;

    next()
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

module.exports = auth;