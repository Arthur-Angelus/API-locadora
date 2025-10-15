/********************************************************************
 * objetivo: aplicativo responsavel pelo crud de dados no mydql referente ao filme
 * data: 01/10/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/
/*
    exemplos de dependencias para conexão com o BD
        banco de dados relacionais
            sequelize -> foi utilizado em muitos projetos desde o inicio do node
            prisma    -> é uma dependencia atual que trabalha com DB (mysql, postgresql, sql server) (sql ou ORM)
                npm install prisma --save           -> instalar o prisma(conexão com database)
                npm install @prisma/client --save   -> instalar o cliente do prisma(executar script sql no BD)
                npx prisma init                     -> prompt de comando para inicializar o prisma
                npx prisma migrate dev              -> realiza o sincronismo entre o prisma e o BD(cuidado, nesse processo você podera perder dados reais do BD, pois ele pega e cria as tabelas programadas no ORM schema.prisma)
                npx prisma generate                 -> apenas realiza o sincronismo entre o prisma e o BD, geralmenteusamos para rodar o projeto em um pc novo

            knex      -> é uma dependencia atual que trabalha com mysql

        banco de dados não relacional
            mongoose  -> é uma dependencia para mongo DB (não relacional)
 */

//$queryRawUnsafe() -> permite executar um script sql de uma variavel e que retorna valores do banco (SELECT) 
//$executeRawUnsafe() -> permite executar um script sql de uma variavel e não retorna dados do banco (insert, update, delete)

//$queryRaw() -> permite executar um script sql sem estar em uma variavel e que retorna valores do banco (SELECT) e faz tratamentos de segurança contra sql injection
//$executeRaw() -> permite executar um script sql sem estar em uma variavel e não retorna dados do banco (insert, update, delete) e faz tratamentos de segurança contra sql injection

//import da dependencia do prisma que permite a execução de script sql no db
const { PrismaClient } = require('../../generated/prisma')

//cria um novo objeto baseado na classe do prismaclient
const prisma = new PrismaClient()

//retorna uma lista de todos os filmes do banco de dados
const getSelectAllMovies = async function () {
    try {
        //script sql
        let sql = `select * from tbl_filme order by id desc`

        //encaminha para o BD o script sql
        let result = await prisma.$queryRawUnsafe(sql)

        //console.log(result)
        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        //console.log error
        return false
    }
}

//retorna um filme filtrando belo od do banco de dados
const getSelectByIdMovies = async function (id) {
    try {
        //script sql
        let sql = `select * from tbl_filme where id=${id}`

        //encaminha para o BD o script sql
        let result = await prisma.$queryRawUnsafe(sql)

        //console.log(result)
        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        //console.log error
        return false
    }
}

//insere um filme novo no banco de dados
const setInsertMovies = async function (filme) {
    try {
        let sql = `insert into tbl_filme (
                    nome,
                    sinopse,
                    data_lancamento,
                    duracao,
                    orcamento,
                    trailer,
                    capa) 
                    values ('${filme.nome}',
                            '${filme.sinopse}',
                            '${filme.data_lancamento}',
                            '${filme.duracao}',
                            '${filme.orcamento}',
                            '${filme.trailer}',
                            '${filme.capa}')`

        //executeRawUnsafe() -> executa  o script sql que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//altera um filme no banco de dados
const setUpdateMovies = async function () {
    try {
        let sql = `update tbl_filme set
                    nome            = '${filme.nome}',
                    sinopse         = '${filme.sinopse}',
                    data_lancamento = '${filme.data_lancamento}',
                    duracao         = '${filme.duracao}',
                    orcamento       = '${filme.orcamento}',
                    trailer         = '${filme.trailer}',
                    capa            = '${filme.capa}'

                where id = ${filme.id}`

        //executeRawUnsafe() -> executa  o script sql que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//exclui um filme pelo id no bamco de dados
const setdeleteMovies = async function (id) {

}

module.exports = {
    getSelectAllMovies,
    getSelectByIdMovies,
    setInsertMovies,
    setUpdateMovies
}