import { TestBed } from '@angular/core/testing'
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ThemeService] });
  });

  const toolbox = {
    callUpdateState: () => { service.updateState() },
    callIsDarkTheme: (): boolean => { return service.isDarkTheme() },
    callIsLighTheme: (): boolean => { return service.isLightTheme() }
  }

  describe('and state has been updated', () => {
    it('should have DARK_THEME as state', () => {
      toolbox.callUpdateState()

      expect(toolbox.callIsDarkTheme()).toBe(true);
    })

    it('shouldn`t have DARK_THEME as state', () => {
      toolbox.callUpdateState()

      expect(toolbox.callIsDarkTheme()).toBe(false);
    })

    it('should have LIGHT_THEME as state', () => {
      toolbox.callUpdateState()

      expect(toolbox.callIsLighTheme()).toBe(true);
    })

    it('shouldn`t have LIGHT_THEME as state', () => {
      toolbox.callUpdateState()

      expect(toolbox.callIsLighTheme()).toBe(false);
    })
  })
})
