/********************************************************************
 * objetivo: aplicativo responsavel pelo crud de dados no mysql referente ao genero
 * data: 22/10/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/
const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllMovies = async function () {
    try {
        let sql = `select * from tbl_filme order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectByIdMovies = async function (id) {
    try {
        let sql = `select * from tbl_filme where id=${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertMovies = async function (filme) {
    try {
        let sql = `insert into tbl_filme (
                    nome,
                    sinopse,
                    data_lancamento,
                    duracao,
                    orcamento,
                    trailer,
                    capa) 
                    values ('${filme.nome}',
                            '${filme.sinopse}',
                            '${filme.data_lancamento}',
                            '${filme.duracao}',
                            '${filme.orcamento}',
                            '${filme.trailer}',
                            '${filme.capa}')`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setUpdateMovies = async function (filme) {
    try {
        let sql = `UPDATE tbl_filme set
                    nome            = '${filme.nome}',
                    sinopse         = '${filme.sinopse}',
                    data_lancamento = '${filme.data_lancamento}',
                    duracao         = '${filme.duracao}',
                    orcamento       = '${filme.orcamento}',
                    trailer         = '${filme.trailer}',
                    capa            = '${filme.capa}'
                WHERE 
                    id = ${filme.id}`
                    
                    console.log(sql);
                    
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setDeleteMovies = async function (id) {
    try {
        let sql = `delete from tbl_filme where id=${id}`
        
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectLastID = async function(){
    try {
        let sql =`select id from tbl_filme order by id desc limit 1;`

         let result = await prisma.$queryRawUnsafe(sql)

         if (Array.isArray(result))
             return Number(result[0].id)
         else
             return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllMovies,
    getSelectByIdMovies,
    setInsertMovies,
    setUpdateMovies,
    setDeleteMovies,
    getSelectLastID
}