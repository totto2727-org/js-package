export type HttpStatus = {
  code: number
  text: string
}

export interface HttpError extends Error {
  status: HttpStatus
  toResponse: (
    options?: Omit<ResponseInit, "status" | "statusText">,
  ) => Response
}

export class AbstractHttpError extends Error implements HttpError {
  constructor(
    public readonly status: HttpStatus,
    message?: string,
    options?: ErrorOptions,
  ) {
    super(message ?? `${status.code} ${status.text}`, options)
  }

  toResponse(options?: Omit<ResponseInit, "status" | "statusText">): Response {
    return new Response(super.message, {
      status: this.status.code,
      statusText: this.status.text,
      ...options,
    })
  }
}

type RedirectHttpStatus = {
  code: 301 | 302 | 303 | 307 | 308
  text: string
}

export class AbstractHttpRedirectError extends AbstractHttpError {
  constructor(
    public readonly target: string,
    status: RedirectHttpStatus,
    message?: string,
    options?: ErrorOptions,
  ) {
    super(status, message, options)
  }

  toResponse(): Response {
    return Response.redirect(
      this.target,
      super.status.code as RedirectHttpStatus["code"],
    )
  }
}
