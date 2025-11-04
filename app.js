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

//import das rotas
const cargoRoutes = require('./routes/routes_cargo')
const filmeRoutes = require('./routes/routes_filme')
const formato_audioVisialRoutes = require('./routes/routes_formato_audioVisual')
const generoRoutes = require('./routes/routes_genero')
const nacionalidadeRoutes = require('./routes/routes_nacionalidade')
const paisRoutes = require('./routes/routes_pais')

app.use(cargoRoutes)
app.use(filmeRoutes)
app.use(formato_audioVisialRoutes)
app.use(generoRoutes)
app.use(nacionalidadeRoutes)
app.use(paisRoutes)

app.listen(PORT, function () {
    console.log('API aguardando requisições....')
})