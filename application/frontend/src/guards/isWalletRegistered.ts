import { useWallet } from "@/stores/useWallet";
import { storeToRefs } from "pinia";
import type { NavigationGuardNext, RouteLocation } from "vue-router";

export const isWalletRegistered = async (
    to: RouteLocation,
    _from: RouteLocation,
    next: NavigationGuardNext
) => {
    const useWalletStore = useWallet();
    const { wallet } = storeToRefs(useWalletStore);
    if (wallet.value) return next();
    const userUuid = to.params.userUuid as string
    const foundWallet = await useWalletStore.findWalletByUserUuid(userUuid);
    if (foundWallet !== undefined) useWalletStore.updateState(foundWallet)
    if (foundWallet === undefined) await useWalletStore.createWallet({ userUuid });
    return next();
}