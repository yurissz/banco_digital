const pool = require('../database/conexao');
const bcrypt = require('bcrypt');

const atualizarUser = async (req, res) => {
    const usuario = req.usuario
    const { nome, email, senha } = req.body
    const senhaCriptografada = await bcrypt.hash(senha, 10)

    try {
        const verificacaoEmailRepetido = await pool.query(`select * from usuarios where email = $1`, [email])

        if (!nome) {
            return res.status(401).json({ "mensagem": 'O nome não foi informado.' })
        }
        if (!email) {
            return res.status(401).json({ "mensagem": 'O email não foi informado.' })
        }
        if (!senha) {
            return res.status(401).json({ "mensagem": 'A senha não foi informada.' })
        }

        if (verificacaoEmailRepetido.rowCount >= 1) {
            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' })
        }

        const { rows } = await pool.query(`update usuarios set nome = $1, email = $2, senha = $3 where id = $4 returning *`,
            [nome, email, senhaCriptografada, usuario.id])

        const { senha: _, ...novoUsuario } = rows[0]

        return res.status(200).json(novoUsuario)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }

}

module.exports = {
    atualizarUser
}
