<template>
    <div id="banner">
        <div id="banner__inner">
            <div id="banner__inner--box">
                <div id="banner__inner--box__icons">
                    <Icon v-if="!isOwner && isEnabled" :name="'lock'" :width="'1.25rem'" :height="'1.25rem'" :color="'light-colorized'" />
                    <Icon v-if="!isOwner && isEnabled" :name="'unlock'" :width="'1.25rem'" :height="'1.25rem'" :color="'light-colorized'" />
                    <Icon :on-click="toggleVisibility" v-if="isOwner && !isEnabled" :name="'watcher'" :width="'1.25rem'" :height="'1.25rem'" :color="'light-colorized'" />
                    <Icon :on-click="toggleVisibility" v-if="isOwner && isEnabled" :name="'watcher-off'" :width="'1.25rem'" :height="'1.25rem'" :color="'light-colorized'" />
                    <Icon v-if="isOwner" :name="'trashcan'" :width="'1.25rem'" :height="'1.25rem'" :color="'light-colorized'" />
                </div>
                <Divider :height="'1.5rem'" :width="'0.15rem'" />
                <Typography :content="definedProps.headerContent" :segment="'paragraph'" :color="'light-colorized'" />
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
import Divider from './Divider.vue';
import EditableField from './EditableField.vue';
import { usePermission } from '@/composables/usePermission';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useDossier } from '@/stores/useDossier';
import { useLoader } from '@/composables/useLoader';
const definedProps = defineProps<BannerProps>();
const definedEmits = defineEmits(['onBlur']);
const { isOwner } = usePermission();
const { dossier } = storeToRefs(useDossier());
const isEnabled = computed(() => dossier.value && dossier.value.visible)
const { isLoading } = useLoader();
const { updateDossierByUuid } = useDossier();
const toggleVisibility = async () => {
    try {
        console.log("hello")
        isLoading.value = !isLoading.value;
        await updateDossierByUuid(dossier.value!.uuid, { visible:  !dossier.value!.visible});
        isLoading.value = !isLoading.value;
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}
</script>

<style scoped lang="scss">
#banner {
    background-color: var(--violet--theme--color);
    padding: 2.5rem;

    &__inner {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        &--box {
            display: flex;
            flex-direction: row;
            align-items: center;

            &__icons {
                display: flex;
                flex-direction: row;
                gap: 0.15rem;
            }
        }
    }
}
</style>