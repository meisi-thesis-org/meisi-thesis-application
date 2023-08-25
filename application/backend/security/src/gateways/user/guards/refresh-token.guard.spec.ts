/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { describe, expect, it, vi } from 'vitest';
import { RefreshTokenGuard } from './refresh-token.guard';
import { type Response, type Request, type NextFunction } from 'express';
import { TokenProvider } from '../providers/token.provider';

describe('RefreshTokenGuard', () => {
  const requestMock = {} as unknown as Request;
  const responseMock = {} as unknown as Response;
  const nextFunctionMock = vi.fn() as unknown as NextFunction;

  it('should throw an ForbiddenException because authorizationHeader is missing', () => {
    expect(() => RefreshTokenGuard(requestMock, responseMock, nextFunctionMock)).toThrow();
  })

  it('should have an user property on the request', async () => {
    requestMock.headers = { ...requestMock.headers, authorization: 'Bearer dummyAuthorization' }
    vi.spyOn(TokenProvider.prototype, 'verify').mockReturnValue({
      dummyProperty: 'dummyProperty'
    });

    expect(() => RefreshTokenGuard(requestMock, responseMock, nextFunctionMock)).not.toThrow();
  })

  it('should throw an ForbiddenException because token is missing', () => {
    requestMock.headers = { ...requestMock.headers, authorization: '' }
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    expect(() => RefreshTokenGuard(requestMock, responseMock, nextFunctionMock)).toThrow();
  })
})
