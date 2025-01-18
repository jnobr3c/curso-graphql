const db = require('../../config/db')
const { perfil: obterPerfil, perfil } = require('../Query/perfil') //recuperar a função

module.exports = {
    async novoUsuario(_, { dados }) {
        try {
            const idsPerfis = []
            /*if(dados.perfis) {
                for(perfilFiltro of dados.perfis) {
                    const perfil = await obterPerfil(_, {
                        filtro: {...perfilFiltro}
                    })
                }
            }*/
           //forma generica
           if(dados.perfis) {
            for(filtro of dados.perfis) {
                const perfil = await obterPerfil(_, {
                    filtro
                })
                if(perfil) idsPerfis.push(perfil.id)
            } 
        }

            delete dados.perfis

            const [ id ] = await db('usuarios')
                .insert({ ...dados })
                /*Desta forma não precisaria excluir delete dados.perfis por que esta selecionando exatamente o que preciso inserir na tabela usuarios
                .insert({ 
                    nome: dados.nome,
                    email: dados.email, 
                    senha: dados.senha, 
                })*/

            for(perfil_id of idsPerfis) {
                await db('usuarios_perfis')
                    .insert({ perfil_id, usuario_id: id })
            }

            return db('usuarios')
                .where({ id }).first()
        }catch(e) {
            throw new Error(e.sqlMessage)
        }

        /* const [ id ] = await db('usuarios')
                .insert( dados )

            for(perfil_id of idsPerfis) {
                await db('usuarios_perfis')
                    .insert({ perfil_id, usuario_id: id })
            }

            return db('usuarios')
                .where({ id }).first()
        }catch(e) {
            throw new Error(e) //Mostra os erro sem tratamento
        } */
    },
    async excluirUsuario(_, { filtro }) {
        // Implementar
    },
    async alterarUsuario(_, { filtro, dados }) {
        // Implementar
    }
}