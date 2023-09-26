const errorDefinitions = [
  {
    name: "ValidationError",
    code: 400,
    data: {},
  },
  { name: "UnauthorizedError", code: 401, data: {} },
  { name: "NotFoundError", code: 404, data: {} },
  { name: "ServerError", code: 500, data: {} },
  { name: "BadRequestError", code: 400, data: {} },
  { name: "ConflictError", code: 409, data: {} },
  { name: "ForbiddenError", code: 403, data: {} },
  { name: "MethodNotAllowedError", code: 405, data: {} },
  { name: "TooManyRequestsError", code: 429, data: {} },
  { name: "UnsupportedMediaTypeError", code: 415, data: {} },
  { name: "UnprocessableEntityError", code: 422, data: {} },
  { name: "ServiceUnavailableError", code: 503, data: {} },
  { name: "GatewayTimeoutError", code: 504, data: {} },
];

module.exports = {
  errorDefinitions,
};
