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

    const isOwner = (userUuid: string) => (userUuid === user.value?.uuid && devices.value.length > 0 && networks.value.length > 0)
    const isUnknown = (userUuid: string) => (userUuid !== user.value?.uuid || devices.value.length === 0 || networks.value.length === 0)

    return { isOwner, isUnknown }
}