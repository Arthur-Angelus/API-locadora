/********************************************************************
 * objetivo: arquivo responsavel pela manipulação de dados entre o APP e o MODEL para o CRUD de paises
 * data: 22/10/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/

const paisDAO = require('../../model/DAO/pais.js')

const DEFAULT_MESSAGES = require('./modulo/config_messages.js')

const listarPaises = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultPaises = await paisDAO.getSelectAllCountries()

        if (resultPaises) {
            if (resultPaises.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.paises = resultPaises

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

const buscarPaisID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultPaises = await paisDAO.getSelectByIdCountries(Number(id))

            if (resultPaises) {
                if (resultPaises.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.pais = resultPaises

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

const inserirPaises = async function (pais, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosPais(pais)

            if (!validar) {
                let resultPaises = await paisDAO.setInsertCountries(pais)

                if (resultPaises) {
                    let lastID = await paisDAO.getSelectLastID()
                    if (lastID) {
                        pais.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = pais

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

const atualizarPais = async function (pais, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosPais(pais)

            if (!validar) {

                let validarID = await buscarPaisID(id)

                if (validarID.status_code == 200) {

                    pais.id = Number(id)

                    let resultPaises = await paisDAO.setUpdateCountries(pais)

                    if (resultPaises) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.pais = pais

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

const excluirPais = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarPaisID(id)

            if (validarID.status_code == 200) {

                let resultPaises = await paisDAO.setDeleteCountries(Number(id))

                if (resultPaises) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.pais = resultPaises
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

const validarDadosPais = async function (pais) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (pais.nome == '' || pais.nome == undefined || pais.nome == null || pais.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (pais.linguagem == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Linguagem incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarPaises,
    buscarPaisID,
    inserirPaises,
    atualizarPais,
    excluirPais
}