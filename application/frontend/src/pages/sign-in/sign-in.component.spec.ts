import {
  describe,
  it,
  expect
} from 'vitest';
import { FormComponent } from '../../components/organisms/form';
import { SignInComponent } from '.';
import { createShallowMountWrapper } from './../../wrappers';

describe('SignInComponent', () => {
  describe('formComponent element', () => {
    const signInComponentElement = createShallowMountWrapper(SignInComponent).findComponent(FormComponent)

    it('should exist', () => {
      expect(signInComponentElement.exists()).toBe(true);
    })
  })
})
