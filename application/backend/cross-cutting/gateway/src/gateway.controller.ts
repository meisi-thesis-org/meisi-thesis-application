import { type Request, type Response } from 'express';
import { GatewayService } from './gateway.service';
import { type SignOutRequest, type SignInRequest, type RefreshTokensRequest } from './domain/session.request';
import { type AuthenticatedRequest } from '@meisi-thesis/application-backend-utilities-shared/src/types/authenticated-request.type';

export class GatewayController {
  private readonly gatewayService: GatewayService = new GatewayService();

  public async signIn (request: Request, response: Response): Promise<Response> {
    try {
      const signInRequest: SignInRequest = {
        userUuid: request.params.userUuid
      }
      const signInResponse = await this.gatewayService.signIn(signInRequest);
      return response.status(201).json(signInResponse)
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }

  public async signOut (request: AuthenticatedRequest, response: Response): Promise<Response> {
    try {
      const signOutRequest: SignOutRequest = {
        userUuid: request.user.userUuid
      }
      const signOutResponse = await this.gatewayService.signOut(signOutRequest);
      return response.status(201).json(signOutResponse)
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }

  public async refreshTokens (request: AuthenticatedRequest, response: Response): Promise<Response> {
    try {
      const refreshTokensRequest: RefreshTokensRequest = {
        userUuid: request.user.userUuid
      }
      const refreshTokensResponse = await this.gatewayService.refreshTokens(refreshTokensRequest);
      return response.status(201).json(refreshTokensResponse)
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }
}
