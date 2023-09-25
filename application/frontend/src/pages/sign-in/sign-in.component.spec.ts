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

    it('should have attributes', () => {
      expect(signInComponentElement.attributes()).toContain({
        header: 'E-Bookler',
        subheader: 'Start monetizing your writting time!',
        submitlabel: 'Continue'
      });
    })
  })
})
