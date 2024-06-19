const pool = require('../database/conexao');

const listarTransacoes = async (req, res) => {
    const usuario = req.usuario;
    let filtroArray;

    if (Array.isArray(req.query.filtro)) {
        filtroArray = req.query.filtro;
    } else if (typeof req.query.filtro === 'string') {
        filtroArray = req.query.filtro.split(/\s+/);
    } else {
        filtroArray = [];
    }
    try {
        if (filtroArray.length > 0) {
            const placeholder = filtroArray.map((_, index) => `$${index + 1}`).join(', ');
            const query = `
                SELECT transacoes.*, categorias.descricao as categoria_nome
                FROM categorias
                INNER JOIN transacoes ON categorias.id = transacoes.categoria_id
                WHERE categorias.descricao IN (${placeholder}) AND transacoes.usuario_id = ${usuario.id}`;

            const { rows } = await pool.query(query, filtroArray);
            return res.status(200).json(rows);
        } else {
            const { rows } = await pool.query('SELECT * FROM transacoes WHERE usuario_id = $1', [usuario.id]);
            return res.status(200).json(rows);
        }
    } catch (error) {
        console.error("Erro:", error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};


module.exports = {
    listarTransacoes
} 