import { AbstractHttpError } from "../type.mts"

export class HttpErrorInternalServerError extends AbstractHttpError {
  static {
    HttpErrorInternalServerError.prototype.name = "HttpErrorInternalServerError"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 500, text: "Internal Server Error" }, message, options)
  }
}

export class HttpErrorNotImplemented extends AbstractHttpError {
  static {
    HttpErrorNotImplemented.prototype.name = "HttpErrorNotImplemented"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 501, text: "Not Implemented" }, message, options)
  }
}

export class HttpErrorBadGateway extends AbstractHttpError {
  static {
    HttpErrorBadGateway.prototype.name = "HttpErrorBadGateway"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 502, text: "Bad Gateway" }, message, options)
  }
}

export class HttpErrorServiceUnavailable extends AbstractHttpError {
  static {
    HttpErrorServiceUnavailable.prototype.name = "HttpErrorServiceUnavailable"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 503, text: "Service Unavailable" }, message, options)
  }
}

export class HttpErrorGatewayTimeout extends AbstractHttpError {
  static {
    HttpErrorGatewayTimeout.prototype.name = "HttpErrorGatewayTimeout"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 504, text: "Gateway Timeout" }, message, options)
  }
}

export class HttpErrorHttpVersionNotSupported extends AbstractHttpError {
  static {
    HttpErrorHttpVersionNotSupported.prototype.name =
      "HttpErrorHttpVersionNotSupported"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 505, text: "HTTP Version Not Supported" }, message, options)
  }
}

export class HttpErrorVariantAlsoNegotiates extends AbstractHttpError {
  static {
    HttpErrorVariantAlsoNegotiates.prototype.name =
      "HttpErrorVariantAlsoNegotiates"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 506, text: "Variant Also Negotiates" }, message, options)
  }
}

export class HttpErrorInsufficientStorage extends AbstractHttpError {
  static {
    HttpErrorInsufficientStorage.prototype.name = "HttpErrorInsufficientStorage"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 507, text: "Insufficient Storage" }, message, options)
  }
}

export class HttpErrorLoopDetected extends AbstractHttpError {
  static {
    HttpErrorLoopDetected.prototype.name = "HttpErrorLoopDetected"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 508, text: "Loop Detected" }, message, options)
  }
}

export class HttpErrorNotExtended extends AbstractHttpError {
  static {
    HttpErrorNotExtended.prototype.name = "HttpErrorNotExtended"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 510, text: "Not Extended" }, message, options)
  }
}

export class HttpErrorNetworkAuthenticationRequired extends AbstractHttpError {
  static {
    HttpErrorNetworkAuthenticationRequired.prototype.name =
      "HttpErrorNetworkAuthenticationRequired"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super(
      { code: 507, text: "Network Authentication Required" },
      message,
      options,
    )
  }
}
