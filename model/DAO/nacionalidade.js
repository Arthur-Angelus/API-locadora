/********************************************************************
 * objetivo: aplicativo responsavel pelo crud de dados no mysql referente ao genero
 * data: 22/10/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/
const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllNacionalitites = async function () {
    try {
        let sql = `select * from tbl_nacionalidade order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectByIdNacionalitites = async function (id) {
    try {
        let sql = `select * from tbl_nacionalidade where id=${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertNacionalitites = async function (nacionalidade) {
    try {
        let sql = `insert into tbl_nacionalidade (
                    nome) 
                    values ('${nacionalidade.nome}')`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setUpdateNacionalitites = async function (nacionalidade) {
    try {
        let sql = `UPDATE tbl_nacionalidade set
                    nome            = '${nacionalidade.nome}'
                WHERE 
                    id = ${nacionalidade.id}`
                    
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setDeleteNacionalitites = async function (id) {
    try {
        let sql = `delete from tbl_nacionalidade where id=${id}`
        
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
        let sql =`select id from tbl_nacionalidade order by id desc limit 1;`

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
    getSelectAllNacionalitites,
    getSelectByIdNacionalitites,
    setInsertNacionalitites,
    setUpdateNacionalitites,
    setDeleteNacionalitites,
    getSelectLastID
}