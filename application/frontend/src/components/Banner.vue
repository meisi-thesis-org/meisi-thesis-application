<template>
    <div id="banner">
        <div id="banner__inner">
            <div id="banner__inner--box">
                <Typography :content="definedProps.headerContent" :segment="'paragraph'" :color="'light-colorized'" />
                <div id="banner__inner--box__icons">
                    <Icon v-if="!isParamizedUserOwner && definedProps.isContentVisible" :name="'lock'" :width="'1.25rem'" :height="'1.25rem'" :color="'light-colorized'" />
                    <Icon v-if="!isParamizedUserOwner && definedProps.isContentVisible" :name="'unlock'" :width="'1.25rem'" :height="'1.25rem'" :color="'light-colorized'" />
                    <Icon :on-click="() => $emit('toggleVisibility', !definedProps.isContentVisible)" v-if="isParamizedUserOwner && !definedProps.isContentVisible" :name="'watcher'" :width="'1.25rem'" :height="'1.25rem'" :color="'light-colorized'" />
                    <Icon :on-click="() => $emit('toggleVisibility', !definedProps.isContentVisible)" v-if="isParamizedUserOwner && definedProps.isContentVisible" :name="'watcher-off'" :width="'1.25rem'" :height="'1.25rem'" :color="'light-colorized'" />
                    <Icon :on-click="() => $emit('toggleActivity', !definedProps.isContentEnabled)" v-if="isParamizedUserOwner" :name="'trashcan'" :width="'1.25rem'" :height="'1.25rem'" :color="'light-colorized'" />
                </div>
            </div>
            <div id="banner__inner--box">
                <EditableField @on-blur="(data: string) => $emit('editableFieldUpdate', data)" :content="definedProps.subHeaderContent"
                    :color="'light-colorized'" :is-editable="isParamizedUserOwner" />
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
import { useRoute } from 'vue-router';
const definedProps = defineProps<BannerProps>();
const definedEmits = defineEmits(['editableFieldUpdate', 'toggleVisibility', 'toggleActivity']);
const { isOwner } = usePermission();
const route = useRoute();
const isParamizedUserOwner = computed(() => isOwner(route.params.userUuid as string))
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