/********************************************************************
 * objetivo: aplicativo responsavel pelo crud de dados no mysql referente ao genero
 * data: 22/10/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/
const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllGenres = async function () {
    try {
        let sql = `select * from tbl_genero order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectByIdGenres = async function (id) {
    try {
        let sql = `select * from tbl_genero where id=${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertGenres = async function (genero) {
    try {
        let sql = `insert into tbl_genero (
                    nome,
                    descricao) 
                    values ('${genero.nome}',
                            '${genero.descricao}')`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setUpdateGenres = async function (genero) {
    try {
        let sql = `UPDATE tbl_genero set
                    nome            = '${genero.nome}',
                    descricao         = '${genero.descricao}'
                WHERE 
                    id = ${genero.id}`
                    
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setDeleteGenres = async function (id) {
    try {
        let sql = `delete from tbl_genero where id=${id}`
        
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
        let sql =`select id from tbl_genero order by id desc limit 1;`

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
    getSelectAllGenres,
    getSelectByIdGenres,
    setInsertGenres,
    setUpdateGenres,
    setDeleteGenres,
    getSelectLastID
}