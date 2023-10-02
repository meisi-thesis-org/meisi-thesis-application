<template>
    <SunIcon 
        class="icon" 
        v-if="definedProps.name === 'sun' && getTheme() === 'DARK'" 
        v-on:click="setTheme('LIGHT')"
    ></SunIcon>
    <MoonIcon 
        class="icon" v-if="definedProps.name === 'moon' && getTheme() === 'LIGHT'" 
        v-on:click="setTheme('DARK')"
    ></MoonIcon>
    <LanguageIcon 
        class="icon" 
        v-if="definedProps.name === 'locale'"
    ></LanguageIcon>
    <DevicePhoneMobileIcon 
        class="icon" 
        v-if="definedProps.name === 'device'"
    ></DevicePhoneMobileIcon>
</template>

<script setup lang="ts">
import { IconComponentProps } from './icon.component.type';

/** Icons */
import {
    SunIcon,
    MoonIcon,
    LanguageIcon,
DevicePhoneMobileIcon,
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
}
</style>