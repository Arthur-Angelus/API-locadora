/********************************************************************
 * objetivo: arquivo responsavel pela manipulação de dados entre o APP e o MODEL para o CRUD de profissionais
 * data: 22/10/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/

const profissionalDAO = require('../../model/DAO/profissional.js')

const DEFAULT_MESSAGES = require('./modulo/config_messages.js')

const listarProfissionais = async function () {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultProfissionais = await profissionalDAO.getSelectAllProfessionals()

        if (resultProfissionais) {
            if (resultProfissionais.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.profissional = resultProfissionais

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

const buscarProfissionalID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultProfissionais = await profissionalDAO.getSelectByIdProfessionals(Number(id))

            if (resultProfissionais) {
                if (resultProfissionais.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.Profissional = resultProfissionais

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

const inserirProfissional = async function (profissional, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosProfissional(profissional)

            if (!validar) {
                let resultProfissionais = await profissionalDAO.setInsertProfessionals(profissional)

                if (resultProfissionais) {
                    let lastID = await profissionalDAO.getSelectLastID()
                    if (lastID) {
                        profissional.id = lastID
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = profissional

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

const atualizarProfissional = async function (profissional, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosProfissional(profissional)

            if (!validar) {

                let validarID = await buscarProfissionalID(id)

                if (validarID.status_code == 200) {

                    profissional.id = Number(id)

                    let resultProfissionais = await profissionalDAO.setUpdateProfessionals(profissional)

                    if (resultProfissionais) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.profissional = profissional

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

const excluirProfissional = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let validarID = await buscarProfissionalID(id)

            if (validarID.status_code == 200) {

                let resultProfissionais = await profissionalDAO.setDeleteProfessionals(Number(id))

                if (resultProfissionais) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.profissional = resultProfissionais
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

const validarDadosProfissional = async function (profissional) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    profissional.biografia = profissional.biografia.replace(/'/g, "");
    profissional.biografia = profissional.biografia.replace(/"/g, "");

    if (profissional.nome == '' || profissional.nome == undefined || profissional.nome == null || profissional.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (profissional.data_nascimento == '' || profissional.data_nascimento == undefined || profissional.data_nascimento == null || profissional.data_nascimento.length > 10) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data de nascimento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (profissional.data_falecimento == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data de falecimento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (profissional.biografia == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Biografia incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (profissional.genero == '' || profissional.genero == undefined || profissional.genero == null || profissional.genero.length > 1 || profissional.genero != "M" && "F") {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Genero incorreto, deve ser M ou F!]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarProfissionais,
    buscarProfissionalID,
    inserirProfissional,
    atualizarProfissional,
    excluirProfissional
}