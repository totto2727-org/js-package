import { AbstractHttpError } from "../type.ts"

export class HttpErrorContinue extends AbstractHttpError {
  static {
    HttpErrorContinue.prototype.name = "HttpErrorContinueContinue"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 100, text: "Continue" }, message, options)
  }
}

export class HttpErrorSwitchingProtocols extends AbstractHttpError {
  static {
    HttpErrorSwitchingProtocols.prototype.name = "HttpErrorSwitchingProtocols"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 101, text: "Switching Protocols" }, message, options)
  }
}

export class HttpErrorProcessing extends AbstractHttpError {
  static {
    HttpErrorProcessing.prototype.name = "HttpErrorProcessing"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 102, text: "Processing" }, message, options)
  }
}

export class HttpErrorEarlyHints extends AbstractHttpError {
  static {
    HttpErrorEarlyHints.prototype.name = "HttpErrorEarlyHints"
  }

  constructor(message?: string, options?: ErrorOptions) {
    super({ code: 103, text: "Early Hints" }, message, options)
  }
}
