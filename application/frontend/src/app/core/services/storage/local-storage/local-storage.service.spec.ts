import { TestBed } from '@angular/core/testing';
import { type LocalStorageService } from './local-storage.service';
import { type StorageCollection } from '../storage.collection';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [] });
  });

  const dummyKey = 'dummyKey' as StorageCollection;
  const dummyValue = 'dummyValue';

  const toolbox = {
    fetch: <T>(): T => { return service.fetch(dummyKey) },
    save: (): void => { service.save(dummyKey, dummyValue) },
    delete: (): void => { service.delete(dummyKey) },
    clear: (): void => { service.clear() }
  }

  beforeEach(() => {
    toolbox.clear();
  })

  describe('and fetch method is called', () => {
    it('should have value fetched based on existent key', () => {
      toolbox.save()

      expect(toolbox.fetch()).toBe(dummyValue);
    })

    it('should have null fetched based on existent key', () => {
      expect(toolbox.fetch()).toBeNull();
    })
  })

  describe('and save method is called', () => {
    it('should have value fetched based on saved key', () => {
      toolbox.save()

      expect(toolbox.fetch()).toBe(dummyValue);
    })
  })

  describe('and delete method is called', () => {
    it('should have value fetched as null', () => {
      toolbox.save()
      toolbox.delete()

      expect(toolbox.fetch()).toBe(null);
    })
  })

  describe('and clear method is called', () => {
    it('should have value fetched as null', () => {
      toolbox.save()
      toolbox.clear()

      expect(toolbox.fetch()).toBe(null);
    })
  })
})
