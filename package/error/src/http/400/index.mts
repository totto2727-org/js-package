import { AbstractHttpError } from "../type.mts"

export class HttpErrorBadRequest extends AbstractHttpError {
  static {
    HttpErrorBadRequest.prototype.name = "HttpErrorBadRequest"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 400, text: "Bad Request" }, message, options)
  }
}

export class HttpErrorUnauthorized extends AbstractHttpError {
  static {
    HttpErrorUnauthorized.prototype.name = "HttpErrorUnauthorized"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 401, text: "Unauthorized" }, message, options)
  }
}

export class HttpErrorForbidden extends AbstractHttpError {
  static {
    HttpErrorForbidden.prototype.name = "HttpErrorForbidden"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 403, text: "Forbidden" }, message, options)
  }
}

export class HttpErrorNotFound extends AbstractHttpError {
  static {
    HttpErrorNotFound.prototype.name = "HttpErrorNotFound"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 404, text: "Not Found" }, message, options)
  }
}

export class HttpErrorMethodNotAllowed extends AbstractHttpError {
  static {
    HttpErrorMethodNotAllowed.prototype.name = "HttpErrorMethodNotAllowed"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 405, text: "Method Not Allowed" }, message, options)
  }
}

export class HttpErrorNotAcceptable extends AbstractHttpError {
  static {
    HttpErrorMethodNotAllowed.prototype.name = "HttpErrorNotAcceptable"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 406, text: "Not Acceptable" }, message, options)
  }
}

export class HttpErrorProxyAuthenticationRequired extends AbstractHttpError {
  static {
    HttpErrorProxyAuthenticationRequired.prototype.name =
      "HttpErrorProxyAuthenticationRequired"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super(
      { code: 407, text: "Proxy Authentication Required" },
      message,
      options,
    )
  }
}

export class HttpErrorRequestTimeout extends AbstractHttpError {
  static {
    HttpErrorRequestTimeout.prototype.name = "HttpErrorRequestTimeout"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 408, text: "Request Timeout" }, message, options)
  }
}

export class HttpErrorConflict extends AbstractHttpError {
  static {
    HttpErrorConflict.prototype.name = "HttpErrorConflict"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 409, text: "Conflict" }, message, options)
  }
}

export class HttpErrorGone extends AbstractHttpError {
  static {
    HttpErrorGone.prototype.name = "HttpErrorGone"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 410, text: "Gone" }, message, options)
  }
}

export class HttpErrorLengthRequired extends AbstractHttpError {
  static {
    HttpErrorLengthRequired.prototype.name = "HttpErrorLengthRequired"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 411, text: "Length Required" }, message, options)
  }
}

export class HttpErrorPreconditionFailed extends AbstractHttpError {
  static {
    HttpErrorPreconditionFailed.prototype.name = "HttpErrorPreconditionFailed"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 412, text: "Precondition Failed" }, message, options)
  }
}

export class HttpErrorPayloadTooLarge extends AbstractHttpError {
  static {
    HttpErrorPayloadTooLarge.prototype.name = "HttpErrorPayloadTooLarge"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 413, text: "Payload Too Large" }, message, options)
  }
}

export class HttpErrorUriTooLong extends AbstractHttpError {
  static {
    HttpErrorUriTooLong.prototype.name = "HttpErrorUriTooLong"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 414, text: "URI Too Long" }, message, options)
  }
}

export class HttpErrorUnsupportedMediaType extends AbstractHttpError {
  static {
    HttpErrorUnsupportedMediaType.prototype.name =
      "HttpErrorUnsupportedMediaType"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 415, text: "Unsupported Media Type" }, message, options)
  }
}

export class HttpErrorRangeNotSatisfiable extends AbstractHttpError {
  static {
    HttpErrorRangeNotSatisfiable.prototype.name = "HttpErrorRangeNotSatisfiable"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 416, text: "Range Not Satisfiable" }, message, options)
  }
}

export class HttpErrorExpectationFailed extends AbstractHttpError {
  static {
    HttpErrorExpectationFailed.prototype.name = "HttpErrorExpectationFailed"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 417, text: "Expectation Failed" }, message, options)
  }
}

export class HttpErrorImATeapot extends AbstractHttpError {
  static {
    HttpErrorImATeapot.prototype.name = "HttpErrorImATeapot"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 418, text: "I'm a teapot" }, message, options)
  }
}

export class HttpErrorMisdirectedRequest extends AbstractHttpError {
  static {
    HttpErrorMisdirectedRequest.prototype.name = "HttpErrorMisdirectedRequest"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 421, text: "Misdirected Request" }, message, options)
  }
}

export class HttpErrorUnprocessableEntity extends AbstractHttpError {
  static {
    HttpErrorExpectationFailed.prototype.name = "HttpErrorUnprocessableEntity"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 422, text: "Unprocessable Entity" }, message, options)
  }
}

export class HttpErrorLocked extends AbstractHttpError {
  static {
    HttpErrorLocked.prototype.name = "HttpErrorLocked"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 423, text: "Locked" }, message, options)
  }
}

export class HttpErrorFailedDependency extends AbstractHttpError {
  static {
    HttpErrorExpectationFailed.prototype.name = "HttpErrorFailedDependency"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 424, text: "Failed Dependency" }, message, options)
  }
}

export class HttpErrorTooEarly extends AbstractHttpError {
  static {
    HttpErrorTooEarly.prototype.name = "HttpErrorTooEarly"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 425, text: "Too Early" }, message, options)
  }
}

export class HttpErrorUpgradeRequired extends AbstractHttpError {
  static {
    HttpErrorUpgradeRequired.prototype.name = "HttpErrorUpgradeRequired"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 426, text: "Upgrade Required" }, message, options)
  }
}

export class HttpErrorPreconditionRequired extends AbstractHttpError {
  static {
    HttpErrorPreconditionRequired.prototype.name =
      "HttpErrorPreconditionRequired"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 428, text: "Precondition Required" }, message, options)
  }
}

export class HttpErrorTooManyRequests extends AbstractHttpError {
  static {
    HttpErrorTooManyRequests.prototype.name = "HttpErrorTooManyRequests"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 429, text: "Too Many Requests" }, message, options)
  }
}

export class HttpErrorRequestHeaderFieldsTooLarge extends AbstractHttpError {
  static {
    HttpErrorRequestHeaderFieldsTooLarge.prototype.name =
      "HttpErrorRequestHeaderFieldsTooLarge"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super(
      { code: 431, text: "Request Header Fields Too Large" },
      message,
      options,
    )
  }
}

export class HttpErrorUnavailableForLegalReasons extends AbstractHttpError {
  static {
    HttpErrorUnavailableForLegalReasons.prototype.name =
      "HttpErrorUnavailableForLegalReasons"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super(
      { code: 451, text: "Unavailable For Legal Reasons" },
      message,
      options,
    )
  }
}
