<template>
    <div id="banner">
        <div id="banner__inner">
            <div id="banner__inner--header">
                <Typography v-if="!definedProps.isEditable" :content="definedProps.headerContent"
                    :color="definedProps.color" :segment="'subHeader'" />
                <EditableControl v-if="definedProps.isEditable"  :content="definedProps.headerContent" :color="definedProps.color"
                    :is-editable="definedProps.isEditable" :type="'text'"
                    @on-blur="definedProps.onBlur" />
                <div id="banner__inner--header__icons">
                    <template v-for="icon of definedProps.icons">
                        <Icon v-if="icon.isVisible" :height="icon.height" :width="icon.width" :color="icon.color"
                            :name="icon.name" :on-click="icon.onClick" />
                    </template>
                </div>
            </div>
            <div id="banner__inner--group">
                <template v-for="group of definedProps.groups">
                    <div id="banner__inner--group__field" v-if="group.type === 'editableField'">
                        <Typography v-if="group.designation" :content="group.designation ?? ''" :color="group.color"
                            :segment="'placeholder'" />
                        <EditableField :max-length="group.maxLength" :content="group.content" :color="definedProps.color"
                            :is-editable="group.isEditable" :type="group.contentType" @on-blur="group.onBlur" />
                    </div>
                </template>
                <template v-for="group of definedProps.groups">
                    <div id="banner__inner--group__control" v-if="group.type === 'editableControl'">
                        <Typography v-if="group.designation" :content="group.designation ?? ''" :color="group.color"
                            :segment="'placeholder'" />
                        <EditableControl :content="group.content" :color="definedProps.color"
                            :is-editable="group.isEditable" :type="group.contentType" :length="group.maxLength" @on-blur="group.onBlur" />
                    </div>
                </template>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import EditableControl from './EditableControl.vue';
import EditableField from './EditableField.vue';
import Icon from './Icon.vue';
import type { BannerProps } from '@/types/Banner';
import Typography from './Typography.vue';

const definedProps = defineProps<BannerProps>();
</script>

<style scoped lang="scss">
#banner {
    background: var(--banner--gradient--color);

    &__inner {
        padding: 2.5rem;

        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        &--header {
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

        &--group {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            &__control {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                gap: 0.5rem;
            }
        }
    }
}</style>