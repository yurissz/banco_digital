const pool = require('../database/conexao');

const obterExtrato = async (req, res) => {

    const usuario = req.usuario
    try {
        const transacoesDoTipoEntrada = await pool.query('select sum(valor) from transacoes where usuario_id = $1 and tipo = $2', [usuario.id, 'entrada'])
        const transacoesDoTipoSaida = await pool.query('select sum(valor) from transacoes where usuario_id = $1 and tipo = $2', [usuario.id, 'saida'])
        const contagemDeEntradaESaida = {
            "entrada": transacoesDoTipoEntrada.rows[0].sum,
            "saida": transacoesDoTipoSaida.rows[0].sum
        }

        return res.status(200).json(contagemDeEntradaESaida)
    }
    catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

module.exports = {
    obterExtrato
}