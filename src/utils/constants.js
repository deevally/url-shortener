const ResponseCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
};
const StatusMessages = {
  INVALID_BASE_URL: 'Invalid base url',
  INVALID_URL: 'Invalid url',
  URL_NOT_FOUND: 'Url not found',
};


Object.freeze(ResponseCode);
Object.freeze(StatusMessages);

export { ResponseCode, StatusMessages };
