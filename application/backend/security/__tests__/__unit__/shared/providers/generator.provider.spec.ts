import { GeneratorProvider } from '../../../../src/shared/providers/generator.provider';
import Randomstring from 'randomstring';

describe('GeneratorProvider', () => {
  const dummyRandomString = 'dummyRandomString';

  function callGeneratorProvider(): GeneratorProvider {
    return GeneratorProvider.getInstance();
  }

  function callSpyOnRandomString(): void {
    jest.spyOn(Randomstring, 'generate').mockReturnValue(dummyRandomString as any)
  }

  it('should have a random string generated', () => {
    callSpyOnRandomString();

    expect(callGeneratorProvider().generateRandomString(12)).toBe(dummyRandomString);
  })
})
