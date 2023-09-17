import {
  describe,
  it,
  expect
} from 'vitest';
import { FormComponent } from '../../components/organisms/form';
import { createShallowMountWrapper } from './../../wrappers';
import { SignUpComponent } from '.';

describe('SignUpComponent', () => {
  it('should have a snapshot', () => {
    expect(createShallowMountWrapper(SignUpComponent)).toMatchSnapshot();
  })

  describe('formComponent element', () => {
    const signUpComponentElement = createShallowMountWrapper(SignUpComponent).findComponent(FormComponent)

    it('should exist', () => {
      expect(signUpComponentElement.exists()).toBe(true);
    })

    it('should have attribute named header to be defined', () => {
      expect(signUpComponentElement.attributes().header).toBeDefined();
    })

    it('should have FormComponent attribute subHeader header to be defined', () => {
      expect(signUpComponentElement.attributes().subheader).toBeDefined();
    })

    it('should have FormComponent attribute buttonLabel to be defined', () => {
      expect(signUpComponentElement.attributes().buttonLabel).toBeDefined();
    })

    it('should have FormComponent attribute buttonAction to be defined', () => {
      expect(signUpComponentElement.attributes().buttonAction).toBeDefined();
    })

    it('should have FormComponent attribute formGroupCollection to be defined', () => {
      expect(signUpComponentElement.attributes().formGroupCollection).toBeDefined();
    })
    it('should have FormComponent attribute linkCollection to be defined', () => {
      expect(signUpComponentElement.attributes().linkCollection).toBeDefined();
    })
  })
})
