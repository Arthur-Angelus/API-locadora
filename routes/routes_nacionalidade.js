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

const controllerNacionalidade = require('../controller/filme/controller_nacionalidade.js')

//endpoints para a rota de genero
router.get('/v1/locadora/nacionalidades', cors(), async function (request, response) {
    let nacionalidade = await controllerNacionalidade.listarNacionalidades()

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

router.get('/v1/locadora/nacionalidade/:id', cors(), async function (request, response) {

    let idNacionalidade = request.params.id

    let nacionalidade = await controllerNacionalidade.buscarNacionalidadeID(idNacionalidade)

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

router.post('/v1/locadora/nacionalidade', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let nacionalidade = await controllerNacionalidade.inserirNacionalidades(dadosBody, contentType)

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

router.put('/v1/locadora/nacionalidade/:id', cors(), bodyParserJSON, async function(request, response){
    let idNacionalidade = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let nacionalidade = await controllerNacionalidade.atualizarNacionalidade(dadosBody, idNacionalidade, contentType)

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

router.delete('/v1/locadora/nacionalidade/:id', cors(), async function(request, response){
    
    let idNacionalidade = request.params.id

    let nacionalidade = await controllerNacionalidade.excluirNacionalidade(idNacionalidade)
    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

module.exports = router