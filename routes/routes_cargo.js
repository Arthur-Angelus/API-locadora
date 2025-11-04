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

const controllerCargo = require('../controller/filme/controller_cargo.js')

router.get('/v1/locadora/cargos', cors(), async function (request, response) {
    let cargo = await controllerCargo.listarCargos()

    response.status(cargo.status_code)
    response.json(cargo)
})

router.get('/v1/locadora/cargo/:id', cors(), async function (request, response) {

    let idCargo = request.params.id

    let cargo = await controllerCargo.buscarCargoID(idCargo)

    response.status(cargo.status_code)
    response.json(cargo)
})

router.post('/v1/locadora/cargo', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let cargo = await controllerCargo.inserirCargos(dadosBody, contentType)

    response.status(cargo.status_code)
    response.json(cargo)
})

router.put('/v1/locadora/cargo/:id', cors(), bodyParserJSON, async function(request, response){
    let idCargo = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

     cargo = await controllerCargo.atualizarCargo(dadosBody, idCargo, contentType)

    response.status(cargo.status_code)
    response.json(cargo)
})

router.delete('/v1/locadora/cargo/:id', cors(), async function(request, response){
    let idCargo = request.params.id

    let cargo = await controllerCargo.excluirCargo(idCargo)
    response.status(cargo.status_code)
    response.json(cargo)
})

module.exports = router