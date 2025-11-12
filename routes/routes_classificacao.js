/********************************************************************
 * objetivo: arquivo responsavel pelas rotas de classificação da API da locadora de filmes
 * data: 12/11/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

//import da controller do classificacao
const controllerClassificacao = require('../controller/filme/controller_classificacao.js')

//endpoints para a rota de classificacao
router.get('/v1/locadora/classificacoes', cors(), async function (request, response) {
    let classificacao = await controllerClassificacao.listarClassificacoes()

    response.status(classificacao.status_code)
    response.json(classificacao)
})

router.get('/v1/locadora/classificacao/:id', cors(), async function (request, response) {

    let idclassificacao = request.params.id

    let classificacao = await controllerClassificacao.buscarClassificacaoID(idclassificacao)

    response.status(classificacao.status_code)
    response.json(classificacao)
})

router.post('/v1/locadora/classificacao', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let classificacao = await controllerClassificacao.inserirClassificacoes(dadosBody, contentType)

    response.status(classificacao.status_code)
    response.json(classificacao)
})

router.put('/v1/locadora/classificacao/:id', cors(), bodyParserJSON, async function(request, response){
    let idclassificacao = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let classificacao = await controllerClassificacao.atualizarClassificacao(dadosBody, idclassificacao, contentType)

    response.status(classificacao.status_code)
    response.json(classificacao)
})

router.delete('/v1/locadora/classificacao/:id', cors(), async function(request, response){
    
    let idclassificacao = request.params.id

    let classificacao = await controllerClassificacao.excluirClassificacao(idclassificacao)
    response.status(classificacao.status_code)
    response.json(classificacao)
})

module.exports = router