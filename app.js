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
app.get('/v1/locadora/filmes', cors(), async function (request, response) {
    //chama a função para listar os filmes do BD
    let filme = await controllerFilme.listarFilmes()

    response.status(filme.status_code)
    response.json(filme)
})

//retorna o filme pelo id
app.get('/v1/locadora/filme/:id', cors(), async function (request, response) {

    //recebe o id encaminhado via parametro na requisição
    let idFilme = request.params.id

    //chama a função para listar os filmes do BD
    let filme = await controllerFilme.buscarFilmeID(idFilme)

    response.status(filme.status_code)
    response.json(filme)
})

//insere um novo filme
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

//atualiza um filme existente
app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function(request, response){
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
app.delete('/v1/locadora/filme/:id', cors(), async function(request, response){
    
    //Recebe o ID encaminhado via parametro na requisição
    let idFilme = request.params.id

    //Chama a função para listar os filmes do BD
    let filme = await controllerFilme.excluirFilme(idFilme)
    //console.log(filme)
    response.status(filme.status_code)
    response.json(filme)
})

//import da controller do genero
const controllerGenero = require('./controller/filme/controller_genero.js')

//endpoints para a rota de genero
app.get('/v1/locadora/generos', cors(), async function (request, response) {
    let genero = await controllerGenero.listarGeneros()

    response.status(genero.status_code)
    response.json(genero)
})

app.get('/v1/locadora/genero/:id', cors(), async function (request, response) {

    let idGenero = request.params.id

    let genero = await controllerGenero.buscarGeneroID(idGenero)

    response.status(genero.status_code)
    response.json(genero)
})

app.post('/v1/locadora/genero', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let genero = await controllerGenero.inserirGeneros(dadosBody, contentType)

    response.status(genero.status_code)
    response.json(genero)
})

app.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async function(request, response){
    let idGenero = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let genero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)

    response.status(genero.status_code)
    response.json(genero)
})

app.delete('/v1/locadora/genero/:id', cors(), async function(request, response){
    
    let idGenero = request.params.id

    let genero = await controllerGenero.excluirGenero(idGenero)
    response.status(genero.status_code)
    response.json(genero)
})

//import da controller do formato audioVisual
const controllerformatos_audioVisuais = require('./controller/filme/controller_formato_audioVisual.js')

//endpoints para a rota de genero
app.get('/v1/locadora/formatos_audioVisuais', cors(), async function (request, response) {
    let formato_audioVisual = await controllerformatos_audioVisuais.listarFormatos_audioVisuais()

    response.status(formato_audioVisual.status_code)
    response.json(formato_audioVisual)
})

app.get('/v1/locadora/formato_audioVisual/:id', cors(), async function (request, response) {

    let idFormato_audioVisual = request.params.id

    let formato_audioVisual = await controllerformatos_audioVisuais.buscarFormato_audioVisualID(idFormato_audioVisual)

    response.status(formato_audioVisual.status_code)
    response.json(formato_audioVisual)
})

app.post('/v1/locadora/formato_audioVisual', cors(), bodyParserJSON, async function (request, response) {
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let formato_audioVisual = await controllerformatos_audioVisuais.inserirFormatos_audioVisuais(dadosBody, contentType)

    response.status(formato_audioVisual.status_code)
    response.json(formato_audioVisual)
})

app.put('/v1/locadora/formato_audioVisual/:id', cors(), bodyParserJSON, async function(request, response){
    let idFormato_audioVisual = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let formato_audioVisual = await controllerformatos_audioVisuais.atualizarFormato_audioVisual(dadosBody, idFormato_audioVisual, contentType)

    response.status(formato_audioVisual.status_code)
    response.json(formato_audioVisual)
})

app.delete('/v1/locadora/formato_audioVisual/:id', cors(), async function(request, response){
    
    let idFormato_audioVisual = request.params.id

    let formato_audioVisual = await controllerformatos_audioVisuais.excluirFormato_audioVisual(idFormato_audioVisual)
    response.status(formato_audioVisual.status_code)
    response.json(formato_audioVisual)
})

app.listen(PORT, function () {
    console.log('API aguardando requisições....')
})