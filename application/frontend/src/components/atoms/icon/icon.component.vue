<template>
    <SunIcon 
        class="icon" 
        :class="definedProps.color"
        v-if="definedProps.name === 'sun' && getTheme() === 'DARK'" 
        v-on:click="setTheme('LIGHT')"
    ></SunIcon>
    <MoonIcon 
        class="icon"
        :class="definedProps.color"
        v-if="definedProps.name === 'moon' && getTheme() === 'LIGHT'" 
        v-on:click="setTheme('DARK')"
    ></MoonIcon>
    <LanguageIcon 
        class="icon" 
        :class="definedProps.color"
        v-if="definedProps.name === 'locale'"
    ></LanguageIcon>
    <DevicePhoneMobileIcon 
        class="icon" 
        :class="definedProps.color"
        v-if="definedProps.name === 'device'"
    ></DevicePhoneMobileIcon>
    <SquaresPlusIcon
        class="icon"
        :class="definedProps.color"
        v-if="definedProps.name === 'plus-device'"
    ></SquaresPlusIcon>
</template>

<script setup lang="ts">
import { IconComponentProps } from './icon.component.type';

/** Icons */
import {
    SunIcon,
    MoonIcon,
    LanguageIcon,
    DevicePhoneMobileIcon,
    SquaresPlusIcon
} from "@heroicons/vue/24/outline";
import { useThemeComposable } from '../../../composables/use-theme.composable';
import { useSettingStore } from '../../../store/use-setting.store';
const definedProps = defineProps<IconComponentProps>();
const { getTheme } = useThemeComposable();
const { setTheme } = useSettingStore();
</script>

<style scoped lang="scss">
.icon {
    cursor: pointer;
    color: currentColor;
    height: clamp(1rem, 1rem + 0.5vw, 2rem);
    width: clamp(1rem, 1rem + 0.5vw, 2rem);

    &.hard-purple {
        color: var(--purple-primary);
    }
}
</style>