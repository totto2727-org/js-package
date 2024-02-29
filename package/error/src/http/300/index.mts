import { AbstractHttpError, AbstractHttpRedirectError } from "../type.mts"

export class HttpErrorMultipleChoice extends AbstractHttpError {
  static {
    HttpErrorMultipleChoice.prototype.name = "HttpErrorMultipleChoice"
  }

  constructor(target: string, message?: string, options?: ErrorOptions) {
    super({ code: 300, text: "Multiple Choice" }, message, options)
  }
}

export class HttpErrorMovedPermanently extends AbstractHttpRedirectError {
  static {
    HttpErrorMovedPermanently.prototype.name = "HttpErrorMovedPermanently"
  }

  constructor(target: string, message?: string, options?: ErrorOptions) {
    super(target, { code: 301, text: "Moved Permanently" }, message, options)
  }
}

export class HttpErrorFound extends AbstractHttpRedirectError {
  static {
    HttpErrorFound.prototype.name = "HttpErrorFound"
  }

  constructor(target: string, message?: string, options?: ErrorOptions) {
    super(target, { code: 302, text: "Found" }, message, options)
  }
}

export class HttpErrorSeeOther extends AbstractHttpRedirectError {
  static {
    HttpErrorSeeOther.prototype.name = "HttpErrorSeeOther"
  }

  constructor(target: string, message?: string, options?: ErrorOptions) {
    super(target, { code: 303, text: "See Other" }, message, options)
  }
}

export class HttpErrorNotModified extends AbstractHttpError {
  static {
    HttpErrorNotModified.prototype.name = "HttpErrorNotModified"
  }

  constructor(target: string, message?: string, options?: ErrorOptions) {
    super({ code: 304, text: "Not Modified" }, message, options)
  }
}

export class HttpErrorTemporaryRedirect extends AbstractHttpRedirectError {
  static {
    HttpErrorTemporaryRedirect.prototype.name = "HttpErrorTemporaryRedirect"
  }

  constructor(target: string, message?: string, options?: ErrorOptions) {
    super(target, { code: 307, text: "Temporary Redirect" }, message, options)
  }
}

export class HttpErrorPermanentRedirect extends AbstractHttpRedirectError {
  static {
    HttpErrorPermanentRedirect.prototype.name = "HttpErrorPermanentRedirect"
  }

  constructor(target: string, message?: string, options?: ErrorOptions) {
    super(target, { code: 308, text: "Permanent Redirect" }, message, options)
  }
}
