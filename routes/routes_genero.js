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

//import da controller do genero
const controllerGenero = require('../controller/filme/controller_genero.js')

//endpoints para a rota de genero
router.get('/v1/locadora/generos', cors(), async function (request, response) {
    let genero = await controllerGenero.listarGeneros()

    response.status(genero.status_code)
    response.json(genero)
})

router.get('/v1/locadora/genero/:id', cors(), async function (request, response) {

    let idGenero = request.params.id

    let genero = await controllerGenero.buscarGeneroID(idGenero)

    response.status(genero.status_code)
    response.json(genero)
})

router.post('/v1/locadora/genero', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let genero = await controllerGenero.inserirGeneros(dadosBody, contentType)

    response.status(genero.status_code)
    response.json(genero)
})

router.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async function(request, response){
    let idGenero = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let genero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)

    response.status(genero.status_code)
    response.json(genero)
})

router.delete('/v1/locadora/genero/:id', cors(), async function(request, response){
    
    let idGenero = request.params.id

    let genero = await controllerGenero.excluirGenero(idGenero)
    response.status(genero.status_code)
    response.json(genero)
})

module.exports = router