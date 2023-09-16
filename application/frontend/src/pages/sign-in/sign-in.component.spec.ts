import {
  describe,
  it,
  expect
} from 'vitest';
import { FormComponent } from '../../components/organisms/form';
import { SignInComponent } from '.';
import { createShallowMountWrapper } from './../../wrappers';

describe('SignInComponent', () => {
  it('should have a snapshot', () => {
    expect(createShallowMountWrapper(SignInComponent)).toMatchSnapshot();
  })

  describe('formComponent element', () => {
    const signInComponentElement = createShallowMountWrapper(SignInComponent).findComponent(FormComponent)

    it('should exist', () => {
      expect(signInComponentElement.exists()).toBe(true);
    })

    it('should have attribute named header to be defined', () => {
      expect(signInComponentElement.attributes().header).toBeDefined();
    })

    it('should have FormComponent attribute subHeader header to be defined', () => {
      expect(signInComponentElement.attributes().subheader).toBeDefined();
    })
  })
})
