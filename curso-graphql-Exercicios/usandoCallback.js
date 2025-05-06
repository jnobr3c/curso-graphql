// sem promise...
const http = require('http')

const getTurma = (letra, callback) => {
    const url = `http://files.cod3r.com.br/curso-js/turma${letra}.json`
    http.get(url, res => {
        let resultado = ''

        res.on('data', dados => {
            resultado += dados
        })

        res.on('end', () => {
            callback(JSON.parse(resultado))
        })
    })
}

let nomes = []
getTurma('A', alunos => {
    nomes = nomes.concat(alunos.map(a => `A: ${a.nome}`))
    getTurma('B', alunos => {
        nomes = nomes.concat(alunos.map(a => `B: ${a.nome}`))
        getTurma('C', alunos => {
            nomes = nomes.concat(alunos.map(a => `C: ${a.nome}`))
            console.log(nomes)
        })
    })
})

// O código acima é um exemplo de como fazer requisições HTTP em JavaScript usando callbacks.
// Ele faz três requisições para obter dados de três turmas diferentes (A, B e C) e concatena os nomes dos alunos em um array chamado "nomes".  
// O resultado final é impresso no console. No entanto, o uso de callbacks pode levar a um código difícil de ler e manter, conhecido como "callback hell".
// Para evitar isso, é recomendável usar Promises ou async/await, que tornam o código mais legível e fácil de entender.

