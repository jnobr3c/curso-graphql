const{ ApolloServer, gql } = require('apollo-server')
const{ importSchema } = require('graphql-import')

const perfis = [
    { id: 1, nome: 'comum' },
    { id: 2, nome: 'administrador' }
]

const usuarios = [{
    id: 1,
    nome: 'João Silva',
    email: 'jsilva@email.com',
    idade: 29,
    perfil_id: 1
},{
    id: 2,
    nome: 'Rafael Junior',
    email: 'rafajun@email.com',
    idade: 31,
    perfil_id: 2
},{
    id: 3,
    nome: 'Daniela Smith',
    email: 'danismi@email.com',
    idade: 24,
    perfil_id: 1
}]

const resolvers = {
    Produto:{
        precoComDesconto(produto){
            if(produto.desconto) {
                return produto.preco * (1 - produto.desconto)
            }else{
                return produto.preco
            }
        }
    },
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        },
        perfil(usuario){
            const sels = perfis.filter(p => p.id === usuario.perfil_id)
            return sels ? sels[0] : null
        }
    },
    Query:{
        ola(){
            return 'Bom dia!'
        },
        horaAtual() {
           // return `${new Date}`
           return new Date
        },
        usuarioLogado(obj){
            console.log(obj)
            return{
                id: 1,
                nome: 'Ana da Web',
                email: 'anadaweb@email.com',
                idade: 23,
                salario_real: 1234.56,
                vip: true
            }
        },
        produtoEmDestaque(){
            return{
                nome: 'Notebook Gamer',
                preco: 4890.89,
                desconto: 0.5
            }
        },
        numerosMegaSena(){
            // return [4,8,13,27,33,54]
            const crescente = (a, b) => a - b
            return Array(6).fill(0).map(n => parseInt(Math.random() * 60 + 1)).sort(crescente)
        },
        usuarios() {
            return usuarios
        },
        usuario(_, { id }){
            const sels = usuarios.filter(u => u.id === id)
            return sels ? sels[0] : null
        },
        perfis() {
            return perfis
        },
        perfil(_, { id }){
            const sels = perfis.filter(p => p.id === id)
            return sels ? sels[0] : null
        }
    }
}

const server = new ApolloServer({
    typeDefs: importSchema('./schema/index.graphql'),
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})