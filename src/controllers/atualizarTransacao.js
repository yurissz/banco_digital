const pool = require('../database/conexao');

const atualizarTransacao = async (req,res)=>{
  const { id } = req.params;
  const usuario = req.usuario
  const {descricao, valor, data, categoria_id, tipo} = req.body;
  try {
    if (!descricao || !valor || !data || !categoria_id || !tipo) {
      return res.status(401).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' })
  }
  
  if (tipo === 'saida' || tipo === 'entrada') {

   const categoria_idExiste = await pool.query(`select * from categorias where id = $1`, [categoria_id]);

    if(categoria_idExiste.rowCount === 0){
    return res.status(404).json({ error: 'Id de categoria informado não existe.' });
  }

  const atualizacao = await pool.query(`update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5
  where id = $6 and usuario_id = $7
  `,[descricao,valor,data,categoria_id,tipo,id,usuario.id]);
  return res.status(200).json();
  }else{
    return res.status(400).json({mensagem: 'Utilize entrada ou saida no campo tipo.'})
  }

  } catch (error) {
    console.log(error);
    return res.status(500).json({mensagem: `Erro interno do servidor.` })
  }
}

module.exports = {
  atualizarTransacao
}