/********************************************************************
 * objetivo: aplicativo responsavel pelo crud de dados no mysql referente ao relacionamento entre filme e genero
 * data: 05/11/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/
const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

const getSelectAllMoviesGenres = async function () {
    try {
        let sql = `select * from tbl_filme_genero order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectByIdMoviesGenres = async function (id) {
    try {
        let sql = `select * from tbl_filme_genero where id=${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//retorna uma lista de generos pelo id do filme
const getSelectGenresByidMovies = async function (filme_id) {
    try {
        let sql = `select tbl_genero.id, tbl_genero.nome 
                        from tbl_filme 
                                inner join tbl_filme_genero
                                    on tbl_filme.id = tbl_filme_genero.filme_id
                                inner join tbl_genero
                                    on tbl_genero.id = tbl_filme_genero.genero_id
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

//retorna uma lista de generos pelo id do filme
const getSelectMoviesByidGenres = async function (genero_id) {
    try {
        let sql = `select tbl_filme.id, tbl_filme.nome 
                        from tbl_filme 
                                inner join tbl_filme_genero
                                    on tbl_filme.id = tbl_filme_genero.filme_id
                                inner join tbl_genero
                                    on tbl_genero.id = tbl_filme_genero.genero_id
                        where tbl_genero.id = ${genero_id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertMoviesGenres = async function (filme_genero) {
    try {
        let sql = `insert into tbl_filme_genero (
                    filme_id,
                    genero_id) 
                    values (${filme_genero.filme_id},
                            ${filme_genero.genero_id})`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setUpdateMoviesGenres = async function (filme_genero) {
    try {
        let sql = `UPDATE tbl_filme_genero set
                    filme_id          = '${filme_genero.filme_id}',
                    genero_id         = '${filme_genero.genero_id}'
                WHERE 
                    id = ${filme_genero.id}`
                    
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const setDeleteMoviesGenres = async function (id) {
    try {
        let sql = `delete from tbl_filme_genero where id=${id}`
        
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
        let sql =`select id from tbl_filme_genero order by id desc limit 1;`

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
    getSelectAllMoviesGenres,
    getSelectByIdMoviesGenres,
    getSelectGenresByidMovies,
    getSelectMoviesByidGenres,
    setInsertMoviesGenres,
    setUpdateMoviesGenres,
    setDeleteMoviesGenres,
    getSelectLastID
}