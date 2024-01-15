<template>
    <div id="banner">
        <div id="banner__inner">
            <div id="banner__inner--box">
                <Typography :content="definedProps.headerContent" :segment="'paragraph'" :color="'light-colorized'" />
                <div id="banner__inner--box__icons">
                    <Icon v-if="!isOwner && isEnabled" :name="'lock'" :width="'1.25rem'" :height="'1.25rem'" :color="'light-colorized'" />
                    <Icon v-if="!isOwner && isEnabled" :name="'unlock'" :width="'1.25rem'" :height="'1.25rem'" :color="'light-colorized'" />
                    <Icon :on-click="toggleVisibility" v-if="isOwner && !isEnabled" :name="'watcher'" :width="'1.25rem'" :height="'1.25rem'" :color="'light-colorized'" />
                    <Icon :on-click="toggleVisibility" v-if="isOwner && isEnabled" :name="'watcher-off'" :width="'1.25rem'" :height="'1.25rem'" :color="'light-colorized'" />
                    <Icon :on-click="toggleActivity" v-if="isOwner" :name="'trashcan'" :width="'1.25rem'" :height="'1.25rem'" :color="'light-colorized'" />
                </div>
            </div>
            <div id="banner__inner--box">
                <EditableField @on-blur="$emit('onBlur', $event)" :content="definedProps.subHeaderContent"
                    :color="'light-colorized'" :is-editable="isOwner" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { BannerProps } from '@/types/Banner';
import Typography from './Typography.vue';
import Icon from './Icon.vue';
import EditableField from './EditableField.vue';
import { usePermission } from '@/composables/usePermission';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useDossier } from '@/stores/useDossier';
import { useLoader } from '@/composables/useLoader';
import { useRouter } from 'vue-router';
const definedProps = defineProps<BannerProps>();
const definedEmits = defineEmits(['onBlur']);
const { isOwner } = usePermission();
const { dossier } = storeToRefs(useDossier());
const isEnabled = computed(() => dossier.value && dossier.value.visible)
const { isLoading } = useLoader();
const { updateDossierByUuid } = useDossier();
const { push } = useRouter();
const toggleVisibility = async () => {
    try {
        isLoading.value = !isLoading.value;
        await updateDossierByUuid(dossier.value!.uuid, { visible:  !dossier.value!.visible});
        isLoading.value = !isLoading.value;
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}

const toggleActivity = async () => {
    try {
        isLoading.value = !isLoading.value;
        await updateDossierByUuid(dossier.value!.uuid, { active:  !dossier.value!.active});
        isLoading.value = !isLoading.value;
        return await push({ name: "recover-dossier", params: { userUuid: dossier.value?.userUuid } });
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}
</script>

<style scoped lang="scss">
#banner {
    background-color: var(--blue--theme--color);
    padding: 2.5rem;

    &__inner {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        &--box {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            &__icons {
                display: flex;
                flex-direction: row;
                gap: 0.50rem;
            }
        }
    }
}
</style>