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

module.exports = { usuarios, perfis}