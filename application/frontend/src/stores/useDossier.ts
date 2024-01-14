import { useFetch } from "@/composables/useFetch";
import type { DossierEntity } from "@/types/Entities";
import type { Primitive } from "@/types/Primitive";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDossier = defineStore("dossiers", () => {
    const { createRequest } = useFetch();
    const state = ref<DossierEntity>()

    const setDossier = (dossier: DossierEntity) => state.value = dossier;

    const findDossierByUserUuid = async (userUuid: string) => {
        try {
            return (await createRequest<DossierEntity>('commerce/dossiers', 'GET', undefined, { userUuid })).data;
        } catch (error) {
            return undefined;
        }
    }

    const findDossierByUuid = async (uuid: string) => {
        try {
            return (await createRequest<DossierEntity>(`commerce/dossiers/${uuid}`, 'GET')).data;
        } catch (error) {
            return undefined;
        }
    }

    const createDossier = async (userUuid: string, designation: string) => {
        return (await createRequest<DossierEntity[]>('commerce/dossiers', 'POST', { userUuid, designation })).data;
    }

    const updateDossierByUuid = async (
        uuid: string,
        params: Record<string, Primitive>
    ) => {
        const response = await createRequest<DossierEntity>(`commerce/dossiers/${uuid}`, 'PUT', params);
        state.value = response.data;
    }

    return {
        dossier: state,
        setDossier,
        findDossierByUserUuid,
        findDossierByUuid,
        createDossier,
        updateDossierByUuid
    }
})