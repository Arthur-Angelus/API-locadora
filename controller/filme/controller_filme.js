/********************************************************************
 * objetivo: arquivo responsavel pela manipulação de dados entre o APP e o MODEL para o CRUD de filmes
 * data: 07/10/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/

const filmeDAO = require('../../model/DAO/filme.js')

const DEFAULT_MESSAGES = require('./modulo/config_messages.js')

//retorna uma lista de todos os filmes
const listarFilmes = async function () {
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //chama a função do DAO para retornar a lista de filmes do BD
        let resultFilmes = await filmeDAO.getSelectAllMovies()

        if (resultFilmes) {
            if (resultFilmes.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes = resultFilmes

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        //console.log error
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//retorna um filme filtrando pelo id
const buscarFilmeID = async function (id) {
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //validação da chegada do ID
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultFilme = await filmeDAO.getSelectByIdMovies(Number(id))

            if (resultFilme) {
                if (resultFilme.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme = resultFilme

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//insere um filme
const inserirFilmes = async function (filme, contentType) {
    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //validação do tipo de conteudo da requisição (obrigatorio ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //chama a função de validar todos os dados do filme
            let validar = await validarDadosFilme(filme)

            if (!validar) {
                //Processamento
                //chama a função para inserir um novo filme no BD
                let resultFilmes = await filmeDAO.setInsertMovies(filme)

                if (resultFilmes) {
                    MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCCESS_CREATED_ITEM.message

                    return MESSAGES.DEFAULT_HEADER //201
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validar //400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//atualiza um filme buscando pelo id
const atualizarFilme = async function (filme, id, contentType) {
    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //validação do tipo de conteudo da requisição (obrigatorio ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            
            //chama a função de validar todos os dados do filme
            let validar = await validarDadosFilme(filme)

            if (!validar) {
                
                //validação de id valido, chama a função controller que verifica no BD se o id existe e valido
                let validarID = await buscarFilmeID(id)

                if (validarID.status_code == 200) {
                    
                    //adiciona o id do filme no JSON de dados para ser encaminhado ao DAO
                    filme.id = Number(id)
                    
                    //chama a função para inserir um novo filme no BD
                    let resultFilmes = await filmeDAO.setUpdateMovies(filme)

                    if (resultFilmes) {
                        MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.filme     = filme

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID //a função buscarFilmeID podera retornar (400 ou 404 ou 500)
                }
            } else {
                return validar //400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//exclui um filme buscsndo pelo id
const excluirFilme = async function (id) {
    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //validação do tipo de conteudo da requisição (obrigatorio ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {


            if (!validar) {
                
                //validação de id valido, chama a função controller que verifica no BD se o id existe e valido
                let validarID = await buscarFilmeID(id)

                if (validarID.status_code == 200) {
                    
                    //adiciona o id do filme no JSON de dados para ser encaminhado ao DAO
                    filme.id = Number(id)
                    
                    //chama a função para inserir um novo filme no BD
                    let resultFilmes = await filmeDAO.setdeleteMovies(filme)

                    if (resultFilmes) {
                        MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_DELETED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCCESS_DELETED_ITEM.message

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID //a função buscarFilmeID podera retornar (400 ou 404 ou 500)
                }
            } else {
                return validar //400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//validação dos dados de cadastro e atualização do filme
const validarDadosFilme = async function (filme) {
    //criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    //validação de todas as entradas de dados
    if (filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.sinopse == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Sinopse incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data de lançamento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.duracao == '' || filme.duracao == undefined || filme.duracao == null || filme.duracao.length > 8) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Duração incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.orcamento == '' || filme.orcamento == undefined || filme.orcamento == null || filme.orcamento.length > 14 || typeof (filme.orcamento) != 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Orçamento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.trailer == undefined || filme.trailer.length > 200) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Trailer incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.capa == '' || filme.capa == undefined || filme.capa == null || filme.capa.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Capa incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarFilmes,
    buscarFilmeID,
    inserirFilmes,
    atualizarFilme,
    excluirFilme
}