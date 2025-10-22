/********************************************************************
 * objetivo: aplicativo responsavel pelo crud de dados no mysql referente ao genero
 * data: 22/10/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/
const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllAudiovisualFormats = async function () {
    try {
        let sql = `select * from tbl_formato_audioVisual order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectByIdAudiovisualFormats = async function (id) {
    try {
        let sql = `select * from tbl_formato_audioVisual where id=${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertAudiovisualFormats = async function (formato_audioVisual) {
    try {
        let sql = `insert into tbl_formato_audioVisual (
                    nome,
                    descricao) 
                    values ('${formato_audioVisual.nome}',
                            '${formato_audioVisual.descricao}')`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setUpdateAudiovisualFormats = async function (formato_audioVisual) {
    try {
        let sql = `UPDATE tbl_formato_audioVisual set
                    nome            = '${formato_audioVisual.nome}',
                    descricao         = '${formato_audioVisual.descricao}'
                WHERE 
                    id = ${formato_audioVisual.id}`
                    
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setDeleteAudiovisualFormats = async function (id) {
    try {
        let sql = `delete from tbl_formato_audioVisual where id=${id}`
        
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
        let sql =`select id from tbl_formato_audioVisual order by id desc limit 1;`

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
    getSelectAllAudiovisualFormats,
    getSelectByIdAudiovisualFormats,
    setInsertAudiovisualFormats,
    setUpdateAudiovisualFormats,
    setDeleteAudiovisualFormats,
    getSelectLastID
}