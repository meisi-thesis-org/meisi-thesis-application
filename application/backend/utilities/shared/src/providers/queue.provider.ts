import { type Connection, connect, type Channel, type Replies, type ConsumeMessage } from 'amqplib';
import { InternalServerException } from '../exceptions/internal-server.exception';

type Queues = 'create_exception' | 'create_email'

export class QueueProvider {
  private async defineConnection (connectionURL: string): Promise<Connection> {
    return await connect(connectionURL);
  }

  private async defineChannel (connection: Connection): Promise<Channel> {
    return await connection.createChannel();
  }

  private async assertQueue (queue: Queues, channel: Channel): Promise<Replies.AssertQueue> {
    return await channel.assertQueue(queue);
  }

  private async purgeQueue (queue: Queues, channel: Channel): Promise<Replies.PurgeQueue> {
    return await channel.purgeQueue(queue);
  }

  public async consumeQueue (
    connectionURL: string,
    queue: Queues,
    callback: (message: ConsumeMessage | null) => void
  ): Promise<void> {
    try {
      const connection = await this.defineConnection(connectionURL);
      const channel = await this.defineChannel(connection);

      await this.assertQueue(queue, channel);

      await channel.consume(queue, callback);
      await this.purgeQueue(queue, channel);
    } catch (error) {
      throw new InternalServerException();
    }
  }

  public async sendQueue (
    connectionURL: string,
    queue: Queues,
    message: Buffer
  ): Promise<void> {
    try {
      const connection = await this.defineConnection(connectionURL);
      const channel = await this.defineChannel(connection);
      await this.assertQueue(queue, channel);

      channel.sendToQueue(queue, message);
    } catch (error) {
      throw new InternalServerException();
    }
  }
}
