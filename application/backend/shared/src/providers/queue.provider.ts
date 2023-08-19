import { connect, type Channel, type Connection, type Replies, type ConsumeMessage } from 'amqplib';
import type * as QueueProviders from './queue.provider.type';
import { QueueRegistry } from '../registries/queue.registry';

export class QueueProvider {
  private readonly queueRegistry: QueueRegistry = new QueueRegistry();

  private async defineConnection (url: string): Promise<Connection> {
    return await connect(url);
  }

  private async defineChannel (connection: Connection): Promise<Channel> {
    return await connection.createChannel();
  }

  private async assertQueue (channel: Channel, queue: QueueProviders.Keys): Promise<Replies.AssertQueue> {
    return await channel.assertQueue(queue, { durable: false });
  }

  private async purgeQueue (channel: Channel, queue: QueueProviders.Keys): Promise<Replies.PurgeQueue> {
    return await channel.purgeQueue(queue);
  }

  private async createChannel (
    connectionURL: string,
    queue: QueueProviders.Keys
  ): Promise<Channel> {
    const connection = await this.defineConnection(connectionURL);
    const isPresent = this.queueRegistry.hasQueue(queue);
    const channel = isPresent
      ? this.queueRegistry.searchQueue(queue)
      : await this.defineChannel(connection);

    return channel;
  }

  public async consumeQueue (
    connectionURL: string,
    queue: QueueProviders.Keys,
    callback: (msg: ConsumeMessage | null) => void
  ): Promise<void> {
    const channel = await this.createChannel(connectionURL, queue);
    await this.assertQueue(channel, queue);
    await channel.consume(queue, callback)
    await this.purgeQueue(channel, queue);
  }

  public async sendQueue (
    connectionURL: string,
    queue: QueueProviders.Keys,
    message: Buffer
  ): Promise<void> {
    const channel = await this.createChannel(connectionURL, queue);
    await this.assertQueue(channel, queue);
    channel.sendToQueue(queue, message);
  }
}
