/********************************************************************
 * objetivo: arquivo responsavel pelas requisições da API da locadora de filmes
 * data: 07/10/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/

//import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

const PORT = process.PORT || 5000

const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

//import das controllers
const controllerFilme = require('./controller/filme/controller_filme.js')

//endpoints para a rota de filme
app.use('/v1/locadora/filmes', cors(), async function (request, response) {
    //chama a função para listar os filmes do BD
    let filme = await controllerFilme.listarFilmes()

    response.status(filme.status_code)
    response.json(filme)
})

//retorna o filme pelo id
app.use('/v1/locadora/filme/:id', cors(), async function (request, response) {

    //recebe o id encaminhado via parametro na requisição
    let idFilme = request.params.id

    //chama a função para listar os filmes do BD
    let filme = await controllerFilme.buscarFilmeID(idFilme)

    response.status(filme.status_code)
    response.json(filme)
})

app.post('/v1/locadora/filme', cors(), bodyParserJSON, async function (request, response) {
    //recebe os dados do body da requisição (se você utilizar o bodyParser, é obrigatorio ter no endpoint)
    let dadosBody = request.body

    //recebe o tipo de dados da requisição (JSON ou CML ou ....)
    let contentType = request.headers['content-type']

    //chama a controller para inserir um novo filme, encaminha dados e o content-type
    let filme = await controllerFilme.inserirFilmes(dadosBody, contentType)

    response.status(filme.status_code)
    response.json(filme)
})

app.listen(PORT, function () {
    console.log('API aguardando requisições....')
})