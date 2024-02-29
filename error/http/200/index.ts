import { AbstractHttpError } from "../type.ts"

export class HttpErrorOk extends AbstractHttpError {
  static {
    HttpErrorOk.prototype.name = "HttpErrorOk"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 200, text: "OK" }, message, options)
  }
}

export class HttpErrorCreated extends AbstractHttpError {
  static {
    HttpErrorCreated.prototype.name = "HttpErrorCreated"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 201, text: "Created" }, message, options)
  }
}

export class HttpErrorAccepted extends AbstractHttpError {
  static {
    HttpErrorAccepted.prototype.name = "HttpErrorAccepted"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 202, text: "Accepted" }, message, options)
  }
}

export class HttpErrorNonAuthoritativeInformation extends AbstractHttpError {
  static {
    HttpErrorNonAuthoritativeInformation.prototype.name =
      "HttpErrorNonAuthoritativeInformation"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super(
      { code: 203, text: "Non-Authoritative Information" },
      message,
      options,
    )
  }
}

export class HttpErrorNoContent extends AbstractHttpError {
  static {
    HttpErrorNoContent.prototype.name = "HttpErrorNoContent"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 204, text: "No Content" }, message, options)
  }
}

export class HttpErrorResetContent extends AbstractHttpError {
  static {
    HttpErrorResetContent.prototype.name = "HttpErrorResetContent"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 205, text: "Reset Content" }, message, options)
  }
}

export class HttpErrorPartialContent extends AbstractHttpError {
  static {
    HttpErrorPartialContent.prototype.name = "HttpErrorPartialContent"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 206, text: "PartialContent" }, message, options)
  }
}

export class HttpErrorMultiStatus extends AbstractHttpError {
  static {
    HttpErrorMultiStatus.prototype.name = "HttpErrorMultiStatus"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 207, text: "Multi-Status" }, message, options)
  }
}

export class HttpErrorAlreadyReported extends AbstractHttpError {
  static {
    HttpErrorAlreadyReported.prototype.name = "HttpErrorAlreadyReported"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 208, text: "Already Reported" }, message, options)
  }
}

export class HttpErrorImUsed extends AbstractHttpError {
  static {
    HttpErrorImUsed.prototype.name = "HttpErrorImUsed"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 226, text: "IM Used" }, message, options)
  }
}
