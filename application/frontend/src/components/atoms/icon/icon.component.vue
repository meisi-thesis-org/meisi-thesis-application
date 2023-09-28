<template>
    <Bars4Icon class="icon" v-if="definedProps.name === 'menu'"></Bars4Icon>
    <MagnifyingGlassIcon class="icon" v-if="definedProps.name === 'search'"></MagnifyingGlassIcon>
    <Cog8ToothIcon class="icon" v-if="definedProps.name === 'settings'"></Cog8ToothIcon>
    <SunIcon class="icon" v-if="definedProps.name === 'sun' && getTheme() === 'DARK'" v-on:click="setTheme('LIGHT')"></SunIcon>
    <MoonIcon class="icon" v-if="definedProps.name === 'moon' && getTheme() === 'LIGHT'" v-on:click="setTheme('DARK')"></MoonIcon>
    <LanguageIcon class="icon" v-if="definedProps.name === 'locale'"></LanguageIcon>
</template>

<script setup lang="ts">
import { IconComponentProps } from './icon.component.type';

/** Icons */
import { Bars4Icon } from "@heroicons/vue/24/solid";
import { SunIcon } from "@heroicons/vue/24/solid";
import { MoonIcon } from "@heroicons/vue/24/solid";
import { LanguageIcon } from "@heroicons/vue/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
import { Cog8ToothIcon } from "@heroicons/vue/24/solid";
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
    height: clamp(0.75rem, 0.75rem + 0.5vw, 1.5rem);
    width: clamp(0.75rem, 0.75rem + 0.5vw, 1.5rem);
}
</style>