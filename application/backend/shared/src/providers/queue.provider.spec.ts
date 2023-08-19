import { describe, expect, it } from 'vitest';
import { QueueProvider } from './queue.provider';

describe('QueueProvider', () => {
  const queueProvider = new QueueProvider();

  it('should have an instanceOf QueueProvider', () => {
    expect(queueProvider).instanceOf(QueueProvider);
  })
})
