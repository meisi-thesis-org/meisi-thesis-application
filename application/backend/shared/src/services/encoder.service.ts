export class EncoderService {
  private static _instance: EncoderService | null = null;

  public static get instance(): EncoderService {
    if (this._instance === null) {
      this._instance = new EncoderService();
    }

    return this._instance;
  }

  public encode(rawValue: string): string {
    return '';
  }
}
