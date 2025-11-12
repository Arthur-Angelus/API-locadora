/********************************************************************
 * objetivo: aplicativo responsavel pelo crud de dados no mysql referente ao classificacao
 * data: 12/11/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/
const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllClassifications = async function () {
    try {
        let sql = `select * from tbl_classificacao order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectByIdClassifications = async function (id) {
    try {
        let sql = `select * from tbl_classificacao where id=${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertClassifications = async function (classificacao) {
    try {
        let sql = `insert into tbl_classificacao (
                    nivel,
                    descricao) 
                    values ('${classificacao.nivel}',
                            '${classificacao.descricao}')`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setUpdateClassifications = async function (classificacao) {
    try {
        let sql = `UPDATE tbl_classificacao set
                    nivel            = '${classificacao.nivel}',
                    descricao         = '${classificacao.descricao}'
                WHERE 
                    id = ${classificacao.id}`
                    
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setDeleteClassifications = async function (id) {
    try {
        let sql = `delete from tbl_classificacao where id=${id}`
        
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
        let sql =`select id from tbl_classificacao order by id desc limit 1;`

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
    getSelectAllClassifications,
    getSelectByIdClassifications,
    setInsertClassifications,
    setUpdateClassifications,
    setDeleteClassifications,
    getSelectLastID
}