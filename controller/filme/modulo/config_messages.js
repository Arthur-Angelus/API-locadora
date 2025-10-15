/********************************************************************
 * objetivo: arquivo responsavel pelos padrões de mensagens que o projeto ira realizar, sempre no formato jdon(,mensagens de erro sucesso e etc)
 * data: 07/10/2025
 * autor: arthur
 * versão: 1.0
 *****************************************************************/

//cria um onjeto da classe date para pegar a dara aTUL
const dataAtual = new Date()

/*********************MENSAGENS PADRONIZADAS*********************************** */
const DEFAULT_HEADER = {    developtment: 'arthur angelus andrade de almeida', 
                            api_description: 'API para manipular dados de filmes',
                            status: Boolean,
                            status_code: Number,
                            request_date: dataAtual.toLocaleString(),
                            items:{}
                        }


/*********************MENSAGENS DE SUCESSO************************************* */
const SUCESS_REQUEST = {status:true, status_code: 200, message: 'Requisição bem sucedida!!!'}
const SUCCES_CREATED_ITEM = {status:true, status_code: 201, message: 'Item criado com sucesso!!!'}

/*********************MENSAGENS DE ERRO**************************************** */
const ERROR_NOT_FOUND =                  {status:false, status_code: 404, message: 'Não foram encontrados dados de retorno'}
const ERROR_INTERNAL_SERVER_CONTROLLER = {status:false, status_code: 500, message: 'Não FOi possivel processar a requisição devido a erros internos no servidor(CONTROLLER!!!)'}
const ERROR_INTERNAL_SERVER_MODEL =      {status:false, status_code: 500, message: 'Não Foi possivel processar a requisição devido a erros internos no servidor(CONTROLLER!!!)'}
const ERROR_REQUIRED_FIELDS =            {status:false, status_code: 400, message: 'Não foi possível processar a requisição pois existem campos obrigatorios que devem ser encaminhados e atendidos conforme documentação'}
const ERROR_CONTENT_TYPE =               {status:false, status_code: 415, message: 'Não foi possivel processar a requisição, pois o tipo de dados no corpo deve ser JSON'}

module.exports = {
    DEFAULT_HEADER,
    SUCESS_REQUEST,
    SUCCES_CREATED_ITEM,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_REQUIRED_FIELDS,
    ERROR_CONTENT_TYPE
}