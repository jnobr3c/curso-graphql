const db = require('../config/db')
/*
//excluir por id
db('usuarios').where({ id: 1})
    .delete()
    .then(res => console.log(res))
    .finally(() => db.destroy()) */

/*SoftDelete*/
//created_at
//updated_at
//delete_at

//excluir tudo
db('perfis')
    .delete()
    .then(res => console.log(res))
    .finally(() => db.destroy()) 
