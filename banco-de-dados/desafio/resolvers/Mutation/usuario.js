const db = require('../../config/db')
const { perfil: obterPerfil, perfil } = require('../Query/perfil') //recuperar a função
const { usuario: obterUsuario } = require('../Query/usuario')

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
            for(let filtro of dados.perfis) {
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

            for(let perfil_id of idsPerfis) {
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

            for(let perfil_id of idsPerfis) {
                await db('usuarios_perfis')
                    .insert({ perfil_id, usuario_id: id })
            }

            return db('usuarios')
                .where({ id }).first()
        }catch(e) {
            throw new Error(e) //Mostra os erro sem tratamento
        } */
    },
    async excluirUsuario(_, args) {
        try {
            const usuario = await obterUsuario(_, args)
            if(usuario) {
                const { id } = usuario
                await db( 'usuarios_perfis' )
                    .where({ usuario_id: id }).delete()
                await db( 'usuarios' )
                    .where({ id }).delete()
            }
            return usuario
        } catch(e) {
            throw new console.Error(e.sqlMessage);
            
        }
    },
    async alterarUsuario(_, { filtro, dados }) {
        try {
            const usuario = await obterUsuario(_, { filtro })
            if(usuario) {
                const { id } = usuario
                if(dados.perfis) {
                    await db('usuarios_perfis')
                        .where({usuario_id: id}).delete()
                    
                    for(let filtro of dados.perfis) {
                        const perfil = await obterPerfil(_, {
                            filtro
                        })
                        perfil && await db('usuarios_perfis')
                            .insert({
                                perfil_id: perfil.id,
                                usuario_id: id
                            })
                        
                        /* poderia ser assim 
                        if(perfil){
                        await db('usuarios_perfis')
                            .insert({
                                perfil_id: perfil.id,
                                usuario_id: id
                            })
                        }
                        */
                    }
                }

                delete dados.perfis
                await db('usuarios').where({ id }).update(dados)
                //return { ...usuario, ...dados }

            }
            return !usuario ? null : { ...usuario, ...dados }
        } catch(e) {
            throw new console.Error(e.sqlMessage);
            
        }
    }
}