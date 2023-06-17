import { TestBed } from '@angular/core/testing'
import { ThemeService } from './theme.service';
import { ThemeCollection } from './theme.collection';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ThemeService] });
  });

  const toolbox = {
    callUpdateState: (theme: ThemeCollection) => { service.updateState(theme) },
    callIsDarkTheme: (): boolean => { return service.isDarkTheme() },
    callIsLighTheme: (): boolean => { return service.isLightTheme() }
  }

  describe('and state has been updated', () => {
    it('should have DARK_THEME as state', () => {
      toolbox.callUpdateState(ThemeCollection.DARK_THEME)

      expect(toolbox.callIsDarkTheme()).toBe(true);
    })

    it('shouldn`t have DARK_THEME as state', () => {
      toolbox.callUpdateState(ThemeCollection.LIGHT_THEME)

      expect(toolbox.callIsDarkTheme()).toBe(false);
    })

    it('should have LIGHT_THEME as state', () => {
      toolbox.callUpdateState(ThemeCollection.LIGHT_THEME)

      expect(toolbox.callIsLighTheme()).toBe(true);
    })

    it('shouldn`t have LIGHT_THEME as state', () => {
      toolbox.callUpdateState(ThemeCollection.LIGHT_THEME)

      expect(toolbox.callIsLighTheme()).toBe(false);
    })
  })
})
