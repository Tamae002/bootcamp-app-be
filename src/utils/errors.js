export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

export class UnauthorizedError extends Error {
  constructor(message = "Akses ditolak") {
    super(message);
    this.statusCode = 401;
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

export class GoneError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 410;
  }
}

export class InternalServerError extends Error {
  constructor(message = "Terjadi kesalahan internal") {
    super(message);
    this.statusCode = 500;
  }
}