import { describe, expect, it } from 'vitest';
import { createShallowMountWrapper } from './../../../wrappers';
import { SpinnerComponent } from '.';

describe('SpinnerComponent', () => {
  const spinnerComponentWrapper = createShallowMountWrapper(SpinnerComponent);

  it('should be instanceOf SpinnerComponent', () => {
    expect(spinnerComponentWrapper).instanceOf(SpinnerComponent);
  })
})
