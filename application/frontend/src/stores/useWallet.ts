import { useFetch } from "@/composables/useFetch";
import type { WalletEntity } from "@/types/Entities";
import type { Primitive } from "@/types/Primitive";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useWallet = defineStore("wallet", () => {
    const { createRequest } = useFetch();
    const state = ref<WalletEntity | undefined>()

    const findWalletByUuid = async (uuid: string) => {
        try {
            const response = await createRequest<WalletEntity>(`accounting/wallets/${uuid}`, 'GET');
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }

    const findWalletByUserUuid = async (userUuid: string) => {
        try {
            const response = await createRequest<WalletEntity>('accounting/wallets', 'GET', undefined, { userUuid });
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }

    const createWallet = async (data: Record<string, Primitive>) => {
        try {
            const response = await createRequest<WalletEntity>('accounting/wallets', 'POST', data);
            state.value = response.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateWalletByUuid = async (uuid: string, data: Record<string, Primitive>) => {
        try {
            const response = await createRequest<WalletEntity>(`accounting/wallets/${uuid}`, 'PUT', data);
            if (!state.value) return;
            state.value.funds = response.data.funds;
            state.value.active = response.data.active;
            state.value.visible = response.data.visible;
        } catch (error) {
            console.log(error)
        }
    }

    return {
        wallet: state,
        findWalletByUuid,
        findWalletByUserUuid,
        createWallet,
        updateWalletByUuid,
        updateState: (wallet: WalletEntity) => state.value = wallet
    }
})