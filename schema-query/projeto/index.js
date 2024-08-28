const{ ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    scalar Date

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    type Usuario {
        id: ID
        nome: String
        email: String
        idade: Int
        salario: Float
        vip: Boolean
    }

    # Pontos de entradas da sua API!
    type Query {
        ola: String !
        horaAtual: Date !
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
    }
`

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
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})