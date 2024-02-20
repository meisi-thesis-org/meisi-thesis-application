import { useFetch } from "@/composables/useFetch";
import type { DossierEntity } from "@/types/Entities";
import type { Primitive } from "@/types/Primitive";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useDossier = defineStore("dossiers", () => {
    const { createRequest } = useFetch();
    const state = ref<Array<DossierEntity>>([])

    const findDossierByQuery = async (userUuid?: string) => {
        try {
            const response = await createRequest<Array<DossierEntity>>('commerce/dossiers', 'GET', undefined, { userUuid });
            return response.data;
        } catch (error) {
            return [];
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


    const createDossier = async (userUuid: string, designation: string, price: number) => {
        try {
            const response = await createRequest<DossierEntity>('commerce/dossiers', 'POST', { userUuid, designation, price });
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
            state.value = state.value.map((dossier) => {
                if (dossier.uuid === response.data.uuid) {
                    dossier.designation = response.data.designation
                    dossier.price = response.data.price
                    dossier.active = response.data.active
                    dossier.visible = response.data.visible
                }
                return dossier
            })
        } catch (error) {
            console.log(error)
        }
    }

    return {
        dossiers: state,
        findDossierByQuery,
        findDossierByUuid,
        createDossier,
        updateDossierByUuid,
        updateState: (dossier: DossierEntity) => state.value = [...state.value, dossier]
    }
})