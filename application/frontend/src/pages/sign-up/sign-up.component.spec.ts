import {
  describe,
  it,
  expect
} from 'vitest';
import { FormComponent } from '../../components/organisms/form';
import { createShallowMountWrapper } from './../../wrappers';
import { SignUpComponent } from '.';

describe('SignUpComponent', () => {
  describe('formComponent element', () => {
    const signUpComponentElement = createShallowMountWrapper(SignUpComponent).findComponent(FormComponent)

    it('should exist', () => {
      expect(signUpComponentElement.exists()).toBe(true);
    })

    it('should have attributes', () => {
      expect(signUpComponentElement.attributes()).toContain({
        header: 'E-Bookler',
        subheader: 'Start monetizing your writting time!',
        submitlabel: 'Continue'
      });
    })
  })
})
