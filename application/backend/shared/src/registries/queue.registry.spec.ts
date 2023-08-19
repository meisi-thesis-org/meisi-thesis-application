import { describe, it, expect } from 'vitest';
import { QueueRegistry } from './queue.registry';

describe('QueueRegistry', () => {
  const queueRegistry = new QueueRegistry();

  it('should have an instanceOf QueueRegistry', () => {
    expect(queueRegistry).instanceOf(QueueRegistry);
  })
})
