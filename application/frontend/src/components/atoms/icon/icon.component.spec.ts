import { IconComponent } from '.';
import { createShallowMountWrapper } from './../../../wrappers';
import { describe, expect, it } from 'vitest';

describe('IconComponent', () => {
  it('should have an instanceOf IconComponent', () => {
    const wrapper = createShallowMountWrapper(IconComponent, {
      props: {
        name: 'menu'
      }
    });

    expect(wrapper).toBeInstanceOf(IconComponent);
  })

  it('should have Bars4IconComponent because props name equals menu', () => {
    const wrapper = createShallowMountWrapper(IconComponent, {
      props: {
        name: 'menu'
      }
    });

    expect(wrapper.find('Bars4Icon').exists()).toBe(true);
  })

  it('should have MagnifyingGlassIcon because props name equals search', () => {
    const wrapper = createShallowMountWrapper(IconComponent, {
      props: {
        name: 'search'
      }
    });

    expect(wrapper.find('MagnifyingGlassIcon').exists()).toBe(true);
  })

  it('should have Cog8ToothIcon because props name equals settings', () => {
    const wrapper = createShallowMountWrapper(IconComponent, {
      props: {
        name: 'settings'
      }
    });

    expect(wrapper.find('Cog8ToothIcon').exists()).toBe(true);
  })

  it('should have SunIcon because props name equals sun', () => {
    const wrapper = createShallowMountWrapper(IconComponent, {
      props: {
        name: 'sun'
      }
    });

    expect(wrapper.find('SunIcon').exists()).toBe(true);
  })

  it('should have MoonIcon because props name equals moon', () => {
    const wrapper = createShallowMountWrapper(IconComponent, {
      props: {
        name: 'moon'
      }
    });

    expect(wrapper.find('MoonIcon').exists()).toBe(true);
  })

  it('should have LanguageIcon because props name equals locale', () => {
    const wrapper = createShallowMountWrapper(IconComponent, {
      props: {
        name: 'locale'
      }
    });

    expect(wrapper.find('LanguageIcon').exists()).toBe(true);
  })
})
