import {
  describe,
  it,
  expect
} from 'vitest';
import { FormComponent } from '.';
import { createShallowMountWrapper } from './../../../wrappers';

describe('FormComponent', () => {
  const wrapper = createShallowMountWrapper(FormComponent, {
    props: {
      header: 'dummyHeader',
      subHeader: 'dummySubHeader'
    }
  });

  describe('header typography', () => {
    const typographyComponent = wrapper.find('.form__inner--block--typography__header')

    it('should exist', () => {
      expect(typographyComponent.exists()).toBe(true);
    })

    it('should have a content attribute matching a given subHeader prop', () => {
      expect(typographyComponent.attributes().content).toBe('dummyHeader');
    })
  })

  describe('sub-header typography', () => {
    const typographyComponent = wrapper.find('.form__inner--block--typography__sub-header')

    it('should exist', () => {
      expect(typographyComponent.exists()).toBe(true);
    })

    it('should have a content attribute matching a given subHeader prop', () => {
      expect(typographyComponent.attributes().content).toBe('dummySubHeader');
    })
  })
})
