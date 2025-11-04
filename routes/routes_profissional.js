/********************************************************************
 * objetivo: arquivo responsavel pelas rotas de profissional da API da locadora de filmes
 * data: 29/10/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const router = express.Router()

const bodyParserJSON = bodyParser.json()

const controllerProfissional = require('../controller/filme/controller_profissional.js')

router.get('/v1/locadora/profissionais', cors(), async function (request, response) {
    let profissional = await controllerProfissional.listarProfissionais()

    response.status(profissional.status_code)
    response.json(profissional)
})

router.get('/v1/locadora/profissional/:id', cors(), async function (request, response) {
    let idProfissional = request.params.id

    let profissional = await controllerProfissional.buscarProfissionalID(idProfissional)

    response.status(profissional.status_code)
    response.json(profissional)
})

router.post('/v1/locadora/profissional', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let profissional = await controllerProfissional.inserirProfissional(dadosBody, contentType)

    response.status(profissional.status_code)
    response.json(profissional)
})

router.put('/v1/locadora/profissional/:id', cors(), bodyParserJSON, async function(request, response){
    let idProfissional = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let profissional = await controllerProfissional.atualizarProfissional(dadosBody, idProfissional, contentType)

    response.status(profissional.status_code)
    response.json(profissional)
})

router.delete('/v1/locadora/profissional/:id', cors(), async function(request, response){
    let idProfissional = request.params.id

    let profissional = await controllerProfissional.excluirProfissional(idProfissional)

    response.status(profissional.status_code)
    response.json(profissional)
})

module.exports = router