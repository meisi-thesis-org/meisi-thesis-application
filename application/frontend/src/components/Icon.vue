<template>
    <ComputerDesktopIcon class="icon" v-if="definedProps.name === 'device'" :style="definedStyle" />
    <WifiIcon class="icon" v-if="definedProps.name === 'network'" :style="definedStyle" />
    <Cog8ToothIcon class="icon" v-if="definedProps.name === 'settings'" :style="definedStyle" />
    <GlobeAltIcon class="icon" v-if="definedProps.name === 'locale'" :style="[definedStyle, defineLocaleColor]" />
    <SunIcon class="icon" v-if="definedProps.name === 'theme' && isLightTheme" @click="switchTheme()"
        :style="[definedStyle, definedThemeColor]" />
    <MoonIcon class="icon" v-if="definedProps.name === 'theme' && isDarkTheme" @click="switchTheme()"
        :style="[definedStyle, definedThemeColor]" />
    <TrashIcon class="icon" v-if="definedProps.name === 'trashcan'" :style="definedStyle" />
    <PencilIcon class="icon" v-if="definedProps.name === 'pencil'" :style="definedStyle" />
    <EyeIcon class="icon" v-if="definedProps.name === 'watcher'" :style="definedStyle" />
    <EyeSlashIcon class="icon" v-if="definedProps.name === 'watcher-off'" :style="definedStyle" />
    <PlusIcon class="icon" v-if="definedProps.name === 'plus'" :style="definedStyle" />
    <LockClosedIcon class="icon" v-if="definedProps.name === 'lock'" :style="definedStyle" />
    <LockOpenIcon class="icon" v-if="definedProps.name === 'unlock'" :style="definedStyle" />
    <BookOpenIcon class="icon" v-if="definedProps.name === 'dossier'" :style="definedStyle" />
</template> 

<script setup lang="ts">
import { useTheme } from "@/composables/useTheme";
import type { IconProps } from "@/types/Icon";
import {
BookOpenIcon,
    Cog8ToothIcon,
    ComputerDesktopIcon,
    EyeIcon,
    EyeSlashIcon,
    GlobeAltIcon,
    LockClosedIcon,
    LockOpenIcon,
    MoonIcon,
    PencilIcon,
    PlusIcon,
    SunIcon,
    TrashIcon,
    WifiIcon,
} from "@heroicons/vue/24/solid";
import { computed } from "vue";
const definedProps = defineProps<IconProps>();
const definedStyle = computed(() => ({
    width: definedProps.width,
    height: definedProps.height,
    color: definedProps.color === 'colorized' ? 'var(--blue--theme--color)' : 'currentColor'
}))
const { isDarkTheme, isLightTheme, switchTheme } = useTheme();
const definedThemeColor = computed(() => ({ 'color': isLightTheme.value ? '#EF9B0F' : 'currentColor' }))
const defineLocaleColor = computed(() => ({ 'color': isLightTheme.value ? 'var(--blue--theme--color)' : 'currentColor' }))
</script>

<style scoped lang="scss">
.icon {
    color: currentColor;
    cursor: pointer;
}
</style>