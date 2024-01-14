import { useDevice } from "@/stores/useDevice"
import { useNetwork } from "@/stores/useNetwork";
import { useUser } from "@/stores/useUser";
import { storeToRefs } from "pinia"
import { computed } from "vue"
import { useRoute } from "vue-router";

export const usePermission = () => {
    const { params } = useRoute();
    const { devices } = storeToRefs(useDevice());
    const { networks } = storeToRefs(useNetwork());
    const { user } = storeToRefs(useUser());

    const isOwner = computed(() => params.userUuid === user.value?.uuid && devices.value.length > 0 && networks.value.length > 0)
    const isUnknown = computed(() => params.userUuid !== user.value?.uuid || devices.value.length === 0 || networks.value.length === 0)

    return { isOwner, isUnknown }
}