/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { describe, expect, it, vi } from 'vitest';
import { accessTokenGuard } from './access-token.guard';
import { type Response, type Request } from 'express';
import { TokenProvider } from '../providers/token.provider';

describe('accessTokenGuard', () => {
  const requestMock = {} as unknown as Request;
  const responseMock = {} as unknown as Response;

  it('should throw an ForbiddenException because authorizationHeader is missing', () => {
    expect(() => accessTokenGuard(requestMock, responseMock)).toThrow();
  })

  it('should have an user property on the request', async () => {
    requestMock.headers = { ...requestMock.headers, authorization: 'Bearer dummyAuthorization' }
    vi.spyOn(TokenProvider.prototype, 'verify').mockReturnValue({
      dummyProperty: 'dummyProperty'
    });

    expect(() => accessTokenGuard(requestMock, responseMock)).not.toThrow();
  })

  it('should throw an ForbiddenException because token is missing', () => {
    requestMock.headers = { ...requestMock.headers, authorization: '' }
    expect(() => accessTokenGuard(requestMock, responseMock)).toThrow();
  })
})
