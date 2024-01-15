<template>
    <ComputerDesktopIcon class="icon" :class="definedColor" v-if="definedProps.name === 'device'" :style="definedStyle" @click="definedProps.onClick" />
    <WifiIcon class="icon" :class="definedColor" v-if="definedProps.name === 'network'" :style="definedStyle" @click="definedProps.onClick" />
    <Cog8ToothIcon class="icon" :class="definedColor" v-if="definedProps.name === 'settings'" :style="definedStyle" @click="definedProps.onClick" />
    <GlobeAltIcon class="icon" :class="definedLocaleColor" v-if="definedProps.name === 'locale'" :style="definedStyle" @click="definedProps.onClick" />
    <SunIcon class="icon" :class="definedThemeColor" v-if="definedProps.name === 'theme' && isLightTheme"
        @click="switchTheme()" :style="definedStyle" />
    <MoonIcon class="icon" :class="definedThemeColor" v-if="definedProps.name === 'theme' && isDarkTheme"
        @click="switchTheme()" :style="definedStyle" />
    <TrashIcon class="icon" :class="definedColor" v-if="definedProps.name === 'trashcan'" :style="definedStyle" @click="definedProps.onClick" />
    <PencilIcon class="icon" :class="definedColor" v-if="definedProps.name === 'pencil'" :style="definedStyle" @click="definedProps.onClick" />
    <EyeIcon class="icon" :class="definedColor" v-if="definedProps.name === 'watcher'" :style="definedStyle" @click="definedProps.onClick" />
    <EyeSlashIcon class="icon" :class="definedColor" v-if="definedProps.name === 'watcher-off'" :style="definedStyle" @click="definedProps.onClick" />
    <PlusIcon class="icon" :class="definedColor" v-if="definedProps.name === 'plus'" :style="definedStyle" @click="definedProps.onClick" />
    <LockClosedIcon class="icon" :class="definedColor" v-if="definedProps.name === 'lock'" :style="definedStyle" @click="definedProps.onClick" />
    <LockOpenIcon class="icon" :class="definedColor" v-if="definedProps.name === 'unlock'" :style="definedStyle" @click="definedProps.onClick" />
    <PencilIcon class="icon" :class="definedColor" v-if="definedProps.name === 'dossier'" :style="definedStyle" @click="definedProps.onClick" />
    <ChartPieIcon class="icon" :class="definedColor" v-if="definedProps.name === 'dashboard'" :style="definedStyle" @click="definedProps.onClick" />
</template> 

<script setup lang="ts">
import { useTheme } from "@/composables/useTheme";
import type { IconProps } from "@/types/Icon";
import {
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
    ChartPieIcon
} from "@heroicons/vue/24/solid";
import { computed } from "vue";
const definedProps = defineProps<IconProps>();
const definedStyle = computed(() => ({
    width: definedProps.width,
    height: definedProps.height,
}))
const definedColor = computed(() => definedProps.color)
const { isDarkTheme, isLightTheme, switchTheme } = useTheme();
const definedThemeColor = computed(() => isLightTheme.value ? 'yellow-colorized' : '')
const definedLocaleColor = computed(() => isLightTheme.value ? 'blue-colorized' : '')
</script>

<style scoped lang="scss">
.icon {
    color: currentColor;
    cursor: pointer;
}

</style>