/********************************************************************
 * objetivo: aplicativo responsavel pelo crud de dados no mysql referente ao relacionamento entre filme e personagem
 * data: 12/11/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/
const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllMoviesCharacters = async function () {
    try {
        let sql = `select * from tbl_filme_personagem order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectByIdMoviesCharacters = async function (id) {
    try {
        let sql = `select * from tbl_filme_personagem where id=${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//retorna uma lista de personagems pelo id do filme
const getSelectCharactersByidMovies = async function (filme_id) {
    try {
        let sql = `select tbl_personagem.id, tbl_personagem.nome 
                        from tbl_filme 
                                inner join tbl_filme_personagem
                                    on tbl_filme.id = tbl_filme_personagem.filme_id
                                inner join tbl_personagem
                                    on tbl_personagem.id = tbl_filme_personagem.personagem_id
                        where tbl_filme.id = ${filme_id}`

        let result = await prisma.$queryRawUnsafe(sql)
        

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//retorna uma lista de personagems pelo id do filme
const getSelectMoviesByidCharacters = async function (personagem_id) {
    try {
        let sql = `select tbl_filme.id, tbl_filme.nome 
                        from tbl_filme 
                                inner join tbl_filme_personagem
                                    on tbl_filme.id = tbl_filme_personagem.filme_id
                                inner join tbl_personagem
                                    on tbl_personagem.id = tbl_filme_personagem.personagem_id
                        where tbl_personagem.id = ${personagem_id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertMoviesCharacters = async function (filme_personagem) {
    try {
        let sql = `insert into tbl_filme_personagem (
                    filme_id,
                    personagem_id,
                    papel_personagem) 
                    values (${filme_personagem.filme_id},
                            ${filme_personagem.personagem_id},
                            '${filme_personagem.papel_personagem}')`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setUpdateMoviesCharacters = async function (filme_personagem) {
    try {
        let sql = `UPDATE tbl_filme_personagem set
                    filme_id            = '${filme_personagem.filme_id}',
                    personagem_id       = '${filme_personagem.personagem_id}',
                    papel_personagem    = '${filme_personagem.papel_personagem}'
                WHERE 
                    id = ${filme_personagem.id}`
                    
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setDeleteMoviesCharacters = async function (id) {
    try {
        let sql = `delete from tbl_filme_personagem where id=${id}`
        
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
        let sql =`select id from tbl_filme_personagem order by id desc limit 1;`

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
    getSelectAllMoviesCharacters,
    getSelectByIdMoviesCharacters,
    getSelectCharactersByidMovies,
    getSelectMoviesByidCharacters,
    setInsertMoviesCharacters,
    setUpdateMoviesCharacters,
    setDeleteMoviesCharacters,
    getSelectLastID
}