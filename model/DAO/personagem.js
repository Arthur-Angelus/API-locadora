/********************************************************************
 * objetivo: aplicativo responsavel pelo crud de dados no mysql referente ao personagem
 * data: 22/10/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/
const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllCharacters = async function () {
    try {
        let sql = `select * from tbl_personagem order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectByIdCharacters = async function (id) {
    try {
        let sql = `select * from tbl_personagem where id=${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertCharacters = async function (personagem) {
    try {
        let sql = `insert into tbl_personagem (
                    nome,
                    idade,
                    descricao,
                    genero) 
                    values ('${personagem.nome}',
                            '${personagem.idade}',
                            '${personagem.descricao}',
                            '${personagem.genero}')`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setUpdateCharacters = async function (personagem) {
    try {
        let sql = `UPDATE tbl_personagem set
                    nome            = '${personagem.nome}',
                    idade           = '${personagem.idade}',
                    descricao       = '${personagem.descricao}',
                    genero          = '${personagem.genero}'
                WHERE 
                    id = ${personagem.id}`
                    
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setDeleteCharacters = async function (id) {
    try {
        let sql = `delete from tbl_personagem where id=${id}`
        
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
        let sql =`select id from tbl_personagem order by id desc limit 1;`

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
    getSelectAllCharacters,
    getSelectByIdCharacters,
    setInsertCharacters,
    setUpdateCharacters,
    setDeleteCharacters,
    getSelectLastID
}