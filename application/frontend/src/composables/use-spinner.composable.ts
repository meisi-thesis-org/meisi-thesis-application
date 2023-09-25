import { computed, ref, type Ref } from 'vue';

type UseSpinnerSignature = {
  getState: Ref<boolean>
  toggleState: () => void
};

export const useSpinner = (): UseSpinnerSignature => {
  const state = ref<boolean>(false);

  return {
    getState: computed(() => state.value),
    toggleState: () => { state.value = !state.value; }
  }
};
