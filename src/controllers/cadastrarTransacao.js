const pool = require('../database/conexao');

const cadastro = async (req,res) =>{
  const {descricao,valor,data,categoria_id,tipo} = req.body;
  const usuario = req.usuario;
  try {
    if(!descricao || !valor || !data || !categoria_id || !tipo){
    return res.status(400).json('É necessário preencher todos os campos para cadastrar uma nova transação.')
  }

  const usuarioCadastrado = await pool.query(`
    select from usuarios where id = $1
  `,[usuario.id])

  if(usuarioCadastrado.rowCount < 1){
    return res.status(401).json({mensagem: 'Não autorizado.'})
  }
  if (tipo === 'saida' || tipo === 'entrada') {
  const novaTransacao = await pool.query(`
  insert into transacoes (descricao,valor,data,categoria_id,tipo,usuario_id)
  values ($1,$2,$3,$4,$5,$6)
  returning *`,[descricao,valor,data,categoria_id,tipo,usuario.id]);

  return res.status(201).json(novaTransacao.rows[0])
  }
  else{
    return res.status(400).json({mensagem: 'Utilize entrada ou saida no campo tipo.'})
  }
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
}
}

module.exports = {
  cadastro
}