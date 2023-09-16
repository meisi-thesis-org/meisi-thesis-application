import { shallowMount, type VueWrapper } from '@vue/test-utils';
import type { DefineComponent } from 'vue';

type ShallowMountWrapperOptions = {
  props?: Record<string, string>
}

export const createShallowMountWrapper = <T>(component: T, options?: ShallowMountWrapperOptions): VueWrapper => {
  return shallowMount(component as DefineComponent, {
    props: options?.props ?? {}
  })
}
