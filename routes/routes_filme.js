/********************************************************************
 * objetivo: arquivo responsavel pelas rotas de cargo da API da locadora de filmes
 * data: 29/10/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

//import das controllers
const controllerFilme = require('../controller/filme/controller_filme.js')

//endpoints para a rota de filme
router.get('/v1/locadora/filmes', cors(), async function (request, response) {
    //chama a função para listar os filmes do BD
    let filme = await controllerFilme.listarFilmes()

    response.status(filme.status_code)
    response.json(filme)
})

//retorna o filme pelo id
router.get('/v1/locadora/filme/:id', cors(), async function (request, response) {

    //recebe o id encaminhado via parametro na requisição
    let idFilme = request.params.id

    //chama a função para listar os filmes do BD
    let filme = await controllerFilme.buscarFilmeID(idFilme)

    response.status(filme.status_code)
    response.json(filme)
})

//insere um novo filme
router.post('/v1/locadora/filme', cors(), bodyParserJSON, async function (request, response) {
    //recebe os dados do body da requisição (se você utilizar o bodyParser, é obrigatorio ter no endpoint)
    let dadosBody = request.body

    //recebe o tipo de dados da requisição (JSON ou CML ou ....)
    let contentType = request.headers['content-type']

    //chama a controller para inserir um novo filme, encaminha dados e o content-type
    let filme = await controllerFilme.inserirFilmes(dadosBody, contentType)

    response.status(filme.status_code)
    response.json(filme)
})

//atualiza um filme existente
router.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o id do filme
    let idFilme = request.params.id

    //recebe os dados a serem atualizados
    let dadosBody = request.body

    //recebe o conten-type da requisição
    let contentType = request.headers['content-type']

    //chama a função para atualizar o filme e encaminha os dados, o id e o content-type
    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)

    response.status(filme.status_code)
    response.json(filme)
})

//Retorna o filme filtrando pelo ID
router.delete('/v1/locadora/filme/:id', cors(), async function(request, response){
    
    //Recebe o ID encaminhado via parametro na requisição
    let idFilme = request.params.id

    //Chama a função para listar os filmes do BD
    let filme = await controllerFilme.excluirFilme(idFilme)
    //console.log(filme)
    response.status(filme.status_code)
    response.json(filme)
})

module.exports = router