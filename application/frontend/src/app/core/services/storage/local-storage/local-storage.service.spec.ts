import { type StorageCollection } from '../../../../shared/collections/storage.collection';
import { LocalStorageService } from './local-storage.service'

describe('LocalStorageService', () => {
  const localStorageService = new LocalStorageService();

  const mockedReturnValue = 'mockedReturnValue';
  const mockedGivenParam = 'mockedGivenParam' as StorageCollection;

  describe('getItem', () => {
    function callGetItem<T>(name: StorageCollection): T | null {
      return localStorageService.getItem(name);
    }

    function callSpyOnGetItem(): void {
      jest.spyOn(localStorage, 'getItem').mockReturnValue(mockedReturnValue)
    }

    afterEach(() => {
      localStorageService.clear();
    })

    it('should have data returned', () => {
      callSpyOnGetItem()

      expect(callGetItem(mockedGivenParam)).toEqual(mockedReturnValue);
    })

    it('should have null returned', () => {
      expect(callGetItem(mockedGivenParam)).toBeNull();
    })
  })

  describe('setItem', () => {
    function callGetItem<T>(name: StorageCollection): T | null {
      return localStorageService.getItem(name);
    }

    function callSetItem<T>(name: StorageCollection, data: T): void {
      localStorageService.setItem(name, data);
    }

    function callSpyOnGetItem(): void {
      jest.spyOn(localStorage, 'getItem').mockReturnValue(mockedReturnValue)
    }

    beforeEach(() => {
      callSetItem(mockedGivenParam, mockedReturnValue);
      callSpyOnGetItem();
    })

    afterEach(() => {
      localStorageService.clear();
    })

    it('should have dummyItem created on storage', () => {
      expect(callGetItem(mockedGivenParam)).toBe(mockedReturnValue);
    })
  })

  describe('removeItem', () => {
    function callGetItem<T>(name: StorageCollection): T | null {
      return localStorageService.getItem(name);
    }

    function callSetItem<T>(name: StorageCollection, data: T): void {
      localStorageService.setItem(name, data);
    }

    function callRemoveItem(name: StorageCollection): void {
      localStorageService.removeItem(name);
    }

    function callSpyOnGetItem(): void {
      jest.spyOn(localStorage, 'getItem').mockReturnValue(mockedReturnValue)
    }

    beforeEach(() => {
      callSetItem(mockedGivenParam, mockedReturnValue);
      callSpyOnGetItem();
    })

    afterEach(() => {
      localStorageService.clear();
    })

    it('should have dummyItem removed from storage', () => {
      callRemoveItem(mockedGivenParam);

      expect(callGetItem(mockedGivenParam)).toBeNull();
    })
  })

  describe('clear', () => {
    function callGetItem<T>(name: StorageCollection): T | null {
      return localStorageService.getItem(name);
    }

    function callSetItem<T>(name: StorageCollection, data: T): void {
      localStorageService.setItem(name, data);
    }

    function callClearItem(): void {
      localStorageService.clear();
    }

    function callSpyOnGetItem(): void {
      jest.spyOn(localStorage, 'getItem').mockReturnValue(mockedReturnValue)
    }

    beforeEach(() => {
      callSetItem(mockedGivenParam, mockedReturnValue);
      callSpyOnGetItem();
    })

    afterEach(() => {
      localStorageService.clear();
    })

    it('should have all items removed from storage', () => {
      callClearItem();

      expect(callGetItem(mockedGivenParam)).toBeNull();
    })
  })
})
