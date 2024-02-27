import { useSubscription } from "@/stores/useSubscription";
import { useWallet } from "@/stores/useWallet";
import { storeToRefs } from "pinia";
import type { NavigationGuardNext, RouteLocation } from "vue-router";

export const isSubscriptionsRegistered = async (
    _to: RouteLocation,
    _from: RouteLocation,
    next: NavigationGuardNext
) => {
    const useSubscriptionStore = useSubscription();
    const useWalletStore = useWallet();
    const { subscriptions } = storeToRefs(useSubscriptionStore);
    const { wallet } = storeToRefs(useWalletStore);

    if (subscriptions.value.length > 0) return next();

    const foundSubscriptions = await useSubscriptionStore.findSubscriptionsByForeignsUuid(wallet.value?.uuid);
    useSubscriptionStore.updateState(foundSubscriptions);
    return next();
}