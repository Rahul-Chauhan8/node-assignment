export const RESPONSE_CODES = {
  GET: 200,
  POST: 201,
  DELETE: 204,
  PUT: 204,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

export const ROLES = {
  ADMIN: 1,
  ORGANIZATION: 2,
  MANAGER: 3,
};

export const PAGINATION = {
  START: 0,
  LIMIT: 10,
};

export const saltRounds = 10;