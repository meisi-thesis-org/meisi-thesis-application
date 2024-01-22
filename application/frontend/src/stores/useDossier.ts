import { useFetch } from "@/composables/useFetch";
import type { DossierEntity } from "@/types/Entities";
import type { Primitive } from "@/types/Primitive";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useDossier = defineStore("dossiers", () => {
    const { createRequest } = useFetch();
    const state = ref<Array<DossierEntity>>([])

    const findDossierByUserUuid = async (userUuid: string) => {
        try {
            const response = await createRequest<DossierEntity>('commerce/dossiers', 'GET', undefined, { userUuid });
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    const findDossierByUuid = async (uuid: string) => {
        try {
            const response = await createRequest<DossierEntity>(`commerce/dossiers/${uuid}`, 'GET')
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    const createDossier = async (userUuid: string, designation: string) => {
        try {
            const response = await createRequest<DossierEntity>('commerce/dossiers', 'POST', { userUuid, designation });
            state.value?.push(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const updateDossierByUuid = async (
        uuid: string,
        params: Record<string, Primitive>
    ) => {
        try {
            const response = await createRequest<DossierEntity>(`commerce/dossiers/${uuid}`, 'PUT', params);
            state.value?.forEach((element) => {
                if (element.uuid === response.data.uuid) 
                    element = response.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    return {
        dossiers: state,
        findDossierByUserUuid,
        findDossierByUuid,
        createDossier,
        updateDossierByUuid,
        updateState: (dossier: DossierEntity) => state.value.push(dossier)
    }
})