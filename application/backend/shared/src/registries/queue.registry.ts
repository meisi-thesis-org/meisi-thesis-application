import { type Channel } from 'amqplib';
import type * as QueueProviders from '../providers/queue.provider.type';

export class QueueRegistry {
  private readonly queueRegistryMap: Map<QueueProviders.Keys, Channel>;

  public constructor () {
    this.queueRegistryMap = new Map<QueueProviders.Keys, Channel>();
  }

  public addQueue (queue: QueueProviders.Keys, channel: Channel): void {
    this.queueRegistryMap.set(queue, channel);
  }

  public searchQueue (queue: QueueProviders.Keys): Channel {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.queueRegistryMap.get(queue)!;
  }

  public hasQueue (queue: QueueProviders.Keys): boolean {
    return this.queueRegistryMap.has(queue);
  }

  public updateQueue (queue: QueueProviders.Keys, channel: Channel): void {}
}
