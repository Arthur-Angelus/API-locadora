/********************************************************************
 * objetivo: arquivo responsavel pela manipulação de dados entre o APP e o MODEL para o CRUD na relação entre filme e personagem
 * data: 05/11/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/

const filmePersonagemDAO = require('../../../model/DAO/filme_personagem.js')

const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listarFilmesPersonagens = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultFilmesPersonagens = await filmePersonagemDAO.getSelectAllMoviesCharacters()

        if (resultFilmesPersonagens) {
            if (resultFilmesPersonagens.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes_personagens = resultFilmesPersonagens

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

const buscarFilmePersonagemID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultFilmesPersonagens = await filmePersonagemDAO.getSelectByIdMoviesCharacters(Number(id))

            if (resultFilmesPersonagens) {
                if (resultFilmesPersonagens.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme_personagem = resultFilmesPersonagens

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

const listarPersonagensIdFilme = async function (filme_id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(filme_id) && filme_id != '' && filme_id != null && filme_id > 0) {
            let resultFilmesPersonagens = await filmePersonagemDAO.getSelectCharactersByidMovies(Number(filme_id))

            if (resultFilmesPersonagens) {
                if (resultFilmesPersonagens.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme_personagem = resultFilmesPersonagens

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

const listarFilmesIdPersonagem = async function (personagem_id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(personagem_id) && personagem_id != '' && personagem_id != null && personagem_id > 0) {
            let resultFilmesPersonagens = await filmePersonagemDAO.getSelectMoviesByidCharacters(Number(personagem_id))

            if (resultFilmesPersonagens) {
                if (resultFilmesPersonagens.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme_personagem = resultFilmesPersonagens

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

const inserirFilmesPersonagens = async function (filme_personagem, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosFilmePersonagem(filme_personagem)

            if (!validar) {
                let resultFilmesPersonagens = await filmePersonagemDAO.setInsertMoviesCharacters(filme_personagem)

                if (resultFilmesPersonagens) {
                    let lastID = await filmePersonagemDAO.getSelectLastID()
                    if (lastID) {
                        filme_personagem.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = filme_personagem

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

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

const atualizarFilmePersonagem = async function (filme_personagem, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosFilmePersonagem(filme_personagem)

            if (!validar) {

                let validarID = await buscarFilmePersonagemID(id)

                if (validarID.status_code == 200) {

                    filme_personagem.id = Number(id)

                    let resultFilmesPersonagens = await filmePersonagemDAO.setUpdateMoviesCharacters(filme_personagem)

                    if (resultFilmesPersonagens) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.filme_personagem = filme_personagem

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID 
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

const excluirFilmePersonagem = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarFilmePersonagemID(id)

            if (validarID.status_code == 200) {

                let resultFilmesPersonagens = await filmePersonagemDAO.setDeleteMoviesCharacters(Number(id))

                if (resultFilmesPersonagens) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.filme_personagem = resultFilmesPersonagens
                    delete MESSAGES.DEFAULT_HEADER.items
                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const validarDadosFilmePersonagem = async function (filme_personagem) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (filme_personagem.filme_id <= 0 || isNaN(filme_personagem.filme_id) || filme_personagem.filme_id == '' || filme_personagem.filme_id == undefined || filme_personagem.filme_id == null) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id do filme incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme_personagem.personagem_id <= 0 || isNaN(filme_personagem.personagem_id) || filme_personagem.personagem_id == '' || filme_personagem.personagem_id == undefined || filme_personagem.personagem_id == null) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Id do personagem incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme_personagem.papel_personagem == '' || filme_personagem.papel_personagem == undefined || filme_personagem.papel_personagem == null || filme_personagem.papel_personagem > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Id do personagem incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarFilmesPersonagens,
    buscarFilmePersonagemID,
    listarPersonagensIdFilme,
    listarFilmesIdPersonagem,
    inserirFilmesPersonagens,
    atualizarFilmePersonagem,
    excluirFilmePersonagem
}