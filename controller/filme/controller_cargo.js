/********************************************************************
 * objetivo: arquivo responsavel pela manipulação de dados entre o APP e o MODEL para o CRUD de cargos
 * data: 22/10/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/

const cargoDAO = require('../../model/DAO/cargo.js')

const DEFAULT_MESSAGES = require('./modulo/config_messages.js')

const listarCargos = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultCargos = await cargoDAO.getSelectAllPositions()

        if (resultCargos) {
            if (resultCargos.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.cargos = resultCargos

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

const buscarCargoID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultCargos = await cargoDAO.getSelectByIdPositions(Number(id))

            if (resultCargos) {
                if (resultCargos.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.cargo = resultCargos

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

const inserirCargos = async function (cargo, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosCargo(cargo)

            if (!validar) {
                let resultCargos = await cargoDAO.setInsertPositions(cargo)

                if (resultCargos) {
                    let lastID = await cargoDAO.getSelectLastID()
                    if (lastID) {
                        cargo.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = cargo

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

const atualizarCargo = async function (cargo, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosCargo(cargo)

            if (!validar) {

                let validarID = await buscarCargoID(id)

                if (validarID.status_code == 200) {

                    cargo.id = Number(id)

                    let resultCargos = await cargoDAO.setUpdatePositions(cargo)

                    if (resultCargos) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.cargo = cargo

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

const excluirCargo = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarCargoID(id)

            if (validarID.status_code == 200) {

                let resultCargos = await cargoDAO.setDeletePositions(Number(id))

                if (resultCargos) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.cargo = resultCargos
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

const validarDadosCargo = async function (cargo) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (cargo.nome == '' || cargo.nome == undefined || cargo.nome == null || cargo.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (cargo.descricao == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Descrição incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarCargos,
    buscarCargoID,
    inserirCargos,
    atualizarCargo,
    excluirCargo
}