import { computed, ref } from "vue"

const state = ref<'dark' | 'light'>('light')

export const useTheme = () => {
    return {
        theme: state,
        switchTheme: () => state.value === 'light' ? state.value = "dark" : state.value = "light",
        isDarkTheme: computed(() => state.value === "dark"),
        isLightTheme: computed(() => state.value === "light")
    }
}