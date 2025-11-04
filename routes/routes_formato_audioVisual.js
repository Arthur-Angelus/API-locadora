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

//import da controller do formato audioVisual
const controllerformatos_audioVisuais = require('../controller/filme/controller_formato_audioVisual.js')

//endpoints para a rota de genero
router.get('/v1/locadora/formatos_audioVisuais', cors(), async function (request, response) {
    let formato_audioVisual = await controllerformatos_audioVisuais.listarFormatos_audioVisuais()

    response.status(formato_audioVisual.status_code)
    response.json(formato_audioVisual)
})

router.get('/v1/locadora/formato_audioVisual/:id', cors(), async function (request, response) {

    let idFormato_audioVisual = request.params.id

    let formato_audioVisual = await controllerformatos_audioVisuais.buscarFormato_audioVisualID(idFormato_audioVisual)

    response.status(formato_audioVisual.status_code)
    response.json(formato_audioVisual)
})

router.post('/v1/locadora/formato_audioVisual', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let formato_audioVisual = await controllerformatos_audioVisuais.inserirFormatos_audioVisuais(dadosBody, contentType)

    response.status(formato_audioVisual.status_code)
    response.json(formato_audioVisual)
})

router.put('/v1/locadora/formato_audioVisual/:id', cors(), bodyParserJSON, async function(request, response){
    let idFormato_audioVisual = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let formato_audioVisual = await controllerformatos_audioVisuais.atualizarFormato_audioVisual(dadosBody, idFormato_audioVisual, contentType)

    response.status(formato_audioVisual.status_code)
    response.json(formato_audioVisual)
})

router.delete('/v1/locadora/formato_audioVisual/:id', cors(), async function(request, response){
    
    let idFormato_audioVisual = request.params.id

    let formato_audioVisual = await controllerformatos_audioVisuais.excluirFormato_audioVisual(idFormato_audioVisual)
    response.status(formato_audioVisual.status_code)
    response.json(formato_audioVisual)
})

module.exports = router