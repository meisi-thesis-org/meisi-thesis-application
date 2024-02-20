import { describe, expect, it, vi, beforeEach } from 'vitest';
import { DossierController } from './dossier.controller';
import { type Request, type Response } from 'express';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { type DossierDTO } from './structs/dossier.domain';
import { DossierService } from './dossier.service';

describe('DossierController', () => {
  const instance = new DossierController();

  it('should have an instanceOf DossierController', () => {
    expect(instance).toBeInstanceOf(DossierController)
  })

  const requestMock = {} as unknown as Request;
  const responseMock = {} as unknown as Response;

  function defineResponseMock<T> (jsonResponse: T): void {
    responseMock.json = vi.fn().mockReturnValue(jsonResponse);
    responseMock.status = vi.fn(() => responseMock)
  }

  const randomProvider = new RandomProvider();

  const randomString = randomProvider.randomString(16);
  const randomNumber = randomProvider.randomNumber();
  const randomUuid = randomProvider.randomUUID();
  const randomDateBirth = new Date().toISOString();

  const dossierDTO: DossierDTO = {
    uuid: randomUuid,
    userUuid: randomUuid,
    designation: randomString,
    price: randomNumber,
    visible: true,
    active: true,
    createdAt: randomDateBirth,
    updatedAt: randomDateBirth
  }

  describe('findDossierByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: 'dummyUuid' }
    })

    async function callFindDossierByUuid (): Promise<Response> {
      return await instance.findDossierByUuid(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(DossierService.prototype, 'findDossierByUuid').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callFindDossierByUuid()).resolves.toEqual(new Error());
    })

    it('should return an DossierDTO collection', async () => {
      vi.spyOn(DossierService.prototype, 'findDossierByUuid').mockResolvedValue(dossierDTO);
      defineResponseMock(dossierDTO);

      await expect(callFindDossierByUuid()).resolves.toEqual(dossierDTO);
    })
  })

  describe('findDossierByQuery', () => {
    beforeEach(() => {
      requestMock.query = { ...requestMock.query, userUuid: 'dummyUserUuid' }
    })

    async function callFindDossierByQuery (): Promise<Response> {
      return await instance.findDossierByQuery(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(DossierService.prototype, 'findDossierByQuery').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callFindDossierByQuery()).resolves.toEqual(new Error());
    })

    it('should return an DossierDTO collection', async () => {
      vi.spyOn(DossierService.prototype, 'findDossierByQuery').mockResolvedValue(dossierDTO);
      defineResponseMock(dossierDTO);

      await expect(callFindDossierByQuery()).resolves.toEqual(dossierDTO);
    })
  })

  describe('createDossier', () => {
    beforeEach(() => {
      requestMock.body = {
        ...requestMock.body,
        userUuid: 'dummyUserUuid',
        designation: 'dummyDesignation',
        price: randomNumber,
      }
    })

    async function callCreateDossier (): Promise<Response> {
      return await instance.findDossierByQuery(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(DossierService.prototype, 'createDossier').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callCreateDossier()).resolves.toEqual(new Error());
    })

    it('should return an DossierDTO collection', async () => {
      vi.spyOn(DossierService.prototype, 'createDossier').mockResolvedValue(dossierDTO);
      defineResponseMock(dossierDTO);

      await expect(callCreateDossier()).resolves.toEqual(dossierDTO);
    })
  })

  describe('updateDossierByUuid', () => {
    beforeEach(() => {
      requestMock.params = { ...requestMock.params, uuid: 'dummyUuid' }
      requestMock.body = {
        ...requestMock.body,
        designation: 'dummyDesignation',
        visible: true,
        active: true
      }
    })

    async function callCreateDossier (): Promise<Response> {
      return await instance.findDossierByQuery(requestMock, responseMock)
    }

    it('should throw an exception because an error ocurred while making a service request', async () => {
      vi.spyOn(DossierService.prototype, 'createDossier').mockRejectedValue({ getHttpCode: vi.fn() });
      defineResponseMock(new Error())

      await expect(callCreateDossier()).resolves.toEqual(new Error());
    })

    it('should return an DossierDTO collection', async () => {
      vi.spyOn(DossierService.prototype, 'createDossier').mockResolvedValue(dossierDTO);
      defineResponseMock(dossierDTO);

      await expect(callCreateDossier()).resolves.toEqual(dossierDTO);
    })
  })
})
