<template>
    <div id="banner">
        <div id="banner__inner">
            <div id="banner__inner--box">
                <div id="banner__inner--box__icons">
                    <Icon v-if="!isOwner" :name="'lock'" :width="'1.25rem'" :height="'1.25rem'" :color="'light-colorized'" />
                    <Icon v-if="!isOwner" :name="'unlock'" :width="'1.25rem'" :height="'1.25rem'" :color="'light-colorized'" />
                    <Icon v-if="isOwner" :name="'watcher'" :width="'1.25rem'" :height="'1.25rem'" :color="'light-colorized'" />
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
const definedProps = defineProps<BannerProps>();
const definedEmits = defineEmits(['onBlur']);
const { isOwner } = usePermission();
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
        }
    }
}
</style>