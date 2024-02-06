import { useDevice } from "@/stores/useDevice"
import { useNetwork } from "@/stores/useNetwork";
import { useUser } from "@/stores/useUser";
import { storeToRefs } from "pinia"
import { computed } from "vue"
import { useRoute } from "vue-router";

export const usePermission = () => {
    const { devices } = storeToRefs(useDevice());
    const { networks } = storeToRefs(useNetwork());
    const { user } = storeToRefs(useUser());

    const { params: routeParams } = useRoute();

    const isOwner = computed(() => user.value?.uuid === routeParams.userUuid && devices.value.length > 0 && networks.value.length > 0);
    const isGuest = computed(() => user.value?.uuid === routeParams.userUuid || devices.value.length === 0 || networks.value.length === 0);
    const isProducer = computed(() => user.value?.uuid === routeParams.userUuid);
    const isSubscriber = computed(() => user.value?.uuid !== routeParams.userUuid);

    return { isOwner, isGuest, isProducer, isSubscriber }
}