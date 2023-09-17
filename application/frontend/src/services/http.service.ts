type HttpMethod = 'GET' | 'POST' | 'PUT';

export class HttpService {
  private readonly baseURL: string = 'http://localhost:8000';

  public async doRequest <T>(
    httpMethod: HttpMethod,
    httpPath: string,
    httpBody?: Record<string, unknown>,
    httpHeaders?: Record<string, string>
  ): Promise<T> {
    const response = await fetch(this.baseURL + httpPath, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        ...httpHeaders
      },
      body: JSON.stringify(httpBody)
    });

    return await response.json();
  }
}
