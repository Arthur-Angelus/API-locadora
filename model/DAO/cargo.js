/********************************************************************
 * objetivo: aplicativo responsavel pelo crud de dados no mysql referente ao cargo
 * data: 22/10/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/
const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllPositions = async function () {
    try {
        let sql = `select * from tbl_cargo order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectByIdPositions = async function (id) {
    try {
        let sql = `select * from tbl_cargo where id=${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertPositions = async function (cargo) {
    try {
        let sql = `insert into tbl_cargo (
                    nome,
                    descricao) 
                    values ('${cargo.nome}',
                            '${cargo.descricao}')`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setUpdatePositions = async function (cargo) {
    try {
        let sql = `UPDATE tbl_cargo set
                    nome            = '${cargo.nome}',
                    descricao         = '${cargo.descricao}'
                WHERE 
                    id = ${cargo.id}`
                    
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setDeletePositions = async function (id) {
    try {
        let sql = `delete from tbl_cargo where id=${id}`
        
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
        let sql =`select id from tbl_cargo order by id desc limit 1;`

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
    getSelectAllPositions,
    getSelectByIdPositions,
    setInsertPositions,
    setUpdatePositions,
    setDeletePositions,
    getSelectLastID
}