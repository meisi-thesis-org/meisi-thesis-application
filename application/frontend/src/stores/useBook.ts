import { useFetch } from '@/composables/useFetch';
import type { BookEntity } from '@/types/Entities';
import type { Primitive } from '@/types/Primitive';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBook = defineStore('books', () => {
  const { createRequest } = useFetch();
  const state = ref<BookEntity[]>([])

  const findBookByUuid = async (
    uuid: string
  ) => {
    try {
      const response = await createRequest<BookEntity>(`commerce/books/${uuid}`, 'GET');
      return response.data;
    } catch (error) {
      return undefined;
    }
  }

  const findBooksByQuery = async (
    dossierUuid?: string
  ) => {
    try {
      const response = await createRequest<BookEntity[]>('commerce/books', 'GET', undefined, { dossierUuid });
      return response.data;
    } catch (error) {
      return [];
    }
  }

  const createBook = async (data: Record<string, string | number>) => {
    try {
      const response = await createRequest<BookEntity>('commerce/books', 'POST', data);
      state.value = [...state.value, response.data]
    } catch (error) {
      console.log(error)
    }
  }

  const updateBookByUuid = async (
    uuid: string,
    data: Record<string, Primitive>
  ) => {
    try {
      const response = await createRequest<BookEntity>(`commerce/books/${uuid}`, 'PUT', data);
      state.value = state.value.map((book) => {
        if (book.uuid === response.data.uuid) book = { ...book, ...response.data };
        return book
      })
    } catch (error) {
      console.log(error)
    }
  }

  return {
    books: state,
    findBookByUuid,
    findBooksByQuery,
    createBook,
    updateBookByUuid,
    updateState: (books: BookEntity[]) => { state.value = books }
  }
})
