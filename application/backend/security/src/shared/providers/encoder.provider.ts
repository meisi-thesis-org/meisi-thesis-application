import * as bcrypt from 'bcrypt';

export class EncoderProvider {
  public static instance: EncoderProvider | null = null;

  private constructor() {}

  public static getInstance(): EncoderProvider {
    if (this.instance === null) {
      this.instance = new EncoderProvider();
    }

    return this.instance;
  }

  public async encode(rawValue: string): Promise<string> {
    return await bcrypt.hash(rawValue, 10)
  }

  public async compareEncode(rawValue: string, encodedValue: string): Promise<boolean> {
    return await bcrypt.compare(rawValue, encodedValue);
  }
}
