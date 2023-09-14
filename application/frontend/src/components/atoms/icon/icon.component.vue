<template>
    <div class="icon" v-bind:class="'size__' + size + ' ' + 'color__' + color" v-show="props.name === 'menu'">
        <bars3-icon></bars3-icon>
    </div>
    <div class="icon" v-bind:class="'size__' + size + ' ' + 'color__' + color" v-show="props.name === 'locale'">
        <language-icon></language-icon>
    </div>
    <div class="icon" v-bind:class="'size__' + size + ' ' + 'color__' + color" v-show="props.name === 'theme'" >
        <sun-icon v-if="fetchTheme() === 'DARK_THEME'" v-on:click="updateTheme()"></sun-icon>
        <moon-icon v-if="fetchTheme() === 'LIGHT_THEME'" v-on:click="updateTheme()"></moon-icon>
    </div>
    <div class="icon" v-bind:class="'size__' + size + ' ' + 'color__' + color" v-show="props.name === 'search'">
        <magnifying-glass-icon></magnifying-glass-icon>
    </div>
    <div class="icon" v-bind:class="'size__' + size + ' ' + 'color__' + color" v-show="props.name === 'settings'">
        <cog6-tooth-icon></cog6-tooth-icon>
    </div>
    <div class="icon" v-bind:class="'size__' + size + ' ' + 'color__' + color" v-show="props.name === 'notification'">
        <bell-alert-icon v-show="false"></bell-alert-icon>
        <bell-snooze-icon></bell-snooze-icon>
    </div>
</template>

<script setup lang="ts">
import { Bars3Icon, LanguageIcon, SunIcon, MoonIcon, MagnifyingGlassIcon, Cog6ToothIcon, BellSnoozeIcon, BellAlertIcon  } from "@heroicons/vue/24/solid"
import { useTheme } from "../../../composables/use-theme";

const { fetchTheme, updateTheme } = useTheme()

type Icons = "locale" | "menu" | "theme" | "search" | "settings" | "notification"
type IconSizes = "minimum" | "medium" | "maximum"
type IconColors = "light" | "dark" | "orange"

type IconComponentProps = {
    readonly name: Icons
    readonly size: IconSizes
    readonly color: IconColors
}

const props = defineProps<IconComponentProps>()
console.log(props)
</script>

<style scoped lang="scss">
.icon {
    cursor: pointer;
    
    &.size {
        &__minimum {
            width: 1rem;
            height: 1rem;
        }

        &__medium {
            width: 2rem;
            height: 2rem;
        }
        
        &__maximum {
            width: 3rem;
            height: 3rem;
        }
    }
    &.color {
        &__light {
            color: inherit;
        }

        &__dark {
            color: inherit;
        }

        &__orange {
            color: #FF9900
        }

    }
}
</style>