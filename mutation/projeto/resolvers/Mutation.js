const { usuarios, proximoId} = require('../data/db')

//  { nome, email, idade}

module.exports = {
    novoUsuario(_, args){
        const emailExistente = usuarios
            .some(u => u.email === args.email)

        if(emailExistente){
            throw new Error('E-mail Cadastrado')
        }
        
        const novo = {
            id: proximoId(),
            ...args,
            perfil_id: 1,
            status: 'ATIVO'
        }

        usuarios.push(novo)
        return novo
    }
}