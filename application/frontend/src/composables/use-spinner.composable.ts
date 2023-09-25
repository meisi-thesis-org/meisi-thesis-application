import { ref } from 'vue';

const state = ref<boolean>(false);

export const useSpinnerComposable = () => {
  const updateState = (): void => { state.value = !state.value };
  return { state, updateState }
};
