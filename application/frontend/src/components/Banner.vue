<template>
    <div id="banner">
        <div id="banner__inner">
            <div id="banner__inner--box">
                <Typography v-if="!definedProps.isHeaderEditable" :content="definedProps.headerContent"
                    :segment="'paragraph'" :color="'light-colorized'" />
                <EditableControl v-if="definedProps.isHeaderEditable" :content="definedProps.headerContent"
                    :color="'light-colorized'" :is-editable="isProducer"
                    @on-blur="(data: string) => $emit('editableControlUpdate', data)" />
                <div id="banner__inner--box__icons">
                    <Icon v-if="isConsumer && definedProps.isContentVisible" :name="'lock'" :width="'1.25rem'"
                        :height="'1.25rem'" :color="'light-colorized'" />
                    <Icon v-if="isConsumer && definedProps.isContentVisible" :name="'unlock'" :width="'1.25rem'"
                        :height="'1.25rem'" :color="'light-colorized'" />
                    <Icon :on-click="() => $emit('toggleVisibility', !definedProps.isContentVisible)"
                        v-if="isProducer && !definedProps.isContentVisible" :name="'watcher'" :width="'1.25rem'"
                        :height="'1.25rem'" :color="'light-colorized'" />
                    <Icon :on-click="() => $emit('toggleVisibility', !definedProps.isContentVisible)"
                        v-if="isProducer && definedProps.isContentVisible" :name="'watcher-off'" :width="'1.25rem'"
                        :height="'1.25rem'" :color="'light-colorized'" />
                    <Icon :on-click="() => $emit('toggleActivity', !definedProps.isContentEnabled)" v-if="isProducer"
                        :name="'trashcan'" :width="'1.25rem'" :height="'1.25rem'" :color="'light-colorized'" />
                </div>
            </div>
            <div id="banner__inner--box">
                <EditableField v-if="showEditableField" :max-length="'50'" :content="definedProps.subHeaderContent"
                    :color="'light-colorized'" :is-editable="isProducer"
                    @on-blur="(data: string) => $emit('editableFieldUpdate', data)" />
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
import EditableControl from './EditableControl.vue';

const { isProducer, isConsumer } = usePermission();

const definedProps = withDefaults(defineProps<BannerProps>(), {
    showEditableField: true,
    subHeaderContent: ""
});
const definedEmits = defineEmits(['editableFieldUpdate', 'editableControlUpdate', 'toggleVisibility', 'toggleActivity']);
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