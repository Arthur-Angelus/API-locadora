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

const controllerPais = require('../controller/filme/controller_pais.js')

//endpoints para a rota de genero
router.get('/v1/locadora/paises', cors(), async function (request, response) {
    let pais = await controllerPais.listarPaises()

    response.status(pais.status_code)
    response.json(pais)
})

router.get('/v1/locadora/pais/:id', cors(), async function (request, response) {
    let idPais = request.params.id

    let pais = await controllerPais.buscarPaisID(idPais)

    response.status(pais.status_code)
    response.json(pais)
})

router.post('/v1/locadora/pais', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let pais = await controllerPais.inserirPaises(dadosBody, contentType)

    response.status(pais.status_code)
    response.json(pais)
})

router.put('/v1/locadora/pais/:id', cors(), bodyParserJSON, async function(request, response){
    let idPais = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let pais = await controllerPais.atualizarPais(dadosBody, idPais, contentType)

    response.status(pais.status_code)
    response.json(pais)
})

router.delete('/v1/locadora/pais/:id', cors(), async function(request, response){
    let idPais = request.params.id

    let pais = await controllerPais.excluirPais(idPais)

    response.status(pais.status_code)
    response.json(pais)
})

module.exports = router