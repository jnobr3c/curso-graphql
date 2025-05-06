// com promise...
const http = require('http')

const getTurma = letra => {
    const url = `http://files.cod3r.com.br/curso-js/turma${letra}.json`
    return new Promise((resolve, reject) => {
        http.get(url, res => {
                let resultado = ''
        
                res.on('data', dados => {
                    resultado += dados
                })
        
                res.on('end', () => {
                    try{
                        resolve(JSON.parse(resultado))
                    } catch(e) {
                        reject(e)
                    }
                })
            })
    })
}

let nomes = []
getTurma('A').then(alunos => {
    nomes = nomes.concat(alunos.map(a => `A: ${a.nome}`))
    getTurma('B').then(alunos => {
        nomes = nomes.concat(alunos.map(a => `B: ${a.nome}`))
        getTurma('C').then(alunos => {
            nomes = nomes.concat(alunos.map(a => `C: ${a.nome}`))
            console.log(nomes)
        })
    })
})

// O código acima é um exemplo de como fazer requisições HTTP em JavaScript usando Promises.
// Ele faz três requisições para obter dados de três turmas diferentes (A, B e C) e concatena os nomes dos alunos em um array chamado "nomes".

Promise.all([getTurma('A'), getTurma('B'), getTurma('C')])
    .then(turmas => [].concat(...turmas)) // o spread operator concatena os arrays
    .then(alunos => alunos.map(a => a.nome)) // mapeia os alunos para obter apenas os nomes
    .then(nomes => console.log(nomes)) // imprime os nomes no console
// O código acima é um exemplo de como usar Promise.all para fazer requisições HTTP em JavaScript.

getTurma('D').catch(e => console.log(e.message))
// O código acima é um exemplo de como lidar com erros em Promises em JavaScript.
    