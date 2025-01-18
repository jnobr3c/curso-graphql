const db = require('../../config/db')
const { perfil: obterPerfil } = require('../Query/perfil') //recuperar a função

module.exports = {
    async novoPerfil(_, { dados }) {
        try {
            const [ id ] = await db('perfis')
                .insert({ ...dados })
            return db('perfis')
                .where({ id }).first() // Quando trabalha com promisse trata o erro a partir do catch e sucesso com o then e finally que é chamdo tanto com caso de erro como o de sucesso 
        } catch(e) {                //no caso de async await não tem o then e nem o catch, o erro é tratado com o try catch do js
            throw new Error(e.sqlMessage) //pode tratar o erro e mandar para o usuario o erro tratado 
        }
    },
   /* async excluirPerfil(_, { filtro }) {
        try {
            const perfil = await obterPerfil(_, { filtro })
            if(perfil){
                const { id } =  perfil
                await db('usuarios_perfis')
                    .where({ perfil_id: id }).delete()
                await db('perfis')
                .where({ id }).delete()
            }
            return perfil
        } catch(e) {
            throw new Error(e.sqlMessage) 
        }
    },*/
    //forma de simplificar:
    async excluirPerfil(_, args) {
        try {
            const perfil = await obterPerfil(_, args)
            if(perfil){
                const { id } =  perfil
                await db('usuarios_perfis')
                    .where({ perfil_id: id }).delete()
                await db('perfis')
                .where({ id }).delete()
            }
            return perfil
        } catch(e) {
            throw new Error(e.sqlMessage) 
        }
    },
    async alterarPerfil(_, { filtro, dados }) {
        try {
            const perfil = await obterPerfil(_, { filtro })
            if(perfil){
                const { id } =  perfil
                await db('perfis')
                .where({ id })
                .update(dados)
            }
            return { ...perfil, ...dados } //retorna um objeto que tem tudo que tem em perfil e em dados, retornando o dado atualizado
        } catch(e) {
            throw new Error(e.sqlMessage) 
        }
    }
}