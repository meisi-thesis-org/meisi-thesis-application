import { describe, expect, it } from 'vitest';
import { CheckDeviceComponent } from '.';
import { createShallowMountWrapper } from './../../wrappers';

describe('CheckDevice', () => {
  const component = createShallowMountWrapper(CheckDeviceComponent);

  it('should exist', () => {
    expect(component.exists()).toBe(true);
  })

  describe('iconComponent', () => {
    it('should exist', () => {
      expect(component.find('IconComponent').exists()).toBe(true);
    })
  })
  describe('typographyComponent', () => {
    it('should exist', () => {
      expect(component.find('TypographyComponent').exists()).toBe(true);
    })
  })
  describe('formControlComponent', () => {
    it('should exist', () => {
      expect(component.find('FormControlComponent').exists()).toBe(true);
    })
  })
});
