/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { describe, expect, it, vi } from 'vitest';
import { AccessTokenGuard } from './access-token.guard';
import { type Response, type Request, type NextFunction } from 'express';
import { TokenProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/token.provider';

describe('AccessTokenGuard', () => {
  const requestMock = {} as unknown as Request;
  const responseMock = {} as unknown as Response;
  const nextFunctionMock = vi.fn() as unknown as NextFunction;

  it('should throw an NoAuthorizationException because authorizationHeader is missing', () => {
    expect(() => AccessTokenGuard(requestMock, responseMock, nextFunctionMock)).toThrow();
  })

  it('should have an user property on the request', async () => {
    requestMock.headers = { ...requestMock.headers, authorization: 'Bearer dummyAuthorization' }
    vi.spyOn(TokenProvider.prototype, 'verify').mockReturnValue({
      dummyProperty: 'dummyProperty'
    });

    expect(() => AccessTokenGuard(requestMock, responseMock, nextFunctionMock)).not.toThrow();
  })

  it('should throw an NoAuthorizationException because token is missing', () => {
    requestMock.headers = { ...requestMock.headers, authorization: '' }
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    expect(() => AccessTokenGuard(requestMock, responseMock, nextFunctionMock)).toThrow();
  })
})
