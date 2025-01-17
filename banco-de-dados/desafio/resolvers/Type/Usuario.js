const db = require('../../config/db')

module.exports = {
    async perfis(usuario) {
        // implementar (Assunto novo!)
        //juntar a tabela perfis com a tabela usuarios_perfis 
        //Será esta consulta >> SELECT P.* FROM PERFIS P, USUARIOS_PERFIS UP WHERE UP.PERFIL_ID = P.ID AND UP.USUARIO_ID = 3
        return db('perfis')
            .join(
               'usuarios_perfis', 
               'perfis.id', // coluna
               'usuarios_perfis.perfil_id' //coluna
            ).where({ usuario_id: usuario.id })
    }
}