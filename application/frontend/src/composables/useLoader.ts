import { ref } from 'vue';
const isLoading = ref<boolean>(false);
export const useLoader = () => ({ isLoading })
