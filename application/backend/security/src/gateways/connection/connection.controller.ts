import { type Request, type Response } from 'express';
import { ConnectionService } from './connection.service';
import { RefreshTokensRequest } from './requests/refresh-tokens.request';

export class ConnectionController {
  private readonly connectionService: ConnectionService;

  public constructor () {
    this.connectionService = new ConnectionService();
  }

  public async refreshTokens (
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const refreshTokensRequest = new RefreshTokensRequest(
        request.params.uuid,
        request.body.userUuid,
        request.body.username,
        request.body.email,
        request.body.phoneNumber
      );
      const data = await this.service.findUserByUuid(refreshTokensRequest);
      return response.status(200).json(data);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json();
    }
  }
}
