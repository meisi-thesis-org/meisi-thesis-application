import { describe, vi } from 'vitest';
import { checkAuthenticationMiddleware } from './check-authentication.middleware';
import { type NextFunction, type Request, type Response } from 'express';

describe('CheckAuthenticationMiddleware', () => {
  const requestMock = vi.fn() as unknown as Request;
  const responseMock = vi.fn() as unknown as Response;
  const nextMock = vi.fn() as unknown as NextFunction;

  const instance = checkAuthenticationMiddleware(
    requestMock,
    responseMock,
    nextMock
  )
})
