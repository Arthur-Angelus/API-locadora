/********************************************************************
 * objetivo: arquivo responsavel pela manipulação de dados entre o APP e o MODEL para o CRUD na relação entre filme e genero
 * data: 05/11/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/

const filmeGeneroDAO = require('../../../model/DAO/filme_genero.js')

const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listarFilmesGeneros = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultFilmesGeneros = await filmeGeneroDAO.getSelectAllMoviesGenres()

        if (resultFilmesGeneros) {
            if (resultFilmesGeneros.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes_generos = resultFilmesGeneros

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

const buscarFilmeGeneroID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultFilmesGeneros = await filmeGeneroDAO.getSelectByIdMoviesGenres(Number(id))

            if (resultFilmesGeneros) {
                if (resultFilmesGeneros.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme_genero = resultFilmesGeneros

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

const listarGenerosIdFilme = async function (filme_id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(filme_id) && filme_id != '' && filme_id != null && filme_id > 0) {
            let resultFilmesGeneros = await filmeGeneroDAO.getSelectGenresByidMovies(Number(filme_id))

            if (resultFilmesGeneros) {
                if (resultFilmesGeneros.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme_genero = resultFilmesGeneros

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

const listarFilmesIdGenero = async function (genero_id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(genero_id) && genero_id != '' && genero_id != null && genero_id > 0) {
            let resultFilmesGeneros = await filmeGeneroDAO.getSelectMoviesByidGenres(Number(genero_id))

            if (resultFilmesGeneros) {
                if (resultFilmesGeneros.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.filme_genero = resultFilmesGeneros

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

const inserirFilmesGeneros = async function (filme_genero, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosFilmeGenero(filme_genero)

            if (!validar) {
                let resultFilmesGeneros = await filmeGeneroDAO.setInsertMoviesGenres(filme_genero)

                if (resultFilmesGeneros) {
                    let lastID = await filmeGeneroDAO.getSelectLastID()
                    if (lastID) {
                        filme_genero.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = filme_genero

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

const atualizarFilmeGenero = async function (filme_genero, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosFilmeGenero(filme_genero)

            if (!validar) {

                let validarID = await buscarFilmeGeneroID(id)

                if (validarID.status_code == 200) {

                    filme_genero.id = Number(id)

                    let resultFilmesGeneros = await filmeGeneroDAO.setUpdateMoviesGenres(filme_genero)

                    if (resultFilmesGeneros) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.filme_genero = filme_genero

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

const excluirFilmeGenero = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarFilmeGeneroID(id)

            if (validarID.status_code == 200) {

                let resultFilmesGeneros = await filmeGeneroDAO.setDeleteMoviesGenres(Number(id))

                if (resultFilmesGeneros) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.filme_genero = resultFilmesGeneros
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

const validarDadosFilmeGenero = async function (filme_genero) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (filme_genero.filme_id <= 0 || isNaN(filme_genero.filme_id) || filme_genero.filme_id == '' || filme_genero.filme_id == undefined || filme_genero.filme_id == null) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Id do filme incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme_genero.genero_id <= 0 || isNaN(filme_genero.genero_id) || filme_genero.genero_id == '' || filme_genero.genero_id == undefined || filme_genero.genero_id == null) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Id do genero incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarFilmesGeneros,
    buscarFilmeGeneroID,
    listarGenerosIdFilme,
    listarFilmesIdGenero,
    inserirFilmesGeneros,
    atualizarFilmeGenero,
    excluirFilmeGenero
}