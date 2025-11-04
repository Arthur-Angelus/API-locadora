/********************************************************************
 * objetivo: aplicativo responsavel pelo crud de dados no mysql referente ao genero
 * data: 22/10/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/
const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllCountries = async function () {
    try {
        let sql = `select * from tbl_pais order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectByIdCountries = async function (id) {
    try {
        let sql = `select * from tbl_pais where id=${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertCountries = async function (pais) {
    try {
        let sql = `insert into tbl_pais (
                    nome,
                    linguagem) 
                    values ('${pais.nome}',
                            '${pais.linguagem}')`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setUpdateCountries = async function (pais) {
    try {
        let sql = `UPDATE tbl_pais set
                    nome            = '${pais.nome}',
                    linguagem         = '${pais.linguagem}'
                WHERE 
                    id = ${pais.id}`
                    
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setDeleteCountries = async function (id) {
    try {
        let sql = `delete from tbl_pais where id=${id}`
        
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
        let sql =`select id from tbl_pais order by id desc limit 1;`

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
    getSelectAllCountries,
    getSelectByIdCountries,
    setInsertCountries,
    setUpdateCountries,
    setDeleteCountries,
    getSelectLastID
}