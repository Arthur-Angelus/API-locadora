/********************************************************************
 * objetivo: arquivo responsavel pela manipulação de dados entre o APP e o MODEL para o CRUD de nacionalidades
 * data: 22/10/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/

const nacionalidadeDAO = require('../../model/DAO/nacionalidade.js')

const DEFAULT_MESSAGES = require('./modulo/config_messages.js')

const listarNacionalidades = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultNacionalidades = await nacionalidadeDAO.getSelectAllNacionalitites()

        if (resultNacionalidades) {
            if (resultNacionalidades.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.nacionalidades = resultNacionalidades

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

const buscarNacionalidadeID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultNacionalidades = await nacionalidadeDAO.getSelectByIdNacionalitites(Number(id))

            if (resultNacionalidades) {
                if (resultNacionalidades.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.nacionalidade = resultNacionalidades

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

const inserirNacionalidades = async function (nacionalidade, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosNacionalidade(nacionalidade)

            if (!validar) {
                let resultNacionalidades = await nacionalidadeDAO.setInsertNacionalitites(nacionalidade)

                if (resultNacionalidades) {
                    let lastID = await nacionalidadeDAO.getSelectLastID()
                    if (lastID) {
                        nacionalidade.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = nacionalidade

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

const atualizarNacionalidade = async function (nacionalidade, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosNacionalidade(nacionalidade)

            if (!validar) {

                let validarID = await buscarNacionalidadeID(id)

                if (validarID.status_code == 200) {

                    nacionalidade.id = Number(id)

                    let resultNacionalidades = await nacionalidadeDAO.setUpdateNacionalitites(nacionalidade)

                    if (resultNacionalidades) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.nacionalidade = nacionalidade

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

const excluirNacionalidade = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarNacionalidadeID(id)

            if (validarID.status_code == 200) {

                let resultNacionalidades = await nacionalidadeDAO.setDeleteNacionalitites(Number(id))

                if (resultNacionalidades) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.nacionalidade = resultNacionalidades
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

const validarDadosNacionalidade = async function (nacionalidade) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (nacionalidade.nome == '' || nacionalidade.nome == undefined || nacionalidade.nome == null || nacionalidade.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarNacionalidades,
    buscarNacionalidadeID,
    inserirNacionalidades,
    atualizarNacionalidade,
    excluirNacionalidade
}