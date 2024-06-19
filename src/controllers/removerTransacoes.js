const pool = require('../database/conexao');

const deletarTransacao = async (req, res) => {
    const { id } = req.params
    const usuario = req.usuario

    try {
        const { rows, rowCount } = await pool.query('select * from transacoes where id = $1 and usuario_id = $2', [id, usuario.id])

        if (!id) {
            return res.status(401).json({ "mensagem": "Informe o ID da transação." })
        }
        if (rowCount < 1) {
            return res.status(404).json({ "mensagem": "Transação não encontrada." })
        }

        const excluirTransacao = await pool.query('delete from transacoes where id = $1 and usuario_id = $2', [id, usuario.id])

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }

}

module.exports = {
    deletarTransacao
}