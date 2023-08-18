import { describe, expect, it } from 'vitest';
import { MailerApplication } from './mailer.application';

describe('MailerApplication', () => {
  const application = new MailerApplication();

  it('should have instanceOf MailerApplication', () => {
    expect(application).toBeInstanceOf(MailerApplication);
  })
})
