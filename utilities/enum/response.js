const Antl = use('Antl');

const status_code = {
  'ACCESS_DENIED': 401,
  'BAD_REQUEST': 400,
  'FORBIDDEN': 403,
  'NOT_FOUND': 404,
  'OK': 200,
  'SERVER_ERROR': 500,
}

const message = {
  401: Antl.formatMessage('response.access_denied'),
  400: Antl.formatMessage('response.bad_request'),
  403: Antl.formatMessage('response.forbidden'),
  404: Antl.formatMessage('response.not_found'),
  200: Antl.formatMessage('response.ok'),
  500: Antl.formatMessage('response.server_error'),
}

module.exports = {
  statusCode: status_code,
  statusMessage: message
}
