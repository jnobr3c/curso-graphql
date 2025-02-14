const db = require('../../config/db')

module.exports = {
    perfis(parent, _args, ctx) {
        ctx && ctx.validarAdmin()
        return db('perfis')
    },
    perfil(_, { filtro }, ctx) {
        ctx && ctx.validarAdmin()
        
        if(!filtro) return null
        const { id, nome } = filtro
        if(id) {
            return db('perfis')
                .where({ id })
                .first()
        } else if(nome) {
            return db('perfis')
                .where({ nome })
                .first()
        } else {
            return null
        }
    }
}

/* uma das possibilidades para não importar o banco seria usar o context 
perfis(obj, args, ctx) { //ctx = context
        ctx.db
        return db('perfis')
    }, */