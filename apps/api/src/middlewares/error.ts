/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiError } from '@src/shared/errors/api-error'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export const errorHandlerMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = error.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR
  const message = error.statusCode ? error.message : 'Internal Server Error'
  return res.status(statusCode).json({ message })
}