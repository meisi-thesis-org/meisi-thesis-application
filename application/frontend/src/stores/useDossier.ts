import { useFetch } from "@/composables/useFetch";
import type { DossierEntity } from "@/types/Entities";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDossier = defineStore("dossiers", () => {
    const { createRequest } = useFetch();
    const state = ref<DossierEntity>()

    const findDossierByUserUuid = async (userUuid: string) => {
        try {
            return (await createRequest<DossierEntity[]>('commerce/dossiers', 'GET', undefined, { userUuid })).data;
        } catch (error) {
            return undefined;
        }
    }

    const findDossierByUuid = async (uuid: string) => {
        try {
            return (await createRequest<DossierEntity[]>(`commerce/dossiers/${uuid}`, 'GET')).data;
        } catch (error) {
            return undefined;
        }
    }

    const createDossier = async (userUuid: string, designation: string) => {
        return (await createRequest<DossierEntity[]>('commerce/dossiers', 'POST', { userUuid, designation })).data;
    }

    return {
        dossier: state.value,
        findDossierByUserUuid,
        findDossierByUuid,
        createDossier
    }
})