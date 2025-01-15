const db = require ('../config/db')

/*const novoPerfil = {
    nome: 'cadastrador',
    rotulo: 'Cadastrador'
}*/

/*const novoPerfil = {
    nome: 'visitante',
    rotulo: 'Visitante'
}

db('perfis').insert(novoPerfil)
    .then(res => console.log(res))
    .catch(err => console.log(err.sqlMessage))
    .finally(() => db.destroy())

*/

const perfilSu = {
    nome: 'root' + Math.random(),
    rotulo: 'Super Usuario'
}

// insert into perfis (nome, rotulo) values ('....', '.....')
db.insert(perfilSu).into('perfis')
    //.then(res => console.log(res)) // pode encadear varios then quando trabalha com promisses conforme exemplo
    .then(res => res[0])
    .then(id => `O código gerado foi ${id}`)
    .then(string => console.log(string))
    .catch(err => console.log(err.sqlMessage))
    .finally(() => db.destroy())