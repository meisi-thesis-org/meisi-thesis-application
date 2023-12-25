<template>
    <ComputerDesktopIcon class="icon" v-if="definedProps.name === 'device'" :style="definedStyle" />
    <WifiIcon class="icon" v-if="definedProps.name === 'network'" :style="definedStyle" />
    <Cog8ToothIcon class="icon" v-if="definedProps.name === 'settings'" :style="definedStyle" />
</template>

<script setup lang="ts">
import type { IconProps } from "@/types/Icon";
import { Cog8ToothIcon , ComputerDesktopIcon, WifiIcon  } from "@heroicons/vue/24/solid";
import { computed } from "vue";
const definedProps = defineProps<IconProps>();
const definedStyle = computed(() => ({
    width: definedProps.width,
    height: definedProps.height
}))
</script>

<style scoped lang="scss">
.icon {
    color: currentColor;
}
</style>