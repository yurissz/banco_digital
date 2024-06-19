const pool = require('../database/conexao');

const listarTransacoesUser = async (req,res) =>{
  const {id} = req.params;
  const usuario = req.usuario;

  try {
    const transacoes = await pool.query(`
    select * from transacoes where id = $1 and usuario_id = $2
    `,[id,usuario.id])
    return res.status(200).json(transacoes.rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
  }
}

module.exports = {
  listarTransacoesUser
}