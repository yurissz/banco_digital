const pool = require('../database/conexao');


const listarUser = async (req, res) => {
  const usuarioID = req.usuarioID
  try {
    const usuarioCadastrado = await pool.query(`
    select * from usuarios where id  = $1 
  `, [usuarioID])
    if (usuarioCadastrado.rowCount < 1) {
      return res.status(403).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
    }
    const { senha: _, ...usuario } = usuarioCadastrado.rows[0];
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

module.exports = {
  listarUser
}