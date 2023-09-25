import { describe, expect, it } from 'vitest';
import { createShallowMountWrapper } from './../../wrappers/createShallowMount.wrapper';
import { FormComponent } from './../../components/organisms/form';
import { RefreshAccessCodeComponent } from '.';
import type { VueWrapper } from '@vue/test-utils';

describe('RefreshAccessCodeComponent', () => {
  const refreshAccessCodeComponent = createShallowMountWrapper(RefreshAccessCodeComponent)
  describe('formComponent element', () => {
    function findFormComponent (): VueWrapper {
      return refreshAccessCodeComponent.findComponent(FormComponent);
    }
    it('should exist', () => {
      expect(findFormComponent().exists()).toBe(true);
    })

    it('should have header attribute', () => {
      expect(findFormComponent().attributes().header).toBeDefined()
    });

    it('should have sub-header attribute', () => {
      expect(findFormComponent().attributes().subHeader).toBeDefined()
    });

    it('should have formGroupCollection attribute', () => {
      expect(findFormComponent().attributes().formGroupCollection).toBeDefined()
    });

    it('should have submitLabel attribute', () => {
      expect(findFormComponent().attributes().submitLabel).toBeDefined()
    });

    it('should have linkCollection attribute', () => {
      expect(findFormComponent().attributes().linkCollection).toBeDefined()
    });

    it('should have submitAction attribute', () => {
      expect(findFormComponent().attributes().submitAction).toBeDefined()
    });
  })
});
