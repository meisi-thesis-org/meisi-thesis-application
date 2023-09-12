import type { Storage } from '@/types/collections.type';

export class StorageService {
  public fetchToken<T> (tokenName: Storage): T {
    const token = localStorage.getItem(tokenName);

    return token !== null ? JSON.parse(token) : null;
  }

  public saveToken<T> (tokenName: Storage, tokenValue: T): void {
    localStorage.setItem(tokenName, JSON.stringify(tokenValue));
  }

  public removeToken (tokenName: Storage): void {
    localStorage.removeItem(tokenName);
  }

  public clearTokens (): void {
    localStorage.clear();
  }
}
