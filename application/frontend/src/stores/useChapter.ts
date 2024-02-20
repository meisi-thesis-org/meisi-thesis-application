import { useFetch } from '@/composables/useFetch';
import type { ChapterEntity } from '@/types/Entities';
import type { Primitive } from '@/types/Primitive';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChapter = defineStore('chapters', () => {
  const { createRequest } = useFetch();
  const state = ref<ChapterEntity[]>([])

  const findChapterByUuid = async (
    uuid: string
  ) => {
    try {
      const response = await createRequest<ChapterEntity>(`commerce/chapters/${uuid}`, 'GET');
      return response.data;
    } catch (error) {
      return undefined;
    }
  }

  const findChaptersByQuery = async (
    bookUuid?: string
  ) => {
    try {
      const response = await createRequest<ChapterEntity[]>('commerce/chapters', 'GET', undefined, { bookUuid });
      return response.data;
    } catch (error) {
      return [];
    }
  }

  const createChapter = async (data: Record<string, string | number>) => {
    try {
      const response = await createRequest<ChapterEntity>('commerce/chapters', 'POST', data);
      state.value = [...state.value, response.data]
    } catch (error) {
      console.log(error)
    }
  }

  const updateChapterByUuid = async (
    uuid: string,
    data: Record<string, Primitive>
  ) => {
    try {
      const response = await createRequest<ChapterEntity>(`commerce/chapters/${uuid}`, 'PUT', data);
      state.value = state.value?.map((chapter) => {
        if (chapter.uuid === response.data.uuid) { chapter = response.data }

        return chapter
      })
    } catch (error) {
      console.log(error)
    }
  }

  return {
    chapters: state,
    findChapterByUuid,
    findChaptersByQuery,
    createChapter,
    updateChapterByUuid,
    updateState: (chapters: ChapterEntity[]) => state.value = chapters
  }
})
