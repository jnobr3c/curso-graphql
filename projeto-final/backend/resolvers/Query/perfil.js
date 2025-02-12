const db = require('../../config/db')

module.exports = {
    perfis() {
        return db('perfis')
    },
    perfil(_, { filtro }) {
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