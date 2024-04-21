import LogTransaction from './LogTransaction';
import { addLog } from '../../routes/v1/log/log.controller';

const defaultProps = {
  Service: 'promage',
  type: 'promage',
};

class Logger {
  constructor() {
    this.payloadQueue = [];
    // Start message dispatching routine (queued failed messages for retry)
    setInterval(() => this.dispatchPayloads(), 1000 * 30);
  }

  // eslint-disable-next-line class-methods-use-this
  async log(data) {
    const payload = typeof data === 'string' ? { message: data } : data;
    const transaction = new LogTransaction(payload, true);

    await transaction.send();
  }

  start(data = {}) {
    if (!this.user) {
      this.user = data && data.user;
    }

    data.Actor = this.user ? this.user.username : null;
    const payload = typeof data === 'string' ? { message: data } : data;

    return new LogTransaction(payload, false);
  }

  // Attempt re-send of failed payloads
  dispatchPayloads() {
    const payloads = [this.payloadQueue, this.payloadQueue = []][0];

    payloads.forEach((payload) => {
      this.send(payload);
    });
  }

  send(data) {
    if (!this.user) {
      this.user = data && data.user;
    }

    data.Actor = this.user ? this.user.username : '';
    const payload = Object.assign({}, data, defaultProps); // Inject default properties into payload

    try {
      addLog(payload);
    } catch (err) {
      this.payloadQueue.push(data); // Queue payload to send later
    }
  }
}

const instance = new Logger();
export default instance;
