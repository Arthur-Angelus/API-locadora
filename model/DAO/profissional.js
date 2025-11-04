/********************************************************************
 * objetivo: aplicativo responsavel pelo crud de dados no mysql referente ao profissional
 * data: 04/11/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/
const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllProfessionals = async function () {
    try {
        let sql = `select * from tbl_profissional order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectByIdProfessionals = async function (id) {
    try {
        let sql = `select * from tbl_profissional where id=${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertProfessionals = async function (profissional) {
    try {
        let sql = `insert into tbl_profissional (
                    nome,
                    data_nascimento,
                    data_falecimento,
                    biografia,
                    genero) values ('${profissional.nome}',
                                    '${profissional.data_nascimento}',
                                    '${profissional.data_falecimento}',
                                    '${profissional.biografia}',
                                    '${profissional.genero}')`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setUpdateProfessionals = async function (profissional) {
    try {
        let sql = `UPDATE tbl_profissional set
                    nome                = '${profissional.nome}',
                    data_nascimento     = '${profissional.data_nascimento}',
                    data_falecimento    = '${profissional.data_falecimento}',
                    biografia           = '${profissional.biografia}',
                    genero              = '${profissional.genero}'
                WHERE 
                    id = ${profissional.id}`

                    console.log(sql)
                    
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setDeleteProfessionals = async function (id) {
    try {
        let sql = `delete from tbl_profissional where id=${id}`
        
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
        let sql =`select id from tbl_profissional order by id desc limit 1;`

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
    getSelectAllProfessionals,
    getSelectByIdProfessionals,
    setInsertProfessionals,
    setUpdateProfessionals,
    setDeleteProfessionals,
    getSelectLastID
}