import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodError } from 'zod'
import logger from '../infrastructure/logger'

/**
 * Middleware de validation Zod pour req.body, req.query et req.params.
 * ..param schema – Zod object schema couvrant { body?, query?, params? }
 */
export function validate(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const toValidate = {
      body: req.body,
      query: req.query,
      params: req.params,
    }

    logger.debug(`Data to validate: ${JSON.stringify(toValidate)}`)
    const result = schema.safeParse(toValidate)

    if (!result.success) {
      const zodErr = result.error as ZodError
      logger.warn(
        `Validation failed on ${req.method} ${req.originalUrl}: ` +
          JSON.stringify(zodErr.errors)
      )
      // On envoie la réponse d’erreur sans la retourner
      res.status(400).json({
        error: 'Invalid request data',
        details: zodErr.errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        })),
      })
      return
    }

    // Récupère les données validées/transformées
    const { body: vBody, query: vQuery, params: vParams } = result.data

    if (vBody !== undefined) {
      Object.keys(req.body).forEach((key) => delete req.body[key])
      Object.assign(req.body, vBody)
    }

    if (vQuery !== undefined) {
      Object.keys(req.query).forEach((key) => delete req.query[key])
      Object.assign(req.query, vQuery)
    }

    if (vParams !== undefined) {
      Object.keys(req.params).forEach((key) => delete req.params[key])
      Object.assign(req.params, vParams)
    }

    logger.debug(
      `Request after validation for ${req.method} ${req.originalUrl}: ` +
        `body=${JSON.stringify(req.body)}, query=${JSON.stringify(req.query)}, params=${JSON.stringify(req.params)}`
    )

    next()
  }
}
